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
      text: "Packing and handling can leave temporary creases. Allow the curtains to hang naturally and gently guide the folds during everyday use. Avoid tugging, home steaming or ironing; heat and moisture can damage the cloth or lining.",
    },
  ],
  living: [
    {
      icon: "clock",
      title: "A little time to settle",
      text: "Fabric can relax after hanging, and humidity can affect its length. Let the curtains hang freely, release tight tiebacks and gently arrange the folds. Small changes are part of living with textiles; avoid stretching or trimming the hem.",
    },
    {
      icon: "cloth",
      title: "Texture and sheen",
      text: "Small slubs and variations can be part of the weave. Pile fabrics may look lighter or darker as the light and folds change. Enjoy this natural character; avoid rubbing pressure marks or pulling loose threads.",
    },
    {
      icon: "sun",
      title: "Light, warmth and damp",
      text: "Limit prolonged strong sun and keep the cloth clear of heaters, damp glass and cleaning sprays. Ventilate the room and wipe condensation from the glass, keeping the curtains dry. Never apply bleach to the fabric or lining.",
    },
    {
      icon: "track",
      title: "Easy movement",
      text: "Release tiebacks and use the controls shown at fitting. For an occasional catch, pause and check for trapped folds or nearby furniture before gently trying again. Some apex panels stay fixed. Never force movement, pull the hem or oil the track.",
    },
    {
      icon: "light",
      title: "Light around the edges",
      text: "Blackout lining reduces light through the cloth; some light at the top, sides or centre is normal. Release tiebacks, close the moving panels fully and gently arrange the centre overlap. Never pin, tape or glue lining to the glass.",
    },
    {
      icon: "home",
      title: "A little care, often",
      text: "Regular care and good maintenance are the key. Dust gently, keep tracks clear and release tiebacks before closing. Guide the folds back into place after use and let the fabric hang naturally. Small, consistent habits keep your curtains looking their best.",
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
        : "Natural changes, gentle routines and simple ways to keep your curtains looking their best.",
  sections: cards[group.id],
}));
