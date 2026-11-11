"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  requireStaff,
  healthcareDb,
  notifyEnquiry,
} from "@/lib/healthcare/server";
export async function updateEnquiry(form: FormData) {
  const { user } = await requireStaff();
  const id = z.uuid().parse(form.get("id"));
  const status = z
    .enum(["new", "reviewing", "quoted", "closed"])
    .parse(form.get("status"));
  const notes = z
    .string()
    .max(10000)
    .parse(form.get("notes") || "");
  const specification = z
    .string()
    .max(15000)
    .parse(form.get("specification") || "");
  const db = healthcareDb();
  const { data: current, error: readError } = await db
    .from("healthcare_enquiries")
    .select("data,approved_specification")
    .eq("id", id)
    .single();
  if (readError) throw new Error("Unable to read this enquiry. Please retry.");
  const patch: Record<string, unknown> = {
    followup_status: status,
    staff_notes: notes,
  };
  if (specification !== (current.approved_specification || "")) {
    if (
      !current.data.retainSpecification ||
      form.get("customerApproved") !== "on"
    )
      throw new Error(
        "Record a repeat specification only after the customer has requested retention and approved its details.",
      );
    patch.approved_specification = specification;
    patch.approved_by = user.id;
    patch.approved_at = new Date().toISOString();
  }
  const { error } = await db
    .from("healthcare_enquiries")
    .update(patch)
    .eq("id", id);
  if (error) throw new Error("The update could not be saved. Please retry.");
  revalidatePath("/admin/healthcare");
}
export async function retryNotification(form: FormData) {
  await requireStaff();
  const id = z.uuid().parse(form.get("id"));
  await notifyEnquiry(id);
  revalidatePath("/admin/healthcare");
}
