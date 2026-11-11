import { z } from "zod";
import { getProduct } from "./catalogue";

export const enquiryChoices = [
  "Reusable clinical curtains",
  "Forest medical tracks",
  "Clinical roller blinds",
  "Disposable curtains",
  "Complete healthcare screening package",
  "Replacement or maintenance",
] as const;
const shortText = z.string().trim().max(300);
export const enquirySchema = z.object({
  requestId: z.uuid(),
  company: shortText.min(2, "Enter the practice or company name."),
  name: shortText.min(2, "Enter a contact name."),
  email: z.email("Enter a valid business email.").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a contact telephone number.")
    .max(40)
    .regex(/^[+\d\s().-]+$/, "Check the telephone number."),
  postcode: z.string().trim().min(3, "Enter the site postcode.").max(16),
  facility: shortText.min(2, "Choose or describe the facility."),
  categories: z
    .array(z.enum(enquiryChoices))
    .min(1, "Select at least one product or service.")
    .max(6),
  rooms: z.string().trim().max(20),
  dimensions: shortText,
  quantity: shortText,
  service: z.enum([
    "Supply only",
    "Supply and installation",
    "Advice on scope",
  ]),
  preferredProduct: shortText,
  existingTrack: shortText,
  timescale: shortText.min(1, "Tell us your project timescale."),
  requirements: z.string().trim().max(5000),
  previousReference: shortText,
  retainSpecification: z.boolean(),
  privacyAccepted: z.literal(
    true,
    "Please acknowledge how your enquiry will be used.",
  ),
  website: z.string().max(0, "Unable to accept this submission."),
  items: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().int().min(1).max(10000),
        sample: z.boolean(),
      }),
    )
    .max(40),
});
export type HealthcareEnquiry = z.infer<typeof enquirySchema>;
export function snapshotItems(items: HealthcareEnquiry["items"]) {
  const seen = new Set<string>();
  return items.map((i) => {
    const p = getProduct(i.id);
    if (
      !p ||
      seen.has(`${i.id}:${i.sample}`) ||
      (i.sample && p.category === "tracks")
    )
      throw new Error(
        "A selected product is no longer available. Please refresh your shortlist.",
      );
    seen.add(`${i.id}:${i.sample}`);
    return {
      ...i,
      name: p.name,
      supplier: p.supplier,
      reference: p.reference,
      colourway: p.colour,
      colourReference: p.colourReference,
      verificationDate: p.verifiedAt,
    };
  });
}
export const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;
export const MAX_REQUEST_BYTES = MAX_UPLOAD_BYTES + 128 * 1024;
export class EnquiryError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export async function boundedFormData(req: Request) {
  if (!req.headers.get("content-type")?.startsWith("multipart/form-data;"))
    throw new EnquiryError("Please use the healthcare enquiry form.", 415);
  const reader = req.body?.getReader();
  if (!reader) throw new EnquiryError("The enquiry is empty.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_REQUEST_BYTES) {
      await reader.cancel();
      throw new EnquiryError("Files must total 3 MB or less.", 413);
    }
    chunks.push(value);
  }
  const body = new Uint8Array(length);
  let offset = 0;
  for (const c of chunks) {
    body.set(c, offset);
    offset += c.length;
  }
  try {
    return await new Response(body, {
      headers: { "Content-Type": req.headers.get("content-type")! },
    }).formData();
  } catch {
    throw new EnquiryError(
      "The uploaded form could not be read. Please try again.",
    );
  }
}
