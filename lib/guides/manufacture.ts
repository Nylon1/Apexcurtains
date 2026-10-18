import type { SpecialistGuide } from "../specialist-guide-types";

export const manufactureGuide: SpecialistGuide = {
  path: "/services/design-make-curtains",
  enhanced: true,
  title: "Design & manufacture. Made for your architecture.",
  metaTitle: "Design + Make Curtains for Apex & Gable Windows",
  description:
    "How Apex specifies and makes shaped curtains: fabric, heading, lining, fullness, seams, unequal drops, track compatibility and preparation for installation.",
  eyebrow: "The making stage / Design + make curtains",
  intro:
    "Colour gives a room its feeling. Careful construction gives the curtain its shape. We bring the two together, designing the fabric, heading, lining and track around the surveyed window.",
  image: {
    src: "/projects/cambridge-apex-curtains-cambridge.jpeg",
    alt: "Long curtain folds drawn into a matching tieback in a completed Cambridge Apex installation",
    caption:
      "Cambridge / Real Apex installation. The finished folds are the visible result of decisions made before cutting.",
  },
  sections: [
    {
      id: "design-direction",
      title: "Start with the interior, then resolve the detail",
      paragraphs: [
        "We consider the whole scheme: wall and floor tones, window frames, furniture, natural light and the atmosphere you want. A quiet neutral can reveal the texture of a fold; a deeper colour can give the gable a more dramatic outline. Curtains can soften hard architectural surfaces while keeping the window as the focus.",
        "The curtain also has a job to do. We agree privacy, light control, opening positions, the view when gathered and the desired floor finish. The design should make sense in everyday use as well as in a finished photograph.",
      ],
      links: [
        {
          href: "/curtain-colours-and-tones",
          label: "Colour, light and interiors",
        },
        { href: "/room-visualiser", label: "Try Oslo colours in a room" },
        {
          href: "/services/measure-consultation",
          label: "What the survey establishes",
        },
      ],
    },
    {
      id: "construction-layers",
      title: "Specify the complete curtain",
      paragraphs: [
        "Face fabric, lining and any additional layer work as one construction. Consider handle, drape, stability, care requirements and the total finished weight. A soft face cloth can behave differently once paired with a firmer lining; a deep fold becomes bulkier when layers gather together.",
        "Choose between standard, blackout, thermal blackout and coloured lining according to the room and the actual sample specification. Optional interlining is a separate construction decision for body and softness. It must be assessed rather than added automatically.",
      ],
      detailInteraction: "curtain-layers",
      links: [
        { href: "/curtain-linings", label: "Compare lining options" },
        { href: "/curtain-fabrics", label: "Choose fabric for a tall drop" },
      ],
    },
    {
      id: "heading-and-fullness",
      title: "Build the rhythm of the folds",
      paragraphs: [
        "Pencil pleat creates narrow gathers through a corded tape. Double pinch pleat forms sewn groups of paired folds. Wave relies on a coordinated heading and carrier arrangement for its alternating curves; a single pleat provides another tailored direction to discuss. These constructions need different making allowances and hardware choices.",
        "Fullness describes how much flat cloth is arranged into the covered width. It affects the appearance, gathered bulk and weight. There is no single ratio that suits every fabric, heading or apex geometry. We plan the pleat spacing, hook position and finished width alongside the route of the track.",
        "The heading should be seen in proportion to the drop. At a very tall window, small details are viewed from the floor and long folds dominate. A more substantial heading is not automatically a better choice: the cloth and architecture still lead the decision.",
      ],
      links: [
        {
          href: "/curtain-headings",
          label: "Explore headings with diagrams and real projects",
        },
        { href: "/curtain-tracks", label: "Match the heading to the track" },
      ],
    },
    {
      id: "cutting-and-joins",
      title: "A shaped top needs a deliberate cutting plan",
      paragraphs: [
        "An apex panel has changing drops along its upper edge. We work from the agreed geometry and reference points, allowing for the heading and hems. Left and right sides may differ; mirroring one side without checking the other can introduce an error across the whole top line.",
        "Fabric width limits the size of a single piece. Where widths are joined, seam positions should be considered in relation to the folds, opening edges and the room’s viewing position. Patterned cloth also brings repeat and matching requirements, which can affect material use even if the finished curtain width stays the same.",
        "Railroading means using a fabric across its width in a different orientation to its usual lengthwise direction. It is only appropriate when the fabric’s usable width, construction, finish and any pattern allow it. Rotating a cloth may alter its drape or appearance; it is not a universal way to remove joins on tall curtains.",
      ],
      diagram: {
        src: "/guides/curtain-making.svg",
        alt: "Two separate shaped curtain panels with unequal sloping tops, marked seam lines and hem allowances",
        caption:
          "Construction planning only. Shape, join positions and allowances come from the actual specification; the drawing is not a cutting template.",
      },
      links: [
        {
          href: "/curtain-fabrics",
          label: "Fabric width, repeats, joins and drape",
        },
        {
          href: "/advice/buying-apex-curtains-online",
          label: "Why alterations may be limited after manufacture",
        },
      ],
    },
    {
      id: "specification-before-cutting",
      title: "What needs to be agreed before cutting",
      paragraphs: [
        "Manufacture commits decisions to cloth. The agreed specification should connect what you see in the room with what the workroom needs to make, and what the fitter needs to install.",
      ],
      table: {
        caption: "The decisions that travel from survey to manufacture",
        headings: ["Decision", "What it controls"],
        rows: [
          [
            "Geometry and finished floor",
            "Shaped upper line, individual drops and the hem relationship.",
          ],
          [
            "Fabric and direction",
            "Colour, drape, usable width, joins and pattern placement.",
          ],
          [
            "Heading and fullness",
            "Finished width, fold rhythm, hooks and gathered volume.",
          ],
          [
            "Lining and extra layers",
            "Body, light control, total weight and care needs.",
          ],
          [
            "Track and opening method",
            "Carrier compatibility, retained sections and stack positions.",
          ],
          [
            "Tiebacks and finish",
            "Sweep, length, attachment positions and the visible reverse.",
          ],
        ],
      },
      disclosures: [
        {
          title: "What if the room changes after approval?",
          text: "Tell Apex before work proceeds. New flooring, a revised track line or changed door clearance may require a specification review. The ability to alter a curtain depends on how far manufacture has progressed and the material available.",
        },
        {
          title: "Can an existing curtain simply be cut into an apex?",
          text: "It depends on the cloth available, the original heading and lining, and the required finished shape. Cutting changes the usable dimensions and may leave insufficient material for a sound heading or matching drops. An assessment is needed before promising a conversion.",
        },
        {
          title: "Will all seams disappear into the folds?",
          text: "Seams can be planned thoughtfully, but visibility changes with fabric thickness, fullness, lighting and curtain position. Discuss the seam arrangement before manufacture rather than assuming every join will be invisible.",
        },
      ],
    },
    {
      id: "finishing-and-fitting",
      title: "The workroom finish meets the room",
      paragraphs: [
        "Making includes the heading construction, joined widths where required, the shaped top, hems and the lining arrangement. The layers need to sit together without pulling the face fabric out of shape. The finished panels are checked against the agreed specification and prepared for installation.",
        "The final appearance is established on site. Hanging, checking hook levels and clearances, arranging the layers and dressing the folds help the curtain settle into the room. Any steaming follows the fabric and lining care guidance; it is not suitable for every construction.",
        "Lead times depend on the chosen cloth, availability, specification and installation arrangements. Confirm the programme for your project, especially where building work or a high-level access plan is involved.",
      ],
      photo: {
        src: "/projects/wave-pleat-apex-curtains-milton-keynes.jpeg",
        alt: "Neutral wave curtains following a tall apex in a completed Milton Keynes bedroom",
        width: 899,
        height: 1599,
        caption:
          "Milton Keynes / Real Apex installation. The repeated wave folds create a calm frame around the roofline.",
        href: "/gallery/wave-pleat-apex-curtains-milton-keynes",
        linkLabel: "Explore the wave curtain project",
      },
      links: [
        {
          href: "/services/premium-installation",
          label: "Next: installation, dressing and care",
        },
        {
          href: "/curtain-accessories",
          label: "Complete the finishing details",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Are shaped curtains made from a standard rectangular pattern?",
      answer:
        "The final construction must reflect the measured upper line, changing drops, heading and intended opening arrangement. A standard width and maximum drop do not fully define an apex curtain.",
    },
    {
      question: "Can I choose any fabric for very tall curtains?",
      answer:
        "Suitability depends on drape, weight, stability, fabric width, seams, pattern and the intended heading and lining. A physical sample helps with colour and handle but cannot show the behaviour of the complete tall curtain.",
    },
    {
      question: "Is interlining the same as blackout lining?",
      answer:
        "No. Interlining is an additional layer considered for body and softness. Blackout lining is selected for controlling light through the cloth. Extra layers affect bulk, weight and care, so they are specified deliberately.",
    },
    {
      question: "Can the curtain heading be changed after making?",
      answer:
        "Sometimes, but the existing material allowance, shaped top, finished width and drop can limit the alteration. Do not assume a change of tape or hooks will convert a curtain successfully.",
    },
  ],
  related: [
    {
      href: "/professionals/interior-designers#design-schedule",
      label: "Prepare a professional curtain schedule",
    },
    { href: "/curtain-headings", label: "Choose the rhythm of the folds" },
    { href: "/curtain-linings", label: "Consider the layers" },
    {
      href: "/services/premium-installation",
      label: "See the final fitting stage",
    },
  ],
};
