"use client";

import { CountPreference, useEnquiryCounts } from "@/components/analytics/EnquiryCounts";
import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { roomDesignFromParams, roomDesignParams } from "@/lib/visualiser/room-design";
import { visualiserContext } from "@/lib/visualiser/enquiry-context";
import { enquiryBodyTooLarge, guidedPhotoError } from "@/lib/enquiry-upload";
import "./quotation.css";

type FormData = {
  windowType: string;
  purpose: string;
  fabricStyle: string;
  liningType: string;
  roomType: string;
  headingStyle: string;
  imageFile: File | null;
  imagePreview: string;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  contactTime: string;

  arloPriority: string;
  arloStyle: string;
  suggestedHeading: string;
  suggestedLining: string;
  recommendationTitle: string;
  photoName: string;
};

const optionGroups = {
  windowType: [
    "Standard",
    "Apex",
    "Barn Conversion",
    "Triangular",
    "Other Shape",
    "Not Sure",
  ],
  purpose: [
    "Privacy",
    "Reduce sunlight / glare",
    "Interior design / aesthetics",
    "A mix of everything",
  ],
  fabricStyle: [
    "Plain / solid colour",
    "Subtle pattern",
    "Floral or decorative",
    "Not sure yet",
  ],
  liningType: [
    "Standard lining",
    "Blackout",
    "Thermal",
    "Not sure",
  ],
  roomType: [
    "Bedroom",
    "Lounge / Living Room",
    "Barn Conversion",
    "Extension / New Build",
    "Other",
  ],
  headingStyle: [
    {
      label: "Pencil Pleat",
      description: "Classic style, medium cost",
      image: "/headings/pencil-pleat.jpeg",
    },
    {
      label: "Wave Pleat",
      description: "Modern folds, higher cost",
      image: "/headings/wave-pleat.jpg",
    },
    {
      label: "Hand-sewn Pinch Pleat",
      description: "Tailored luxury look, premium cost",
      image: "/headings/pinch-pleat.jpg",
    },
    {
      label: "Not Sure",
      description: "I'd like advice",
      image: "/headings/not-sure.jpeg",
    },
  ],
  contactTime: [
    "Morning (9am – 12pm)",
    "Afternoon (12pm – 5pm)",
    "Evening (5pm – 8pm)",
    "Anytime",
  ],
};

const stages = [
  { title: "Start with your window", detail: "Share a photograph if you have one. You can choose fabrics and curtain details with our help." },
  { title: "Tell us about the window", detail: "Choose the closest options. You do not need to know the technical name." },
  { title: "Decided on the details?", detail: "Share what you know. ‘Not sure’ is a useful answer." },
  { title: "How can we reach you?", detail: "Apex Curtains will use these details to respond to your enquiry." },
  { title: "Check your enquiry", detail: "You can edit any section before sending. This is an initial enquiry, not an order." },
];

const fieldsByStage = [[], ["windowType", "roomType", "purpose"], ["fabricStyle", "liningType", "headingStyle"], ["name", "email", "phone", "postcode", "contactTime"]] as const;
type AnswerKey = typeof fieldsByStage[number][number];
const labels: Record<AnswerKey, string> = { windowType: "Window type", roomType: "Room type", purpose: "Main purpose", fabricStyle: "Fabric style", liningType: "Lining", headingStyle: "Curtain heading", name: "Full name", email: "Email address", phone: "Telephone", postcode: "Project postcode", contactTime: "Best time to contact you" };

