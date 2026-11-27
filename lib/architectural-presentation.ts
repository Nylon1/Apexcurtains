import type { DrawingKind } from "@/components/architecture/ArchitectureDrawing";
import { studioPhotos, type StudioPhoto } from "./studio-photography";

type Visual = { mode: "drawing"; diagram: DrawingKind } | { mode: "image" | "wide" | "detail"; photo: StudioPhoto };
type Presentation = Visual & {
  intro: string;
  question: string;
  answer: string;
  detail?: { section: string; drawing: DrawingKind };
};

export const architecturalPresentation: Record<string, Presentation> = {
  "/tall-window-curtains": {
    mode: "drawing", diagram: "height",
    intro: "Curtains for two-storey rooms, stairwells and mezzanines begin with a clear hanging line and a well-planned installation.",
    question: "Is window height the same as the curtain drop?",
    answer: "Window height describes the opening. The finished drop runs from the agreed hanging point to the hem. Provide both when available.",
    detail: { section: "double-height", drawing: "stack" },
  },
  "/oversized-architectural-curtains": {
    mode: "wide", photo: studioPhotos.lounge,
    intro: "Across a wide room, the scale of the cloth changes the rhythm of the architecture. Panel size, lining and the open view deserve equal attention.",
    question: "Can tall voiles and heavier curtains share the same window?",
    answer: "Yes where the recess, fixing and available depth allow both layers. The chosen tracks and headings must leave clearance for independent movement.",
    detail: { section: "architectural-voiles", drawing: "layers" },
  },
  "/motorised-curtain-systems": {
    mode: "drawing", diagram: "layers",
    intro: "Control tall or heavy curtains from a practical position, with the right track, controls and provisions for maintenance.",
    question: "Can a standard electric track follow an apex?",
    answer: "A sloping or triangular window requires its own assessment. Horizontal tracks and bends in plan have different operating requirements.",
    detail: { section: "track-and-motor", drawing: "fixing" },
  },
  "/oversized-curtain-manufacturing": {
    mode: "detail", photo: studioPhotos.cambridge,
    intro: "Extra-long curtains demand careful planning from the first cut to the final seam, so the folds settle naturally in the room.",
    question: "Does a wide panel need fabric joins?",
    answer: "That depends on the cloth’s usable width, fullness, finished drop and permitted orientation. The workroom plans the position and alignment of any joins.",
    detail: { section: "cutting-and-joining", drawing: "making" },
  },
  "/high-level-curtain-installation": {
    mode: "drawing", diagram: "access",
    intro: "The survey brings the curtain line, fixing support and safe working position together before the panels are made.",
    question: "What should I share about access?",
    answer: "Share photos of the whole window, the floor or stairs below and the route into the room. Access and equipment are assessed for the particular site.",
    detail: { section: "survey", drawing: "fixing" },
  },
  "/curtain-weight-and-structure": {
    mode: "drawing", diagram: "fullness",
    intro: "Learn how drop, lining and fullness affect textile mass, and what the survey needs to establish about tracks and fixings.",
    question: "Does the estimator specify a track or fixing?",
    answer: "It estimates the textile mass of one rectangular layer. The complete system, hardware and building structure need professional assessment.",
    detail: { section: "fixings-and-designer", drawing: "fixing" },
  },
  "/professionals/trade-partnerships": {
    mode: "image", photo: studioPhotos.oxford,
    intro: "Specialist input for workrooms, retailers, architects and design teams whose projects need careful manufacture, track design or installation.",
    question: "Can I enquire about separate parts of a project?",
    answer: "Yes. Include the service you need and who will own the dimensions, specification, delivery and installation. Responsibilities are agreed for each project.",
  },
};
