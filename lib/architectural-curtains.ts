export type ArchitecturalLink = { href: string; label: string };
type Section = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type ArchitecturalGuide = {
  path: string;
  label: string;
  title: string;
  description: string;
  sections: Section[];
  related: ArchitecturalLink[];
  sources?: ArchitecturalLink[];
  service?: boolean;
  tool?: "motion" | "weight";
  enquiry?: "trade";
};

const tall = { href: "/tall-window-curtains", label: "Tall and double-height curtains" };
const scale = { href: "/oversized-architectural-curtains", label: "Oversized architectural curtains" };
const motors = { href: "/motorised-curtain-systems", label: "Motorised curtain systems" };
const workroom = { href: "/oversized-curtain-manufacturing", label: "Oversized curtain manufacturing" };
const install = { href: "/high-level-curtain-installation", label: "High-level curtain installation" };
const weight = { href: "/curtain-weight-and-structure", label: "Curtain weight and structure" };
const trade = { href: "/professionals/trade-partnerships", label: "Trade curtain partnerships" };
const shaped = { href: "/apex-curtains", label: "Apex curtains" };
const survey = { href: "/services/measure-consultation", label: "Specialist curtain surveying" };

export const architecturalGuides = {
  tall: {
    path: tall.href,
    label: tall.label,
    title: "Tall and double-height window curtains",
    description: "Made-to-measure curtains for two-storey glazing, high ceilings, stairwells and mezzanines. Explore how drop, fabric, tracks and fitting are assessed together.",
    service: true,
    sections: [
      { id: "double-height", title: "Curtains for double-height rooms", paragraphs: [
        "In a two-storey living room, the most useful place for the track may be above the glazed opening, at the ceiling or at an intermediate architectural line. That decision affects how much glass is covered, how the curtain is operated and whether the track is accessible later. Deep stacks can take daylight from a window, so the available space beside the glass matters.",
        "Floor-to-ceiling rectangular glazing can suit a horizontal track with a centre split or one-way draw. A vaulted barn or shaped gable may need a different heading and support arrangement. Where the glass spans upper and lower floors, the survey can establish whether one continuous treatment or separate levels suit how the property is used.",
      ] },
      { id: "extra-long-drops", title: "Extra-long made-to-measure curtains", paragraphs: [
        "For enquiries involving three, four, five or six metres, tell us what the number describes. Window height measures the opening. Floor-to-ceiling height measures the room. Finished curtain drop runs from the agreed hanging point to the finished hem. We assess each proposed drop against the cloth, make-up, track, fixing and access conditions before confirming feasibility.",
        "A long panel has more fabric to support and handle. Joining fabric widths can introduce long visible seams. A workroom needs to assess the cloth’s behaviour over the full drop, the pattern repeat, the lining and how the panel will be transported, installed and dressed.",
      ] },
      { id: "stairwells", title: "Stairwells, landings and mezzanines", paragraphs: [
        "Include photographs from the lowest floor and any upper landing, where safely accessible. Show stairs, balustrades, adjacent doors and the surrounding ceiling. A survey can confirm the working position and how to reach the track for installation and future maintenance.",
        "Motorised operation can put the controls at a practical level on suitable horizontal tracks. For high glazing with a shaped head, the geometry and operation need a separate review.",
      ] },
    ],
    related: [shaped, { href: "/gable-end-curtains", label: "Gable-end curtains" }, { href: "/barn-conversion-curtains", label: "Barn conversion curtains" }, scale, motors, install],
  },
  scale: {
    path: scale.href,
    label: scale.label,
    title: "Oversized architectural curtains",
    description: "Specialist curtains and tall voiles for expansive glazing, luxury apartments and hospitality interiors. Plan large panels, heavy linings, track and stack-back.",
    service: true,
    sections: [
      { id: "wide-glazing", title: "Wide glazing, heavy linings and large panels", paragraphs: [
        "For a long span of glass, start with the usable track width and the area where the curtains can gather. A centre split can divide the fabric between two stacks. One-way draw places the full stack on one side, which may affect door clearance, the view and how the load is distributed.",
        "A lining adds mass and changes how the panel folds. The heading, glider spacing, track geometry and usable fixing positions need to be reviewed together, especially with recesses, curved runs or several adjoining bays.",
      ] },
      { id: "architectural-voiles", title: "Tall architectural voiles", paragraphs: [
        "A sheer can soften direct light in a large glazed room and preserve a sense of the view. Check its appearance in daylight and after dark, when a lit interior may be visible from outside. Wide-width fabric may reduce joins when the fabric width, finished drop and permitted orientation allow it.",
        "Layering a voile with a lined curtain gives separate control over filtered light and privacy. Allow room for two tracks, their brackets and the full depth of both stacks. Independent motorised control depends on the selected track and control arrangement.",
      ] },
      { id: "apartments-and-penthouses", title: "Luxury apartments and penthouses", paragraphs: [
        "Tall windows, long views and ceiling recesses can determine where curtains sit and how they open. Include the joinery or ceiling drawings if available. Early review can help locate accessible motors, provide room for folds and keep balcony doors and handles clear.",
        "For high-rise apartments, include lift and loading access, any building management restrictions, protection requirements and the sequence of other trades. Long rails and large curtains must be able to reach the room and be handled there.",
      ] },
      { id: "hospitality", title: "Hospitality interiors and large room partitions", paragraphs: [
        "In a hotel, atrium or shared commercial space, the brief may include usage frequency, cleaning access, operation by staff and fabric performance requirements set by the project team. Bring the relevant specifier requirements into the first review.",
        "Curtains can provide visual division where the layout permits. Discuss access routes, exits and any acoustic, fire or other performance requirements with the project team before specification.",
      ] },
    ],
    related: [tall, { href: "/large-window-curtains", label: "Curtains for large windows and patio doors" }, motors, weight, { href: "/gallery", label: "Apex project portfolio" }, trade],
  },
  motors: {
    path: motors.href,
    label: motors.label,
    title: "Motorised curtain systems for large and high windows",
    description: "Explore heavy-duty electric tracks, Forest FMS and FMS Plus, Shuttle motors and smart controls for tall glazing, luxury apartments and architectural voiles.",
    service: true,
    tool: "motion",
    sections: [
      { id: "track-and-motor", title: "Heavy-duty electric curtain tracks", paragraphs: [
        "Forest Group’s belt-driven FMS can be wall- or ceiling-mounted. Forest’s UK FMS page lists a 7 metre rail length, assembled systems up to 14 metres and up to 10 metres for a single stack. FMS Plus is intended for medium and heavy drapery and FMS Plus Recess fits into a dedicated ceiling profile. Check the separate order form and profile lengths for the specified configuration.",
        "Forest’s UK FMS and FMS Plus pages list Shuttle L for curtain weights up to 40 kg and Shuttle M up to 70 kg. These are published ceilings for the motor option. The complete track, carriers, draw arrangement, length, bends and fixing substrate must be checked as a system. Forest’s load tables can reduce the permitted mass for a specific layout.",
        "Shuttle L has an integrated power supply and needs the appropriate mains connection. Shuttle M uses a separate 24 V DC supply. The UK FMS guide lists a battery Shuttle iOn option. Forest publishes up to 25 kg on an 8 metre straight track for that motor, and the battery must remain accessible. Confirm the exact model, regional variant and current documentation before specifying.",
      ] },
      { id: "high-windows", title: "Ground-level operation and independent layers", paragraphs: [
        "For suitable tall rectangular windows, a motor can operate the curtain from a wall control or remote at ground level. A curtain and voile can be assigned to separate zones, with individual movement and group control where the chosen system supports it. Check where the curtains collect and how the motor can be reached for servicing.",
        "The Forest systems described here are assessed for horizontal operation, including supported bends in plan. A triangular or sloping apex window requires its own geometry and support assessment. A curve in plan does not establish approval for a sloping installation.",
      ] },
      { id: "smart-controls", title: "Smart home and building controls", paragraphs: [
        "Compatible RF variants support Forest remotes and wall controls. Smartphone and scheduled control depend on the chosen motor, accessory and network or hub. Forest lists its Connect app with a compatible Wi-Fi dongle, and identifies Z-Wave variants and actuator-dependent integrations separately.",
        "For commercial controls, agree the interface and the control sequence with the integrator. Forest documents dry-contact control for applicable Shuttle models and lists options for bus or hard-wired integration through the specified interface. Check how zones, scheduling, group commands and any required position feedback are supported.",
        "Coordinate power, cable routes and future service access with the electrical contractor before ceiling finishes are closed. Commissioning includes testing travel and limits, checking stack positions and clearance, identifying controls and demonstrating normal and power-loss operation for the final configuration.",
      ] },
    ],
    related: [tall, shaped, { href: "/curtain-tracks", label: "Architectural curtain track guide" }, install, weight, { href: "/room-visualiser", label: "Explore fabric and colour in the room visualiser" }],
    sources: [
      { href: "https://www.forestgroup.com/uk/products/forest-motorised-track-system", label: "Forest FMS UK specification" },
      { href: "https://forestgroup.com/uk/products/fms-plus-motorised-curtain-track", label: "Forest FMS Plus UK specification" },
      { href: "https://www.forestgroup.com/uk/products/fms-plus-recess-motorised-recess-track", label: "Forest FMS Plus Recess UK specification" },
      { href: "https://www.forestgroup.com/uk/products/forest-shuttle-curtain-motor", label: "Forest Shuttle UK motors and controls" },
      { href: "https://www.forestgroup.com/uk/downloads/brochures", label: "Forest brochures and load tables" },
    ],
  },
  workroom: {
    path: workroom.href,
    label: workroom.label,
    title: "Specialist manufacturing for oversized curtains",
    description: "A workroom guide to extra-long curtain panels, fabric joins, pattern matching, linings, fullness, weight and delivery for architectural projects.",
    service: true,
    sections: [
      { id: "cutting-and-joining", title: "Planning the cut and joining long widths", paragraphs: [
        "The workroom starts with the finished drop, usable cloth width, chosen fullness and the fabric’s direction and pattern repeat. It plans the widths and seams across the finished panels so joins sit sensibly in the folds. Patterned cloth can require extra cut length to align the motif at every join and to balance a pair.",
        "Long cuts need enough supported space to keep the cloth square and avoid dragging it off grain. During sewing, the workroom manages the feed and tension so one piece does not stretch against the other, reducing seam misalignment and puckering. A hanging check can reveal fabric movement or twisting that is less visible flat on the table.",
      ] },
      { id: "linings-and-headings", title: "How linings and headings change the curtain", paragraphs: [
        "Compare cloth and lining by mass per square metre, drape and expected movement. Blackout lining reduces transmission through the cloth, while room darkening also depends on returns, overlap and the gaps above and below the curtain. Thermal lining adds a layer and weight. Its effect depends on the complete treatment and room conditions.",
        "The heading determines how cloth is gathered and where the load transfers into hooks or carriers. Higher fullness increases area, fold depth and stack-back. On a wide or heavy treatment, estimate each panel and each layer so the track, stack positions and installation approach can be reviewed early.",
      ] },
      { id: "quality-and-handling", title: "From workroom checks to final dressing", paragraphs: [
        "Check finished dimensions, hem alignment, pattern across seams, heading spacing, colour consistency and the panel’s movement before dispatch. Protect the cloth and agree how large panels and lengthy tracks travel through doors, lifts and stairs.",
        "On site, the curtain needs enough space and support to be handled without dragging. Final dressing checks hem clearance, fold repeat, returns and how the curtains meet and stack. Access planning also determines how the curtains can be taken down later.",
      ] },
      { id: "online-ordering", title: "What to check before ordering online", paragraphs: [
        "Online limits depend on the product and supplier. For example, Dunelm’s Blickling made-to-measure listing publishes a maximum drop of 305 cm and identifies widths that require a join. When a proposed curtain exceeds a published range, ask whether a separate workroom service applies and who will verify the fixing, operation and access.",
      ] },
    ],
    related: [tall, weight, { href: "/curtain-headings", label: "Heading construction" }, { href: "/curtain-linings", label: "Curtain lining options" }, { href: "/services/design-make-curtains", label: "Apex design and make service" }, trade],
    sources: [{ href: "https://www.dunelm.com/product/blickling-made-to-measure-curtains-1000187863", label: "Dunelm Blickling order measurements" }],
  },
  install: {
    path: install.href,
    label: install.label,
    title: "Specialist high-level curtain installation",
    description: "Plan surveying, access, structural fixings, handling, motor commissioning and aftercare for tall windows, stairwells and difficult curtain installations.",
    service: true,
    sections: [
      { id: "survey", title: "Survey the window and the working area", paragraphs: [
        "A survey considers the proposed track line, finished floor, window shape and surrounding structure. Laser measurements can help establish levels and distances where there is a suitable line of sight. Dimensions and angles are checked against fixed reference points, the proposed hanging point and any floor or ceiling variation.",
        "Provide photographs and drawings of the fixing area, particularly where structure is concealed by plasterboard or a ceiling recess. Clarify proposed load paths and fixing details with the contractor or structural designer where necessary before selecting brackets and fasteners.",
      ] },
      { id: "access", title: "Plan difficult access before the curtains are made", paragraphs: [
        "Work at height requires planning and assessment by competent people. The HSE sets out a hierarchy that starts by avoiding work at height where reasonably practicable. Depending on the assessment, suitable options may include a mobile access tower, a staircase-specific access arrangement or powered access equipment.",
        "The choice depends on the working position, the floor or stair geometry, reaching and handling space, floor protection, delivery routes and site restrictions. Equipment, competence, insurance and responsibilities are agreed for the proposed method before work proceeds.",
      ] },
      { id: "fitting-and-handover", title: "Install, commission and dress the curtains", paragraphs: [
        "A tall curtain is only ready for service once the suitable track is fixed, panels can be handled and hung, and movement and clearance have been checked. For motorised systems, confirm limits, open and closed positions and operation from each agreed control. Dress the folds and check the hems and stacks under normal use.",
        "At handover, keep the fabric care information, track and motor identification and control instructions. Plan how the track, carriers and moving parts will be reached for inspection, and how large curtains can be removed and rehung. If a curtain starts dragging or a motor struggles, pause operation and arrange an assessment.",
      ] },
    ],
    related: [survey, { href: "/services/premium-installation", label: "Apex installation and aftercare service" }, weight, motors, tall],
    sources: [{ href: "https://www.hse.gov.uk/work-at-height/index.htm", label: "HSE work at height guidance" }],
  },
  weight: {
    path: weight.href,
    label: weight.label,
    title: "Curtain weight, track loads and structural support",
    description: "Estimate the textile mass of wide or tall curtains and understand how fullness, lining, track layout and stack-back affect specification.",
    tool: "weight",
    sections: [
      { id: "mass", title: "From finished size to textile mass", paragraphs: [
        "For rectangular curtains, multiply the width covered by the layer by its fullness to approximate the flat fabric width. Multiply by the finished drop to approximate area, then apply face fabric and lining weights in grams per square metre. A make-up allowance can approximate fabric retained in hems and seams.",
        "An additional metre of drop increases the area of every fabric width. A change from 2× to 2.5× fullness increases the theoretical cloth width by 25% at the same coverage. Use each layer’s actual weights when available. Pattern matching affects cloth purchased, while offcuts do not contribute to the installed mass.",
      ] },
      { id: "fixings-and-designer", title: "Review the track and structure together", paragraphs: [
        "The installed load includes curtains, heading tapes or hooks, carriers and the track itself. The way panels move or collect into a tight stack changes where an installation carries that load. Bracket reactions depend on geometry, support and how loads are shared. A motor’s stated capacity cannot establish fixing capacity.",
        "Share the preliminary mass, finished specification, track layout, intended stack positions and fixing information with the surveyor and relevant structural designer. The estimator covers the textile mass of one rectangular layer across the full width. For double tracks, assess the voile and curtain separately and provide both to the project team.",
      ] },
    ],
    related: [workroom, motors, install, { href: "/curtain-tracks#structure-and-brackets", label: "Track structure and brackets" }],
  },
  trade: {
    path: trade.href,
    label: trade.label,
    title: "Specialist curtain trade partnerships",
    description: "Discuss manufacture-only, technical consultation, motorised tracks or specialist installation for oversized and complex curtain projects.",
    service: true,
    enquiry: "trade",
    sections: [
      { id: "scope", title: "Support for workrooms and curtain retailers", paragraphs: [
        "When a brief involves a challenging shape, unusually long fabric widths, a heavy track or difficult access, get in touch early. We can review which elements need specialist input and discuss manufacture-only, track support, surveying, installation or a complete subcontracted project.",
        "For manufacture-only requests, include finished drop and width, who owns the measurement, fabric weight and usable width, heading and lining, desired fullness, panel split and delivery arrangements. Trade scope, responsibilities and any white-label arrangement are subject to separate agreement.",
      ] },
      { id: "specifiers", title: "Architects, designers and project teams", paragraphs: [
        "Architects and interior designers can share elevations, curtain pockets, fabric intent and the expected visual line. Developers and contractors can include fixing details, delivery and access constraints, programme and where the electrical or controls scope sits.",
        "For hotels and hospitality, include operating frequency, cleaning and maintenance access, relevant specification requirements and the handover needs of the facilities team. The project brief can identify multiple rooms or an agreed sample area to review first.",
      ] },
    ],
    related: [
      { href: "/professionals/architects", label: "Architects" },
      { href: "/professionals/interior-designers", label: "Interior designers" },
      { href: "/professionals/developers-housebuilders", label: "Developers and housebuilders" },
      { href: "/professionals/contractors-fit-out", label: "Contractors and fit-out teams" },
      { href: "/professionals/specifier-resources", label: "Specifier resources" },
      workroom, scale, install,
    ],
  },
} satisfies Record<string, ArchitecturalGuide>;

export const architecturalPlannerPath = "/architectural-curtain-project-planner";
