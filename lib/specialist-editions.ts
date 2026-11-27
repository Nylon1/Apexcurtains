import { portfolio } from "@/lib/portfolio";
import type { DrawingKind } from "@/components/architecture/ArchitectureDrawing";

export type SpecialistKey = "apex" | "gable" | "tall" | "scale" | "motors" | "install" | "workroom";
export type ProjectReference = { slug: string; image?: number };
export type SpecialistEdition = {
  path: string; label: string; title: string; accent: string; intro: string;
  hero: ProjectReference; heroNote: string; diagram: DrawingKind | "apex";
  principle: { title: string; text: string; points: { title: string; text: string }[] };
  projects: { slug: string; reason: string; image?: number }[];
  film?: string; filmTitle?: string; consultation: string; prepare: string[];
};

// References resolve against the existing portfolio. No project or media records are duplicated here.
export function specialistProject(slug: string) {
  const project = portfolio.projects[slug] || portfolio.archive[slug];
  if (!project) throw new Error(`Unknown specialist project: ${slug}`);
  return project;
}

export const specialistEditions: Record<SpecialistKey, SpecialistEdition> = {
  apex: {
    path: "/apex-curtains", label: "Apex curtains", title: "Apex curtains,", accent: "shaped around your room.",
    intro: "A sloping window asks more of a curtain. We bring the heading, hanging line and gathered fabric together, so the peak remains part of the room and the curtains work as intended.",
    hero: { slug: "jesmond" }, heroNote: "Jesmond · A shaped outer curtain with a separate horizontal sheer.", diagram: "apex",
    principle: { title: "Start with the shape. Agree the movement.", text: "An angled heading does not behave like a horizontal rail. Establish which parts remain supported along the slope, where the fabric gathers and how much glass stays visible before choosing the final cloth.", points: [
      { title: "Read the whole opening", text: "Peak position, both side heights, slope and the finished floor define the treatment. Width and maximum height alone leave too much unresolved." },
      { title: "Plan the open position", text: "Tiebacks can draw the cloth away from the centre while fabric remains along the upper slopes. Agree the visible glass and stack before making." },
      { title: "Balance light and privacy", text: "A separate sheer can soften daylight. Bedroom light control also depends on lining, overlap, returns and the gaps around the treatment." },
    ] },
    projects: [{ slug: "hemel-hempstead", reason: "Two different upper profiles show why each opening needs its own curtain shape." }, { slug: "rickmansworth", reason: "Deep green cloth gives the sloping bedroom opening a distinct interior character." }],
    consultation: "Show us the peak, the sides and the room below.", prepare: ["A straight-on photograph of the full window", "An approximate width and both side heights", "How you want the curtains to open and the room to feel"],
  },
  gable: {
    path: "/gable-end-curtains", label: "Gable-end curtains", title: "The gable is the feature.", accent: "The curtains give it presence.",
    intro: "From a timber-lined living room to a glazed bedroom gable, the curtain line shapes the whole elevation. Consider the view when open, the fabric surface when closed and the space needed at either side.",
    hero: { slug: "windermere" }, heroNote: "Windermere · The same gable photographed open and closed.", diagram: "apex",
    principle: { title: "A whole elevation, considered together.", text: "The peak is one part of the design. The lower windows, doors, ceiling and furniture determine where the cloth can hang and how the room feels when it is drawn.", points: [
      { title: "Follow or separate the lines", text: "A shaped outer treatment and a horizontal inner layer serve different roles. Confirm the route and operation of each layer." },
      { title: "Leave usable room", text: "Check doors, handles, radiators and furniture against the curtain fall and gathered panels." },
      { title: "Keep the interior in view", text: "Compare samples beside the glazing and the room finishes. Colour, drape and lining change the visual weight of a large fabric surface." },
    ] },
    projects: [{ slug: "cotswold", reason: "Two rooms show different proportions: a steep bedroom window and a broader arrangement above glazed doors.", image: 1 }, { slug: "beeston", reason: "Outer curtains and a sheer layer bring a bedroom gable and adjacent opening into one scheme." }],
    consultation: "Plan the whole gable, from peak to floor.", prepare: ["A full elevation or straight-on room photograph", "Doors, radiators and furniture beside the glazing", "Your preferred daytime and evening arrangement"],
  },
  tall: {
    path: "/tall-window-curtains", label: "Tall & double-height curtains", title: "Curtains through", accent: "two storeys of light.",
    intro: "Long drops connect the upper glazing to the room below. We assess the hanging point, fabric, support and access together, with daily operation considered from the start.",
    hero: { slug: "double-height-dining-room" }, heroNote: "A dining room with two curtain layers extending beside the upper level.", diagram: "height",
    principle: { title: "Three measurements. Three different decisions.", text: "Window height, room height and finished curtain drop describe different things. The agreed hanging point and hem position determine what the workroom actually makes.", points: [
      { title: "Hanging line", text: "Decide whether the track belongs at the ceiling, above the opening or at an intermediate architectural line." },
      { title: "Fabric over the full drop", text: "Review weight, joins and how the cloth hangs over its full length. A small sample cannot show the entire curtain fall." },
      { title: "Everyday reach", text: "Consider controls at a practical height, stack-back and how the track will be reached for fitting and maintenance." },
    ] },
    projects: [{ slug: "tall-black-framed-window", reason: "The film moves from the full opening to the heading and cloth, linking room scale with construction detail." }, { slug: "motorised-architectural-voiles", reason: "Moving voiles show how two tiers of glazing can be treated as one window wall." }],
    film: "two-storey-curtain-installation", filmTitle: "From fitting to the finished fall.",
    consultation: "Tell us which height you have measured.", prepare: ["Window height and room height, labelled separately", "A proposed hanging point and hem position, if known", "Photographs of the floor, stairs or landing below"],
  },
  scale: {
    path: "/oversized-architectural-curtains", label: "Oversized architectural curtains", title: "Oversized curtains,", accent: "considered with the interior.",
    intro: "Across expansive glazing, curtain depth and rhythm become part of the architecture. Plan panel divisions, layers and stack-back alongside the ceiling, joinery and circulation through the room.",
    hero: { slug: "manchester-airport-lounge" }, heroNote: "Manchester Airport lounge · Measuring, curtain and track supply, installation and final dressing.", diagram: "stack",
    principle: { title: "Design the space the curtains occupy.", text: "The closed width is only part of the brief. Fold depth, gathered panels and independent layers all need space within the finished interior.", points: [
      { title: "Divide the span", text: "Compare a centre split with a one-way stack. Review where the fabric collects and which doors and views need to stay clear." },
      { title: "Reserve depth", text: "Allow for the heading, lining and full stack. A voile and an outer curtain need clearance on separate tracks." },
      { title: "Coordinate the fit-out", text: "Agree recesses, fixing support, delivery routes and maintenance access before ceilings and joinery are complete." },
    ] },
    projects: [{ slug: "manchester-airport-lounge", image: 1, reason: "The curtain run sits within a larger hospitality fit-out, alongside curved seating and timber partitions." }, { slug: "double-height-dining-room", reason: "A residential example of layered fabric continuing through two levels of glass." }],
    film: "motorised-architectural-voiles", filmTitle: "Watch the window wall change.",
    consultation: "Bring the curtain into the architectural brief.", prepare: ["Window elevations and ceiling or recess drawings", "Panel divisions, fabric intent and the view to preserve", "Programme, delivery access and project-team contacts"],
  },
  motors: {
    path: "/motorised-curtain-systems", label: "Motorised curtain systems", title: "Motorised curtains.", accent: "Operated from here.",
    intro: "See remote operation on a five-metre-high residential window, then plan the track, controls and service access for your own room. The complete system is selected around the curtain and its route.",
    hero: { slug: "five-metre-motorised-curtains" }, heroNote: "Five metres describes the confirmed window height, not a certified curtain drop or system capacity.", diagram: "layers",
    principle: { title: "Specify the movement before the motor.", text: "Start with the route, panel weight and draw arrangement. Then coordinate the power supply, controls and access needed to keep the chosen system usable.", points: [
      { title: "Track & load", text: "Length, bends, carriers, stacks and fixing support affect the complete installation. A motor rating alone cannot specify the system." },
      { title: "Controls & power", text: "Choose the required wall, remote or integrated controls, then confirm the compatible motor, interface and electrical provision." },
      { title: "Handover & access", text: "Check travel, limits and clearance. Identify the controls and agree how the motor and track can be reached later." },
    ] },
    projects: [{ slug: "five-metre-motorised-curtains", reason: "A handheld remote closes the two panels at the centre and draws them open again." }, { slug: "motorised-architectural-voiles", reason: "A second film shows pale voiles moving across two tiers of living-room glazing." }],
    film: "motorised-architectural-voiles", filmTitle: "A lighter layer, also in motion.",
    consultation: "Tell us how you want to control the room.", prepare: ["Track route and approximate window dimensions", "Curtain and lining choices, if already selected", "Preferred controls and available power provision"],
  },
  install: {
    path: "/high-level-curtain-installation", label: "High-level curtain installation", title: "The finish begins", accent: "with the access plan.",
    intro: "A high curtain line needs a workable route to it. Surveying, fixing support, handling and final dressing belong in the same installation plan—before the curtains arrive on site.",
    hero: { slug: "london-apartment-installation" }, heroNote: "London apartment · Fitting tall patterned curtains beneath the cornice.", diagram: "access",
    principle: { title: "Plan the room as a working space.", text: "The photographs show individual installations, not a universal access method. The site assessment determines the equipment, working position and handling arrangements for your project.", points: [
      { title: "Survey the support", text: "Confirm the hanging line and suitable structure. Where the substrate is concealed, coordinate the fixing information with the building team." },
      { title: "Plan the route", text: "Assess the floor or stairs below, access into the room, working space and protection of finishes." },
      { title: "Finish & hand over", text: "Check movement and hem clearance, dress the folds and explain care and any controls. Include future removal and maintenance in the plan." },
    ] },
    projects: [{ slug: "warwickshire", reason: "Open, closed and installation-stage photographs place the finished curtain within the fitting process." }, { slug: "norwich", image: 1, reason: "An installation-stage view establishes the full glazed gable and the room below it." }],
    film: "two-storey-curtain-installation", filmTitle: "The fitting and the final dressing.",
    consultation: "Show us the window—and the way to reach it.", prepare: ["The full window and floor or staircase below", "Doors, lifts and the route into the room", "Known fixing details and the building programme"],
  },
  workroom: {
    path: "/oversized-curtain-manufacturing", label: "Specialist curtain manufacturing", title: "From the cut", accent: "to the final fall.",
    intro: "A long or shaped curtain starts with decisions about usable cloth width, direction, joins, heading and lining. We consider the finished panel as part of its track, handling and installation arrangement.",
    hero: { slug: "norwich" }, heroNote: "Norwich · Gathered heading and long folds in an installed curtain. Finished-work detail, not a workroom photograph.", diagram: "making",
    principle: { title: "Resolve the panel on paper first.", text: "The finished size, cloth construction and agreed fullness determine the cut plan. Pattern repeat and permitted fabric orientation influence joins and cloth quantities.", points: [
      { title: "Cut & join", text: "Plan widths, seam positions and pattern alignment before cutting. Check the fabric direction and any allowance required by the selected cloth." },
      { title: "Build the heading", text: "The heading gathers the cloth and transfers load to hooks or carriers. Review its compatibility with the route and intended movement." },
      { title: "Check & handle", text: "Review dimensions, seams, hems and fabric fall, then agree protection, transport, hanging and final dressing." },
    ] },
    projects: [{ slug: "hemel-hempstead", image: 1, reason: "The gathered heading, curtain fall and tieback show how shaped make-up reads in the finished room." }, { slug: "jesmond", image: 2, reason: "Grouped pleats follow the slope, with a separate horizontal sheer below the apex." }],
    consultation: "Bring us the dimensions and the cloth information.", prepare: ["Finished dimensions and who will verify them", "Fabric reference, usable width, direction and repeat", "Heading, lining, fullness and the service scope required"],
  },
};
