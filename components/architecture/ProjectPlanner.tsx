"use client";

import { CountPreference, useEnquiryCounts } from "@/components/analytics/EnquiryCounts";
import Link from "next/link";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { MAX_PROJECT_FILES, MAX_PROJECT_UPLOAD_BYTES, projectFields, projectTypes, resolveProjectType, type ProjectType } from "@/lib/architectural-enquiry";

import { projectFileError } from "@/lib/enquiry-upload";

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
  const counts = useEnquiryCounts("planner");
  const [stage, setStage] = useState(0);
  const [type, setType] = useState(initialType);
  const [operation, setOperation] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [brief, setBrief] = useState<Record<string, string>>({});
  const submissionKey = useRef<string | undefined>(undefined);
  const sendingLock = useRef(false);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const errorBox = useRef<HTMLDivElement>(null);
  const fileErrorBox = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const finalStage = stage === steps.length - 1;

  function focusHeading() {
    requestAnimationFrame(() => { stepHeading.current?.focus({ preventScroll: true }); (stepHeading.current?.closest("section")?.querySelector(".arch-progress") || stepHeading.current)?.scrollIntoView({ block: "start" }); });
  }
  function moveTo(next: number) { setStage(next); setError(""); focusHeading(); }
  function showError(message: string) {
    setError(message);
    requestAnimationFrame(() => { errorBox.current?.focus({ preventScroll: true }); errorBox.current?.scrollIntoView({ block: "center" }); });
  }
  function chooseFiles(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files || []); event.target.value = "";
    if (!selected.length) return;
    const accepted = [...files]; const rejected: string[] = [];
    for (const file of selected) {
      const invalid = projectFileError(file);
      if (invalid) { rejected.push(invalid); continue; }
      if (accepted.some(previous => previous.name === file.name && previous.size === file.size && previous.lastModified === file.lastModified)) continue;
      if (accepted.length >= MAX_PROJECT_FILES) { rejected.push(`${file.name}: not added. Choose up to three files.`); continue; }
      if (accepted.reduce((sum, item) => sum + item.size, file.size) > MAX_PROJECT_UPLOAD_BYTES) { rejected.push(`${file.name}: not added. The combined file limit is 3 MB. Choose a smaller file.`); continue; }
      accepted.push(file);
    }
    setFiles(accepted); setFileError(rejected.join(" ")); submissionKey.current = undefined;
  }
  function firstInvalid(form: HTMLFormElement, checkAll: boolean) {
    const controls = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      checkAll ? "[data-stage] :is(input,select,textarea)" : `[data-stage="${stage}"] :is(input,select,textarea)`,
    )];
    return controls.find(control => control.willValidate && !control.validity.valid);
  }
  function reveal(control: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
    const target = Number(control.closest<HTMLElement>("[data-stage]")?.dataset.stage);
    if (Number.isInteger(target)) setStage(target);
    const details = control.closest("details"); if (details) details.open = true;
    requestAnimationFrame(() => { control.focus({ preventScroll: true }); control.scrollIntoView({ block: "center" }); control.reportValidity(); });
  }
  function snapshot(body: FormData) {
    setBrief(Object.fromEntries(Object.keys(projectFields).map(key => [key, String(body.get(key) || "")])));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingLock.current) return;
    const currentForm = event.currentTarget;
    const invalid = firstInvalid(currentForm, finalStage);
    if (invalid) { reveal(invalid); return; }
    const body = new FormData(currentForm);
    body.delete("projectFiles"); files.forEach(file => body.append("projectFiles", file));
    snapshot(body);
    if (!finalStage) {
      if (stage === 0) counts.record("start");
      moveTo(editing ? 2 : stage + 1); setEditing(false); return;
    }
    if (fileError) { requestAnimationFrame(() => { fileErrorBox.current?.focus(); }); return; }
    // Recheck before sending even though selection is checked immediately.
    if (files.length > MAX_PROJECT_FILES || files.reduce((sum, file) => sum + file.size, 0) > MAX_PROJECT_UPLOAD_BYTES) {
      setFileError("Choose up to three files totalling no more than 3 MB."); return;
    }
    sendingLock.current = true; setSending(true); setError("");
    try {
      submissionKey.current ??= globalThis.crypto?.randomUUID?.();
      const headers = submissionKey.current ? { "Idempotency-Key": submissionKey.current } : undefined;
      const response = await fetch("/api/send-lead", { method: "POST", body, headers });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        const message = (typeof result?.error === "string" && result.error) || "We couldn’t confirm your enquiry was sent. Your details are still here. Try again or contact Apex.";
        const field = typeof result?.field === "string" && Object.hasOwn(projectFields, result.field) ? currentForm.elements.namedItem(result.field) : null;
        if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
          setError(message); field.setAttribute("aria-invalid", "true"); field.setAttribute("aria-describedby", "planner-send-error"); reveal(field);
        } else showError(message);
        return;
      }
      counts.record("complete"); setSent(true); focusHeading();
    } catch { showError("We couldn’t confirm your enquiry was sent. Your details are still here. Try again or contact Apex."); }
    finally { sendingLock.current = false; setSending(false); }
  }
  const projectSummary = <dl className="arch-brief-summary">{Object.entries(brief).filter(([key, value]) => value && !["name", "email", "phone", "requirements"].includes(key)).map(([key, value]) => <div key={key}><dt>{projectFields[key as keyof typeof projectFields]}</dt><dd>{key === "type" ? projectTypes.find(item => item.value === value)?.label : value}</dd></div>)}</dl>;

  return (
    <section className="arch-wrap arch-planner" id="project-details" aria-label="Project enquiry">
      {sent ? (
        <div className="arch-confirmation">
          <h2 ref={stepHeading} tabIndex={-1}>Your enquiry has been sent.</h2>
          <p>Apex Curtains will review the information you provided and contact you about the next step.</p>
          <p>{brief.name} · {brief.email}</p><details className="studio-disclosure"><summary>Your submitted project</summary>{projectSummary}<p>{files.length} file(s) attached.</p></details><p>Initial assessments are subject to a professional survey.</p><Link href="/contact" className="studio-link">Contact Apex</Link><br /><Link href="/gallery" className="studio-link">Explore finished projects <span aria-hidden="true">↗</span></Link>
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
          <form ref={formRef} onSubmit={submit} onChange={() => { submissionKey.current = undefined; formRef.current?.querySelectorAll('[aria-invalid="true"]').forEach(field => { field.removeAttribute("aria-invalid"); field.removeAttribute("aria-describedby"); }); }} method="post" action="/api/send-lead" encType="multipart/form-data" aria-busy={sending} noValidate>
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
                <label>Operation (optional)
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
                <label>Project timescale (optional) <input name="timescale" maxLength={150} /></label>
                <label>Staircase or mezzanine (optional)
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
              <details className="studio-disclosure arch-brief-check"><summary>Check your project details</summary>{projectSummary}<div className="arch-brief-edits"><button type="button" onClick={() => { setEditing(true); moveTo(0); }}>Edit project details</button><button type="button" onClick={() => { setEditing(true); moveTo(1); }}>Edit curtains and fitting</button></div></details>
              <div className="arch-fields">
                <label>Name <input name="name" autoComplete="name" minLength={2} maxLength={150} required /></label>
                <label>Email <input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
                <label>Phone (optional) <input name="phone" type="tel" autoComplete="tel" maxLength={150} /></label>
                <label className="arch-full">Anything else we should know? (optional) <textarea name="requirements" maxLength={1400} /></label>
                <div className="arch-upload arch-full">
                  <label>Window photos and drawings (optional)
                    <input name="projectFiles" type="file" accept=".jpg,.jpeg,.png,.pdf" multiple aria-describedby="project-upload-help" onChange={chooseFiles} />
                  </label>
                  <p id="project-upload-help" className="arch-hint">Up to three JPEG, PNG or PDF files, 3 MB in total. Include only the relevant window or drawing. Remove names, addresses and unrelated details where possible. Photos up to 32 megapixels; plain, unencrypted PDF drawings.</p>
                  <ul className="arch-files">{files.map((file,index) => <li key={`${file.name}-${index}`}><span>{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</span><button type="button" aria-label={`Remove ${file.name}`} onClick={() => { setFiles(previous => previous.filter((_,i) => i !== index)); submissionKey.current = undefined; }}>Remove</button></li>)}</ul>
                  <p role="status">{files.length ? `${files.length} file(s) ready to include.` : "No files attached. You can send your enquiry without files."}</p>
                  {fileError && <div className="arch-enquiry-error" role="alert" tabIndex={-1} ref={fileErrorBox}><p>{fileError}</p><button type="button" onClick={() => setFileError("")}>{files.length ? "Continue with accepted files" : "Continue without files"}</button></div>}
                </div>
              </div>
              <p className="arch-privacy">We use these details to respond to your enquiry. Read our <Link href="/privacy-policy">privacy policy</Link>. Initial assessments are subject to a professional survey.</p>
            </fieldset>
            <CountPreference checked={counts.allowed} onChange={counts.setAllowed} />
            {error && <div id="planner-send-error" ref={errorBox} tabIndex={-1} className="arch-enquiry-error" role="alert"><p>{error}</p><Link href="/contact">Contact Apex</Link></div>}
            <div className="arch-step-actions">
              {stage > 0 && <button type="button" className="studio-link" disabled={sending} onClick={() => { if (editing && formRef.current) snapshot(new FormData(formRef.current)); moveTo(editing ? 2 : stage - 1); setEditing(false); }}>{editing ? "Back to final check" : "Back"}</button>}
              <button type="submit" className="arch-button" disabled={sending}>{sending ? "Sending your enquiry…" : finalStage ? error ? "Try again" : "Send project enquiry" : editing ? "Return to final check" : "Continue"}</button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
