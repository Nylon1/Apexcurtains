"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { MAX_PROJECT_FILES, MAX_PROJECT_UPLOAD_BYTES, projectTypes, resolveProjectType, type ProjectType } from "@/lib/architectural-enquiry";

function SelectField({ name, label, options, required }: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label>{label}
      <select name={name} defaultValue="" required={required}>
        <option value="">{required ? "Please select" : "Not sure / not specified"}</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

const dimensions = [
  ["width", "Window width"],
  ["height", "Window height"],
  ["ceiling", "Floor-to-ceiling height"],
  ["drop", "Proposed curtain drop"],
];

const steps = [
  { title: "Your project", detail: "Tell us what kind of space and window you’re working with." },
  { title: "Curtains and fitting", detail: "Share the decisions you’ve already made. Leave the rest for the consultation." },
  { title: "Contact and files", detail: "Let us know how to reach you. Photos and drawings are welcome." },
];

export default function ProjectPlanner({ initialType }: { initialType: ProjectType }) {
  const [stage, setStage] = useState(0);
  const [type, setType] = useState(initialType);
  const [operation, setOperation] = useState("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const submissionKey = useRef<string | undefined>(undefined);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const finalStage = stage === steps.length - 1;

  function moveTo(next: number) {
    setStage(next);
    setError("");
    requestAnimationFrame(() => stepHeading.current?.focus());
  }

  function firstInvalid(form: HTMLFormElement, checkAll: boolean) {
    const controls = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      checkAll ? "[data-stage] :is(input,select,textarea)" : `[data-stage="${stage}"] :is(input,select,textarea)`,
    )];
    return controls.find((control) => control.willValidate && !control.validity.valid);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const currentForm = event.currentTarget;
    const invalid = firstInvalid(currentForm, finalStage);
    if (invalid) {
      const invalidStage = Number(invalid.closest<HTMLElement>("[data-stage]")?.dataset.stage);
      if (invalidStage !== stage) moveTo(invalidStage);
      const options = invalid.closest("details");
      if (options) options.open = true;
      requestAnimationFrame(() => invalid.reportValidity());
      return;
    }
    if (!finalStage) {
      moveTo(stage + 1);
      return;
    }

    const body = new FormData(currentForm);
    const files = body.getAll("projectFiles").filter((file): file is File => file instanceof File && file.size > 0);
    if (files.length > MAX_PROJECT_FILES || files.reduce((sum, file) => sum + file.size, 0) > MAX_PROJECT_UPLOAD_BYTES) {
      setError("Choose up to three files totalling no more than 3 MB.");
      return;
    }
    setSending(true);
    setError("");

    try {
      submissionKey.current ??= globalThis.crypto?.randomUUID?.();
      const headers = submissionKey.current ? { "Idempotency-Key": submissionKey.current } : undefined;
      const response = await fetch("/api/send-lead", { method: "POST", body, headers });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        setError(result?.error ?? "Your enquiry could not be sent. Please try again or contact Apex directly.");
        return;
      }
      setSent(true);
      requestAnimationFrame(() => stepHeading.current?.focus());
      const detail = { event: "architectural_project_enquiry_sent", project_type: type };
      window.dataLayer?.push(detail);
      window.dispatchEvent(new CustomEvent("apex:conversion", { detail }));
    } catch {
      setError("The connection was interrupted. Your details are still here for you to try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="arch-wrap arch-planner" id="project-details" aria-label="Project enquiry">
      {sent ? (
        <div className="arch-confirmation">
          <h2 ref={stepHeading} tabIndex={-1}>Your enquiry has been sent.</h2>
          <p>Apex will review the information you provided and contact you about the next step.</p>
          <Link href="/gallery" className="studio-link">Explore finished projects <span aria-hidden="true">↗</span></Link>
        </div>
      ) : (
        <>
          <div className="arch-progress">
            <ol aria-label="Consultation progress">
              {steps.map(({ title }, index) => (
                <li key={title} aria-current={index === stage ? "step" : undefined} data-complete={index < stage}>
                  <span>{index + 1}</span> {title}
                </li>
              ))}
            </ol>
          </div>
          <div className="arch-form-heading">
            <h2 ref={stepHeading} tabIndex={-1}>{steps[stage].title}</h2>
            <p>{steps[stage].detail}</p>
          </div>
          <noscript><p>JavaScript is needed for this guided form. You can also <Link href="/contact">contact Apex directly</Link>.</p></noscript>
          <form onSubmit={submit} onChange={() => { submissionKey.current = undefined; }} method="post" action="/api/send-lead" encType="multipart/form-data" aria-busy={sending} noValidate>
            <input type="hidden" name="journey" value="architectural" />
            <label className="arch-trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <fieldset data-stage={0} hidden={stage !== 0} disabled={sending} aria-label="Property and window">
              <div className="arch-fields">
                <label className="arch-full">Project type
                  <select name="type" value={type} onChange={(event) => setType(resolveProjectType(event.target.value))}>
                    {projectTypes.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <SelectField name="property" label="Property type" options={["House", "Apartment or penthouse", "Barn conversion", "Hotel or hospitality", "Commercial or public building", "Other / not yet known"]} required />
                <SelectField name="shape" label="Window shape" options={["Rectangular", "Apex or gable", "Triangular", "Single slope or angled", "Curved or bay", "Mixed / not yet known"]} required />
                <label>Project postcode <input name="postcode" autoComplete="postal-code" minLength={3} maxLength={12} required /></label>
                <label>Number of windows (optional) <input name="windows" type="number" inputMode="numeric" min="1" max="9999" step="1" /></label>
                {type !== "residential" && (
                  <>
                    <label>Business or practice <input name="company" autoComplete="organization" maxLength={150} required={type === "trade"} /></label>
                    <label>Your role (optional) <input name="role" autoComplete="organization-title" maxLength={150} /></label>
                  </>
                )}
                {type === "trade" && <SelectField name="tradeScope" label="Trade support needed" options={["Manufacture only", "Technical consultation", "Track or motor supply", "Survey and installation", "Complete subcontracted project", "Scope to discuss"]} required />}
              </div>
              <details className="studio-disclosure arch-optional">
                <summary>Add approximate measurements</summary>
                <p className="arch-hint">Enter what you know in metres. Window height measures the opening. Curtain drop measures from the intended hanging point to the hem.</p>
                <div className="arch-fields">
                  {dimensions.map(([name, label]) => (
                    <label key={name}>{label} (m)<input name={name} type="number" inputMode="decimal" min=".1" max="99.99" step=".01" /></label>
                  ))}
                </div>
              </details>
            </fieldset>
            <fieldset data-stage={1} hidden={stage !== 1} disabled={sending} aria-label="Curtain and installation">
              <div className="arch-fields">
                <SelectField name="installation" label="Installation requirements" options={["Survey and installation", "Installation only", "Manufacture or supply only", "To be agreed"]} required />
                <label>Operation
                  <select name="operation" value={operation} onChange={(event) => setOperation(event.target.value)}>
                    <option value="">Not sure / not specified</option>
                    <option>Manual</option><option>Motorised</option><option>Mixed</option>
                  </select>
                </label>
                {(operation === "Motorised" || operation === "Mixed") && (
                  <label className="arch-full">Controls and power, where known
                    <textarea name="controls" maxLength={1400} placeholder="Wall control, remote, app, smart home or building controls" />
                  </label>
                )}
                <label>Project timescale <input name="timescale" maxLength={150} /></label>
                <label>Staircase or mezzanine
                  <select name="stairs" defaultValue="">
                    <option value="">Not sure / not specified</option>
                    <option>Staircase or sloping access</option><option>Mezzanine or upper landing</option><option>Both</option><option>Neither</option>
                  </select>
                </label>
              </div>
              <details className="studio-disclosure arch-optional">
                <summary>Add fabric, track or access details</summary>
                <div className="arch-fields">
                  <SelectField name="heading" label="Preferred heading" options={["Wave", "Pinch pleat", "Pencil pleat", "Other / to discuss"]} />
                  <SelectField name="lining" label="Lining" options={["Unlined or voile", "Standard lining", "Blackout lining", "Thermal lining", "Other / to discuss"]} />
                  <label className="arch-full">Fabric and layering requirements <textarea name="fabric" maxLength={1400} /></label>
                  <label>Existing tracks <textarea name="tracks" maxLength={1400} /></label>
                  <label>Structural fixing information, if known <textarea name="fixing" maxLength={1400} /></label>
                  <label className="arch-full">Access restrictions <textarea name="access" maxLength={1400} placeholder="Lift or stair access, high ceilings, restricted working area" /></label>
                </div>
              </details>
            </fieldset>
            <fieldset data-stage={2} hidden={stage !== 2} disabled={sending} aria-label="Contact and files">
              <div className="arch-fields">
                <label>Name <input name="name" autoComplete="name" minLength={2} maxLength={150} required /></label>
                <label>Email <input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
                <label>Phone (optional) <input name="phone" type="tel" autoComplete="tel" maxLength={150} /></label>
                <label className="arch-full">Anything else we should know? <textarea name="requirements" maxLength={1400} /></label>
                <div className="arch-upload arch-full">
                  <label>Window photos and drawings (optional)
                    <input name="projectFiles" type="file" accept=".jpg,.jpeg,.png,.pdf" multiple aria-describedby="project-upload-help" onChange={(event) => setFileNames(Array.from(event.target.files ?? [], ({ name }) => name))} />
                  </label>
                  <p id="project-upload-help" className="arch-hint">Up to three JPEG, PNG or PDF files, 3 MB in total. Upload only material you are permitted to share.</p>
                  <div role="status">{fileNames.length > 0 && <ul>{fileNames.map((name,index) => <li key={`${index}-${name}`}>{name}</li>)}</ul>}</div>
                </div>
              </div>
              <p className="arch-privacy">We use these details to respond to your enquiry. Read our <Link href="/privacy-policy">privacy policy</Link>. Initial assessments are subject to a professional survey.</p>
            </fieldset>
            {error && <p role="alert">{error} <Link href="/contact">Contact Apex</Link></p>}
            <div className="arch-step-actions">
              {stage > 0 && <button type="button" className="studio-link" disabled={sending} onClick={() => moveTo(stage - 1)}>Back</button>}
              <button type="submit" className="arch-button" disabled={sending}>{sending ? "Sending your enquiry…" : finalStage ? "Send project enquiry" : "Continue"}</button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
