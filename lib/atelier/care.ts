import { carePrinciples } from "../curtain-care";
// Shared by survey, client preview, workroom and fitter handover. No stored notes are changed.
export const standardCareTitle = "Care for the complete curtain";
export const standardCareSummary = carePrinciples.cleaning;
export const careGuide = [
  {
    id: "cleaning",
    eyebrow: "CARING FOR YOUR COLLECTION",
    title: "Beautiful today. Cared for over time.",
    introduction:
      "Keep the individual care instructions for your complete curtain with your collection. A face-fabric label alone does not determine the care of its sewn layers.",
    sections: [
      { title: "The complete curtain", text: carePrinciples.cleaning },
      { title: "A gentle everyday routine", text: carePrinciples.dust },
      {
        title: "Spills, marks and accidental splashes",
        text: carePrinciples.spills,
      },
      {
        title: "Professional cleaning and handling",
        text: carePrinciples.highLevel,
      },
    ],
  },
  {
    id: "dressing",
    eyebrow: "THE ART OF A BEAUTIFUL FALL",
    title: "Dressing your curtains.",
    introduction:
      "Initial dressing is part of the professional finish: the installer checks the heading, layers, movement and hem. Everyday dressing means gently returning reachable folds to the arrangement shown at handover.",
    sections: [
      {
        title: "01 / Notice the rhythm",
        text: "With clean, dry hands, look at the folds established at handover. Keep sewn pleats together and a wave heading’s alternating sequence intact. Move only the panels demonstrated for your system.",
      },
      { title: "02 / Guide reachable cloth", text: carePrinciples.dressing },
      {
        title: "03 / Let the hem rest",
        text: "Leave each layer and hem free of obstructions. Do not stretch the cloth, tug the hem, bind folds or add weights. Tiebacks should cradle the folds at the agreed position without crushing or pulling sideways.",
      },
      { title: "04 / Creases and settling", text: carePrinciples.settling },
    ],
  },
  {
    id: "living",
    eyebrow: "LIVING BEAUTIFULLY WITH YOUR CURTAINS",
    title: "Small questions, thoughtful answers.",
    introduction:
      "Notice how your curtains hang and move. Gentle everyday adjustments are different from changing the heading, track or installed motor settings.",
    sections: [
      {
        title: "A change in the hang",
        text: "Room conditions and the construction can affect the fall. Keep layers free of obstructions; do not stretch, trim or rehook a curtain to chase a change. Contact Apex if a hem begins to catch or the lining pulls unevenly.",
      },
      {
        title: "Texture, sheen and pressure marks",
        text: "Slubs and variations can be part of a weave. Pile fabrics can look different as the light and fold direction change. Do not rub a pressure mark, brush an unconfirmed pile direction or pull a snag or loose thread.",
      },
      {
        title: "Sunlight, condensation and warmth",
        text: carePrinciples.protection,
      },
      {
        title: "Movement, tracks and tiebacks",
        text: carePrinciples.operation,
      },
      {
        title: "Blackout lining and edge light",
        text: "Blackout lining limits light through the cloth; light around the edges may remain. Close only moving sections as demonstrated and gently arrange reachable overlaps. Never move retained apex points or pin, tape or glue a lining to the window.",
      },
      { title: "If operation changes", text: carePrinciples.motorHelp },
    ],
  },
] as const;
export const careHandover =
  "Demonstrate the installed manual, corded or motorised operating method, releasing tiebacks from travelling panels and keeping the route clear. Identify retained apex sections and show safe, reachable fold adjustments. Provide the actual complete-curtain care instructions and source references; do not infer washing or dry-cleaning permission from the face cloth alone. Explain when to stop operation and ask Apex, and confirm any individually assessed access or maintenance arrangements.";
export function additionalCareWindows<
  T extends { careInstructions: string; careSource: string },
>(windows: T[]) {
  return windows.filter(
    (w) => w.careInstructions.trim() || w.careSource.trim(),
  );
}
