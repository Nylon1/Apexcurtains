"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Expand, X } from "lucide-react";
import {
  scenes,
  osloColours,
  resolveLook,
  lookUrl,
} from "@/lib/visualiser/catalogue";
import { createResourceCache } from "@/lib/visualiser/resource-cache";
import type { loadScene } from "@/lib/visualiser/scene-renderer";

type LoadedScene = Awaited<ReturnType<typeof loadScene>>;
function event(name: string, data: Record<string, string | number | boolean>) {
  const detail = {
    event: `room_visualiser_${name}`,
    ...data,
    device: matchMedia("(max-width: 800px)").matches ? "mobile" : "desktop",
  };
  window.dataLayer?.push(detail);
  window.dispatchEvent(new CustomEvent("apex:conversion", { detail }));
}

export default function RoomVisualiser({
  initialRoom,
  initialColour,
}: {
  initialRoom: string;
  initialColour: string;
}) {
  const [look, setLook] = useState(() =>
    resolveLook(initialRoom, initialColour),
  );
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [original, setOriginal] = useState(false);
  const [headingFilter, setHeadingFilter] = useState("All installations");
  const [retry, setRetry] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [failedImage, setFailedImage] = useState("");
  const canvas = useRef<HTMLCanvasElement>(null);
  const enlargedCanvas = useRef<HTMLCanvasElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const enlargeButton = useRef<HTMLButtonElement>(null);
  const generation = useRef(0);
  const explored = useRef(new Set([initialColour]));
  const opened = useRef(false);
  const cache = useRef<ReturnType<
    typeof createResourceCache<LoadedScene>
  > | null>(null);
  const { scene, colour } = look;

  useEffect(() => {
    if (!opened.current) {
      event("opened", { room: initialRoom, colour: initialColour });
      opened.current = true;
    }
    function restore() {
      const params = new URLSearchParams(location.search);
      setLook(resolveLook(params.get("room"), params.get("colour")));
      setOriginal(false);
      setHeadingFilter("All installations");
    }
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [initialRoom, initialColour]);

  useEffect(() => {
    const serial = ++generation.current;
    let disposed = false;
    // Dynamic import keeps renderer work out of the initial server-rendered shell.
    async function render() {
      setStatus("loading");
      try {
        const engine = await import("@/lib/visualiser/scene-renderer");
        if (!cache.current)
          cache.current = createResourceCache(async (key) => {
            const [id, size] = key.split(":");
            const source = scenes.find((item) => item.id === id);
            if (!source) throw new Error("Unknown scene");
            return engine.loadScene(
              source,
              size === "mobile" ? "mobile" : "desktop",
            );
          });
        const size = matchMedia("(max-width: 800px)").matches
          ? "mobile"
          : "desktop";
        const loaded = await cache.current.get(`${scene.id}:${size}`);
        if (disposed || serial !== generation.current || !canvas.current)
          return;
        const ms = engine.paintScene(canvas.current, loaded, colour.rgb);
        canvas.current.dataset.renderMs = String(Math.round(ms));
        canvas.current.dataset.colour = colour.id;
        canvas.current.dataset.room = scene.id;
        setStatus("ready");
      } catch {
        if (!disposed && serial === generation.current) setStatus("error");
      }
    }
    void render();
    return () => {
      disposed = true;
    };
  }, [scene, colour, retry]);

  function choose(
    room: string,
    colourId: string,
    kind: "room_selected" | "colour_selected",
  ) {
    const next = resolveLook(room, colourId);
    if (next.scene.id === scene.id && next.colour.id === colour.id) return;
    explored.current.add(next.colour.id);
    setLook(next);
    setOriginal(false);
    setCopied(false);
    setCopyError(false);
    history.replaceState(
      history.state,
      "",
      lookUrl(next.scene.id, next.colour.id),
    );
    event(kind, {
      room: next.scene.id,
      colour: next.colour.id,
      colourReference: next.colour.reference,
      coloursExplored: explored.current.size,
    });
  }
  function enlarge() {
    if (!canvas.current || !enlargedCanvas.current || status !== "ready")
      return;
    enlargedCanvas.current.width = canvas.current.width;
    enlargedCanvas.current.height = canvas.current.height;
    enlargedCanvas.current.getContext("2d")?.drawImage(canvas.current, 0, 0);
    dialog.current?.showModal();
  }
  const enquiry = `/start-designing?visualiserRoom=${scene.id}&visualiserColour=${colour.id}`;

  return (
    <section
      className="rv-workspace"
      aria-label="Explore Oslo on shaped curtains"
    >
      <div className="rv-step-heading">
        <span>01 / Choose your room</span>
        <p>Real Apex installations. A new colour perspective.</p>
      </div>
      <noscript>
        <p>
          The original installation is shown below. Enable JavaScript to preview
          Oslo colours, or{" "}
          <Link href="/curtain-colours-and-tones">
            explore our colour guidance
          </Link>
          .
        </p>
      </noscript>
      <div
        className="rv-headings"
        role="group"
        aria-label="Explore a curtain heading"
      >
        {[
          "All installations",
          "Pencil pleat",
          "Double pinch pleat",
          "Wave pleat",
        ].map((heading) => (
          <button
            type="button"
            key={heading}
            aria-pressed={headingFilter === heading}
            onClick={() => {
              setHeadingFilter(heading);
              const example = scenes.find((item) => item.heading === heading);
              if (example) choose(example.id, colour.id, "room_selected");
            }}
          >
            {heading}
          </button>
        ))}
      </div>
      <p className="rv-heading-note">
        Each heading opens a real installation, keeping your Oslo colour. The
        room changes with it.
      </p>
      <div className="rv-rooms" role="group" aria-label="Choose a room">
        {scenes
          .filter(
            (room) =>
              headingFilter === "All installations" ||
              room.heading === headingFilter,
          )
          .map((room) => (
            <button
              key={room.id}
              type="button"
              aria-pressed={room.id === scene.id}
              onClick={() => choose(room.id, colour.id, "room_selected")}
            >
              {/* Local pre-sized derivatives; no image optimisation round trip. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/visualiser/${room.id}-thumb.webp`}
                width={70}
                height={70}
                alt=""
                loading="lazy"
              />
              <span>
                {room.name}
                <small>
                  {room.state === "tied-back"
                    ? "Tied-back curtains"
                    : room.state}
                </small>
              </span>
              {room.id === scene.id && <Check size={16} aria-hidden="true" />}
            </button>
          ))}
      </div>
      <div className="rv-layout">
        <div className="rv-scene-column">
          <div
            className="rv-stage"
            data-state={status}
            aria-busy={status === "loading"}
          >
            <picture key={scene.id}>
              {failedImage !== scene.id && (
                <source
                  media="(max-width: 800px)"
                  srcSet={`/visualiser/${scene.id}-mobile.webp`}
                />
              )}
              <img
                src={
                  failedImage === scene.id
                    ? scene.source
                    : `/visualiser/${scene.id}-desktop.webp`
                }
                width={scene.width}
                height={scene.height}
                alt={`Original Apex installation: ${scene.name}, curtains following the roofline and photographed tied back`}
                fetchPriority="high"
                onError={() => setFailedImage(scene.id)}
              />
            </picture>
            <canvas
              ref={canvas}
              className={
                original || status !== "ready" ? "rv-hidden-canvas" : ""
              }
              role="img"
              aria-label={`${scene.name}: Oslo ${colour.name} colour visualisation, with the original shaped folds and tied-back position`}
            />
            <div className="rv-scene-tools">
              <button
                type="button"
                onClick={() => setOriginal(!original)}
                aria-pressed={original}
              >
                {original ? "Show selected colour" : "Original photograph"}
              </button>
              <button
                ref={enlargeButton}
                type="button"
                onClick={enlarge}
                disabled={status !== "ready"}
                aria-label="Enlarge colour visualisation"
              >
                <Expand size={18} aria-hidden="true" />
              </button>
            </div>
            <span className="rv-scene-caption">
              {original || status !== "ready"
                ? "Original installation photograph"
                : `Colour visualisation · Oslo ${colour.name}`}
            </span>
          </div>
          <div className="rv-status" role="status" aria-live="polite">
            {status === "loading" ? (
              "Preparing your curtain colour…"
            ) : status === "error" ? (
              <>
                The colour preview could not load. The original photograph is
                shown.{" "}
                <button
                  type="button"
                  onClick={() => {
                    cache.current?.clear();
                    setRetry(retry + 1);
                  }}
                >
                  Try again
                </button>
              </>
            ) : (
              `${scene.name} · ${original ? "Original photograph" : `Oslo ${colour.name}`}`
            )}
          </div>
        </div>
        <aside className="rv-options" aria-label="Oslo colour selection">
          <p className="rv-eyebrow">02 / Find your colour</p>
          <h2>
            A different shade.
            <br />
            <em>A different feeling.</em>
          </h2>
          <div className="rv-selected">
            <span
              style={{ background: `rgb(${colour.rgb.join(",")})` }}
              aria-hidden="true"
            />
            <div>
              <strong>Oslo {colour.name}</strong>
              <small>Prestigious Textiles · {colour.reference}</small>
            </div>
          </div>
          <div
            className="rv-colours"
            role="group"
            aria-label="Choose an Oslo colour"
          >
            {osloColours.map((fabric) => (
              <button
                type="button"
                key={fabric.reference}
                aria-pressed={fabric.id === colour.id}
                aria-label={`Oslo ${fabric.name}`}
                onClick={() => choose(scene.id, fabric.id, "colour_selected")}
              >
                <span
                  className="rv-swatch"
                  style={{ background: `rgb(${fabric.rgb.join(",")})` }}
                  aria-hidden="true"
                >
                  {fabric.id === colour.id && <Check size={16} />}
                </span>
                <span>{fabric.name}</span>
              </button>
            ))}
          </div>
          <p className="rv-sample-note">
            A colour impression, shaped by this room’s light. Always check a
            physical Oslo sample in your own room before choosing.
          </p>
          <div className="rv-next">
            <Link
              className="rv-primary"
              href={enquiry}
              onClick={() =>
                event("enquiry_started", {
                  room: scene.id,
                  colour: colour.id,
                  colourReference: colour.reference,
                  coloursExplored: explored.current.size,
                  colourPassedToEnquiry: true,
                })
              }
            >
              Enquire about this look{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    `${location.origin}${lookUrl(scene.id, colour.id)}`,
                  );
                  setCopied(true);
                  setCopyError(false);
                } catch {
                  setCopied(false);
                  setCopyError(true);
                }
              }}
            >
              {copied ? "Link copied" : "Copy link to this look"}
            </button>
            {copyError && (
              <p role="status" className="rv-sample-note">
                Copying is unavailable. Use your browser’s share menu; your room
                and colour are saved in the address.
              </p>
            )}
            <a href={colour.source}>View Oslo {colour.name} fabric details</a>
            <Link href="/curtain-colours-and-tones#colour-explorer">
              Explore colour & interiors
            </Link>
          </div>
        </aside>
      </div>
      <div className="rv-scene-description">
        <div>
          <p className="rv-eyebrow">{scene.evidence}</p>
          <h2>{scene.name}</h2>
          <p>{scene.description}</p>
        </div>
        <Link href={scene.projectHref}>
          {scene.projectLabel} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <p className="rv-disclaimer">
        Based on real Apex photography, digitally recoloured for inspiration.
        The original project is not recorded as Oslo. Fabric texture, drape,
        lining and room lighting affect the finished result; this preview
        preserves the photographed heading, proportions and curtain position. It
        is not a measured model of your window and does not predict opening or
        blackout performance.
      </p>
      <dialog
        ref={dialog}
        className="rv-dialog"
        aria-label={`Enlarged ${scene.name} in Oslo ${colour.name}`}
        onClose={() => enlargeButton.current?.focus()}
      >
        <div>
          <p>
            {scene.name} · Oslo {colour.name}
          </p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close enlarged view"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <canvas
          ref={enlargedCanvas}
          role="img"
          aria-label={`Enlarged colour visualisation: Oslo ${colour.name}`}
        />
        <p>Colour impression only. Confirm with a physical sample.</p>
      </dialog>
    </section>
  );
}
