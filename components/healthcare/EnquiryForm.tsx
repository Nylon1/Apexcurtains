"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { enquiryChoices, MAX_UPLOAD_BYTES } from "@/lib/healthcare/enquiry";
import { getProduct, HEALTHCARE_ROOT } from "@/lib/healthcare/catalogue";
import { useShortlist } from "./Shortlist";

export default function EnquiryForm({ setting }: { setting?: string }) {
  const { items, setItems, ready } = useShortlist();
  const requestId = useRef<string>("");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [reference, setReference] = useState("");
  const errorsRef = useRef<HTMLDivElement>(null);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    setErrors([]);
    const form = new FormData(event.currentTarget);
    const files = form
      .getAll("files")
      .filter((f): f is File => f instanceof File && f.size > 0);
    if (
      files.length > 3 ||
      files.reduce((n, f) => n + f.size, 0) > MAX_UPLOAD_BYTES
    ) {
      setErrors(["Choose up to three files, totalling no more than 3 MB."]);
      errorsRef.current?.focus();
      return;
    }
    requestId.current ||= crypto.randomUUID();
    form.set("requestId", requestId.current);
    form.set("items", JSON.stringify(items));
    setBusy(true);
    try {
      const res = await fetch("/api/healthcare/enquiries", {
        method: "POST",
        body: form,
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        if (res.status === 409) requestId.current = "";
        throw new Error(
          result.error || "Your enquiry could not be sent. Please try again.",
        );
      }
      setReference(result.reference);
      setItems([]);
    } catch (e) {
      setErrors([
        e instanceof Error
          ? e.message
          : "Connection interrupted. Your entries are still here; please try again.",
      ]);
      requestAnimationFrame(() => errorsRef.current?.focus());
    } finally {
      setBusy(false);
    }
  };
  if (reference)
    return (
      <div className="hc-success" role="status">
        <p className="hc-eyebrow">Your project starts here</p>
        <h2>Thank you. Your enquiry is saved.</h2>
        <p>
          Your reference is <strong>{reference}</strong>. Keep it for follow-up
          or future supply enquiries. The Apex team will review your
          requirements and confirm the next steps.
        </p>
        <p>This is a project enquiry, not an order or a confirmed quotation.</p>
        <Link className="hc-button" href={HEALTHCARE_ROOT}>
          Return to healthcare →
        </Link>
      </div>
    );
  return (
    <form className="hc-form" onSubmit={submit} aria-busy={busy}>
      <div
        ref={errorsRef}
        tabIndex={-1}
        role={errors.length ? "alert" : undefined}
      >
        {errors.length > 0 && (
          <div className="hc-errors">
            <strong>Please check your enquiry</strong>
            <ul>
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p>
              Your entered details have been kept. You can also call{" "}
              <a href="tel:08007720367">0800 772 0367</a>.
            </p>
          </div>
        )}
      </div>
      <div className="hc-honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" autoComplete="off" tabIndex={-1} />
        </label>
      </div>
      <fieldset>
        <legend>Your project shortlist</legend>
        {items.length ? (
          items.map((i) => {
            const p = getProduct(i.id);
            return (
              p && (
                <div key={`${i.id}-${i.sample}`} className="hc-selected-item">
                  <p>
                    {p.supplier} · {p.name}
                    <span>
                      {p.reference} · {p.colour}{" "}
                      {i.sample ? "· Sample request" : ""}
                    </span>
                  </p>
                  <label>
                    Quantity
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={i.quantity}
                      onChange={(e) =>
                        setItems(
                          items.map((v) =>
                            v.id === i.id && v.sample === i.sample
                              ? {
                                  ...v,
                                  quantity: Math.max(
                                    1,
                                    Math.min(
                                      10000,
                                      Number(e.target.value) || 1,
                                    ),
                                  ),
                                }
                              : v,
                          ),
                        )
                      }
                    />
                  </label>
                  <button
                    className="hc-text-button"
                    type="button"
                    aria-label={`Remove ${p.name}${i.sample ? " sample" : ""}`}
                    onClick={() =>
                      setItems(
                        items.filter(
                          (v) => v.id !== i.id || v.sample !== i.sample,
                        ),
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              )
            );
          })
        ) : (
          <p>
            No products selected yet. You can enquire without a shortlist, or{" "}
            <Link href={`${HEALTHCARE_ROOT}/fabrics`} className="hc-text-link">
              browse the fabric collection
            </Link>
            .
          </p>
        )}
      </fieldset>
      <fieldset>
        <legend>What can we help with?</legend>
        <p>Select all that apply.</p>
        <div className="hc-choices">
          {enquiryChoices.map((choice) => (
            <label className="hc-check" key={choice}>
              <input type="checkbox" name="categories" value={choice} />
              {choice}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Your organisation</legend>
        <div className="hc-form-grid">
          <label>
            Practice or company name *
            <input
              name="company"
              required
              maxLength={300}
              autoComplete="organization"
            />
          </label>
          <label>
            Contact name *
            <input name="name" required maxLength={300} autoComplete="name" />
          </label>
          <label>
            Business email *
            <input
              type="email"
              name="email"
              required
              maxLength={254}
              autoComplete="email"
            />
          </label>
          <label>
            Telephone *
            <input
              type="tel"
              name="phone"
              required
              minLength={7}
              maxLength={40}
              autoComplete="tel"
            />
          </label>
          <label>
            Site postcode *
            <input
              name="postcode"
              required
              minLength={3}
              maxLength={16}
              autoComplete="postal-code"
            />
          </label>
          <label>
            Type of healthcare facility *
            <input
              name="facility"
              required
              maxLength={300}
              defaultValue={setting || ""}
              placeholder="For example, dental practice"
              list="hc-facilities"
            />
          </label>
          <datalist id="hc-facilities">
            {[
              "Dental practice",
              "GP surgery",
              "Hospital",
              "Private clinic",
              "Physiotherapy centre",
              "Care home",
              "Diagnostic centre",
              "Healthcare contractor",
            ].map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>
        </div>
      </fieldset>
      <fieldset>
        <legend>The rooms & requirements</legend>
        <div className="hc-form-grid">
          <label>
            Number of rooms or bays
            <input name="rooms" maxLength={20} inputMode="numeric" />
          </label>
          <label>
            Approximate quantity
            <input
              name="quantity"
              maxLength={300}
              placeholder="For example, 12 curtains and 6 blinds"
            />
          </label>
          <label className="hc-wide">
            Approximate widths and drops
            <input
              name="dimensions"
              maxLength={300}
              placeholder="Include units and room references; final sizes will be confirmed"
            />
          </label>
          <label>
            Service required *
            <select name="service" required defaultValue="Advice on scope">
              <option>Advice on scope</option>
              <option>Supply only</option>
              <option>Supply and installation</option>
            </select>
          </label>
          <label>
            Project timescale *
            <input
              name="timescale"
              required
              maxLength={300}
              placeholder="Target date or planning stage"
            />
          </label>
          <label>
            Preferred fabric, colour or product
            <input name="preferredProduct" maxLength={300} />
          </label>
          <label>
            Existing track type, if known
            <input
              name="existingTrack"
              maxLength={300}
              placeholder="Manufacturer, model or hook description"
            />
          </label>
          <label>
            Previous enquiry / order reference
            <input name="previousReference" maxLength={300} />
          </label>
          <label className="hc-wide">
            Additional requirements
            <textarea
              name="requirements"
              maxLength={5000}
              placeholder="Cleaning requirements, access, phasing, sample requests or technical documents needed"
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Plans & photographs</legend>
        <p>
          Attach site photographs, architectural drawings, room plans or
          measurement sketches. Up to three PDF, JPEG or PNG files, 3 MB total.
        </p>
        <p id="hc-file-guidance">
          <strong>Do not upload patient-identifiable information.</strong>{" "}
          Remove names, faces, records and other confidential clinical details.
          Uploaded images have metadata removed and files are held privately for
          Apex staff.
        </p>
        <label>
          Supporting documents
          <input
            type="file"
            name="files"
            multiple
            accept="image/jpeg,image/png,application/pdf"
            aria-describedby="hc-file-guidance"
          />
        </label>
      </fieldset>
      <label className="hc-check">
        <input type="checkbox" name="retainSpecification" /> Please retain the
        room and track specification we subsequently approve for future
        quotations. No patient information should be included.
      </label>
      <label className="hc-check">
        <input type="checkbox" name="privacyAccepted" required />
        <span>
          I understand Apex will use these details to respond to this enquiry,
          as described in the{" "}
          <Link href="/privacy-policy" className="hc-text-link">
            privacy policy
          </Link>
          . *
        </span>
      </label>
      <p className="hc-small">
        Your shortlist is stored on this device. Contact details are sent
        securely when you submit. Fields marked * are required.
      </p>
      <button className="hc-button" type="submit" disabled={busy || !ready}>
        {busy ? "Saving your enquiry…" : "Send healthcare enquiry →"}
      </button>
    </form>
  );
}
