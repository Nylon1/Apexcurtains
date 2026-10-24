// Shared wording for the survey, client preview and generated documents.
// Source review is recorded in docs/atelier.md. This is Apex's standard policy;
// the professional cleaner must still check the complete curtain construction.
export const standardCareTitle = "Dry clean only";
export const standardCareSummary =
  "Professional dry cleaning only. Do not machine wash, hand wash, soak, bleach or tumble dry. Ask a curtain-cleaning specialist to check the sewn-in care labels, face fabric, lining, interlining and trims before treatment. If a label conflicts with this guide, contact Apex before cleaning.";

export const careGuide = [
  {
    id: "cleaning",
    eyebrow: "CARING FOR YOUR COLLECTION",
    title: "Beautiful today. Cared for over time.",
    introduction:
      "A little thoughtful care preserves the softness, shape and quiet beauty of your curtains. These instructions accompany every curtain in your Apex collection.",
    sections: [
      { title: standardCareTitle, text: standardCareSummary },
      {
        title: "A gentle everyday routine",
        text: "Remove loose dust regularly with a clean upholstery brush on the lowest vacuum suction. Support the fabric and work gently downwards without pulling it into the nozzle. Take extra care with delicate weaves, embellishments and velvet pile; ask us if you are unsure which attachment to use.",
      },
      {
        title: "Spills, marks and accidental splashes",
        text: "Blot a fresh spill gently with a clean, dry, white cloth. Do not rub, scrub or add water, detergent, stain remover or fabric-freshener spray. Keep the area free of heat and contact a professional cleaner promptly, explaining what was spilled and the curtain's fabric and lining.",
      },
      {
        title: "Before and after a professional clean",
        text: "Arrange cleaning of a matching pair together. Photograph the hanging arrangement and label each panel by room, window and side. Ask the cleaner about removable hooks and accessories; do not dismantle sewn headings. Once fully dry and aired, have the curtains rehung and dressed. For heavy or high-level curtains, arrange assistance from Apex.",
      },
    ],
  },
  {
    id: "dressing",
    eyebrow: "THE ART OF A BEAUTIFUL FALL",
    title: "Dressing your curtains.",
    introduction:
      "Dressing simply means encouraging the fabric to follow its intended folds. Work gently, with clean, dry hands, and let the heading guide the shape.",
    sections: [
      {
        title: "01 / Find the natural folds",
        text: "Draw each curtain towards its usual resting position. Starting below the heading, arrange the folds evenly and guide them down towards the hem with an open hand. Follow the pleats already sewn into the heading. For a wave heading, keep the alternating forward and backward folds in their intended sequence.",
      },
      {
        title: "02 / Encourage, never squeeze",
        text: "For fabrics that can be loosely dressed, hold the arranged folds with broad, soft, clean fabric bands for a day or two. Leave room for the fabric to breathe and remove the bands if marks appear. Do not use string, clips, adhesive tape or tight knots. Ask Apex before banding velvet or delicate, textured or embellished fabrics.",
      },
      {
        title: "03 / Let the hem rest naturally",
        text: "Remove the bands, open and close the curtains gently, then guide the folds back into place. Do not tug the hem, stretch the cloth or add weights. Arrange a puddled finish loosely on a clean floor. Tiebacks should cradle the folds without pulling the curtain sideways or crushing the fabric.",
      },
      {
        title: "04 / Creases need patience",
        text: "Packing and handling creases may soften as the curtains hang. Avoid home steam cleaning or ironing unless Apex has confirmed a suitable method for the complete curtain. Heat and moisture can mark a face fabric or damage a lining. If creases persist, send us a photograph so we can advise.",
      },
    ],
  },
  {
    id: "living",
    eyebrow: "LIVING BEAUTIFULLY WITH YOUR CURTAINS",
    title: "Small questions, thoughtful answers.",
    introduction:
      "Curtains are made from flexible textiles, so their appearance can change with light, handling and the room around them. Here is what to watch for, and when to ask us for help.",
    sections: [
      {
        title: "Settling, changing length or an uneven hem",
        text: "Fabric can relax after hanging, and humidity or professional cleaning may affect its dimensions. If a hem changes noticeably, a panel hangs unevenly or the lining begins to show, photograph it and contact Apex. Do not trim, stretch or reposition the hooks yourself; we can check the original fitting and specification.",
      },
      {
        title: "Texture, sheen and pressure marks",
        text: "Slubs and slight variations can be part of a natural weave. Velvet and other pile fabrics can look lighter or darker as the light and pile direction change. Avoid rubbing or pressing a patch that looks different. Send a close-up and a wider photograph if you notice a new mark, snag or loose thread; do not pull the thread.",
      },
      {
        title: "Sunlight, condensation and warmth",
        text: "Protect the fabric from prolonged strong sunlight where possible, and keep it away from hot surfaces, damp glass and cleaning sprays. Ventilate the room and address condensation promptly. If you see mould or persistent damp, seek advice before cleaning; do not apply bleach to the curtain or lining.",
      },
      {
        title: "Movement, tracks and tiebacks",
        text: "Use the wand, cord, motor control or leading edge demonstrated at fitting. Release tiebacks before closing, keep the track clear and never force a snagging curtain. Some apex panels are fixed in place. If movement becomes difficult, stop and contact Apex; do not pull on the hem or apply household oil to the track.",
      },
      {
        title: "Blackout lining and edge light",
        text: "Blackout lining limits light passing through the fabric, but light may still enter around the top, sides or centre opening. If the overlap changes or a gap looks unusual, check that tiebacks are released and contact Apex for a fitting review. Do not pin, tape or glue the lining to the window.",
      },
    ],
  },
] as const;

export const careHandover =
  "Show the customer how to operate the track, release tiebacks and gently dress the folds. Explain Dry clean only, the gentle dust-removal routine, and the complete care guide in their brochure. Refer cleaning, persistent creases or changes in the hang to Apex before treatment or adjustment.";

export function additionalCareWindows<
  T extends { careInstructions: string; careSource: string },
>(windows: T[]) {
  return windows.filter(
    (w) => w.careInstructions.trim() || w.careSource.trim(),
  );
}
