import { careGuide } from "./care";
import type { BrochureIconName } from "./brochure-icons";

// Keep presentation here; do not introduce another independently maintained care policy.
const icons: Record<string, BrochureIconName[]> = {
  cleaning: ["clean", "vacuum", "spill", "pair"],
  dressing: ["folds", "folds", "release", "clock"],
  living: ["clock", "cloth", "sun", "track", "light", "care"],
};
export const brochureCareGuide = careGuide.map((group) => ({
  ...group,
  sections: group.sections.map((section, index) => ({
    ...section,
    icon: icons[group.id][index],
  })),
}));
