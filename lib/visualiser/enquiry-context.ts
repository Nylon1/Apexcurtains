import fabrics from "../oslo-fabrics.json" with { type: "json" };
import scenes from "./scene-sources.json" with { type: "json" };
import {
  resolveRoomDesign,
  roomDesignParams,
  roomDesignSummary,
  type RoomDesignInput,
} from "./room-design.ts";

/** Only catalogue IDs cross into the existing enquiry; labels/URLs are derived. */
export function visualiserContext(
  room: unknown,
  colour: unknown,
  design?: RoomDesignInput,
) {
  if (typeof room !== "string" || typeof colour !== "string") return null;
  const scene = scenes.find((item) => item.id === room);
  const fabric = fabrics.find(
    (item) => item.name.toLowerCase().replace(/\s+/g, "-") === colour,
  );
  if (!scene || !fabric) return null;
  const roomDesign = resolveRoomDesign(design);
  const params = new URLSearchParams({
    room,
    colour,
    ...roomDesignParams(roomDesign),
  });
  return {
    room,
    colour,
    roomName: scene.name,
    heading: scene.heading,
    colourName: `Oslo ${fabric.name}`,
    reference: fabric.reference,
    design: roomDesign,
    designSummary: roomDesignSummary(roomDesign),
    url: `https://www.apexcurtains.com/room-visualiser?${params}`,
  };
}
