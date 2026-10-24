import type { SurveyWindow } from "./model";

export const forestKs = {
  id: "forest-ks" as const,
  name: "Forest Group KS® Klick System",
  image: "/atelier-products/forest-ks-white.webp",
  source: "https://www.forestgroup.com/uk/products/ks-klick-system",
  caption:
    "Manufacturer photograph shown in white. Your selected track finish is recorded separately.",
};

export function selectedTrack(w: SurveyWindow) {
  return w.trackProduct === forestKs.id ? forestKs : undefined;
}
