import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
import {
  preparePixels,
  relight,
  linear,
  litChannel,
} from "../lib/visualiser/relight.ts";
import { createResourceCache } from "../lib/visualiser/resource-cache.ts";
import { visualiserContext } from "../lib/visualiser/enquiry-context.ts";
import {
  osloColours,
  scenes,
  resolveLook,
  lookUrl,
} from "../lib/visualiser/catalogue.ts";
import { resolveRoomDesign, roomDesignFromParams, roomDesignParams, roomPalettes } from "../lib/visualiser/room-design.ts";
import { prepareLighting, lightsOff } from "../lib/visualiser/room-lighting.ts";
import materials from "../lib/visualiser/scene-materials.json" with { type: "json" };
import manifest from "../lib/visualiser/assets.json" with { type: "json" };
import palette from "../lib/visualiser/oslo-display-colours.json" with { type: "json" };

test("every governed Oslo colour has a traceable display sample, with unchanged source swatch", async () => {
  assert.equal(osloColours.length, 34);
  assert.equal(
    new Set(osloColours.map((c) => c.reference)).size,
    osloColours.length,
  );
  for (const colour of osloColours) {
    assert.ok(
      colour.rgb.every((c) => Number.isInteger(c) && c >= 0 && c <= 255),
    );
    const bytes = await fs.readFile(`public${colour.image}`);
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      palette.colours.find((c) => c.reference === colour.reference)
        .swatchSha256,
    );
  }
});
test("scene derivatives are complete, bounded and match recorded hashes", async () => {
  assert.equal(scenes.length, 3);
  assert.ok(scenes.some((scene) => scene.heading === "Wave pleat"));
  assert.ok(scenes.some((scene) => scene.heading === "Pencil pleat"));
  assert.ok(scenes.some((scene) => scene.heading === "Double pinch pleat"));
  for (const scene of scenes) {
    const record = manifest.find((item) => item.id === scene.id);
    assert.ok(record);
    assert.equal(record.assets.length, 3);
    for (const asset of record.assets) {
      const bytes = await fs.readFile(`public${asset.file}`);
      assert.equal(
        createHash("sha256").update(bytes).digest("hex"),
        asset.sha256,
      );
      assert.ok(bytes.length < 250000);
      const meta = await sharp(bytes).metadata();
      assert.ok(
        Math.abs(meta.width / meta.height - scene.width / scene.height) < 0.002,
      );
    }
  }
});
test("relighting preserves every pixel outside the mask and alpha everywhere", () => {
  const source = new Uint8ClampedArray([
    100, 90, 80, 255, 180, 160, 150, 255, 20, 10, 5, 255, 77, 88, 99, 255,
  ]);
  const mask = new Uint8ClampedArray([
    255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const pixels = preparePixels(source, mask);
  for (const colour of osloColours) {
    const output = relight(pixels, colour.rgb);
    assert.deepEqual(output.slice(8), source.slice(8));
    assert.equal(output[3], 255);
    assert.equal(output[7], 255);
    assert.notDeepEqual(output.slice(0, 8), source.slice(0, 8));
    assert.ok(output[4] >= output[0], `Fold order lost for ${colour.name}`);
  }
});
test("light and dark Oslo retain ordered illumination and visible fold contrast", () => {
  for (const name of [
    "Ivory",
    "Linen",
    "Chrome",
    "Sky",
    "Fern",
    "Black",
    "Oxford",
  ]) {
    const colour = osloColours.find((c) => c.name === name);
    const samples = [0.1, 0.3, 0.5, 0.8, 1, 1.3, 1.7].map((light) =>
      colour.rgb.map((c) => litChannel(linear(c), light)),
    );
    for (let i = 1; i < samples.length; i++)
      for (let c = 0; c < 3; c++) assert.ok(samples[i][c] >= samples[i - 1][c]);
    assert.ok(samples[5][0] - samples[1][0] > 12, `${name} lost folds`);
  }
});
test("enquiry accepts only real scene and Oslo IDs, derives labels and its own URL", () => {
  for (const scene of scenes)
    for (const colour of osloColours) {
      const context = visualiserContext(scene.id, colour.id);
      assert.equal(context.reference, colour.reference);
      assert.equal(context.heading, scene.heading);
      assert.equal(context.roomName, scene.name);
      assert.match(
        context.url,
        /^https:\/\/www\.apexcurtains\.com\/room-visualiser\?/,
      );
    }
  assert.equal(visualiserContext("invented-height", "fern"), null);
  assert.equal(visualiserContext("apex-bedroom", "<script>"), null);
  assert.equal(visualiserContext(null, null), null);
  assert.equal(resolveLook("wrong", "wrong").scene.id, "double-pinch-gable");
});
test("resource cache shares pending work, evicts failed requests and bounds retained resources", async () => {
  let calls = 0,
    failures = 0;
  const cache = createResourceCache(async (key) => {
    calls++;
    if (key === "retry" && !failures++) throw Error("offline");
    return key;
  }, 2);
  assert.deepEqual(await Promise.all([cache.get("a"), cache.get("a")]), [
    "a",
    "a",
  ]);
  assert.equal(calls, 1);
  await assert.rejects(cache.get("retry"));
  assert.equal(await cache.get("retry"), "retry");
  await cache.get("c");
  const before = calls;
  await cache.get("a");
  assert.equal(calls, before + 1);
});
test("all three illustrative scenes retain fold variation across the complete Oslo palette", async () => {
  for (const scene of scenes) {
    const { data, info } = await sharp(
      `public/visualiser/${scene.id}-mobile.webp`,
    )
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}" viewBox="0 0 ${scene.width} ${scene.height}">${scene.paths.map((d) => `<path fill="white" d="${d}"/>`).join("")}</svg>`;
    const mask = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer();
    const pixels = preparePixels(
      new Uint8ClampedArray(data),
      new Uint8ClampedArray(mask),
      info.width,
    );
    for (const colour of osloColours) {
      const output = relight(pixels, colour.rgb);
      let min = 255,
        max = 0,
        unchanged = 0;
      for (let i = 0; i < output.length; i += 4) {
        if (mask[i + 3] === 0) {
          assert.equal(output[i], data[i]);
          assert.equal(output[i + 1], data[i + 1]);
          assert.equal(output[i + 2], data[i + 2]);
          unchanged++;
        }
        if (mask[i + 3] === 255) {
          const lum =
            0.2126 * output[i] +
            0.7152 * output[i + 1] +
            0.0722 * output[i + 2];
          min = Math.min(min, lum);
          max = Math.max(max, lum);
        }
      }
      assert.ok(unchanged > info.width * info.height * 0.4);
      assert.ok(max - min > 30, `${scene.id}/${colour.name} lacks tonal range`);
    }
  }
});

test("room schemes survive share and enquiry URLs while unknown values are rejected", () => {
  const scheme = resolveRoomDesign({ wall: "sage", floor: "dark-walnut", furniture: "navy", lights: "off" });
  const shared = new URL(lookUrl("apex-bedroom", "fern", scheme), "https://www.apexcurtains.com");
  assert.deepEqual(roomDesignFromParams(shared.searchParams), scheme);
  const enquiry = new URLSearchParams(roomDesignParams(scheme, "visualiser-"));
  assert.deepEqual(roomDesignFromParams(enquiry, "visualiser-"), scheme);
  const context = visualiserContext("apex-bedroom", "fern", scheme);
  assert.deepEqual(roomDesignFromParams(new URL(context.url).searchParams), scheme);
  assert.match(context.designSummary, /Walls: Sage.*Floor: Dark walnut.*Navy.*Lights off/);
  assert.deepEqual(resolveRoomDesign({ wall: "<script>", floor: ["dark-walnut"], furniture: { id: "navy" }, lights: "javascript:" }),
    { wall: "original", floor: "original", furniture: "original", lights: "on" });
  assert.doesNotMatch(visualiserContext("apex-bedroom", "fern", { wall: "<script>" }).url, /script/);
});

test("independent material recolouring composes without resetting other surfaces", () => {
  const source = new Uint8ClampedArray([190,170,140,255, 170,150,130,255, 160,140,120,255, 80,95,110,255]);
  const maskA = new Uint8ClampedArray(16), maskB = new Uint8ClampedArray(16);
  maskA[3] = 255; maskB[7] = 255;
  const a = preparePixels(source, maskA), b = preparePixels(source, maskB);
  const first = relight(a, [100,120,140]);
  const combined = relight(b, [180,140,110], first.slice());
  assert.deepEqual(combined.slice(0,4), first.slice(0,4));
  assert.notDeepEqual(combined.slice(4,8), source.slice(4,8));
  assert.deepEqual(combined.slice(8), source.slice(8));
  const field = prepareLighting([maskA, maskB], 4, 1, 4, 1, [{x:0,y:0,rx:2,ry:2,strength:0.3}]);
  const unlit = lightsOff(combined.slice(), field);
  assert.ok(unlit[0] < combined[0]);
  assert.deepEqual(unlit.slice(8), source.slice(8), "Daylight/window pixels changed");
  assert.deepEqual(relight(a, [100,120,140]), first, "Lighting mutated cached source");
});

test("each furnished scene defines all material masks, bounded lights and useful interior palettes", async () => {
  for (const scene of scenes) {
    const material = materials[scene.id];
    assert.ok(material.furnitureLabel);
    for (const surface of ["wall", "floor", "furniture"]) {
      assert.ok(material[surface].length);
      assert.ok(roomPalettes[surface].length >= 6);
      const commands = material[surface].map((path) => path.split(/(?=M)/).filter(Boolean)
        .map((d, index) => `<path fill="${index ? "black" : "white"}" d="${d}"/>`).join("")).join("");
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="270" viewBox="0 0 1448 1086"><defs><mask id="material"><rect width="1448" height="1086" fill="black"/>${commands}</mask></defs><rect width="1448" height="1086" fill="white" mask="url(#material)"/></svg>`;
      const mask = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer();
      let covered = 0;
      for (let i = 3; i < mask.length; i += 4) if (mask[i] > 128) covered++;
      assert.ok(covered > 360 * 270 * 0.01, `${scene.id}/${surface} is empty`);
      assert.ok(covered < 360 * 270 * 0.7, `${scene.id}/${surface} covers too much`);
    }
    for (const light of material.lights) {
      assert.ok(light.x >= 0 && light.x <= scene.width && light.y >= 0 && light.y <= scene.height);
      assert.ok(light.rx > 0 && light.ry > 0 && light.strength > 0 && light.strength < 1);
    }
  }
});