export default function StartDesigningPage() {
  const counts = useEnquiryCounts("guided");
  const params = useSearchParams();
  const [visualiserLook, setVisualiserLook] = useState(() => visualiserContext(params.get("visualiserRoom"), params.get("visualiserColour"), roomDesignFromParams(params, "visualiser-")));
  useEffect(() => {
    if (!visualiserLook) return;
    const detail = { event: "room_visualiser_enquiry_context_received", room: visualiserLook.room, colour: visualiserLook.colour, colourReference: visualiserLook.reference };
    window.dataLayer?.push(detail);
    window.dispatchEvent(new CustomEvent("apex:conversion", { detail }));
  }, [visualiserLook]);
  const [form, setForm] = useState<FormData>(() => ({
    windowType: mapArloWindowTypeToForm(params.get("windowType") || ""),
    roomType: mapArloRoomToForm(params.get("room") || ""),
    purpose: mapArloPriorityToForm(params.get("priority") || ""),
    fabricStyle: "", liningType: mapArloLiningToForm(params.get("suggestedLining") || ""),
    headingStyle: mapArloHeadingToForm(params.get("suggestedHeading") || ""),
    imageFile: null, imagePreview: "", name: "", email: "", phone: "", postcode: "", contactTime: "",
    arloPriority: params.get("priority") || "", arloStyle: params.get("style") || "",
    suggestedHeading: params.get("suggestedHeading") || "", suggestedLining: params.get("suggestedLining") || "",
    recommendationTitle: params.get("recommendationTitle") || "", photoName: params.get("photoName") || "",
  }));
  const [step, setStep] = useState(0);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<AnswerKey, string>>>({});
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const [checkingFile, setCheckingFile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const errorBox = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const sendingLock = useRef(false);
  const requestKey = useRef<string | undefined>(undefined);

  useEffect(() => {
    const preview = form.imagePreview;
    return () => { if (preview.startsWith("blob:")) URL.revokeObjectURL(preview); };
  }, [form.imagePreview]);

  function focusHeading() {
    requestAnimationFrame(() => { heading.current?.focus({ preventScroll: true }); (heading.current?.closest("main")?.querySelector(".quote-progress") || heading.current)?.scrollIntoView({ block: "start" }); });
  }
  function moveTo(next: number) { setStep(next); setError(""); setErrors({}); focusHeading(); }
  function edit(next: number) { setEditing(true); moveTo(next); }
  function updateField(key: AnswerKey, value: string) {
    requestKey.current = undefined;
    setForm(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
  }
  function buildPayload(photo: File | null = form.imageFile) {
    const body = new globalThis.FormData();
    for (const [key, value] of Object.entries(form)) {
      if (typeof value === "string" && key !== "imagePreview") body.append(key, value);
    }
    if (photo) body.append("imageFile", photo);
    if (visualiserLook) {
      body.append("visualiserRoom", visualiserLook.room); body.append("visualiserColour", visualiserLook.colour);
      for (const [key, value] of Object.entries(roomDesignParams(visualiserLook.design, "visualiser-"))) body.append(key, value);
    }
    return body;
  }
  function removePhoto() {
    requestKey.current = undefined;
    setForm(previous => ({ ...previous, imageFile: null, imagePreview: "" })); setFileError("");
    if (fileInput.current) fileInput.current.value = "";
  }
  async function choosePhoto(event: ChangeEvent<HTMLInputElement>) {
    const photo = event.target.files?.[0]; event.target.value = "";
    if (!photo) return;
    setCheckingFile(true); setFileError("");
    try {
      const invalid = guidedPhotoError(photo);
      if (invalid) { setFileError(invalid); return; }
      if (await enquiryBodyTooLarge(buildPayload(photo))) { setFileError(`${photo.name}: choose a smaller photograph. The total enquiry, including your details, must be under 4.5 MB.`); return; }
      requestKey.current = undefined;
      setForm(previous => ({ ...previous, imageFile: photo, imagePreview: URL.createObjectURL(photo) }));
    } catch { setFileError("This photograph could not be read. Choose another file or continue without a photograph."); }
    finally { setCheckingFile(false); }
  }
  function validate(all = false) {
    const invalid: Partial<Record<AnswerKey, string>> = {};
    const keys = all ? fieldsByStage.flat() : fieldsByStage[step] || [];
    for (const key of keys) {
      const value = form[key].trim();
      const valid = key === "name" ? value.length > 1 : key === "email" ? /\S+@\S+\.\S+/.test(form.email) : key === "phone" ? value.length > 5 : key === "postcode" ? value.length > 2 : !!value;
      if (!valid) invalid[key] = key === "email" ? "Enter a valid email address." : `Please ${["name", "phone", "postcode"].includes(key) ? "enter" : "choose"} your ${labels[key].toLowerCase()}.`;
    }
    setErrors(invalid);
    const first = Object.keys(invalid)[0] as AnswerKey | undefined;
    if (!first) return true;
    if (all) setStep(fieldsByStage.findIndex(keys => (keys as readonly string[]).includes(first)));
    requestAnimationFrame(() => { const control = formRef.current?.elements.namedItem(first); if (control instanceof HTMLElement) { control.focus({ preventScroll: true }); control.scrollIntoView({ block: "center" }); } });
    return false;
  }
  function showError(message: string) {
    setError(message); requestAnimationFrame(() => { errorBox.current?.focus({ preventScroll: true }); errorBox.current?.scrollIntoView({ block: "center" }); });
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingLock.current || checkingFile) return;
    if (step !== 4) {
      if (!validate()) return;
      if (step === 0 && fileError) return;
      if (step === 0) counts.record("start");
      moveTo(editing ? 4 : step + 1); setEditing(false); return;
    }
    if (!validate(true)) return;
    sendingLock.current = true; setSubmitting(true); setError("");
    try {
      const body = buildPayload();
      if (await enquiryBodyTooLarge(body)) {
        setStep(0); setEditing(true); setFileError("The total enquiry is too large. Choose a smaller photograph or remove it to continue."); focusHeading(); return;
      }
      requestKey.current ??= globalThis.crypto?.randomUUID?.();
      const response = await fetch("/api/send-lead", { method: "POST", body, headers: requestKey.current ? { "Idempotency-Key": requestKey.current } : undefined });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        showError((typeof result?.error === "string" && result.error) || "We couldn’t confirm your enquiry was sent. Your details are still here. Try again or contact Apex."); return;
      }
      counts.record("complete"); setSubmitted(true); focusHeading();
    } catch { showError("We couldn’t confirm your enquiry was sent. Your details are still here. Try again or contact Apex."); }
    finally { sendingLock.current = false; setSubmitting(false); }
  }
  function select(key: AnswerKey, options: readonly string[]) {
    return <label>{labels[key]}<select name={key} value={form[key]} required aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} onChange={event => updateField(key, event.target.value)}><option value="">Please select</option>{options.map(value => <option key={value}>{value}</option>)}</select>{errors[key] && <span className="quote-field-error" id={`${key}-error`}>{errors[key]}</span>}</label>;
  }
  const privacy = <p className="quote-privacy">We use these details to respond to your enquiry. Read our <Link href="/privacy-policy">privacy policy</Link>. Initial assessments are subject to a professional survey.</p>;
  const review = <div className="quote-review">
    {([
      ["Your window", `${form.windowType} · ${form.roomType} · ${form.purpose}`, 1],
      ["Curtain preferences", `${form.fabricStyle} · ${form.liningType} · ${form.headingStyle}`, 2],
      ["Contact details", `${form.name} · ${form.email} · ${form.phone} · ${form.postcode} · ${form.contactTime}`, 3],
      ["Photograph", form.imageFile?.name || "No photograph added", 0],
    ] as const).map(([label, value, target]) => <section key={label}><div><h2>{label}</h2><p>{value}</p></div>{!submitted && <button type="button" disabled={submitting} onClick={() => edit(target)} aria-label={`Edit ${label.toLowerCase()}`}>Edit</button>}</section>)}
  </div>;
  return <main className="quotation-journey"><div className="quote-wrap">
    <div className="quote-progress"><Link href="/get-curtain-quote">Enquiry options</Link><span>{submitted ? "Enquiry sent" : `Step ${step + 1} of 5`}</span></div>
    <div className="quote-content">
      <p className="quote-kicker">Guided quotation</p>
      <h1 ref={heading} tabIndex={-1}>{submitted ? "Your enquiry has been sent" : stages[step].title}</h1>
      <p className="quote-intro">{submitted ? "Apex Curtains will review your information and contact you about the next step." : stages[step].detail}</p>
      {visualiserLook && <details className="quote-context"><summary>Your visualiser look</summary><p>{visualiserLook.roomName} · {visualiserLook.colourName} · {visualiserLook.reference}</p>{visualiserLook.heading && <p>Visualised heading: {visualiserLook.heading}</p>}<p>{visualiserLook.designSummary}</p><Link href={visualiserLook.url.replace("https://www.apexcurtains.com", "")}>View this look</Link>{!submitted && <button type="button" disabled={submitting} onClick={() => { requestKey.current = undefined; setVisualiserLook(null); }}>Remove this look</button>}</details>}
      {form.recommendationTitle && <details className="quote-context"><summary>Arlo recommendation</summary><p>{form.recommendationTitle}</p><p>{form.arloPriority} · {form.arloStyle}</p><p>Suggested heading: {form.suggestedHeading || "To discuss"} · Suggested lining: {form.suggestedLining || "To discuss"}</p>{form.photoName && <p>Photo note: {form.photoName}</p>}</details>}
      {submitted ? <>{review}{privacy}<p className="quote-finish-links"><Link href="/contact">Contact Apex</Link><Link href="/gallery">Explore finished projects</Link></p></> : <form ref={formRef} onSubmit={submit} noValidate aria-busy={submitting}>
        <fieldset disabled={submitting || checkingFile}>
          {step === 0 && <>
            <div className="quote-upload"><label htmlFor="window-photo">Window photograph (optional)</label><p>A view of the whole window helps us understand its shape.</p><input ref={fileInput} id="window-photo" type="file" accept=".jpg,.jpeg,.png,.webp" aria-describedby="photo-help photo-status" onChange={choosePhoto} /><p id="photo-help">JPG, PNG or WebP. Total enquiry limit: 4.5 MB, including your details. Include only the relevant window and remove personal or unrelated details where possible.</p><div id="photo-status" role="status">{checkingFile ? "Checking photograph…" : form.imageFile ? `${form.imageFile.name} — ready to include` : "You can continue without a photograph."}</div>
              {form.imagePreview && <>
                {/* Local object URL: keep the customer photo in this browser, never send it to the image optimiser. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.imagePreview} alt="Your selected window photograph" /><button type="button" onClick={removePhoto}>Remove photograph</button></>}
            </div>
            {fileError && <div className="quote-error" role="alert"><p>{fileError}</p><button type="button" onClick={removePhoto}>Continue without a photograph</button>{form.imageFile && <button type="button" onClick={() => setFileError("")}>Keep the previous photograph</button>}</div>}
          </>}
          {step === 1 && <div className="quote-fields">{select("windowType", optionGroups.windowType)}{select("roomType", optionGroups.roomType)}{select("purpose", optionGroups.purpose)}</div>}
          {step === 2 && <><button className="quote-secondary" type="button" onClick={() => { updateField("fabricStyle", "Not sure yet"); updateField("liningType", "Not sure"); updateField("headingStyle", "Not Sure"); }}>I’d like advice on all three</button><div className="quote-fields">{select("fabricStyle", optionGroups.fabricStyle)}{select("liningType", optionGroups.liningType)}{select("headingStyle", optionGroups.headingStyle.map(option => option.label))}</div><p className="quote-help">These are preferences for your enquiry, not a final specification.</p></>}
          {step === 3 && <><p className="quote-help">All fields on this screen are required.</p><div className="quote-fields">{([ ["name", "text", "name"], ["email", "email", "email"], ["phone", "tel", "tel"], ["postcode", "text", "postal-code"] ] as const).map(([key, type, autoComplete]) => <label key={key}>{labels[key]}<input name={key} type={type} autoComplete={autoComplete} value={form[key]} required aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} onChange={event => updateField(key, event.target.value)} />{errors[key] && <span className="quote-field-error" id={`${key}-error`}>{errors[key]}</span>}</label>)}{select("contactTime", optionGroups.contactTime)}</div>{privacy}</>}
          {step === 4 && <>{review}{privacy}</>}
        </fieldset>
        <fieldset disabled={submitting}><CountPreference checked={counts.allowed} onChange={counts.setAllowed} /></fieldset>
        {error && <div className="quote-error" role="alert" tabIndex={-1} ref={errorBox}><p>{error}</p><Link href="/contact">Contact Apex</Link></div>}
        <div className="quote-actions">{step > 0 ? <button type="button" disabled={submitting || checkingFile} onClick={() => { if (editing) { setEditing(false); moveTo(4); } else moveTo(step - 1); }}>{editing ? "Back to review" : "Back"}</button> : <Link href="/get-curtain-quote">Back</Link>}<button className="quote-button" type="submit" disabled={submitting || checkingFile}>{submitting ? "Sending your enquiry…" : step === 4 ? error ? "Try again" : "Send enquiry" : editing ? "Return to review" : step === 0 && !form.imageFile ? "Continue without a photo" : "Continue"}</button></div>
      </form>}
    </div>
  </div></main>;
}

function mapArloWindowTypeToForm(value: string) {
  const v = value.toLowerCase();
  if (v.includes("apex")) return "Apex";
  if (v.includes("triangular")) return "Triangular";
  if (v.includes("gable")) return "Barn Conversion";
  if (v.includes("feature")) return "Other Shape";
  if (v.includes("not sure")) return "Not Sure";
  return "";
}

function mapArloRoomToForm(value: string) {
  const v = value.toLowerCase();
  if (v.includes("bedroom")) return "Bedroom";
  if (v.includes("living")) return "Lounge / Living Room";
  if (v.includes("barn")) return "Barn Conversion";
  return "";
}

function mapArloPriorityToForm(value: string) {
  const v = value.toLowerCase();
  if (v.includes("privacy")) return "Privacy";
  if (v.includes("blackout")) return "A mix of everything";
  if (v.includes("warmth")) return "A mix of everything";
  if (v.includes("luxury")) return "Interior design / aesthetics";
  if (v.includes("shape visible")) return "Interior design / aesthetics";
  if (v.includes("mix")) return "A mix of everything";
  return "";
}

function mapArloHeadingToForm(value: string) {
  const v = value.toLowerCase();
  if (v.includes("wave")) return "Wave Pleat";
  if (v.includes("pencil")) return "Pencil Pleat";
  if (v.includes("pinch")) return "Hand-sewn Pinch Pleat";
  return "";
}

function mapArloLiningToForm(value: string) {
  const v = value.toLowerCase();
  if (v.includes("blackout")) return "Blackout";
  if (v.includes("thermal")) return "Thermal";
  return "";
}
