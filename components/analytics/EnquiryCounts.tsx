"use client";

import { useRef, useState } from "react";

type Stage = "start" | "complete";

const signals = {
  guided: { start: "guided_quotation_start", complete: "lead_submission_complete" },
  planner: { start: "architectural_planner_start", complete: "architectural_project_enquiry_sent" },
} as const;

export function useEnquiryCounts(journey: "guided" | "planner") {
  const [allowed, updateAllowed] = useState(false);
  const consent = useRef(false);
  const reached = useRef(new Set<Stage>());

  function setAllowed(value: boolean) {
    consent.current = value;
    updateAllowed(value);
  }

  function record(stage: Stage) {
    if (reached.current.has(stage)) return;
    reached.current.add(stage);
    if (!consent.current) return;
    const detail = { event: signals[journey][stage] };
    window.dataLayer?.push(detail);
    window.dispatchEvent(new CustomEvent("apex:conversion", { detail }));
    void fetch(`/api/enquiry-count/${journey}-${stage}`, {
      method: "POST",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      keepalive: true,
    }).catch(() => {});
  }

  return { allowed, setAllowed, record };
}

export function CountPreference({ checked, onChange }: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="enquiry-count-choice">
      <input type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)} />
      <span>Allow anonymous counts of form starts and completions (optional). Only the form and stage are counted.</span>
    </label>
  );
}
