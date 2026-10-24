import {
  approvalChecklist,
  windowSections,
  type Asset,
  type JobData,
  type SurveyCheck,
  type WindowSection,
} from "./model";

export type SurveyDestination = {
  step: "customer" | "windows" | "documents" | "delivery";
  windowId?: string;
  section?: WindowSection;
};

// Review remains available to inspect the checklist. Only completed surveys can
// advance to the documents; approval/send still use the server-side checklist.
export function navigationChecks(
  data: JobData,
  assets: Asset[],
  destination: SurveyDestination,
  demo = false,
): SurveyCheck[] {
  const checks = approvalChecklist(data, assets).filter(
    (check) =>
      check.step !== "delivery" && !(demo && check.section === "photos"),
  );
  if (destination.step === "customer" || destination.step === "delivery")
    return [];
  if (destination.step === "documents") return checks;
  const index = data.windows.findIndex((w) => w.id === destination.windowId);
  const sectionIndex = windowSections.findIndex(
    (s) => s.id === (destination.section ?? "measure"),
  );
  return checks.filter((check) => {
    if (check.step === "customer") return true;
    const checkIndex = data.windows.findIndex((w) => w.id === check.windowId);
    return (
      checkIndex < index ||
      (checkIndex === index &&
        windowSections.findIndex((s) => s.id === check.section) < sectionIndex)
    );
  });
}
