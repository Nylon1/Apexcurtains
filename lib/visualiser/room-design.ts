// Interior palette adapted locally from the CurtainsUK visualiser's catalog.mjs.
// These are illustrative interior tones, not paint, flooring or furniture products.
function options(values: [string, string][]) {
  return values.map(([name, hex]) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    hex,
    rgb: [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16)),
  }));
}
export const roomPalettes = {
  wall: options([
    ["Warm white", "#e9e4d9"],
    ["Soft beige", "#d7cbb7"],
    ["Sage", "#afb7a1"],
    ["Pale grey", "#d3d3ce"],
    ["Muted blush", "#d6bdb5"],
    ["Blue grey", "#aebdc1"],
    ["Warm taupe", "#b9ab9b"],
    ["Deep olive", "#69705a"],
  ]),
  floor: options([
    ["Light oak", "#d3c3a6"],
    ["Natural oak", "#bfa786"],
    ["Medium oak", "#a88b6c"],
    ["Dark walnut", "#725a47"],
    ["Pale grey wood", "#c0bdb2"],
    ["Deep grey wood", "#797a74"],
  ]),
  furniture: options([
    ["Cream", "#e5ddca"],
    ["Taupe", "#b0a08d"],
    ["Beige", "#caba9c"],
    ["Sage", "#9da78c"],
    ["Olive", "#7e8768"],
    ["Blush", "#cba39a"],
    ["Terracotta", "#b87961"],
    ["Soft blue", "#8cabb8"],
    ["Navy", "#455668"],
    ["Charcoal", "#555957"],
  ]),
};
export type RoomSurface = keyof typeof roomPalettes;
export const roomSurfaces: RoomSurface[] = ["wall", "floor", "furniture"];
export type RoomDesign = Record<RoomSurface, string> & { lights: "on" | "off" };
export type RoomDesignInput = Partial<Record<keyof RoomDesign, unknown>>;
export function resolveRoomDesign(input: RoomDesignInput = {}): RoomDesign {
  const resolve = (surface: RoomSurface) =>
    roomPalettes[surface].find((option) => option.id === input[surface])?.id ??
    "original";
  return {
    wall: resolve("wall"),
    floor: resolve("floor"),
    furniture: resolve("furniture"),
    lights: input.lights === "off" ? "off" : "on",
  };
}
export function roomDesignFromParams(
  params: { get(name: string): string | null },
  prefix = "",
) {
  return resolveRoomDesign({
    wall: params.get(`${prefix}wall`),
    floor: params.get(`${prefix}floor`),
    furniture: params.get(`${prefix}furniture`),
    lights: params.get(`${prefix}lights`),
  });
}
export function roomDesignParams(design: RoomDesignInput, prefix = "") {
  const resolved = resolveRoomDesign(design);
  return Object.fromEntries(
    Object.entries(resolved).map(([key, value]) => [`${prefix}${key}`, value]),
  );
}
export function roomDesignSummary(design: RoomDesign) {
  const label = (surface: RoomSurface) =>
    roomPalettes[surface].find((option) => option.id === design[surface])
      ?.name ?? "Original tone";
  return `Walls: ${label("wall")} · Floor: ${label("floor")} · Main upholstery: ${label("furniture")} · Lights ${design.lights}`;
}
