export type WindowStory = {
  path: string;
  title: string;
  intro: string;
  image: string;
  alt: string;
  caption: string;
  detailImage: string;
  detailAlt: string;
  detailCaption: string;
  moodTitle: string;
  mood: string;
  tones: { name: string; colour: string }[];
  technicalTitle: string;
  technical: string;
  evidenceImage: string;
  evidenceAlt: string;
  evidenceTitle: string;
  evidenceText: string;
  projectHref: string;
};

export const windowStories: Record<string, WindowStory> = {
  apex: {
    path: "/apex-curtains",
    title: "Apex curtains. Softness on a grand scale.",
    intro:
      "Made-to-measure curtains for apex windows, surveyed, designed and professionally installed across the UK. Beautiful cloth and a carefully shaped curtain line bring the whole room into balance.",
    image: "/window-types/apex-hero.jpg",
    alt: "Full-length pale curtains arranged along two slopes of an apex window",
    caption: "Warm ivory, generous folds and a quiet line along the ceiling.",
    detailImage: "/window-types/gable-end.jpeg",
    detailAlt: "Close view of pale curtain folds and a matching tieback",
    detailCaption:
      "Matching tiebacks allow the folds and the window shape to remain the focus.",
    moodTitle: "Let the architecture breathe.",
    mood: "Soft neutrals bring warmth to a tall glazed room without overwhelming the roofline. Here, pale cloth sits beside a restrained wall colour, while the folds catch light and shadow. A matching tieback keeps the composition calm; a more contrasting cloth would give the window a stronger outline.",
    tones: [
      { name: "Warm ivory", colour: "#d8d0be" },
      { name: "Limestone", colour: "#b6b4a5" },
      { name: "Deep ink", colour: "#273936" },
    ],
    technicalTitle: "Made around the peak.",
    technical:
      "An apex needs more than one width and one drop. We measure the slopes, side heights, peak position and finished floor, then plan how the panels meet, hang and gather. The track follows the agreed route where the structure permits, with the fabric and lining selected for the complete installation.",
    evidenceImage: "/projects/wave-pleat-apex-curtains-milton-keynes.jpeg",
    evidenceAlt:
      "Apex curtain installation from the existing Milton Keynes photography collection",
    evidenceTitle: "A contemporary take on the apex.",
    evidenceText:
      "The Milton Keynes project records wave pleat curtains, blackout lining and a bespoke track for an apex master bedroom. Its project page brings those recorded choices together with the installation photograph.",
    projectHref: "/gallery/wave-pleat-apex-curtains-milton-keynes",
  },
  triangular: {
    path: "/triangular-window-curtains",
    title: "Triangular curtains. Framing the light.",
    intro:
      "Made-to-measure curtains for triangular windows, planned around the peak, side drops and how the panels open. From survey to professional installation, we bring softness, privacy and a sense of proportion to the glazing.",
    image: "/window-types/triangular.jpeg",
    alt: "Olive green curtains with matching tiebacks framing steep triangular glazing and a garden view",
    caption:
      "Olive cloth echoes the garden, with darker folds giving the frame depth.",
    detailImage: "/window-types/triangular.jpeg",
    detailAlt:
      "Green tiebacks drawing triangular curtains away from the central view",
    detailCaption:
      "The gathered curtain reveals the centre while cloth remains along the upper slopes.",
    moodTitle: "Bring the landscape inside.",
    mood: "An olive tone sits naturally beside a view of trees and grass. In this installation the darker folds add depth, while the pale walls keep the room light. The matching tiebacks create a gentle rhythm across the glass. Colour is only part of the result: the way the fabric drapes determines how relaxed or tailored the room feels.",
    tones: [
      { name: "Olive", colour: "#6a7152" },
      { name: "Chalk", colour: "#e1dfd1" },
      { name: "Warm stone", colour: "#b3ad9b" },
    ],
    technicalTitle: "A sharp angle. A thoughtful solution.",
    technical:
      "Triangular glazing often leaves little space at the peak and a much shorter drop at the sides. Panel shapes, heading depth and retention along the slope must work together. Tiebacks can reveal the view while leaving a fabric frame at the top; full glass clearance should never be assumed.",
    evidenceImage:
      "/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg",
    evidenceAlt:
      "Apex installation showing curtains fitted to triangular glazing",
    evidenceTitle: "A bedroom, considered in detail.",
    evidenceText:
      "The Peterborough case study records triangular bedroom glazing, pencil pleat curtains and a blackout lining. Read it alongside the lining guide to understand why fabric performance and perimeter light gaps are separate considerations.",
    projectHref: "/gallery/peterborough-bedroom-blackout-curtains-peterborough",
  },
  gable: {
    path: "/gable-end-curtains",
    title: "Gable-end curtains. A room in balance.",
    intro:
      "Made-to-measure gable-end curtains for tall glazing and double-height rooms. We plan the fabric, track, fixing structure and high-level installation together, so a generous space feels balanced and inviting.",
    image: "/window-types/gable-end.jpeg",
    alt: "Pale curtains and matching tiebacks framing tall gable-end glazing",
    caption:
      "A warm neutral palette lets the vertical folds become the detail.",
    detailImage: "/window-types/apex-hero.jpg",
    detailAlt:
      "Multiple curtain panels arranged across a wide glazed gable wall",
    detailCaption:
      "Several panels can create a rhythm across a broad glazed wall.",
    moodTitle: "Make a generous room feel inviting.",
    mood: "Large areas of glass can feel visually cool. Cloth introduces texture and a softer boundary to the room. A warm ivory or oat tone sits easily with natural timber and stone; deeper colours create a more enveloping effect. Consider the curtain in evening light as well as daylight, when the view beyond the glass changes.",
    tones: [
      { name: "Oat", colour: "#c7b99f" },
      { name: "Soft ivory", colour: "#e4dfd2" },
      { name: "Charcoal", colour: "#414740" },
    ],
    technicalTitle: "Scale changes the specification.",
    technical:
      "A high or wide gable can contain a substantial area of curtain fabric. Lining, fullness and gathering positions affect the load and the space needed for the open curtains. Fixing structure and safe access are planned early, including whether a MiTOWER or another access method suits the room.",
    evidenceImage: "/projects/cambridge-apex-curtains-cambridge.jpeg",
    evidenceAlt: "Tall architectural glazing dressed with neutral curtains",
    evidenceTitle: "Tailored folds for a bedroom.",
    evidenceText:
      "The Cambridge Apex Curtains case study records a gable-end bedroom scheme with pinch pleat curtains and blackout lining. Explore the project for its specification and the installation guide for the planning behind high-level fitting.",
    projectHref: "/gallery/cambridge-apex-curtains-cambridge",
  },
};
