import fabrics from "../oslo-fabrics.json" with { type: "json" };
import scenes from "./scene-sources.json" with { type: "json" };

/** Only catalogue IDs cross into the existing enquiry; labels/URLs are derived. */
export function visualiserContext(room: unknown, colour: unknown) {
  if (typeof room !== "string" || typeof colour !== "string") return null;
  const scene = scenes.find((item) => item.id === room);
  const fabric = fabrics.find(
    (item) => item.name.toLowerCase().replace(/\s+/g, "-") === colour,
  );
  if (!scene || !fabric) return null;
  return {
    room,
    colour,
    roomName: scene.name,
    heading: scene.heading,
    colourName: `Oslo ${fabric.name}`,
    reference: fabric.reference,
    url: `https://www.apexcurtains.com/room-visualiser?room=${room}&colour=${colour}`,
  };
}
