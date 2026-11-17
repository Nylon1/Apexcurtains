import { Resend } from "resend";
import {
  requireStaff,
  getJob,
  getDeliveries,
  apiError,
  checkOrigin,
  AtelierError,
} from "@/lib/atelier/server";
import { documentSource, generateDocument } from "@/lib/atelier/documents";
import type { DocumentKind } from "@/lib/atelier/model";
export const runtime = "nodejs";
export const maxDuration = 300;
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    checkOrigin(req);
    const { db } = await requireStaff();
    if (!process.env.RESEND_API_KEY)
      throw new AtelierError(
        "Email delivery is not configured yet. You can still download the documents.",
        503,
      );
    const job = await getJob((await ctx.params).id, db);
    if (job.approved_version !== job.version || job.status === "draft")
      throw new AtelierError("Approve the latest version before sending.", 409);
    const source = await documentSource(job, job.version);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data: rows, error } = await db
      .from("apex_atelier_deliveries")
      .select("*")
      .eq("job_id", job.id)
      .eq("revision", job.version);
    if (error) throw error;
    for (const row of rows ?? []) {
      if (row.status === "sent") continue;
      // Do not race an in-flight request. Uncertain sends reuse the same provider key for at most 23h.
      if (
        row.status === "sending" &&
        Date.now() - Date.parse(row.started_at) < 300000
      )
        continue;
      if (
        row.first_attempt_at &&
        Date.now() - Date.parse(row.first_attempt_at) > 23 * 3600000
      ) {
        await db
          .from("apex_atelier_deliveries")
          .update({
            status: "uncertain",
            error:
              "The retry window has passed. Check the email provider log before sending again.",
          })
          .eq("id", row.id);
        continue;
      }
      const query = db
        .from("apex_atelier_deliveries")
        .update({
          status: "sending",
          started_at: new Date().toISOString(),
          error: null,
        })
        .eq("id", row.id)
        .eq("status", row.status);
      const { data: claim, error: claimError } = await (
        row.started_at
          ? query.eq("started_at", row.started_at)
          : query.is("started_at", null)
      )
        .select()
        .maybeSingle();
      if (claimError) throw claimError;
      if (!claim) continue;
      let attempted = false;
      try {
        const kind = row.kind as DocumentKind;
        const pdfPath = `${job.id}/documents/v${job.version}-${kind}.pdf`;
        let pdf: Buffer;
        if (row.pdf_path) {
          const download = await db.storage
            .from("apex-atelier")
            .download(row.pdf_path);
          if (download.error || !download.data)
            throw new Error("Saved document unavailable");
          pdf = Buffer.from(await download.data.arrayBuffer());
        } else {
          pdf = await generateDocument(kind, source);
          const upload = await db.storage
            .from("apex-atelier")
            .upload(pdfPath, pdf, {
              contentType: "application/pdf",
              upsert: true,
            });
          if (upload.error) throw upload.error;
          const saved = await db
            .from("apex_atelier_deliveries")
            .update({ pdf_path: pdfPath })
            .eq("id", row.id);
          if (saved.error) throw saved.error;
        }
        const title =
          kind === "brochure"
            ? "Your personal curtain collection"
            : kind === "workroom"
              ? "Your workroom schedule"
              : "Your installation pack";
        const body =
          kind === "brochure"
            ? `Dear ${job.data.customerName},\n\nThank you for choosing Apex Curtains. Your personal collection is attached, bringing together your chosen details, colour inspiration, aftercare and a 10% voucher for any future order.\n\nIf you would like to discuss any detail, simply reply to this email.`
            : `Please find the approved ${kind === "workroom" ? "workroom schedule" : "installation pack"} for ${job.reference}, version ${job.version}. Use the room and window labels throughout. This version supersedes earlier documents for this job.`;
        const attemptRecord = await db
          .from("apex_atelier_deliveries")
          .update({
            first_attempt_at: row.first_attempt_at ?? new Date().toISOString(),
          })
          .eq("id", row.id);
        if (attemptRecord.error) throw attemptRecord.error;
        attempted = true;
        const result = await resend.emails.send(
          {
            from: "Apex Curtains <hello@apexcurtains.com>",
            to: row.recipient,
            replyTo: "hello@apexcurtains.com",
            subject: `${title} · ${job.reference} · v${job.version}`,
            text: `${body}\n\nApex Curtains\n0800 772 0367\nwww.apexcurtains.com`,
            html: `<html lang="en"><body style="background:#f7f3ec;padding:32px;font:16px/1.7 Georgia,serif;color:#183341"><p style="letter-spacing:3px;font:12px Arial,sans-serif">APEX CURTAINS</p><h1>${escape(title)}</h1><p>${escape(body).replaceAll("\n", "<br>")}</p><p>Warm regards,<br>Apex Curtains<br>0800 772 0367</p></body></html>`,
            attachments: [
              {
                filename: `${job.reference}-${kind}-v${job.version}.pdf`,
                content: pdf,
              },
            ],
          },
          { idempotencyKey: `atelier-${row.id}` },
        );
        if (result.error) throw new Error(result.error.message);
        const saved = await db
          .from("apex_atelier_deliveries")
          .update({
            status: "sent",
            provider_id: result.data?.id,
            sent_at: new Date().toISOString(),
            error: null,
          })
          .eq("id", row.id);
        if (saved.error) throw saved.error;
      } catch {
        await db
          .from("apex_atelier_deliveries")
          .update({
            status: attempted ? "uncertain" : "failed",
            error: attempted
              ? "Delivery could not be confirmed. Retry within 23 hours uses the same email reference."
              : "Document preparation failed. Please retry; no email was submitted.",
          })
          .eq("id", row.id);
      }
    }
    return Response.json({ deliveries: await getDeliveries(job.id, db) });
  } catch (e) {
    return apiError(e);
  }
}
