import Link from "next/link";
import { requireStaff, healthcareDb } from "@/lib/healthcare/server";
import { updateEnquiry, retryNotification } from "./actions";
import { catalogue, isPublishable } from "@/lib/healthcare/catalogue";
import "../../professionals/healthcare/healthcare.css";
export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  await requireStaff();
  const { reference } = await searchParams;
  const db = healthcareDb();
  let query = db
    .from("healthcare_enquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);
  if (reference)
    query = query.eq("reference", reference.slice(0, 100).trim().toUpperCase());
  const { data, error } = await query;
  const ids = (data || []).map((e) => e.id);
  const { data: files } = ids.length
    ? await db
        .from("healthcare_enquiry_files")
        .select("id,enquiry_id,name,size")
        .in("enquiry_id", ids)
    : { data: [] };
  return (
    <main className="healthcare">
      <div className="hc-section">
        <p className="hc-eyebrow">Apex staff / Private enquiries</p>
        <h1>Healthcare projects.</h1>
        <form className="hc-form-grid">
          <label>
            Find an exact enquiry reference
            <input name="reference" defaultValue={reference} />
          </label>
          <div className="hc-actions">
            <button className="hc-button">Find enquiry</button>
            <Link href="/admin/healthcare">Latest 50</Link>
          </div>
        </form>
        {error && (
          <p className="hc-errors">
            Healthcare storage is not available in this environment. Apply the
            reviewed migration before enabling the enquiry service.
          </p>
        )}
        {data?.length === 0 && <p>No matching enquiries.</p>}
        {data?.map((e) => (
          <details key={e.id}>
            <summary>
              <strong>{e.reference}</strong> · {e.data.company} ·{" "}
              {e.followup_status} · notification {e.notification_status}
            </summary>
            <div className="hc-detail-grid">
              <section>
                <h2>{e.data.company}</h2>
                <p>
                  {e.data.name} · {e.data.email} · {e.data.phone}
                </p>
                <p>
                  Received: {e.created_at} · storage status {e.status}
                </p>
                <dl>
                  {Object.entries(e.data)
                    .filter(
                      ([k]) =>
                        ![
                          "items",
                          "company",
                          "name",
                          "email",
                          "phone",
                        ].includes(k),
                    )
                    .map(([k, v]) => (
                      <div key={k}>
                        <dt>
                          <strong>{k}</strong>
                        </dt>
                        <dd>{Array.isArray(v) ? v.join(", ") : String(v)}</dd>
                      </div>
                    ))}
                </dl>
                <h3>Products</h3>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                    fontSize: 13,
                  }}
                >
                  {JSON.stringify(e.data.items, null, 2)}
                </pre>
                <h3>Private attachments</h3>
                <p className="hc-small">
                  Treat files as untrusted. PDFs are not malware-certified; use
                  the organisation’s protected document viewer. Attachments are
                  never public.
                </p>
                <ul>
                  {files
                    ?.filter((f) => f.enquiry_id === e.id)
                    .map((f) => (
                      <li key={f.id}>
                        <a href={`/api/healthcare/files/${f.id}`}>{f.name}</a> ·{" "}
                        {Math.ceil(f.size / 1024)} KB
                      </li>
                    ))}
                </ul>
                <p>
                  Notification: {e.notification_status} {e.notification_error}
                </p>
                {e.notification_status !== "sent" && (
                  <form action={retryNotification}>
                    <input type="hidden" name="id" value={e.id} />
                    <button className="hc-button">
                      Retry notification safely
                    </button>
                  </form>
                )}
              </section>
              <form action={updateEnquiry} className="hc-form">
                <input type="hidden" name="id" value={e.id} />
                <label>
                  Follow-up status
                  <select name="status" defaultValue={e.followup_status}>
                    {["new", "reviewing", "quoted", "closed"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Staff notes
                  <textarea
                    name="notes"
                    defaultValue={e.staff_notes}
                    maxLength={10000}
                  />
                </label>
                <label>
                  Customer-approved room & track specification
                  <textarea
                    name="specification"
                    defaultValue={e.approved_specification || ""}
                    maxLength={15000}
                    placeholder="Room identifiers, dimensions, exact product/hook/track references, quantities and revision"
                  />
                </label>
                <label className="hc-check">
                  <input type="checkbox" name="customerApproved" />
                  The customer has approved these specification details for
                  repeat quotations.
                </label>
                <p className="hc-small">
                  Retention requested:{" "}
                  {e.data.retainSpecification
                    ? "Yes"
                    : "No — do not save a repeat specification"}
                  . Last approval: {e.approved_at || "None"}. Confirm
                  availability and changes before a repeat order.
                </p>
                <button className="hc-button">Save follow-up</button>
              </form>
            </div>
          </details>
        ))}
        <section className="hc-section">
          <h2>Catalogue review</h2>
          <p>
            {catalogue.filter(isPublishable).length} published records.{" "}
            {catalogue.filter((p) => !isPublishable(p)).length} withheld. Update
            the authorised JSON/CSV import and submit a reviewed pull request;
            technical and image approval are required before publication.
          </p>
          <div className="hc-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Product / reference</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {catalogue.map((p) => (
                  <tr key={p.id}>
                    <td>{p.supplier}</td>
                    <td>
                      {p.name} · {p.reference}
                    </td>
                    <td>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
