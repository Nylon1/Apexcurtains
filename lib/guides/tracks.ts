import type { SpecialistGuide } from "../specialist-guide-types";

export const tracksGuide: SpecialistGuide = {
  path: "/curtain-tracks",
  enhanced: true,
  title: "Curtain tracks. Quietly architectural.",
  metaTitle: "Aluminium Curtain Tracks for Apex Windows: Forest KS & CS",
  description:
    "Apex’s aluminium curtain tracks in standard white or optional black. Compare Forest KS and CS, curtain loads, wall and ceiling fixing, and apex or gable layouts.",
  eyebrow: "The curtain collection / Tracks",
  intro:
    "A well-chosen track lets the curtain take centre stage. For an angled ceiling or a generous wall of glass, its route, support and operation are designed as carefully as the fabric that hangs beneath it.",
  image: {
    src: "/window-types/gable-end.jpeg",
    alt: "Pale curtains suspended along a sloping track above tall gable glazing",
    caption:
      "Apex installation photography · A track line shaped around the room. The photograph does not identify a Forest model.",
  },
  sections: [
    {
      id: "aluminium-and-finish",
      detailInteraction: "track-finish",
      title: "Aluminium, with a considered finish",
      paragraphs: [
        "Apex supplies aluminium curtain tracks, including Forest KS and Forest CS. White is our normal finish: it sits quietly against many ceilings and pale walls. Black is an optional upgrade for a stronger line, darker joinery or a deliberate contrast. The finish and any upgrade cost are agreed in the project quotation.",
        "The track is only one part of the system. Brackets, carriers, end stops, the heading and the fixing surface all contribute to the finished result. We select these around the room and curtain specification, rather than choosing a track by colour alone.",
      ],
    },
    {
      id: "ks-versus-cs",
      title: "Forest KS or Forest CS?",
      paragraphs: [
        "Both are manually operated aluminium systems. KS suits lighter to medium curtains and a compact visual line; CS provides a heavier-duty option for more substantial curtains and demanding use. Forest documents both wall and ceiling mounting. The figures below refer to the standard KS and CS profiles, not other variants.",
      ],
      table: {
        caption: "Standard Forest KS and CS — manufacturer specifications",
        headings: ["Detail", "Forest KS", "Forest CS"],
        rows: [
          [
            "Typical use",
            "Light to medium curtains in homes and commercial interiors",
            "Medium to heavy curtains; residential and contract settings",
          ],
          ["Profile", "20 mm wide × 14 mm high", "20 mm wide × 20 mm high"],
          [
            "Published maximum fabric load",
            "8 kg per metre",
            "15 kg per metre",
          ],
          ["Documented bending radius", "10 cm", "20 cm"],
          ["Operation", "Hand drawn", "Hand drawn"],
          [
            "Apex finish offering",
            "White; black optional upgrade",
            "White; black optional upgrade",
          ],
        ],
      },
      links: [
        {
          href: "https://forestgroup.com/user_files/download_files/download_2502_FOREST_KS_NEW_EN_150926_WEB.pdf",
          label: "Forest KS technical brochure (PDF)",
        },
        {
          href: "https://forestgroup.com/user_files/download_files/download_2452_FOREST_CS_EN_270726_WEB.pdf",
          label: "Forest CS technical brochure (PDF)",
        },
      ],
    },
    {
      id: "curtain-weight",
      title: "Think beyond the weight of the fabric",
      paragraphs: [
        "A long drop can contain considerably more cloth than its window width suggests. Fullness, lining, interlining and the heading all contribute to the finished curtain weight. We need the complete specification before assessing the track, carriers and support.",
        "A manufacturer’s kilogram-per-metre figure is not permission to hang that load from any ceiling or sloping rail. Fixing strength, bracket projection, spacing, bends, joins and local concentrations of weight all matter. When curtains gather at one side, the load is concentrated over a shorter part of the track. Opening and closing also applies forces to the installation.",
        "Choosing CS solely because its published rating is higher does not resolve a weak substrate. A sound support strategy comes first. Where a large gable installation needs structural backing or coordination with the builder, that detail should be resolved before plastering or final decoration.",
      ],
      links: [
        {
          href: "/curtain-linings",
          label: "How lining changes weight and drape",
        },
        {
          href: "/professionals/specifier-resources",
          label: "Resources for the design team",
        },
      ],
    },
    {
      id: "fixing-methods",
      title: "Wall or ceiling: give the folds room",
      paragraphs: [
        "Ceiling fixing can bring the heading close to the architecture, provided there is suitable structure above. Wall brackets project the track away from the wall to clear handles, sills and the depth of the curtain folds. The right projection needs to accommodate the heading without leaving an unnecessary light path behind the curtain.",
        "Forest’s current brochures show Smart Klick ceiling brackets and wall bracket options. The KS mounting page gives 60 cm bracket intervals; the CS page gives 60 cm for ceiling brackets and 50–60 cm for the illustrated aluminium wall brackets, depending on fabric weight. These are manufacturer reference details, not a universal fixing schedule for every apex installation. The specific bracket, load and substrate still need assessment.",
        "Plasterboard, masonry, timber and steel require different fixing decisions. A screw into a decorative finish is not evidence of structural support. We establish where the load will go, plan support near changes of direction and check the assembled track before hanging the curtains.",
      ],
      diagram: {
        src: "/guides/track-fixing.svg",
        alt: "Concept drawing comparing a track mounted to ceiling structure with a track on a wall bracket, showing the clearance needed for curtain folds",
        caption:
          "Fixing concepts, not installation instructions. Brackets and fasteners must be selected for the actual substrate and load.",
      },
    },
    {
      id: "structure-and-brackets",
      detailInteraction: "fixings",
      disclosures: [
        {
          title: "What information helps on a renovation or new build?",
          text: "Share the proposed curtain line, relevant wall or roof construction drawings and any planned backing before the surfaces are closed. The builder needs the intended position and load requirements; the curtain supplier needs confirmation of the support actually provided. Photographing backing before boarding can help record its location.",
        },
        {
          title: "Can the window frame be left untouched?",
          text: "Wall or ceiling support may allow the track to be independent of the frame, where suitable structure and clearance are available. This needs assessment rather than a blanket promise. Do not assume that drilling a glazing frame is acceptable; any proposed connection must respect the frame system and the agreed installation detail.",
        },
        {
          title: "Why does the stack position matter to the fixings?",
          text: "When a travelling curtain gathers, its mass occupies a shorter section of rail. The supporting arrangement must consider that concentration as well as the distributed closed position and the forces of operation. The published track rating alone does not assess the wall or ceiling.",
        },
      ],
      title: "Fixings, brackets and the structure behind the finish",
      paragraphs: [
        "A wall or ceiling can look perfectly sound without offering the support a heavy curtain needs. We assess the substrate, the condition of the fixing area and the forces created by the selected bracket. A longer projection increases leverage on the fixing; a curtain gathered into a small stack concentrates weight at that end.",
        "At a vaulted ceiling, the visible plasterboard may sit below battens, insulation or a service void. The desired track line does not necessarily coincide with a joist. A survey may identify the need for timber backing, an alternative bracket position or a detail agreed with the builder. We check clearance at the roof slope for the bracket, screwdriver access, heading and folds before manufacture.",
        "Bracket spacing follows the supplied track and bracket instructions, adjusted for the actual design and support. Bends, joins, ends and stack positions need particular attention. Adding more fixings into the same weak material does not create a sound structural connection. Where the load path or existing construction is uncertain, Apex may need drawings, a builder’s assessment or structural advice before confirming the installation.",
      ],
      table: {
        caption:
          "What needs to be established at survey — not a fastener selection guide",
        headings: ["Substrate", "The installation decision"],
        rows: [
          [
            "Plasterboard",
            "Identify thickness, cavity and sound backing. Do not assume the decorative board alone can support a heavy, high curtain.",
          ],
          [
            "Timber",
            "Find substantial, sound timber at the required fixing line and establish an appropriate connection; thin trim is not equivalent to a structural member.",
          ],
          [
            "Masonry",
            "Identify solid or hollow construction, condition and edge distances. Render and plaster do not establish the strength of the material behind them.",
          ],
          [
            "Steel",
            "Agree a suitable connection with the relevant construction team. Do not drill structural steel or rely on a thin lining without an approved fixing detail.",
          ],
        ],
      },
      links: [
        {
          href: "/services/measure-consultation",
          label: "What the consultation establishes",
        },
        {
          href: "/advice/buying-apex-curtains-online#weight-and-fixings",
          label: "Why a track alone is not a complete specification",
        },
      ],
    },
    {
      id: "apex-and-gable",
      photo: {
        src: "/projects/pinch-pleat-curtains-oxford-oxford.jpeg",
        alt: "Oxford gable curtains following two roof slopes and held in matching tiebacks",
        width: 1600,
        height: 1200,
        caption:
          "Oxford / The upper cloth follows the architecture while tiebacks reveal the central view. The photograph shows the arrangement; it does not identify a Forest model or concealed fixings.",
        href: "/gallery/pinch-pleat-curtains-oxford-oxford",
        linkLabel: "Explore the completed project",
      },
      title: "Following a slope takes specialist planning",
      paragraphs: [
        "Apex, triangular and gable-end windows combine changing heights with an angled track route. The track can be shaped for the design, but a documented bend radius is not a claim that every sharp corner or slope will operate like a horizontal rail. The peak, junctions, retained curtain sections and intended opening positions need to be drawn together.",
        "Gravity acts on carriers on a slope. The arrangement may need selected retention points and a planned tieback position, rather than free travel across the whole window. Before manufacture we establish which parts move, which remain supported in place and how the customer will handle the curtains from floor level.",
        "A shaped curtain can remain over part of the upper glazing when tied back. That can be a beautiful way to frame the view, but it should be understood before choosing the panel layout. Our angled-window and tieback guides explain this relationship in more detail.",
      ],
      links: [
        {
          href: "/angled-window-curtains",
          label: "Curtains beneath a sloping ceiling",
        },
        { href: "/gable-end-curtains", label: "Large gable-end glazing" },
        { href: "/curtain-tiebacks", label: "Tiebacks and visible glass" },
      ],
    },
    {
      id: "installation-and-care",
      title: "A smooth finish, from fitting onwards",
      paragraphs: [
        "Installation includes checking the track alignment, carrier arrangement, heading clearance and the movement that was agreed for the scheme. Very high work also needs a suitable access plan. A system that looks discreet should still be practical to inspect and maintain.",
        "Use the demonstrated operating method and stop if a curtain begins to snag. Pulling harder can stress hooks and fixings. Keep the track free of decorating dust and do not add household oil or spray lubricant without advice for the supplied system. If a bracket moves or a carrier fails at height, arrange a service visit.",
      ],
      links: [
        {
          href: "/services/premium-installation#mitower-access",
          label: "MiTOWER access and installation day",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Are Apex curtain tracks normally white?",
      answer:
        "Yes. White is the normal finish for Apex’s aluminium track offering. Black is an optional upgrade, agreed as part of the quotation.",
    },
    {
      question: "Are Forest KS and CS electric tracks?",
      answer:
        "The standard KS and CS systems described here are hand drawn. Operation for an angled installation is planned separately around the slope, retained sections and the way the curtains will be handled.",
    },
    {
      question: "Can I choose a track using only its load rating?",
      answer:
        "No. The published fabric load must be considered alongside the total curtain weight, brackets, fixings, substrate, track geometry and concentrated load at the stack.",
    },
  ],
  related: [
    {
      href: "/curtain-headings#tracks-and-space",
      label: "Fold depth and stack-back",
    },
    { href: "/curtain-linings", label: "Cloth, weight and light" },
    { href: "/angled-window-curtains", label: "Follow the architecture" },
    {
      href: "/services/premium-installation",
      label: "Installation and aftercare",
    },
  ],
  sources: [
    {
      href: "https://forestgroup.com/user_files/download_files/download_2502_FOREST_KS_NEW_EN_150926_WEB.pdf",
      label: "Forest KS series technical brochure, September 2026, pages 2–4",
    },
    {
      href: "https://forestgroup.com/user_files/download_files/download_2452_FOREST_CS_EN_270726_WEB.pdf",
      label: "Forest CS series technical brochure, July 2026, pages 2–4",
    },
    {
      href: "https://forestgroup.com/uk/downloads/brochures",
      label: "Forest Group UK current downloads",
    },
  ],
};
