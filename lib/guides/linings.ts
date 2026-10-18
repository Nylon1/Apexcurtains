import type { SpecialistGuide } from "../specialist-guide-types";

export const liningsGuide: SpecialistGuide = {
  path: "/curtain-linings",
  enhanced: true,
  title: "Curtain linings. The beauty beneath.",
  metaTitle: "Curtain Linings: Standard, Blackout, Thermal & Coloured",
  description:
    "Choose standard, blackout, thermal blackout or coloured curtain lining. Understand drape, weight, light gaps and floor-length coverage on high and shaped windows.",
  eyebrow: "The curtain collection / Linings",
  intro:
    "The lining is the quiet foundation of a beautiful curtain. It shapes the fall of the cloth, changes the light in the room and gives the reverse a considered finish. On a large architectural window, it deserves as much attention as the face fabric.",
  image: {
    src: "/window-types/triangular.jpeg",
    alt: "Green curtains tied back around steep triangular glazing, with daylight visible through the central glass",
    caption:
      "Apex installation photography · Light, cloth and coverage considered together.",
  },
  sections: [
    {
      id: "lining-options",
      title: "Four ways to finish the cloth",
      paragraphs: [
        "Start with the room. A living space may call for softly filtered daylight, while a bedroom may need stronger light control. A curtain viewed from the garden may need a carefully chosen reverse. These are different decisions, and a single lining name does not answer all of them.",
      ],
      interaction: "lining",
      table: {
        caption: "Lining choices at a glance",
        headings: ["Lining", "What it brings", "What to consider"],
        rows: [
          [
            "Standard",
            "Body, a finished reverse and support for the face fabric.",
            "Light can pass through. Privacy depends on both fabrics and the lighting on either side.",
          ],
          [
            "Blackout",
            "A barrier to light passing through the lined fabric.",
            "Perimeter gaps, joins and the curtain position still affect room darkness.",
          ],
          [
            "Thermal blackout",
            "Light control with a lining selected to help limit heat transfer at the window.",
            "Weight, bulk and the closeness of the curtain to the glazing matter.",
          ],
          [
            "Coloured",
            "A coordinated or contrasting reverse, especially noticeable when tied back.",
            "Confirm the performance of the actual sample; colour is not a blackout rating.",
          ],
        ],
      },
    },
    {
      id: "standard-lining",
      title: "Standard lining: an easy, natural drape",
      paragraphs: [
        "Standard lining helps the outer fabric sit well and gives the back of the curtain a finished appearance. It can reduce direct exposure of the face fabric to sunlight, although it cannot prevent all fading. The combination should feel balanced: a light face cloth can lose its delicacy if paired with an unnecessarily stiff lining.",
        "This can be a good starting point for sitting rooms where a soft glow is welcome. Check a sample with the face fabric against the actual window and again with room lights on after dark. Daytime privacy does not automatically mean the same privacy at night.",
      ],
    },
    {
      id: "blackout-lining",
      detailInteraction: "light-paths",
      title: "Blackout lining: understand the whole window",
      paragraphs: [
        "Blackout lining is selected to restrict light through the curtain fabric. It does not seal a room. Daylight can travel above the heading, around side edges, between panels and below the hem. On apex and gable glazing, a sloping track or a change in plane can make those paths especially noticeable.",
        "We consider the track position, projection from the wall, side returns, centre overlap and finished drop together. A lining with excellent light-blocking properties can still give a disappointing result if the curtain does not cover the opening well. Discuss early-morning sun, streetlights and how sensitive you are to light before deciding the specification.",
      ],
      diagram: {
        src: "/guides/light-gaps.svg",
        alt: "Diagram marking possible light paths above, beside, between and beneath closed curtains",
        caption:
          "Blackout cloth controls light through the fabric. The fit controls the paths around it; environmental light gaps can remain.",
      },
      links: [
        { href: "/curtain-tracks", label: "Track position and fixing" },
        { href: "/apex-curtains", label: "Planning an apex window" },
      ],
    },
    {
      id: "thermal-blackout",
      title: "Thermal blackout: comfort with substance",
      paragraphs: [
        "Thermal blackout lining is an option where light control and comfort are both priorities. The extra layer can help reduce heat exchange across a curtained window and make a large glazed room feel less exposed. The result varies with the glazing, draughts, curtain coverage and how the curtains are used; it is not a promise of a fixed temperature change or energy saving.",
        "Added substance also changes the way the curtain folds. A very tall curtain contains a large area of material, so even a small increase in weight per square metre adds up. We consider the complete made curtain, the available stacking space and the track support before settling on the lining.",
        "Interlining is a separate layer placed between face fabric and lining to add body and softness. It is not another name for blackout lining. Where considered, its extra bulk and weight need to be included in the same design decisions.",
      ],
      links: [{ href: "/curtain-fabrics", label: "Choose the face fabric" }],
    },
    {
      id: "coloured-lining",
      photo: {
        src: "/projects/cambridge-apex-curtains-cambridge.jpeg",
        alt: "Curtain folds turned into a tieback in a real Cambridge installation",
        width: 900,
        height: 1600,
        caption:
          "Cambridge / The sweep of a tieback turns the cloth and brings edges and reverse surfaces into view. Consider how your chosen lining will appear when the fabric turns.",
        href: "/gallery/cambridge-apex-curtains-cambridge",
        linkLabel: "See the real installation",
      },
      title: "Coloured lining: a beautiful reverse",
      paragraphs: [
        "A matching or complementary coloured lining can be particularly effective where the back of the curtain is visible from outside, through a side window or in the sweep of a tieback. It can give a darker curtain a more continuous appearance, or bring a quiet contrast to the folds.",
        "Choose colour from physical samples in the room. A lining can change the apparent shade of a translucent face fabric, and different light conditions can make the reverse more visible. Confirm whether the chosen coloured lining is standard, blackout or thermal blackout rather than assuming that a dark colour blocks light.",
      ],
      links: [
        { href: "/curtain-tiebacks", label: "How tiebacks reveal the reverse" },
      ],
    },
    {
      id: "quality-and-geometry",
      disclosures: [
        {
          title: "How should I compare lining samples?",
          text: "View the face fabric and lining together against the actual window, then compare them with room lights on. Look at transmitted light, the shade of the face cloth, the reverse and how the two materials bend together. A screen swatch cannot demonstrate light-blocking performance or care compatibility.",
        },
        {
          title: "Can lining be changed on an existing curtain?",
          text: "Sometimes, but assess the original construction, shaped top, heading, seams and available material first. A heavier replacement may change the drape, stack and complete load. Removing and refitting high curtains also needs planned access.",
        },
        {
          title: "What about fading and condensation?",
          text: "Lining can reduce direct sunlight exposure of the face cloth, but it does not prevent all fading. Curtains also do not resolve a damp or poorly ventilated room. Avoid trapping the hem against wet surfaces and follow ventilation and fabric-care advice for the space.",
        },
      ],
      title: "Good cloth needs good geometry",
      paragraphs: [
        "Lining quality includes its consistency, handle, stability and compatibility with the face fabric and care method. The making matters too: tension between layers, seam placement and allowances for the lining to hang independently can affect the final fall. A sample that looks beautiful in the hand still needs to work across the full curtain drop.",
        "On high windows, errors are amplified. A slight variation in the track line, an uneven floor or a lining that pulls against the face cloth can become obvious across a long hem. Final measurements must relate to the installed track and finished floor, with the intended heading and fullness already agreed.",
        "Floor-length curtains can help reduce light leakage at the bottom by bringing the hem close to the floor. A practical clearance still allows movement, and an uneven floor may leave some light visible. Puddling fabric is an aesthetic choice, not a guaranteed light seal; it also collects dust and can obstruct doors. Agree the balance of appearance, movement and light control at the measure.",
      ],
      links: [
        {
          href: "/services/premium-installation",
          label: "Fitting, dressing and aftercare",
        },
        {
          href: "/angled-window-curtains",
          label: "Unequal drops and sloping windows",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Will blackout lining make an apex bedroom completely dark?",
      answer:
        "Not necessarily. Blackout lining controls light through the cloth, but light can enter around the top, sides, centre and hem. Window geometry, track position and curtain coverage determine the overall result.",
    },
    {
      question: "Do floor-length curtains reduce light at the bottom?",
      answer:
        "They can reduce the open space beneath a curtain, but floor clearance, uneven surfaces and the way the fabric hangs can still allow light through. They do not guarantee total darkness.",
    },
    {
      question:
        "Does a coloured lining have the same performance as blackout lining?",
      answer:
        "Colour describes the appearance of the reverse. Check the chosen lining specification separately for blackout and thermal properties.",
    },
  ],
  related: [
    { href: "/curtain-headings#fullness", label: "How layers change the fold" },
    { href: "/curtain-tracks", label: "The right foundation" },
    { href: "/curtain-tiebacks", label: "The finishing touch" },
    {
      href: "/services/premium-installation",
      label: "A beautifully finished installation",
    },
  ],
};
