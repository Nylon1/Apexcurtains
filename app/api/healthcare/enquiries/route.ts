import { createHash, createHmac } from "node:crypto";
import {
  enquirySchema,
  boundedFormData,
  snapshotItems,
  EnquiryError,
} from "@/lib/healthcare/enquiry";
import { validateUploads } from "@/lib/healthcare/uploads";
import {
  healthcareDb,
  checkHealthcareOrigin,
  notifyEnquiry,
} from "@/lib/healthcare/server";
export const runtime = "nodejs";
export const maxDuration = 30;
export async function POST(req: Request) {
  try {
    checkHealthcareOrigin(req);
    const form = await boundedFormData(req);
    let items: unknown;
    try {
      items = JSON.parse(String(form.get("items") || "[]"));
    } catch {
      throw new EnquiryError(
        "The product shortlist could not be read. Please refresh it.",
      );
    }
    const raw = Object.fromEntries(form.entries());
    const parsed = enquirySchema.safeParse({
      ...raw,
      items,
      categories: form.getAll("categories"),
      privacyAccepted: form.get("privacyAccepted") === "on",
      retainSpecification: form.get("retainSpecification") === "on",
    });
    if (!parsed.success)
      throw new EnquiryError(
        parsed.error.issues
          .map((i) => i.message)
          .slice(0, 5)
          .join(" "),
      );
    const enquiry = parsed.data;
    let snapshots;
    try {
      snapshots = snapshotItems(enquiry.items);
    } catch (e) {
      throw new EnquiryError(
        e instanceof Error ? e.message : "Please refresh your shortlist.",
      );
    }
    const uploads = await validateUploads(form);
    const { requestId, website: _website, ...details } = enquiry;
    void _website;
    const data = { ...details, items: snapshots };
    const fingerprint = createHash("sha256")
      .update(JSON.stringify({ data, files: uploads.map((f) => f.digest) }))
      .digest("hex");
    const secret =
      process.env.HEALTHCARE_SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!secret)
      throw new EnquiryError(
        "Enquiries are temporarily unavailable. Your details have been kept; please try again.",
        503,
      );
    const rateKey = createHmac("sha256", secret)
      .update(enquiry.email.toLowerCase())
      .digest("hex");
    const ipKey = createHmac("sha256", secret)
      .update(
        req.headers.get("x-vercel-forwarded-for")?.split(",")[0] ||
          req.headers.get("x-forwarded-for")?.split(",")[0] ||
          "local",
      )
      .digest("hex");
    const db = healthcareDb();
    const { data: result, error } = await db.rpc("healthcare_begin_enquiry", {
      p_id: requestId,
      p_fingerprint: fingerprint,
      p_data: data,
      p_rate_key: rateKey,
      p_ip_key: ipKey,
    });
    if (error)
      throw new EnquiryError(
        "Your enquiry could not be saved. Please try again or call Apex.",
        503,
      );
    if (result.error === "CONFLICT")
      throw new EnquiryError(
        "This enquiry changed after an earlier attempt. Please review the details and submit again to create a new reference.",
        409,
      );
    if (result.error === "RATE_LIMIT")
      throw new EnquiryError(
        "Several enquiries have been received recently. Please wait an hour or call Apex.",
        429,
      );
    if (result.error === "BUSY")
      throw new EnquiryError(
        "Your enquiry is still being processed. Please wait a moment and try again.",
        425,
      );
    if (!result.complete) {
      for (let i = 0; i < uploads.length; i++) {
        const file = uploads[i],
          path = `${requestId}/${file.name}`;
        const { error: uploadError } = await db.storage
          .from("healthcare-enquiries")
          .upload(path, file.bytes, { contentType: file.type, upsert: true });
        if (uploadError) {
          await db
            .from("healthcare_enquiries")
            .update({ lease_until: null })
            .eq("id", requestId);
          throw new EnquiryError(
            "A supporting file could not be saved. Your entries are still here; please retry.",
            503,
          );
        }
        const { error: assetError } = await db
          .from("healthcare_enquiry_files")
          .upsert(
            {
              enquiry_id: requestId,
              path,
              name: file.name,
              mime_type: file.type,
              size: file.bytes.length,
            },
            { onConflict: "path" },
          );
        if (assetError)
          throw new EnquiryError(
            "A file record could not be saved. Please retry.",
            503,
          );
      }
      const { error: finishError } = await db
        .from("healthcare_enquiries")
        .update({ status: "received", lease_until: null })
        .eq("id", requestId);
      if (finishError)
        throw new EnquiryError(
          "Your enquiry could not be finalised. Please retry.",
          503,
        );
    }
    await notifyEnquiry(requestId);
    return Response.json(
      { ok: true, reference: result.reference },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error:
          error instanceof EnquiryError
            ? error.message
            : "Your enquiry could not be completed. Your entries have been kept; please try again.",
      },
      {
        status: error instanceof EnquiryError ? error.status : 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
