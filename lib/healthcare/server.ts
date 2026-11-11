import "server-only";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { EnquiryError } from "./enquiry";
import { requireStaff } from "@/lib/atelier/server";

export { requireStaff };
export function healthcareDb() {
  // Dedicated staging credentials take precedence; production uses Apex's existing backend.
  const url =
    process.env.HEALTHCARE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.HEALTHCARE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key)
    throw new EnquiryError(
      "Enquiry storage is temporarily unavailable. Please try again or call Apex.",
      503,
    );
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
export function checkHealthcareOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (
    !origin ||
    origin !== new URL(req.url).origin ||
    req.headers.get("sec-fetch-site") === "cross-site"
  )
    throw new EnquiryError("Please submit from the Apex healthcare form.", 403);
}
export async function notifyEnquiry(id: string) {
  const db = healthcareDb();
  const { data: row, error } = await db
    .from("healthcare_enquiries")
    .select("id,reference,data,notification_status,created_at")
    .eq("id", id)
    .eq("status", "received")
    .single();
  if (error || !row)
    throw new EnquiryError("The saved enquiry could not be loaded.", 503);
  if (row.notification_status === "sent") return;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    await db
      .from("healthcare_enquiries")
      .update({
        notification_status: "failed",
        notification_error: "Email service not configured",
      })
      .eq("id", id);
    return;
  }
  // Start the provider retry window only when an actual send can be attempted.
  // Persistent claims prevent concurrent sends and blind retries after 24 hours.
  const { data: claim, error: claimError } = await db.rpc(
    "healthcare_claim_notification",
    { p_id: id },
  );
  if (claimError || !claim) return;
  const d = row.data;
  const lines = [
    `Healthcare enquiry ${row.reference}`,
    `Practice / company: ${d.company}`,
    `Contact: ${d.name}`,
    `Email: ${d.email}`,
    `Telephone: ${d.phone}`,
    `Site postcode: ${d.postcode}`,
    `Facility: ${d.facility}`,
    `Services: ${d.categories.join(", ")}`,
    `Scope: ${d.service}`,
    `Rooms: ${d.rooms}`,
    `Dimensions: ${d.dimensions}`,
    `Quantity: ${d.quantity}`,
    `Preferred product: ${d.preferredProduct}`,
    `Existing track: ${d.existingTrack}`,
    `Timescale: ${d.timescale}`,
    `Previous reference: ${d.previousReference}`,
    `Requirements: ${d.requirements}`,
    "",
    ...d.items.map(
      (i: {
        supplier: string;
        name: string;
        reference: string;
        colourway: string;
        quantity: number;
        sample: boolean;
      }) =>
        `${i.supplier} | ${i.name} | ${i.reference} | ${i.colourway} | quantity ${i.quantity}${i.sample ? " | sample request" : ""}`,
    ),
    "",
    "Private uploads and follow-up: https://www.apexcurtains.com/admin/healthcare",
    "Customer-approved repeat specifications must be recorded separately.",
  ];
  try {
    const result = await new Resend(apiKey).emails.send(
      {
        from: "Apex Curtains <hello@apexcurtains.com>",
        to: [
          process.env.HEALTHCARE_NOTIFICATION_TO || "hello@apexcurtains.com",
        ],
        replyTo: d.email,
        subject: `Healthcare project enquiry ${row.reference}`,
        text: lines.join("\n"),
      },
      { idempotencyKey: `healthcare-${id}` },
    );
    if (result.error || !result.data?.id)
      throw new Error("Email provider rejected the notification");
    await db
      .from("healthcare_enquiries")
      .update({
        notification_status: "sent",
        notification_error: null,
        provider_id: result.data?.id,
      })
      .eq("id", id);
  } catch {
    await db
      .from("healthcare_enquiries")
      .update({
        notification_status: "failed",
        notification_error:
          "Notification needs staff retry; enquiry is safely stored",
      })
      .eq("id", id);
  }
}
