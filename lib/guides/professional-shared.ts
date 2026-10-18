import type { SpecialistGuide } from "../specialist-guide-types";

export const oxfordProfessionalImage = {
  src: "/projects/pinch-pleat-curtains-oxford-oxford.jpeg",
  alt: "Double pinch pleat curtains following a gable in a completed Oxford home",
  caption:
    "Oxford / Real Apex installation. Shaped curtains, visible upper coverage and a considered floor relationship.",
};
export const airportProfessionalImage = {
  src: "/images/commercial/airport-lounge-main.jpeg",
  alt: "Completed Apex curtain installation in a Manchester Airport lounge environment",
  caption: "Manchester Airport / Existing Apex commercial project photography.",
};
export const surveyDiagram = {
  src: "/guides/survey-geometry.svg",
  alt: "Asymmetric gable showing independent slopes, side drops, track route and finished floor references",
  caption:
    "Coordination principles only. Drawings and photographs inform the brief; final manufacture requires the agreed survey and specification.",
};
export const coordinationDiagram = {
  src: "/guides/professional-coordination.svg",
  alt: "Plan and section showing curtain fold depth, stack-back, track support and glazing clearance as separate coordination dimensions",
  caption:
    "Schematic, not to scale. Fold depth, stack width and fixing provision are different requirements; there is no universal recess size.",
};
export const releaseDiagram = {
  src: "/guides/professional-release.svg",
  alt: "Project sequence from brief and survey to agreed specification, manufacture, site readiness and handover, with changes returned for review",
  caption:
    "An illustrative coordination sequence. Dates, scope and approvals must be agreed for the actual project.",
};
export function professionalGuide(
  guide: Omit<SpecialistGuide, "enhanced" | "professional">,
): SpecialistGuide {
  return { ...guide, enhanced: true, professional: true };
}
