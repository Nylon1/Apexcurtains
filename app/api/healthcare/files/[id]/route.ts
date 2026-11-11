import { z } from "zod";
import { requireStaff, healthcareDb } from "@/lib/healthcare/server";
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireStaff();
    const { id } = await params;
    if (!z.uuid().safeParse(id).success)
      return new Response("Not found", { status: 404 });
    const db = healthcareDb();
    const { data: file, error } = await db
      .from("healthcare_enquiry_files")
      .select("path,name,mime_type")
      .eq("id", id)
      .single();
    if (error || !file) return new Response("Not found", { status: 404 });
    const { data, error: downloadError } = await db.storage
      .from("healthcare-enquiries")
      .download(file.path);
    if (downloadError || !data)
      return new Response("File unavailable", { status: 503 });
    return new Response(data, {
      headers: {
        "Content-Type": file.mime_type,
        "Content-Disposition": `attachment; filename="${file.name.replace(/[^a-zA-Z0-9_.-]/g, "_")}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "sandbox",
      },
    });
  } catch {
    return new Response("Authorised Apex staff access required", {
      status: 403,
    });
  }
}
