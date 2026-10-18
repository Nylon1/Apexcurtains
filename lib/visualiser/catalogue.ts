import fabrics from "../oslo-fabrics.json" with { type: "json" };
import palette from "./oslo-display-colours.json" with { type: "json" };
import sources from "./scene-sources.json" with { type: "json" };
import { roomDesignParams, type RoomDesignInput } from "./room-design.ts";

export const scenes = sources;
export type Scene = (typeof scenes)[number];
export const osloColours = fabrics.map((fabric) => {
  const derived = palette.colours.find(
    (colour) => colour.reference === fabric.reference,
  );
  if (!derived)
    throw new Error(`Missing visualiser swatch: ${fabric.reference}`);
  return {
    ...fabric,
    id: fabric.name.toLowerCase().replace(/\s+/g, "-"),
    rgb: derived.rgb,
  };
});
export type OsloColour = (typeof osloColours)[number];
export function resolveLook(room?: string | null, colour?: string | null) {
  return {
    scene:
      scenes.find((scene) => scene.id === room) ??
      scenes.find((scene) => scene.id === "double-pinch-gable")!,
    colour:
      osloColours.find((fabric) => fabric.id === colour) ??
      osloColours.find((fabric) => fabric.name === "Linen")!,
  };
}
export function lookUrl(
  room: string,
  colour: string,
  design?: RoomDesignInput,
) {
  const look = resolveLook(room, colour);
  const params = new URLSearchParams({
    room: look.scene.id,
    colour: look.colour.id,
    ...(design ? roomDesignParams(design) : {}),
  });
  return `/room-visualiser?${params}`;
}
