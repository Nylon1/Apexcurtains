import { z } from "zod";

export const projectTypes = [
  { value: "residential", label: "Private residence" },
  { value: "commercial", label: "Professional or commercial project" },
  { value: "trade", label: "Curtain retailer or workroom" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["value"];
export const MAX_PROJECT_FILES = 3;
export const MAX_PROJECT_UPLOAD_BYTES = 3 * 1024 * 1024;

export function resolveProjectType(value: unknown): ProjectType {
  return projectTypes.find((type) => type.value === value)?.value ?? "residential";
}

const shortText = z.string().trim().max(150);
const notes = z.string().trim().max(1400);
const metres = z.union([
  z.literal(""),
  z.string().regex(/^(?:\d{1,2}(\.\d{0,2})?|\.\d{1,2})$/).refine((value) => Number(value) >= 0.1),
]);
const projectSchema = z.object({
  type: z.enum(["residential", "commercial", "trade"]),
  name: shortText.min(2),
  email: z.string().trim().max(254).pipe(z.email()),
  phone: shortText,
  postcode: z.string().trim().min(3).max(12),
  property: shortText.min(1),
  shape: shortText.min(1),
  width: metres,
  height: metres,
  ceiling: metres,
  drop: metres,
  windows: z.union([z.literal(""), z.string().regex(/^[1-9]\d{0,3}$/)]),
  heading: shortText,
  fabric: notes,
  lining: shortText,
  operation: shortText,
  controls: notes,
  tracks: notes,
  fixing: notes,
  access: notes,
  stairs: shortText,
  installation: shortText.min(1),
  timescale: shortText,
  company: shortText,
  role: shortText,
  tradeScope: shortText,
  requirements: notes,
}).superRefine((project, context) => {
  if (project.type === "trade" && (!project.company || !project.tradeScope)) {
    context.addIssue({ code: "custom", path: ["tradeScope"], message: "Enter your business and the trade support required." });
  }
});

export const projectFields: Record<keyof z.infer<typeof projectSchema>, string> = {
  type: "Project type",
  name: "Name",
  email: "Email",
  phone: "Phone",
  postcode: "Project postcode",
  property: "Property type",
  shape: "Window shape",
  width: "Window width (m)",
  height: "Window height (m)",
  ceiling: "Floor-to-ceiling height (m)",
  drop: "Proposed finished curtain drop (m)",
  windows: "Number of windows",
  heading: "Heading",
  fabric: "Fabric",
  lining: "Lining",
  operation: "Operation",
  controls: "Control requirements",
  tracks: "Existing tracks",
  fixing: "Fixing information",
  access: "Access restrictions",
  stairs: "Staircase / mezzanine",
  installation: "Installation requirements",
  timescale: "Timescale",
  company: "Business",
  role: "Role",
  tradeScope: "Trade support",
  requirements: "Further requirements",
};

export function parseArchitecturalEnquiry(form: FormData) {
  return projectSchema.safeParse(Object.fromEntries(
    Object.keys(projectFields).map((key) => [key, form.get(key) ?? ""]),
  ));
}
