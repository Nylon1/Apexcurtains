"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function emit(event: string, data: Record<string, string | number | boolean> = {}) {
  const detail = { event, ...data };
  window.dataLayer?.push(detail);
  window.dispatchEvent(new CustomEvent("apex:conversion", { detail }));
}

export default function StartDesigningAnalytics() {
  useEffect(() => {
    emit("curtain_journey_view", { source: "start_designing" });
  }, []);

  return null;
}
