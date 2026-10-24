"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowLeft,
  Plus,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Flower2,
  Home,
  Loader2,
  Mail,
  Palette,
  Ruler,
  Save,
  Search,
  Send,
  Layers3,
  ShieldCheck,
  X,
  PanelTop,
} from "lucide-react";
import {
  newJobData,
  newWindow,
  sampleJob,
  calculateWindow,
  approvalIssues,
  checklist,
  type Job,
  type JobData,
  type SurveyWindow,
  type Asset,
  type Delivery,
  type DocumentKind,
} from "@/lib/atelier/model";
import { Button, Field, Section, Toggle, request } from "./Fields";
import WindowEditor from "./WindowEditor";
import BrochurePreview from "./BrochurePreview";
const hero = "/visualiser/double-pinch-gable-desktop.webp";
const steps = [
  { id: "customer", name: "The client", icon: Home },
  { id: "windows", name: "Rooms & windows", icon: Ruler },
  { id: "documents", name: "The collection", icon: FileText },
  { id: "delivery", name: "Review & send", icon: Send },
] as const;
type Step = (typeof steps)[number]["id"];

export default function Atelier({
  initialJobs = [],
  demo = false,
}: {
  initialJobs?: Job[];
  demo?: boolean;
}) {
  const [jobs, setJobs] = useState(initialJobs),
    [job, setJob] = useState<Job | null>(() => (demo ? sampleJob() : null)),
    [draft, setDraft] = useState<JobData | null>(() =>
      demo ? sampleJob().data : null,
    );
  const [saved, setSaved] = useState(() =>
      demo ? JSON.stringify(sampleJob().data) : "",
    ),
    [assets, setAssets] = useState<Asset[]>([]),
    [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [step, setStep] = useState<Step>("customer"),
    [windowId, setWindowId] = useState(() =>
      demo ? sampleJob().data.windows[0].id : "",
    );
  const [search, setSearch] = useState(""),
    [busy, setBusy] = useState(false),
    [saving, setSaving] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState(""),
    [kind, setKind] = useState<DocumentKind>("brochure"),
    [preview, setPreview] = useState(false);
  const [savingFailed, setSavingFailed] = useState(false);
  const savingRef = useRef(false);
  const dirty = !!draft && JSON.stringify(draft) !== saved;
  const save = useCallback(async () => {
    if (!job || !draft || savingRef.current) return null;
    const snapshot = JSON.stringify(draft);
    if (snapshot === saved) return job;
    savingRef.current = true;
    setSaving(true);
    try {
      const result = demo
        ? {
            job: {
              ...job,
              data: draft,
              version: job.version + 1,
              status: "draft" as const,
            },
          }
        : await request<{ job: Job }>(`/api/atelier/jobs/${job.id}`, {
            method: "PUT",
            body: JSON.stringify({ version: job.version, data: draft }),
          });
      setJob(result.job);
      setSaved(snapshot);
      setJobs((prev) =>
        prev.map((j) => (j.id === result.job.id ? result.job : j)),
      );
      setSavingFailed(false);
      return result.job;
    } catch (e) {
      setError((e as Error).message);
      setSavingFailed(true);
      return null;
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }, [job, draft, saved, demo]);
  useEffect(() => {
    if (!dirty || saving || savingFailed) return;
    const timer = setTimeout(() => void save(), 1400);
    return () => clearTimeout(timer);
  }, [dirty, saving, savingFailed, save]);
  useEffect(() => {
    if (!dirty) return;
    const guard = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);
  function update<K extends keyof JobData>(key: K, value: JobData[K]) {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
    setSavingFailed(false);
    setMessage("");
  }
  function updateWindow<K extends keyof SurveyWindow>(
    key: K,
    value: SurveyWindow[K],
  ) {
    setDraft((d) =>
      d
        ? {
            ...d,
            workroomConfirmed: false,
            windows: d.windows.map((w) =>
              w.id === windowId
                ? {
                    ...w,
                    [key]: value,
                    measuredConfirmed: [
                      "type",
                      "widthMm",
                      "longDropMm",
                      "leftDropMm",
                      "rightDropMm",
                      "apexOffsetMm",
                      "leftSlopeMm",
                      "rightSlopeMm",
                      "lengthStyle",
                      "lengthDetail",
                    ].includes(key)
                      ? false
                      : key === "measuredConfirmed"
                        ? (value as boolean)
                        : w.measuredConfirmed,
                  }
                : w,
            ),
          }
        : d,
    );
    setSavingFailed(false);
    setMessage("");
  }
  const active =
    draft?.windows.find((w) => w.id === windowId) ?? draft?.windows[0];
  async function openJob(id: string) {
    setBusy(true);
    setError("");
    try {
      if (dirty && !(await save())) return;
      const r = await request<{
        job: Job;
        assets: Asset[];
        deliveries: Delivery[];
      }>(`/api/atelier/jobs/${id}`);
      setJob(r.job);
      setDraft(r.job.data);
      setSaved(JSON.stringify(r.job.data));
      setAssets(r.assets);
      setDeliveries(r.deliveries);
      setWindowId(r.job.data.windows[0].id);
      setStep("customer");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function createJob() {
    setBusy(true);
    setError("");
    try {
      const data = newJobData(crypto.randomUUID());
      const r = await request<{ job: Job }>("/api/atelier/jobs", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setJobs((prev) => [r.job, ...prev]);
      setJob(r.job);
      setDraft(r.job.data);
      setSaved(JSON.stringify(r.job.data));
      setAssets([]);
      setDeliveries([]);
      setWindowId(data.windows[0].id);
      setStep("customer");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function dashboard() {
    if (dirty && !(await save())) return;
    setJob(null);
    setDraft(null);
    setError("");
    setMessage("");
  }
  function addWindow(type: "apex" | "standard") {
    if (!draft) return;
    const next = newWindow(crypto.randomUUID(), type);
    next.room = active?.room || "Living room";
    next.name = `Window ${draft.windows.length + 1}`;
    update("windows", [...draft.windows, next]);
    setWindowId(next.id);
    setStep("windows");
  }
  function copyDesign() {
    if (!draft || !active) return;
    const next = {
      ...active,
      id: crypto.randomUUID(),
      name: `${active.name} copy`,
      widthMm: 0,
      longDropMm: 0,
      leftDropMm: 0,
      rightDropMm: 0,
      leftSlopeMm: 0,
      rightSlopeMm: 0,
      apexOffsetMm: 0,
      liningDropMm: 0,
      accessHeightMm: 0,
      measuredConfirmed: false,
      measurementNotes: "",
      fittingNotes: "",
    };
    update("windows", [...draft.windows, next]);
    setWindowId(next.id);
  }
  async function upload(file: File, photoKind: string, caption: string) {
    if (!job || !active || demo) return;
    setBusy(true);
    setError("");
    try {
      if (dirty && !(await save())) return;
      const bitmap = await createImageBitmap(file);
      const ratio = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bitmap.width * ratio);
      canvas.height = Math.round(bitmap.height * ratio);
      canvas
        .getContext("2d")!
        .drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (b) =>
            b
              ? resolve(b)
              : reject(new Error("Could not prepare this photograph.")),
          "image/jpeg",
          0.85,
        ),
      );
      const form = new FormData();
      form.set("file", blob, "window.jpg");
      form.set("windowId", active.id);
      form.set("kind", photoKind);
      form.set("caption", caption);
      const r = await request<{ asset: Asset }>(
        `/api/atelier/jobs/${job.id}/photos`,
        { method: "POST", body: form },
      );
      setAssets((a) => [...a, r.asset]);
      setMessage("Photograph saved privately to this window.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function release() {
    if (!job || demo) return;
    setBusy(true);
    setError("");
    try {
      const latest = dirty ? await save() : job;
      if (!latest) return;
      const approved = await request<{ job: Job }>(
        `/api/atelier/jobs/${job.id}/approve`,
        { method: "POST", body: JSON.stringify({ version: latest.version }) },
      );
      setJob(approved.job);
      setJobs((prev) => prev.map((j) => (j.id === job.id ? approved.job : j)));
      const r = await request<{ deliveries: Delivery[] }>(
        `/api/atelier/jobs/${job.id}/send`,
        { method: "POST", body: "{}" },
      );
      setDeliveries(r.deliveries);
      setMessage(
        r.deliveries
          .filter((d) => d.revision === latest.version)
          .every((d) => d.status === "sent")
          ? "All three documents have been submitted to the email service."
          : "Your approved documents are saved. Check the delivery log for any emails that need a retry.",
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function retry() {
    if (!job) return;
    setBusy(true);
    setError("");
    try {
      const r = await request<{ deliveries: Delivery[] }>(
        `/api/atelier/jobs/${job.id}/send`,
        { method: "POST", body: "{}" },
      );
      setDeliveries(r.deliveries);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function toggleChecklist(label: string, checked: boolean) {
    if (!job) return;
    const completion = { ...job.completion, [label]: checked };
    if (demo) {
      setJob({ ...job, completion });
      return;
    }
    try {
      const r = await request<{ job: Job }>(
        `/api/atelier/jobs/${job.id}/completion`,
        { method: "PUT", body: JSON.stringify({ checks: completion }) },
      );
      setJob(r.job);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  async function completeJob() {
    if (!job || demo || dirty) return;
    setBusy(true);
    try {
      const r = await request<{ job: Job }>(
        `/api/atelier/jobs/${job.id}/completion`,
        {
          method: "PUT",
          body: JSON.stringify({ checks: job.completion, complete: true }),
        },
      );
      setJob(r.job);
      setJobs((prev) => prev.map((j) => (j.id === job.id ? r.job : j)));
      setMessage(
        "Installation and handover recorded. This project is complete.",
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const issues = draft ? approvalIssues(draft, assets) : [];
  const jf = (
    key: keyof JobData,
    label: string,
    type = "text",
    wide = false,
    hint?: string,
  ) =>
    draft ? (
      <Field
        key={key}
        label={label}
        value={draft[key] as string}
        type={type}
        wide={wide}
        hint={hint}
        onChange={(v) => update(key, v as never)}
      />
    ) : null;
  return (
    <div className="atelier">
      <aside className="at-sidebar">
        <Link href="/admin/atelier" className="at-wordmark">
          APEX <span>CURTAINS</span>
        </Link>
        <div className="at-sidebar-title">
          THE ATELIER<span>Design. Make. Beautifully.</span>
        </div>
        <nav aria-label="Atelier navigation">
          <button
            onClick={() => void dashboard()}
            className={!job ? "active" : ""}
          >
            <Layers3 size={18} />
            Your projects<span>{jobs.length}</span>
          </button>
          {job
            ? steps.map((s) => (
                <button
                  key={s.id}
                  className={step === s.id ? "active" : ""}
                  onClick={() => setStep(s.id)}
                >
                  <s.icon size={18} />
                  {s.name}
                  {step === s.id ? <ChevronRight size={15} /> : null}
                </button>
              ))
            : null}
        </nav>
        {job && draft ? (
          <div className="at-room-nav">
            <span className="at-eyebrow">IN THIS COLLECTION</span>
            {draft.windows.map((w) => (
              <button
                key={w.id}
                onClick={() => {
                  setStep("windows");
                  setWindowId(w.id);
                }}
                className={
                  active?.id === w.id && step === "windows" ? "selected" : ""
                }
              >
                <PanelTop size={16} />
                <span>
                  {w.room}
                  <small>{w.name}</small>
                </span>
              </button>
            ))}
            <button
              onClick={() => addWindow("apex")}
              disabled={draft.windows.length >= 30}
            >
              <Plus size={16} />
              Add a window
            </button>
          </div>
        ) : null}
        <div className="at-sidebar-bottom">
          <div className="at-monogram">A</div>
          <div>
            <b>Apex design team</b>
            <small>
              {demo ? "Illustrative project" : "Private staff workspace"}
            </small>
          </div>
          <Link href="/admin" aria-label="Back to admin">
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </aside>
      <div className="at-workspace">
        <header className="at-topbar">
          <div>
            <Flower2 size={18} />
            <span>THE ART OF A CONSIDERED HOME</span>
          </div>
          <Link href="/" target="_blank">
            Visit Apex Curtains <ArrowUpRight size={15} />
          </Link>
        </header>
        {demo ? (
          <div className="at-demo-banner">
            Illustrative project · changes stay in this preview.{" "}
            <Link href="/admin/atelier">
              Enter your staff workspace <ArrowRight size={13} />
            </Link>
          </div>
        ) : null}
        <main className="at-main">
          {error ? (
            <div className="at-notice at-error" role="alert">
              <span>{error}</span>
              <button aria-label="Dismiss error" onClick={() => setError("")}>
                <X size={17} />
              </button>
            </div>
          ) : null}
          {message ? (
            <div className="at-notice" role="status">
              <CheckCircle2 size={18} />
              <span>{message}</span>
              <button
                aria-label="Dismiss message"
                onClick={() => setMessage("")}
              >
                <X size={17} />
              </button>
            </div>
          ) : null}
          {!job ? (
            <>
              <div className="at-page-heading">
                <div>
                  <span className="at-eyebrow">A PLACE FOR BEAUTIFUL WORK</span>
                  <h1>
                    Your atelier<span>.</span>
                  </h1>
                  <p>Every room, every window, every considered detail.</p>
                </div>
                <Button
                  onClick={() => void createJob()}
                  disabled={busy || demo}
                >
                  <Plus size={18} />
                  Begin a new project
                </Button>
              </div>
              <section className="at-hero">
                <img
                  src={hero}
                  alt="Elegant curtains around architectural gable glazing"
                />
                <div className="at-hero-copy">
                  <span className="at-eyebrow">FROM THE FIRST MEASUREMENT</span>
                  <h2>
                    A beautiful finish
                    <br />
                    begins here.
                  </h2>
                  <p>
                    Bring your survey, workshop and installation together. Give
                    every client a collection to keep.
                  </p>
                  <Link href="/admin/atelier/demo">
                    Explore a sample collection
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
                <div className="at-hero-caption">
                  APEX CURTAINS · THE ATELIER COLLECTION
                </div>
              </section>
              <div className="at-summary-strip">
                <div>
                  <span>01</span>
                  <b>Survey with care</b>
                  <p>Capture every window and chosen detail.</p>
                </div>
                <div>
                  <span>02</span>
                  <b>Create the collection</b>
                  <p>Workshop, brochure and fitting documents.</p>
                </div>
                <div>
                  <span>03</span>
                  <b>Send with confidence</b>
                  <p>One approved version. The right recipients.</p>
                </div>
              </div>
              <div className="at-list-heading">
                <h2>
                  Your projects <span>{jobs.length}</span>
                </h2>
                <label className="at-search">
                  <Search size={16} />
                  <input
                    aria-label="Search projects"
                    placeholder="Find a client or project"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
              </div>
              {jobs.length ? (
                <div className="at-project-list">
                  {jobs
                    .filter((j) =>
                      `${j.data.title} ${j.data.customerName} ${j.reference}`
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                    )
                    .map((j) => (
                      <button
                        className="at-project-row"
                        key={j.id}
                        onClick={() => void openJob(j.id)}
                        disabled={busy}
                      >
                        <span className="at-project-initial">
                          {j.data.customerName.slice(0, 1) || "A"}
                        </span>
                        <span>
                          <b>{j.data.title || "Untitled project"}</b>
                          <small>
                            {j.data.customerName || "Client details to add"} ·{" "}
                            {j.reference}
                          </small>
                        </span>
                        <span className="at-row-windows">
                          {j.data.windows.length} windows
                        </span>
                        <span className={`at-status ${j.status}`}>
                          {j.status}
                        </span>
                        <ArrowUpRight size={18} />
                      </button>
                    ))}
                </div>
              ) : (
                <div className="at-empty">
                  <Ruler size={27} />
                  <h3>Your next beautiful project starts here.</h3>
                  <p>
                    Add your client, name their rooms and let the collection
                    take shape.
                  </p>
                  <button
                    className="at-text-link"
                    onClick={() => void createJob()}
                    disabled={demo}
                  >
                    Begin your first project <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          ) : draft ? (
            <>
              <div className="at-project-heading">
                <button className="at-back" onClick={() => void dashboard()}>
                  <ArrowLeft size={15} />
                  All projects
                </button>
                <div>
                  <span className="at-eyebrow">
                    {job.reference} · VERSION {job.version}
                  </span>
                  <div className="at-title-row">
                    <h1>{draft.title || "A new curtain project"}</h1>
                    <span className={`at-status ${job.status}`}>
                      {job.status}
                    </span>
                  </div>
                  <p>
                    {draft.customerName || "Your client"} ·{" "}
                    {draft.windows.length}{" "}
                    {draft.windows.length === 1 ? "window" : "windows"}
                  </p>
                </div>
                <button
                  className="at-save"
                  disabled={saving || !dirty}
                  onClick={() => void save()}
                >
                  {saving ? (
                    <Loader2 size={16} className="at-spin" />
                  ) : dirty ? (
                    <Save size={16} />
                  ) : (
                    <Check size={16} />
                  )}{" "}
                  {saving
                    ? "Saving…"
                    : dirty
                      ? "Save changes"
                      : demo
                        ? "Preview changes saved"
                        : "All changes saved"}
                </button>
              </div>
              <nav className="at-steps" aria-label="Project steps">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setStep(s.id)}
                    className={step === s.id ? "active" : ""}
                  >
                    <span>0{i + 1}</span>
                    {s.name}
                    <s.icon size={17} />
                  </button>
                ))}
              </nav>
              {step === "customer" ? (
                <div className="at-editor-columns">
                  <div>
                    <Section
                      number="01"
                      title="A personal beginning"
                      description="The people and place behind the collection."
                    >
                      <div className="at-form-grid">
                        {jf("title", "Project name", "text", true)}
                        {jf("customerName", "Customer name")}
                        {jf("customerEmail", "Customer email", "email")}
                        {jf("phone", "Telephone")}
                        {jf("surveyor", "Surveyed by")}
                        {jf(
                          "address",
                          "Installation address",
                          "textarea",
                          true,
                        )}
                        {jf("surveyDate", "Survey date", "date")}
                        {jf(
                          "fittingDate",
                          "Fitting appointment",
                          "text",
                          false,
                          "Leave open until confirmed.",
                        )}
                      </div>
                    </Section>
                    <Section
                      number="02"
                      title="Your project team"
                      description="Each person receives the document prepared for them."
                    >
                      <div className="at-form-grid">
                        {jf("workshopEmail", "Workshop email", "email")}
                        {jf("fitterEmail", "Fitter email", "email")}
                        {jf(
                          "accessNotes",
                          "Arrival and access notes",
                          "textarea",
                          true,
                          "Parking, keys, furniture, power and access arrangements.",
                        )}
                      </div>
                    </Section>
                    <Button onClick={() => setStep("windows")}>
                      Continue to the windows
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                  <aside className="at-editor-aside">
                    <img
                      src="/journey/make-beautifully.jpeg"
                      alt="Curtain making details from the Apex collection"
                    />
                    <span className="at-eyebrow">MADE PERSONAL</span>
                    <h3>
                      One home.
                      <br />A complete collection.
                    </h3>
                    <p>
                      Each room has its own character. Keep its measurements,
                      fabrics and finishing touches together, then bring
                      everything into one elegant client brochure.
                    </p>
                    <div className="at-aside-note">
                      <ShieldCheck size={19} />
                      <span>
                        Customer details and window photos are stored in the
                        private staff workspace.
                      </span>
                    </div>
                  </aside>
                </div>
              ) : null}
              {step === "windows" && active ? (
                <>
                  <div className="at-window-toolbar">
                    <div className="at-window-tabs">
                      {draft.windows.map((w) => (
                        <button
                          key={w.id}
                          className={w.id === active.id ? "active" : ""}
                          onClick={() => setWindowId(w.id)}
                        >
                          {w.room}
                          <small>{w.name}</small>
                        </button>
                      ))}
                    </div>
                    <div className="at-window-actions">
                      <Button
                        secondary
                        onClick={() => addWindow("apex")}
                        disabled={draft.windows.length >= 30}
                      >
                        <Plus size={15} />
                        Apex
                      </Button>
                      <Button
                        secondary
                        onClick={() => addWindow("standard")}
                        disabled={draft.windows.length >= 30}
                      >
                        <Plus size={15} />
                        Standard
                      </Button>
                    </div>
                  </div>
                  <WindowEditor
                    key={active.id}
                    w={active}
                    assets={assets}
                    update={updateWindow}
                    onCopy={copyDesign}
                    onRemove={
                      draft.windows.length > 1
                        ? () => {
                            if (
                              window.confirm(
                                `Remove ${active.room} · ${active.name} from this draft?`,
                              )
                            ) {
                              const remaining = draft.windows.filter(
                                (w) => w.id !== active.id,
                              );
                              update("windows", remaining);
                              setWindowId(remaining[0].id);
                            }
                          }
                        : undefined
                    }
                    onDocuments={() => setStep("documents")}
                    onUpload={upload}
                    busy={busy}
                    demo={demo}
                    approved={job.status !== "draft"}
                    photoPermission={draft.photoPermission}
                    onPermission={(v) => update("photoPermission", v)}
                  />
                </>
              ) : null}
              {step === "documents" ? (
                <>
                  <div className="at-section-intro">
                    <span className="at-eyebrow">THE COLLECTION</span>
                    <h2>One project. Three beautiful documents.</h2>
                    <p>
                      Purposefully prepared for the people who bring it to life.
                    </p>
                  </div>
                  <div className="at-document-cards">
                    {(
                      [
                        [
                          "brochure",
                          "01",
                          "The client collection",
                          "An illustrated keepsake, with their specification, colour advice, aftercare and 10% voucher.",
                          Palette,
                        ],
                        [
                          "workroom",
                          "02",
                          "The workroom sheet",
                          "Material allowances and making details, clearly labelled by room and window.",
                          Ruler,
                        ],
                        [
                          "fitter",
                          "03",
                          "The installation pack",
                          "Photos, access notes, hardware and a practical equipment checklist.",
                          FileText,
                        ],
                      ] as const
                    ).map(([id, num, title, desc, Icon]) => (
                      <button
                        key={id}
                        className={`at-document-card ${kind === id ? "active" : ""}`}
                        onClick={() => {
                          setKind(id);
                          setPreview(false);
                        }}
                      >
                        <span>
                          {num}
                          <Icon size={20} />
                        </span>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                        <span className="at-text-link">
                          View document
                          <ArrowUpRight size={16} />
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="at-preview-toolbar">
                    <div>
                      <b>
                        {kind === "brochure"
                          ? "Your client brochure"
                          : kind === "workroom"
                            ? "Workroom preview"
                            : "Fitter preview"}
                      </b>
                      <span>
                        {demo
                          ? "Illustrative PDF · original sample collection"
                          : dirty
                            ? "Save changes before generating the PDF."
                            : job.approved_version === job.version
                              ? "Approved version"
                              : "Draft for review"}
                      </span>
                    </div>
                    <div>
                      <Button
                        secondary
                        disabled={!demo && (dirty || saving)}
                        onClick={() => setPreview((v) => !v)}
                      >
                        <FileText size={16} />
                        {preview ? "Close PDF" : "Preview PDF"}
                      </Button>
                      <a
                        className={`at-button ${dirty && !demo ? "disabled" : ""}`}
                        aria-disabled={dirty && !demo}
                        download={demo ? `Apex-sample-${kind}.pdf` : undefined}
                        href={
                          demo
                            ? `/atelier-samples/${kind}.pdf`
                            : dirty
                              ? undefined
                              : `/api/atelier/jobs/${job.id}/documents/${kind}?download=1`
                        }
                      >
                        <Download size={16} />
                        Download PDF
                      </a>
                    </div>
                  </div>
                  {preview ? (
                    <iframe
                      className="at-pdf-frame"
                      title={`${kind} PDF preview`}
                      src={
                        demo
                          ? `/atelier-samples/${kind}.pdf`
                          : `/api/atelier/jobs/${job.id}/documents/${kind}?v=${job.version}`
                      }
                    />
                  ) : kind === "brochure" ? (
                    <BrochurePreview
                      data={draft}
                      assets={assets}
                      reference={job.reference}
                    />
                  ) : (
                    <div className="at-operational-preview">
                      <span className="at-eyebrow">
                        APEX CURTAINS · {job.reference}
                      </span>
                      <h2>
                        {kind === "workroom"
                          ? "The workroom collection."
                          : "Ready for a beautiful finish."}
                      </h2>
                      {kind === "workroom" ? (
                        <div className="at-table-wrap">
                          <table>
                            <thead>
                              <tr>
                                <th>Room and window</th>
                                <th>Fabric</th>
                                <th>Lining</th>
                                <th>Cut widths</th>
                              </tr>
                            </thead>
                            <tbody>
                              {draft.windows.map((w) => {
                                const q = calculateWindow(w);
                                return (
                                  <tr key={w.id}>
                                    <td>
                                      <b>{w.room}</b>
                                      <small>{w.name}</small>
                                    </td>
                                    <td>{q.fabricMetres.toFixed(2)} m</td>
                                    <td>{q.liningMetres.toFixed(2)} m</td>
                                    <td>
                                      {q.widths} × {q.cutMm} mm
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <>
                          <p>
                            {draft.address ||
                              "Installation address to be added"}
                          </p>
                          <div className="at-checklist">
                            {checklist(draft).map((t) => (
                              <Toggle
                                key={t}
                                checked={job.completion[t] ?? false}
                                onChange={(v) => void toggleChecklist(t, v)}
                              >
                                {t}
                              </Toggle>
                            ))}
                          </div>
                          <Button
                            onClick={() => void completeJob()}
                            disabled={
                              busy || dirty || demo || job.status === "complete"
                            }
                          >
                            <CheckCircle2 size={17} />
                            {job.status === "complete"
                              ? "Project complete"
                              : "Complete installation & handover"}
                          </Button>
                          {jf(
                            "extraTools",
                            "Additional tools or checks",
                            "textarea",
                            true,
                            "Add one item per line.",
                          )}
                        </>
                      )}
                    </div>
                  )}
                  <Section number="04" title="Make the brochure personal">
                    <div className="at-form-grid">
                      {jf(
                        "welcomeNote",
                        "Personal introduction",
                        "textarea",
                        true,
                        "Leave blank to use the carefully written Apex introduction.",
                      )}
                      {jf(
                        "voucherDetails",
                        "Voucher redemption details",
                        "textarea",
                        true,
                        "The offer is 10% off any future order. Add only agreed redemption details.",
                      )}
                    </div>
                  </Section>
                </>
              ) : null}
              {step === "delivery" ? (
                <div className="at-editor-columns">
                  <div>
                    <Section
                      number="01"
                      title="A final, thoughtful check"
                      description="Release the same approved version to each recipient."
                    >
                      <Toggle
                        checked={draft.choicesConfirmed}
                        onChange={(v) => update("choicesConfirmed", v)}
                      >
                        The customer has confirmed the fabric, finish and
                        accessories.
                      </Toggle>
                      <Toggle
                        checked={draft.workroomConfirmed}
                        onChange={(v) => update("workroomConfirmed", v)}
                      >
                        The workroom has checked the allowances, pattern
                        matching and cutting plan.
                      </Toggle>
                      {issues.length ? (
                        <details className="at-review-issues" open>
                          <summary>{issues.length} details to complete</summary>
                          <ul>
                            {issues.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <div className="at-ready">
                          <CheckCircle2 size={22} />
                          <div>
                            <b>The collection is ready for release.</b>
                            <p>
                              Your measurements, specifications and recipients
                              are complete.
                            </p>
                          </div>
                        </div>
                      )}
                    </Section>
                    <Section number="02" title="Prepared for the right people">
                      <div className="at-recipient-list">
                        {[
                          [
                            "Customer",
                            draft.customerEmail,
                            "Personal brochure",
                          ],
                          ["Workshop", draft.workshopEmail, "Workroom sheet"],
                          ["Fitter", draft.fitterEmail, "Installation pack"],
                        ].map(([name, email, doc]) => (
                          <div key={name}>
                            <div className="at-recipient-icon">
                              <Mail size={19} />
                            </div>
                            <span>
                              <b>{name}</b>
                              <small>{email || "Email address to add"}</small>
                            </span>
                            <em>{doc}</em>
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={() => void release()}
                        disabled={busy || saving || issues.length > 0 || demo}
                      >
                        {busy ? (
                          <Loader2 size={17} className="at-spin" />
                        ) : (
                          <Send size={17} />
                        )}
                        Approve & send the collection
                      </Button>
                      <p className="at-fine-print">
                        Each recipient receives a separate email with their PDF.
                        Sent means accepted by the email service, not
                        confirmation that it has been read.
                      </p>
                    </Section>
                    {deliveries.length ? (
                      <Section number="03" title="Delivery history">
                        <div className="at-deliveries">
                          {deliveries.map((d) => (
                            <div key={d.id}>
                              <span>
                                <b>
                                  {d.kind} · v{d.revision}
                                </b>
                                <small>{d.recipient}</small>
                                {d.error ? (
                                  <small className="at-warning">
                                    {d.error}
                                  </small>
                                ) : null}
                              </span>
                              <span
                                className={`at-status ${d.status === "sent" ? "approved" : "draft"}`}
                              >
                                {d.status}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Button
                          secondary
                          onClick={() => void retry()}
                          disabled={
                            busy ||
                            dirty ||
                            job.approved_version !== job.version
                          }
                        >
                          Retry unsent documents
                          <ArrowRight size={15} />
                        </Button>
                      </Section>
                    ) : null}
                  </div>
                  <aside className="at-voucher-aside">
                    <span className="at-eyebrow">A THOUGHTFUL THANK YOU</span>
                    <Flower2 size={34} />
                    <h3>
                      For their next
                      <br />
                      <em>beautiful chapter.</em>
                    </h3>
                    <div>
                      <b>10%</b>
                      <span>OFF ANY FUTURE ORDER</span>
                    </div>
                    <p>
                      The personal voucher is included in the customer&apos;s
                      brochure.
                    </p>
                    <code>APEX10-{job.reference.replace(/^APX-/, "")}</code>
                    <small>Redeem directly with Apex Curtains.</small>
                  </aside>
                </div>
              ) : null}
            </>
          ) : null}
        </main>
        <footer className="at-footer">
          <span>APEX CURTAINS</span>
          <p>Thoughtfully measured. Beautifully made.</p>
          <span>THE ATELIER</span>
        </footer>
      </div>
    </div>
  );
}
