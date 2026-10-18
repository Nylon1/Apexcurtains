// Colour and illumination are separate: no CSS tint or alpha-colour overlay.
export function linear(value: number) {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
// Source pixels are 8-bit integers: compute the same transfer function once
// per possible byte, rather than three exponentiations for every masked pixel.
const linearBytes = Float64Array.from({ length: 256 }, (_, value) => linear(value));
export function srgb(value: number) {
  const c = Math.max(0, Math.min(0.985, value));
  return Math.round(
    255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055),
  );
}
export function litChannel(colour: number, illumination: number) {
  // Smooth highlight compression preserves bright folds; low achromatic sheen
  // keeps dark fabric dimensional without forcing dark colours into grey.
  const diffuse =
    (colour * illumination) / (1 + colour * Math.max(0, illumination - 1));
  const sheen = 0.026 * Math.max(0, illumination - 0.55) ** 1.35 * (1 - colour);
  return srgb(diffuse + sheen);
}
export function preparePixels(
  source: Uint8ClampedArray,
  mask: Uint8ClampedArray,
  width?: number,
) {
  const luminance = new Float32Array(source.length / 4);
  const histogram = new Uint32Array(1024);
  let count = 0;
  for (let p = 0; p < luminance.length; p++) {
    const i = p * 4;
    if (!mask[i + 3]) continue;
    const value =
      0.2126 * linearBytes[source[i]] +
      0.7152 * linearBytes[source[i + 1]] +
      0.0722 * linearBytes[source[i + 2]];
    luminance[p] = value;
    if (mask[i + 3] > 250) {
      histogram[Math.min(1023, Math.floor(value * 1023))]++;
      count++;
    }
  }
  let total = 0,
    anchor = 0.3;
  for (let i = 0; i < histogram.length; i++) {
    total += histogram[i];
    if (total >= count * 0.72) {
      anchor = Math.max(0.025, i / 1023);
      break;
    }
  }
  // Suppress amplified camera grain before relighting dark source fabric.
  // A small, mask-aware separable filter retains the larger photographed folds
  // and never samples the window or wall into the cloth.
  if (width) {
    for (const stride of [1, width]) {
      const input = luminance.slice();
      for (let p = 0; p < luminance.length; p++) {
        if (!mask[p * 4 + 3]) continue;
        let sum = input[p] * 6,
          weight = 6;
        for (const offset of [-2, -1, 1, 2]) {
          const q = p + offset * stride;
          if (q < 0 || q >= input.length || !mask[q * 4 + 3]) continue;
          if (stride === 1 && Math.floor(q / width) !== Math.floor(p / width))
            continue;
          const w = Math.abs(offset) === 1 ? 4 : 1;
          sum += input[q] * w;
          weight += w;
        }
        luminance[p] = sum / weight;
      }
    }
  }
  const illumination = new Uint16Array(luminance.length);
  for (let p = 0; p < luminance.length; p++) {
    if (!mask[p * 4 + 3]) continue;
    illumination[p] = Math.min(
      4095,
      Math.round((luminance[p] / anchor) ** 0.88 * 2048),
    );
  }
  return { source, mask, illumination };
}
export type PreparedPixels = ReturnType<typeof preparePixels>;
export function relight(
  pixels: PreparedPixels,
  rgb: number[],
  output = new Uint8ClampedArray(pixels.source),
) {
  const tables = rgb.map((channel) => {
    const table = new Uint8Array(4096),
      colour = linear(channel);
    for (let i = 0; i < table.length; i++)
      table[i] = litChannel(colour, i / 2048);
    return table;
  });
  for (let p = 0; p < pixels.illumination.length; p++) {
    const i = p * 4,
      alpha = pixels.mask[i + 3] / 255;
    if (!alpha) continue;
    for (let c = 0; c < 3; c++)
      output[i + c] = Math.round(
        output[i + c] * (1 - alpha) + tables[c][pixels.illumination[p]] * alpha,
      );
  }
  return output;
}
