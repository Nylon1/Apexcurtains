"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const INTRO_DURATION_MS = 3200;
const SEEN_KEY = "apex-intro-sale-v1";

export default function ApexEntryScreen() {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    if (!node || window.location.hash) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      /* Storage may be unavailable. */
    }
    node.showModal();
    const timer = window.setTimeout(() => node.close(), INTRO_DURATION_MS);
    return () => {
      window.clearTimeout(timer);
      node.close();
    };
  }, []);
  function rememberDismissal() {
    try {
      sessionStorage.setItem(SEEN_KEY, "seen");
    } catch {
      /* Dismissal still works without storage. */
    }
  }
  return (
    <dialog
      ref={dialog}
      onClose={rememberDismissal}
      className="apex-entry"
      aria-labelledby="apex-entry-title"
      aria-describedby="apex-entry-offer"
    >
      <Image
        src="/images/apex-entry-poster.jpeg"
        alt="Apex Curtains architectural curtain installation"
        fill
        loading="eager"
        fetchPriority="low"
        sizes="100vw"
      />
      <div className="apex-entry-shade" />
      <div className="apex-entry-content">
        <Image
          src="/images/apex-logo-stacked-light.svg"
          alt="Apex Curtains"
          width={145}
          height={145}
          loading="eager"
        />
        <p className="apex-entry-kicker">Sale now on</p>
        <h2 id="apex-entry-title">
          Extraordinary windows.
          <br />
          Beautifully dressed.
        </h2>
        <p className="apex-entry-offer" id="apex-entry-offer">
          <strong>25% off</strong>
          <span>custom-made curtains</span>
        </p>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="home-button home-button-light"
        >
          Explore Apex Curtains ↗
        </button>
        <p className="apex-entry-note">
          Intro closes automatically. Enter at any time.
        </p>
      </div>
    </dialog>
  );
}
