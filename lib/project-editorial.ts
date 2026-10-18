// Conservative public presentation corrections. Source records remain editable in
// the admin; corrected records pass through once the conflicting wording is gone.
export type EditorialProject = {
  slug?: string | null;
  title?: string | null;
  summary?: string | null;
  brief?: string | null;
  challenge?: string | null;
  solution?: string | null;
  result?: string | null;
  heading?: string | null;
  lining?: string | null;
  tags?: string[] | null;
};

export function reconcileProject<T extends EditorialProject>(source: T): T {
  const project = { ...source };
  const prose = [
    "title",
    "summary",
    "brief",
    "challenge",
    "solution",
    "result",
  ] as const;
  const text = prose.map((key) => project[key] || "").join(" ");
  if (project.heading === "Pincbh Pleat") project.heading = "Pinch Pleat";

  const combined = `${project.heading || ""} ${text} ${(project.tags || []).join(" ")}`;
  if (/pinch pleat/i.test(combined) && /pencil pleat/i.test(combined)) {
    // Neither conflicting specification is treated as verified.
    project.heading = "";
    for (const key of prose) {
      if (project[key])
        project[key] = project[key]!.replace(
          /(?:double\s+)?(?:pinch|pencil) pleat/gi,
          "bespoke",
        );
    }
    project.tags = project.tags?.filter(
      (tag) => !/(pinch|pencil)\s*pleat/i.test(tag),
    );
  }
  if (
    project.slug === "cheshire-apex-curtains-cheshire" &&
    /blackout stone/i.test(project.lining || "") &&
    /blue lining/i.test(text)
  ) {
    project.lining = "";
    for (const key of prose) {
      if (project[key])
        project[key] = project[key]!.replace(
          /,?\s*(?:and |with )?(?:matching |coordinated )?blue lining/gi,
          "",
        ).replace(/\s+,/g, ",");
    }
  }
  if (
    project.solution?.trim() &&
    project.solution.trim() === project.challenge?.trim()
  )
    project.solution = "";
  for (const key of prose) {
    if (project[key])
      project[key] = project[key]!.replace(
        /full blackout(?: when needed| for better sleep)?/gi,
        "improved light control",
      );
  }
  // The two legacy entries mix thermal claims with a different lining label.
  // Keep the common recorded blackout specification; do not guess the grade.
  if (
    [
      "apex-curtains-huddersfield-huddersfield",
      "apex-window-curtains-elegant-pinch-pleat-nottingham",
    ].includes(project.slug || "") &&
    /blackout (stone|charcoal grey)/i.test(project.lining || "")
  ) {
    for (const key of prose) {
      if (project[key])
        project[key] = project[key]!.replace(
          /blackout thermal lining/gi,
          "blackout lining",
        );
    }
  }
  if (
    project.slug === "apex-curtains-huddersfield-huddersfield" &&
    project.title === "apex-curtains-huddersfield"
  )
    project.title = "Apex Curtains in Huddersfield";
  if (
    project.slug === "apex-window-curtains-elegant-pinch-pleat-nottingham" &&
    project.brief?.endsWith("blackout performan")
  ) {
    project.brief =
      "The client wanted a balanced curtain design for an apex bedroom window, with improved privacy and light control.";
  }
  return project;
}
