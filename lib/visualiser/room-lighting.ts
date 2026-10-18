export type SceneLight = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  strength: number;
  emitter?: number[];
  shade?: string;
};
// Illustrative warm-light contribution, restricted to visible interior materials.
// Daylight/glazing and the view outside never switch off with the room lights.
export function prepareLighting(
  masks: Uint8ClampedArray[],
  width: number,
  height: number,
  sceneWidth: number,
  sceneHeight: number,
  lights: SceneLight[],
) {
  const field = new Uint8Array(width * height);
  for (let p = 0; p < field.length; p++) {
    let alpha = 0;
    for (const mask of masks) alpha = Math.max(alpha, mask[p * 4 + 3] / 255);
    if (!alpha) continue;
    const x = ((p % width) * sceneWidth) / width;
    const y = (Math.floor(p / width) * sceneHeight) / height;
    let contribution = 0.04;
    for (const light of lights) {
      const distance =
        ((x - light.x) / light.rx) ** 2 + ((y - light.y) / light.ry) ** 2;
      contribution += light.strength * Math.exp(-distance * 1.6);
    }
    field[p] = Math.round(Math.min(0.5, contribution) * alpha * 255);
  }
  return field;
}
export function lightsOff(output: Uint8ClampedArray, field: Uint8Array) {
  for (let p = 0; p < field.length; p++) {
    if (!field[p]) continue;
    const amount = field[p] / 255;
    output[p * 4] *= 1 - amount;
    output[p * 4 + 1] *= 1 - amount * 0.83;
    output[p * 4 + 2] *= 1 - amount * 0.55;
  }
  return output;
}
