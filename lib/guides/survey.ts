import type { SpecialistGuide } from "../specialist-guide-types";

export const surveyGuide: SpecialistGuide = {
  path: "/services/measure-consultation",
  enhanced: true,
  title: "Survey & consultation. See the whole room.",
  metaTitle: "Measure + Consultation for Apex & Shaped Curtains",
  description:
    "What a specialist curtain survey establishes: apex geometry, finished drops, track routes, fixing surfaces, stack-back, room design and safe access.",
  eyebrow: "The first stage / Measure + consultation",
  intro:
    "A beautiful result starts before a fabric is cut. We bring the window, the room and the practical details into one conversation, so the curtains are designed around the way you want to live.",
  image: {
    src: "/projects/pinch-pleat-curtains-oxford-oxford.jpeg",
    alt: "A real Oxford gable room with shaped curtains, broad glazing and matching tiebacks",
    caption:
      "Oxford / A completed Apex installation. The view, the floor and the shaped top line all belong in the survey.",
  },
  sections: [
    {
      id: "your-room",
      title: "First, tell us what the room needs",
      paragraphs: [
        "A consultation starts with your priorities: the view you want to keep, privacy after dark, early morning light, the softness of the room and how you expect to open the curtains. A gable bedroom and a double-height living space may have similar glazing but need different curtain arrangements.",
        "Photographs and rough dimensions help us understand the enquiry. Include the whole wall, both sides and the floor around the window. Images can suggest a direction; they cannot establish concealed structure or replace the final site measurements used for manufacture.",
      ],
      detailInteraction: "survey-checklist",
      links: [
        { href: "/start-designing", label: "Tell us about your window" },
        {
          href: "/curtain-colours-and-tones",
          label: "Find a colour direction",
        },
      ],
    },
    {
      id: "geometry",
      title: "Measure the curtain route, not only the glass",
      paragraphs: [
        "The visible glazing and the intended curtain line are different boundaries. We consider where the track can be supported, how far it sits from the glass and where the heading and finished hem will fall. The measurement reference needs to be clear before dimensions can be used for making.",
        "For an apex, we record the peak and the individual slopes, side heights and relevant widths. We do not assume that the peak is centred or that both sides are symmetrical. An uneven ceiling, off-centre roofline or changing floor level can affect the shape of the curtain.",
        "A few millimetres at one point may change the alignment elsewhere on a sloping installation. The survey, heading choice and track detail therefore work together. A width and a maximum height alone do not describe a shaped curtain.",
      ],
      diagram: {
        src: "/guides/survey-geometry.svg",
        alt: "An asymmetric gable diagram identifying the peak, separate left and right slopes, fixing route, different drops and finished floor",
        caption:
          "Survey principles only. Record both sides independently; this is not a template for ordering curtains.",
      },
      links: [
        {
          href: "/advice/how-to-measure-for-apex-curtains",
          label: "What to measure for an initial enquiry",
        },
        {
          href: "/angled-window-curtains",
          label: "How angled arrangements differ",
        },
      ],
    },
    {
      id: "structure-access",
      title: "Find the support behind the finish",
      paragraphs: [
        "The chosen track line must relate to a suitable fixing surface. We ask what is known about the wall or ceiling, look at the available fixing positions and discuss drawings or building information where needed. A neat plaster finish does not tell us what is behind it.",
        "For new builds and renovations, it helps to involve Apex before final boarding and decoration. Backing provision, recess depth and space for the heading can be considered while changes are still practical. Where the structure is uncertain, the builder or an appropriate specialist may need to confirm the connection before the design can proceed.",
        "The survey also considers how the installation team will reach the work: entrance and carrying routes, floor space, furniture, stairs, ceiling obstructions and the position of fragile glazing. A very high peak is an access-planning question as well as a measurement.",
      ],
      links: [
        {
          href: "/curtain-tracks#structure-and-brackets",
          label: "Fixings, brackets and structure",
        },
        {
          href: "/services/premium-installation#mitower-access",
          label: "MiTOWER and high-level access",
        },
        {
          href: "/professionals",
          label: "Planning with your architect or builder",
        },
      ],
    },
    {
      id: "opening-and-clearance",
      title: "Agree the open view as well as the closed curtain",
      paragraphs: [
        "We establish which panels will move, which upper sections may remain retained and where the cloth will collect. On some shaped windows, tying back opens the lower view while fabric remains along the upper slopes. A wide clear pane in a drawing is not a promise of completely clear glass once fabric is added.",
        "Handles, inward-opening doors, radiators, beams and furniture all influence projection and stack-back. We consider how you will reach the operating position from the floor and whether the intended curtain arrangement allows the room to function comfortably.",
      ],
      table: {
        caption: "Questions to resolve before manufacture",
        headings: ["Room detail", "Why it matters"],
        rows: [
          [
            "Doors and handles",
            "Allow the folds and moving panels to clear everyday access.",
          ],
          [
            "Curtain stack",
            "Agree where the gathered fabric will sit and what glass stays covered.",
          ],
          [
            "Finished floor",
            "Set the drop from the final floor level, including any flooring still to be fitted.",
          ],
          [
            "Light at the perimeter",
            "Consider top, side, centre and bottom gaps rather than relying on a lining name.",
          ],
          [
            "Future maintenance",
            "Plan access to high hooks, carriers and retained sections.",
          ],
        ],
      },
      links: [
        {
          href: "/curtain-headings#tracks-and-space",
          label: "Compare fold depth and stack-back",
        },
        {
          href: "/curtain-tiebacks",
          label: "See how tiebacks change coverage",
        },
        {
          href: "/curtain-linings#blackout-lining",
          label: "Discuss blackout expectations",
        },
      ],
    },
    {
      id: "samples-and-proportion",
      title: "Look at the cloth where it will live",
      paragraphs: [
        "Review physical fabric and lining samples alongside wall paint, flooring, upholstery and window frames. Check daylight and evening lighting. A small sample is useful for colour and touch, but it cannot reproduce the weight, joins or long folds of a full-height curtain.",
        "Pencil, double pinch, wave and a tailored single pleat bring different structure to the top edge. We discuss the heading alongside the selected track, fabric and lining, not as a separate decorative choice. The room visualiser can help explore colour, while the final specification comes from the actual materials and measured installation.",
      ],
      photo: {
        src: "/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg",
        alt: "Peterborough bedroom with deep blue pencil pleat curtains and timber-framed shaped glazing",
        width: 1200,
        height: 1600,
        caption:
          "Peterborough / Real Apex installation. Deep blue cloth changes the character of the room and frames the timber glazing.",
        href: "/gallery/peterborough-bedroom-blackout-curtains-peterborough",
        linkLabel: "See the real bedroom project",
      },
      links: [
        {
          href: "/curtain-fabrics",
          label: "Fabric selection for very tall curtains",
        },
        { href: "/curtain-headings", label: "Compare heading construction" },
        { href: "/room-visualiser", label: "Explore a room palette" },
      ],
    },
    {
      id: "after-the-survey",
      title: "A clear next step, with the assumptions resolved",
      paragraphs: [
        "The survey informs the recommendation and quotation: curtain arrangement, fabric and lining, heading, track finish, fixing approach and installation access. Clarify what is included, any outstanding building work and decisions still to be confirmed before manufacture.",
        "Tell us if flooring, ceiling work, doors or furniture positions change afterwards. Those changes may affect the curtain drop, the available clearance or the access plan. Timing, appointments and any survey charges should be confirmed for your project rather than assumed from a general guide.",
      ],
      links: [
        {
          href: "/services/design-make-curtains",
          label: "Next: design and manufacture",
        },
        {
          href: "/advice/buying-apex-curtains-online",
          label: "Why shaped measurements need care",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Can Apex quote from photographs and rough dimensions?",
      answer:
        "Photographs and approximate dimensions can help start the discussion. A final shaped-curtain specification needs the relevant geometry, support, track and access details confirmed; an image alone cannot establish those.",
    },
    {
      question: "Should the floor be finished before measuring?",
      answer:
        "The finished floor level must be known when the curtain drop is specified. Tell Apex about any flooring still to be fitted and agree whether a final check is needed after that work.",
    },
    {
      question: "Can the survey guarantee what is behind plasterboard?",
      answer:
        "A visual inspection cannot confirm every concealed detail. Drawings, information from the builder or further investigation may be needed before the fixing arrangement is agreed.",
    },
    {
      question: "Do you only survey apex windows?",
      answer:
        "Apex also considers triangular, angled, gable-end, unusually tall and large feature windows. Bay, patio and other arrangements can be discussed in the context of the room and service requirements.",
    },
  ],
  related: [
    {
      href: "/services/design-make-curtains",
      label: "Turn the survey into a specification",
    },
    {
      href: "/curtain-tracks#structure-and-brackets",
      label: "Resolve the support",
    },
    { href: "/services/premium-installation", label: "Plan the installation" },
  ],
};
