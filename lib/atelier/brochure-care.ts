import { careGuide, standardCareSummary } from "./care";
import type { BrochureIconName } from "./brochure-icons";

// Concise reading cards; the full policy remains shared by the survey and handover.
const cards: Record<
  string,
  { icon: BrochureIconName; title: string; text: string }[]
> = {
  cleaning: [
    {
      icon: "clean",
      title: "Professional dry clean only",
      text: standardCareSummary,
    },
    {
      icon: "vacuum",
      title: "A light touch, regularly",
      text: "Lift dust with a clean upholstery brush on the lowest vacuum suction. Support the cloth and work gently downwards; never let it pull into the nozzle. Ask Apex first about delicate weaves, embellishments or velvet pile.",
    },
    {
      icon: "spill",
      title: "Blot. Pause. Ask for advice.",
      text: "Blot spills with a clean, dry, white cloth. Do not rub or add water, detergent, stain remover or freshener. Keep heat away. Contact a professional cleaner promptly with the spill, fabric and lining details.",
    },
    {
      icon: "pair",
      title: "Keep a pair together",
      text: "Clean matching curtains together. Photograph the arrangement and label panels by room, window and side. Ask the cleaner about removable hooks; leave sewn headings intact. Rehang only when dry and aired. Ask Apex to handle heavy or high-level curtains.",
    },
  ],
  dressing: [
    {
      icon: "folds",
      title: "01 / Follow the folds",
      text: "With clean, dry hands, draw the curtain to its resting position. Guide the sewn pleats from below the heading towards the hem. For wave headings, keep the alternating forward and backward folds in sequence.",
    },
    {
      icon: "band",
      title: "02 / Hold very loosely",
      text: "If suitable for the fabric, use broad, soft, clean bands for a day or two. Remove them if marks appear. Never use string, clips, tape or tight knots. Ask Apex before banding velvet, delicate, textured or embellished cloth.",
    },
    {
      icon: "release",
      title: "03 / Release and let fall",
      text: "Remove the bands, operate the curtain gently and guide the folds. Never stretch the cloth, tug the hem or add weights. Let puddled hems rest on a clean floor; tiebacks should cradle the folds without crushing or pulling.",
    },
    {
      icon: "clock",
      title: "04 / Give creases time",
      text: "Handling creases may soften as the curtains hang. Do not steam or iron without Apex confirming a method for the complete curtain: heat and moisture can damage cloth or lining. Send us a photograph if creases persist.",
    },
  ],
  living: [
    {
      icon: "clock",
      title: "A changing hem",
      text: "Fabric can relax; humidity and cleaning can affect length. Photograph an uneven hem or showing lining and contact Apex. Do not trim, stretch or move hooks yourself.",
    },
    {
      icon: "cloth",
      title: "Texture and sheen",
      text: "Slubs and pile shading can be natural. Do not rub or press a different-looking patch or pull loose threads. Send a close-up and wider photo of new marks or snags.",
    },
    {
      icon: "sun",
      title: "Light, warmth and damp",
      text: "Limit prolonged strong sun. Keep cloth away from heat, damp glass and sprays. Ventilate and address condensation. Ask for advice about mould; never apply bleach.",
    },
    {
      icon: "track",
      title: "Easy movement",
      text: "Use the controls shown at fitting. Release tiebacks and keep tracks clear. Some apex panels stay fixed. Stop if a curtain snags; contact Apex. Never pull the hem or oil the track.",
    },
    {
      icon: "light",
      title: "Light around the edges",
      text: "Blackout lining reduces light through the cloth; edges can still admit light. For unusual gaps, release tiebacks and ask Apex to review. Never pin, tape or glue lining to glass.",
    },
    {
      icon: "home",
      title: "We are here to help",
      text: "Keep your collection reference and fabric details to hand. A full-window photo and a close-up help us understand what you are seeing. Contact hello@apexcurtains.com or 0800 772 0367.",
    },
  ],
};

export const brochureCareGuide = careGuide.map((group) => ({
  ...group,
  introduction:
    group.id === "cleaning"
      ? "A few gentle habits keep your collection looking beautifully at home."
      : group.id === "dressing"
        ? "Four gentle steps to a beautiful fall. Follow the heading, and let the fabric lead."
        : "A quick visual guide to everyday changes, with Apex here when you need us.",
  sections: cards[group.id],
}));
