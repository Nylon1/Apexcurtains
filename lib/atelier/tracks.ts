export const forestKs = {
  id: "forest-ks" as const,
  name: "Forest Group KS® Klick System",
  label: "Forest KS",
  description:
    "A compact, hand-operated curtain track for light and medium-weight curtains.",
  image: "/atelier-products/forest-ks-white.webp",
  source: "https://www.forestgroup.com/uk/products/ks-klick-system",
  caption:
    "Manufacturer photograph shown in white. Your selected track finish is recorded separately.",
};

export const forestCs = {
  id: "forest-cs" as const,
  name: "Forest Group CS® Contract System",
  label: "Forest CS",
  description: "A hand-operated curtain track for medium and heavy curtains.",
  image: "/atelier-products/forest-cs-white.webp",
  source: "https://www.forestgroup.com/en/products/cs-contract-system",
  caption:
    "Manufacturer photograph shown in white. Your selected track finish is recorded separately.",
};

export const forestTracks = [forestCs, forestKs] as const;
export const trackFinishes = ["Black", "White"] as const;

export function selectedTrack(w: { trackProduct: string }) {
  return forestTracks.find((track) => track.id === w.trackProduct);
}
