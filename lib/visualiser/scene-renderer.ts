import type { Scene } from "./catalogue";
import { preparePixels, relight } from "./relight";

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(canvas.width / scene.width, canvas.height / scene.height);
  ctx.fillStyle = "#fff";
  for (const path of scene.paths) ctx.fill(new Path2D(path));
  ctx.restore();
  const mask = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  return {
    width: canvas.width,
    height: canvas.height,
    pixels: preparePixels(source, mask, canvas.width),
  };
}
export function paintScene(
  canvas: HTMLCanvasElement,
  scene: Awaited<ReturnType<typeof loadScene>>,
  rgb: number[],
) {
  const start = performance.now();
  canvas.width = scene.width;
  canvas.height = scene.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  context.putImageData(
    new ImageData(relight(scene.pixels, rgb), scene.width, scene.height),
    0,
    0,
  );
  return performance.now() - start;
}
