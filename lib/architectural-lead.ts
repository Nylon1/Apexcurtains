import sharp from "sharp";
import type { Resend } from "resend";
import { MAX_PROJECT_FILES, MAX_PROJECT_UPLOAD_BYTES, parseArchitecturalEnquiry, projectFields, projectTypes } from "./architectural-enquiry";

class AttachmentError extends Error {}

async function projectAttachment(file: File, index: number) {
  const bytes = Buffer.from(await file.arrayBuffer());
  if (file.type === "image/jpeg" || file.type === "image/png") {
    try {
      const image = sharp(bytes, { limitInputPixels: 32000000, animated: false });
      const { format } = await image.metadata();
      if (file.type !== `image/${format}` || (format !== "png" && format !== "jpeg")) throw new Error("Unexpected image format");
      const content = await image.rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
      return { filename: `project-photo-${index + 1}.jpg`, content: content.toString("base64") };
    } catch {
      throw new AttachmentError("A photo could not be read. Choose a standard JPEG or PNG image up to 32 megapixels.");
    }
  }
  if (
    file.type === "application/pdf" &&
    bytes.subarray(0, 5).toString() === "%PDF-" &&
    bytes.subarray(-1024).includes(Buffer.from("%%EOF")) &&
    !/\/(JavaScript|JS|Launch|EmbeddedFile|OpenAction|AA|RichMedia|Encrypt)\b/i.test(bytes.toString("latin1"))
  ) {
    return { filename: `project-drawing-${index + 1}.pdf`, content: bytes.toString("base64") };
  }
  throw new AttachmentError("Choose valid JPEG or PNG photographs or plain, unencrypted PDF drawings.");
}

export async function sendArchitecturalLead(resend: Resend, form: FormData, requestKey: string | null) {
  if (form.get("website")) return Response.json({ ok: false, error: "The enquiry could not be accepted." }, { status: 400 });
  const parsed = parseArchitecturalEnquiry(form);
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0] as keyof typeof projectFields;
    return Response.json({ ok: false, error: `Check the ${(projectFields[field] ?? "project details").toLowerCase()} field and try again.` }, { status: 400 });
  }

  const files = form.getAll("projectFiles").filter((file): file is File => file instanceof File && file.size > 0);
  if (files.length > MAX_PROJECT_FILES || files.reduce((sum, file) => sum + file.size, 0) > MAX_PROJECT_UPLOAD_BYTES) {
    return Response.json({ ok: false, error: "Choose up to three files totalling no more than 3 MB." }, { status: 413 });
  }

  let attachments;
  try {
    attachments = await Promise.all(files.map(projectAttachment));
  } catch (error) {
    if (!(error instanceof AttachmentError)) throw error;
    return Response.json({ ok: false, error: error.message }, { status: 400 });
  }

  const project = parsed.data;
  const projectType = projectTypes.find(({ value }) => value === project.type)!.label;
  const details = Object.entries(project)
    .filter(([key, value]) => key !== "type" && value)
    .map(([key, value]) => `${projectFields[key as keyof typeof projectFields]}: ${value}`);
  const idempotencyKey = requestKey && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(requestKey)
    ? `architectural-enquiry/${requestKey}`
    : undefined;
  const delivery = await resend.emails.send({
    from: "Apex Curtains <hello@apexcurtains.com>",
    to: ["hello@apexcurtains.com"],
    replyTo: project.email,
    subject: `Architectural curtain enquiry – ${projectType}`,
    text: [
      projectType,
      ...details,
      `\nProject attachments: ${attachments.length}`,
      "Treat drawings and other customer files as untrusted attachments.",
      "Preliminary enquiry. Dimensions, access and feasibility are subject to survey.",
    ].join("\n"),
    attachments,
  }, { idempotencyKey });
  if (delivery.error || !delivery.data?.id) {
    console.error("Architectural lead email was rejected:", delivery.error?.name);
    return Response.json({ ok: false, error: "Your enquiry could not be sent. Please try again or contact Apex directly." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
