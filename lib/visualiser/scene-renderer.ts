import type { Scene } from "./catalogue";
import { preparePixels, relight } from "./relight";
import {
  roomPalettes,
  roomSurfaces,
  type RoomDesign,
  type RoomSurface,
} from "./room-design";
import { prepareLighting, lightsOff, type SceneLight } from "./room-lighting";
import materials from "./scene-materials.json";

type Materials = {
  furnitureLabel: string;
  wall: string[];
  floor: string[];
  furniture: string[];
  foliageRegions: number[][];
  floorFoliageRegions: number[][];
  wallOcclusions: string[];
  floorOcclusions: string[];
  lights: SceneLight[];
};

// Let input and paint run between preparation stages, including on browsers
// without scheduler.yield(). Completed scenes remain cached for colour changes.
function yieldToBrowser() {
  return new Promise<void>((resolve) => setTimeout(resolve, 0));
}

export async function loadScene(scene: Scene, size: "mobile" | "desktop") {
  const image = new Image();
  image.decoding = "async";
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      image.onload = image.onerror = null;
      reject(new Error("Scene load timed out"));
    }, 15000);
    image.onload = () => {
      clearTimeout(timer);
      resolve();
    };
    image.onerror = () => {
      clearTimeout(timer);
      reject(new Error("Scene image unavailable"));
    };
    image.src = `/visualiser/${scene.id}-${size}.webp`;
  });
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(image, 0, 0);
  const source = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const material = (materials as Record<string, Materials>)[scene.id];
  function maskFor(paths: string[]) {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    ctx!.save();
    ctx!.scale(canvas.width / scene.width, canvas.height / scene.height);
    ctx!.fillStyle = "#fff";
    for (const path of paths) {
      // Exclusions may extend beyond their material boundary. Subtraction keeps
      // them empty there too, unlike even-odd filling which would add them back.
      const [outline, ...holes] = path.split(/(?=M)/).filter(Boolean);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fill(new Path2D(outline));
      ctx!.globalCompositeOperation = "destination-out";
      for (const hole of holes) ctx!.fill(new Path2D(hole));
    }
    ctx!.globalCompositeOperation = "source-over";
    ctx!.restore();
    return ctx!.getImageData(0, 0, canvas.width, canvas.height).data;
  }
  const curtainMask = maskFor(scene.paths);
  const surfaceMasks = Object.fromEntries(
    roomSurfaces.map((key) => [key, maskFor(material[key])]),
  ) as Record<RoomSurface, Uint8ClampedArray>;
  const wallOcclusion = maskFor(material.wallOcclusions);
  const floorOcclusion = maskFor(material.floorOcclusions);
  await yieldToBrowser();
  // Exclude leaves and stems in bounded decorative areas, preserving wall between them.
  const foliage: ["wall" | "floor", number[]][] = [
    ...material.foliageRegions.map((bounds): ["wall", number[]] => ["wall", bounds]),
    ...material.floorFoliageRegions.map((bounds): ["floor", number[]] => ["floor", bounds]),
  ];
  for (const [surface, [rx, ry, rw, rh]] of foliage) {
    for (
      let y = Math.floor((ry / scene.height) * canvas.height);
      y < ((ry + rh) / scene.height) * canvas.height;
      y++
    ) {
      for (
        let x = Math.floor((rx / scene.width) * canvas.width);
        x < Math.min(canvas.width, ((rx + rw) / scene.width) * canvas.width);
        x++
      ) {
        const i = (y * canvas.width + x) * 4;
        const brightness = (source[i] + source[i + 1] + source[i + 2]) / 3;
        surfaceMasks[surface][i + 3] *= Math.max(0, Math.min(1, (brightness - 70) / 40));
      }
    }
  }
  // Furniture in front wins; curtain pixels cannot become a room material.
  for (let i = 3; i < source.length; i += 4) {
    for (const key of roomSurfaces)
      surfaceMasks[key][i] *= 1 - curtainMask[i] / 255;
    surfaceMasks.wall[i] *= 1 - surfaceMasks.furniture[i] / 255;
    surfaceMasks.wall[i] *= 1 - wallOcclusion[i] / 255;
    surfaceMasks.floor[i] *= 1 - surfaceMasks.furniture[i] / 255;
    surfaceMasks.floor[i] *= 1 - floorOcclusion[i] / 255;
  }
  await yieldToBrowser();
  const surfaces = {} as Record<RoomSurface, ReturnType<typeof preparePixels>>;
  for (const key of roomSurfaces) {
    surfaces[key] = preparePixels(source, surfaceMasks[key]);
    await yieldToBrowser();
  }
  const pixels = preparePixels(source, curtainMask, canvas.width);
  await yieldToBrowser();
  const lighting = prepareLighting(
    [curtainMask, ...Object.values(surfaceMasks)],
    canvas.width,
    canvas.height,
    scene.width,
    scene.height,
    material.lights,
  );
  await yieldToBrowser();
  return {
    width: canvas.width,
    height: canvas.height,
    sourceWidth: scene.width,
    sourceHeight: scene.height,
    pixels,
    surfaces,
    lighting,
    lights: material.lights,
  };
}
export function paintScene(
  canvas: HTMLCanvasElement,
  scene: Awaited<ReturnType<typeof loadScene>>,
  rgb: number[],
  design: RoomDesign,
) {
  const start = performance.now();
  canvas.width = scene.width;
  canvas.height = scene.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  const output = new Uint8ClampedArray(scene.pixels.source);
  for (const key of roomSurfaces) {
    const colour = roomPalettes[key].find(
      (option) => option.id === design[key],
    );
    if (colour) relight(scene.surfaces[key], colour.rgb, output);
  }
  relight(scene.pixels, rgb, output);
  if (design.lights === "off") lightsOff(output, scene.lighting);
  context.putImageData(new ImageData(output, scene.width, scene.height), 0, 0);
  if (design.lights === "off") {
    context.save();
    context.scale(
      scene.width / scene.sourceWidth,
      scene.height / scene.sourceHeight,
    );
    for (const light of scene.lights) {
      if (light.emitter) {
        const [x, y, rx, ry] = light.emitter;
        context.beginPath();
        context.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
        context.fillStyle = "#9d988c";
        context.fill();
      }
      if (light.shade) {
        context.fillStyle = "rgba(80, 84, 86, 0.3)";
        context.fill(new Path2D(light.shade));
      }
    }
    context.restore();
  }
  return performance.now() - start;
}
