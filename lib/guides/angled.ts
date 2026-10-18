import type { SpecialistGuide } from "../specialist-guide-types";

export const angledGuide: SpecialistGuide = {
  path: "/angled-window-curtains",
  title: "Angled windows. A softer line.",
  metaTitle: "Angled Window Curtains & Curtains for Sloping Ceilings",
  description:
    "Made-to-measure curtains for single slopes, asymmetric windows and sloping ceilings. Plan unequal drops, track retention, stacking, light control and safe fitting.",
  eyebrow: "Architectural windows / Angled glazing",
  intro:
    "A single slope, an off-centre peak or a window tucked beneath the roof. Curtains can bring softness to these distinctive spaces when every drop and fold is designed around the geometry.",
  image: {
    src: "/window-types/gable-end.jpeg",
    alt: "Soft ivory curtains following an angled ceiling, gathered to frame tall glazing",
    caption:
      "Warm neutral cloth against a pale interior · The folds soften the strong line of the glazing.",
  },
  sections: [
    {
      id: "understand-the-shape",
      title: "Begin with the line of the room",
      paragraphs: [
        "An angled window does not always form a symmetrical triangle. It may have one sloping top, unequal side heights, an off-centre peak or a rectangular lower section beneath a rake. The ceiling may also slope differently from the window itself. These details determine where a track can sit and how each curtain panel will fall.",
        "An apex is the meeting point of two slopes; triangular describes the shape of the glazing; gable-end describes the building elevation. A single installation can fit more than one description. What matters for making is the measured geometry, not the label.",
      ],
      diagram: {
        src: "/guides/window-shapes.svg",
        alt: "Comparison of symmetrical apex, single-slope and off-centre apex window outlines, with unequal side heights marked",
        caption:
          "Three different geometries. Each needs its own track route and curtain drops; the sketches are not measuring templates.",
      },
      links: [
        { href: "/apex-curtains", label: "Symmetrical apex windows" },
        { href: "/triangular-window-curtains", label: "Triangular glazing" },
        { href: "/gable-end-curtains", label: "Gable-end spaces" },
      ],
    },
    {
      id: "track-route",
      title: "Follow the slope, or establish a new line",
      paragraphs: [
        "A shaped track can follow the architecture where the fixing surface and curtain arrangement allow it. This keeps the top of the curtain close to the slope and can give the room a continuous, tailored finish. At changes of angle, the track geometry and carriers need specialist planning.",
        "A horizontal track below the slope may be practical in some rooms, but it leaves upper glazing outside the curtain coverage. That may suit a living room where daylight is welcome; it may not meet a bedroom’s privacy or light-control brief. Neither approach should be chosen from a photograph alone.",
        "The track also needs enough projection for the heading and folds to clear handles, sills and the wall. We consider structural backing, weight and access alongside the visual route. A sloping ceiling finish is not itself evidence of a suitable fixing point.",
      ],
      links: [
        {
          href: "/curtain-tracks",
          label: "Aluminium tracks, fixing and loads",
        },
      ],
    },
    {
      id: "opening-and-stacking",
      title: "Design the open curtain as carefully as the closed one",
      paragraphs: [
        "Gravity affects curtain carriers on an incline. A bespoke arrangement may retain selected sections along the slope, with the lower fabric gathered into tiebacks. It should not be assumed that the whole curtain will glide freely up and down like one on a horizontal rail.",
        "The open position changes the view. Cloth may remain across the upper corners, and a full curtain needs space when gathered. We plan where each panel rests, what glass remains visible and how the curtain can be handled from the floor. A door opening under the slope also needs clear passage when the curtains are open.",
        "For an asymmetric window, two equal-looking stacks may require different panel shapes. The balance comes from the finished view across the room, not necessarily from identical pieces of cloth.",
      ],
      links: [
        {
          href: "/curtain-tiebacks#window-coverage",
          label: "Explore the change in window coverage",
        },
      ],
    },
    {
      id: "fabric-and-light",
      title: "Let texture soften the angle",
      paragraphs: [
        "A matte neutral can sit quietly beside pale walls, letting the folds become the detail. A deeper olive or blue gives the window a stronger outline, while a subtle weave adds interest without competing with a complex shape. View samples vertically and at different times of day: a fabric’s tone and sheen can change across the slope and folds.",
        "Heading and fullness need to work with the track route. More fabric gives a fuller appearance but also adds weight and gathering space. Lining contributes to that volume as well as the light performance, so these choices belong in the same conversation.",
        "For bedrooms, blackout or thermal blackout lining can reduce light through the cloth. Light can still enter at the top, sides, joins and hem. Floor-length curtains can reduce the bottom opening, but uneven floors and practical clearance can leave light visible. The design should address those paths without promising a fully sealed room.",
      ],
      links: [
        { href: "/curtain-fabrics", label: "Texture, pattern and drape" },
        { href: "/curtain-linings", label: "Lining and light control" },
        { href: "/curtain-headings", label: "Choosing the folds" },
      ],
    },
    {
      id: "measuring-and-fitting",
      title: "From a photograph to a precise fit",
      paragraphs: [
        "For an initial conversation, send a photograph taken square to the window and a wider view showing the ceiling, floor and adjacent walls. Rough width and high and low side heights help explain the scale. Include doors, radiators, beams and furniture that might affect the curtain or access.",
        "Final making dimensions require a proper survey: the true slope, changes in plane, track position, varying drops, floor level and fixing structure must agree. Avoid climbing to a peak to obtain a preliminary measurement. For very high rooms, installation access is part of the design brief, including whether a MiTOWER or another suitable method can be accommodated.",
        "The finished fitting includes dressing the cloth and demonstrating the agreed movement and tieback positions. That handover matters especially on an angled system, where pulling a retained section can strain the heading or fixings.",
      ],
      links: [
        {
          href: "/services/measure-consultation",
          label: "Arrange a measured consultation",
        },
        {
          href: "/services/premium-installation",
          label: "Installation day and high-level access",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Can curtains fit a window with only one sloping side?",
      answer:
        "Yes, a bespoke scheme can be planned for a single slope. The track route, unequal curtain drops, fixing structure and opening arrangement need to be considered together.",
    },
    {
      question: "Will curtains slide normally on an angled track?",
      answer:
        "Do not assume that they will. Gravity affects carriers on a slope, and some designs use retained sections and tiebacks. The intended movement should be agreed before manufacture.",
    },
    {
      question: "Do I need different-length curtains on an asymmetric window?",
      answer:
        "The panels must follow the measured geometry and intended track. Different drops and panel shapes may be needed even when the finished scheme looks balanced.",
    },
  ],
  related: [
    { href: "/curtain-tracks", label: "A track for the slope" },
    { href: "/curtain-tiebacks", label: "Make space for the view" },
    { href: "/gallery", label: "Explore completed interiors" },
  ],
};
