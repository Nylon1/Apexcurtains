"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Expand, X } from "lucide-react";
import { scenes, resolveLook, lookUrl } from "@/lib/visualiser/catalogue";
import RoomPaletteControls from "./RoomPaletteControls";
import {
  resolveRoomDesign,
  roomDesignFromParams,
  roomDesignParams,
  roomDesignSummary,
  type RoomDesign,
} from "@/lib/visualiser/room-design";
import materials from "@/lib/visualiser/scene-materials.json";
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
  initialDesign,
}: {
  initialRoom: string;
  initialColour: string;
  initialDesign: RoomDesign;
}) {
  const [look, setLook] = useState(() =>
    resolveLook(initialRoom, initialColour),
  );
  const [design, setDesign] = useState(() => resolveRoomDesign(initialDesign));
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [original, setOriginal] = useState(false);
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
      setDesign(roomDesignFromParams(params));
      setOriginal(false);
    }
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [initialRoom, initialColour]);

  useEffect(() => {
    const serial = ++generation.current;
    let disposed = false;
    // Dynamic import keeps renderer work out of the initial server-rendered shell.
    async function render() {
      if (canvas.current?.dataset.room !== scene.id) setStatus("loading");
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
        const ms = engine.paintScene(
          canvas.current,
          loaded,
          colour.rgb,
          design,
        );
        canvas.current.dataset.renderMs = String(Math.round(ms));
        canvas.current.dataset.colour = colour.id;
        canvas.current.dataset.room = scene.id;
        canvas.current.dataset.design = JSON.stringify(design);
        setStatus("ready");
      } catch {
        if (!disposed && serial === generation.current) setStatus("error");
      }
    }
    void render();
    return () => {
      disposed = true;
    };
  }, [scene, colour, design, retry]);

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
      lookUrl(next.scene.id, next.colour.id, design),
    );
    event(kind, {
      room: next.scene.id,
      colour: next.colour.id,
      colourReference: next.colour.reference,
      coloursExplored: explored.current.size,
    });
  }
  function changeDesign(next: RoomDesign, changed: string) {
    setDesign(next);
    setOriginal(false);
    setCopied(false);
    setCopyError(false);
    history.replaceState(history.state, "", lookUrl(scene.id, colour.id, next));
    event("room_design_changed", { room: scene.id, surface: changed, ...next });
  }
  function enlarge() {
    if (!canvas.current || !enlargedCanvas.current || status !== "ready")
      return;
    enlargedCanvas.current.width = canvas.current.width;
    enlargedCanvas.current.height = canvas.current.height;
    enlargedCanvas.current.getContext("2d")?.drawImage(canvas.current, 0, 0);
    dialog.current?.showModal();
  }
  const enquiry = `/start-designing?${new URLSearchParams({ visualiserRoom: scene.id, visualiserColour: colour.id, ...roomDesignParams(design, "visualiser-") })}`;
  const furnitureLabel =
    materials[scene.id as keyof typeof materials].furnitureLabel;

  return (
    <section
      className="rv-workspace"
      aria-label="Design your room with shaped curtains"
    >
      <div className="rv-step-heading">
        <span>01 / Choose your heading</span>
        <p>Three interiors. Three curtain designs.</p>
      </div>
      <noscript>
        <p>
          The illustrative room is shown below. Enable JavaScript to preview
          Oslo colours, or{" "}
          <Link href="/curtain-colours-and-tones">
            explore our colour guidance
          </Link>
          .
        </p>
      </noscript>
      <div
        className="rv-rooms"
        role="group"
        aria-label="Choose a curtain heading"
      >
        {scenes.map((room) => (
          <button
            key={room.id}
            type="button"
            aria-pressed={room.id === scene.id}
            onClick={() => choose(room.id, colour.id, "room_selected")}
          >
            {/* Local pre-sized photographic thumbnails. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/visualiser/${room.id}-thumb.webp`}
              width={70}
              height={70}
              alt=""
              loading="lazy"
            />
            <span>
              {room.heading}
              <small>{room.name}</small>
            </span>
            {room.id === scene.id && <Check size={16} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <p className="rv-heading-note">
        Explore a furnished room for each heading, keeping your Oslo colour.
        These illustrative interiors are inspired by real Apex installations.
      </p>
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
                alt={`Illustrative ${scene.name}: ${scene.heading} curtains following the roofline, inspired by an Apex installation`}
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
              aria-label={`${scene.name}: Oslo ${colour.name}, ${roomDesignSummary(design)}`}
            />
            <div className="rv-scene-tools">
              <button
                type="button"
                onClick={() => setOriginal(!original)}
                aria-pressed={original}
              >
                {original ? "Show my room" : "Neutral room scene"}
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
                ? "Illustrative room / neutral curtains"
                : `Colour visualisation · Oslo ${colour.name}`}
            </span>
          </div>
          <div className="rv-status" role="status" aria-live="polite">
            {status === "loading" ? (
              "Preparing your room…"
            ) : status === "error" ? (
              <>
                The colour preview could not load. The neutral room scene is
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
              `${scene.name} · ${original ? "Neutral room scene" : `Oslo ${colour.name}`}`
            )}
          </div>
        </div>
        <aside className="rv-options" aria-label="Room design controls">
          <p className="rv-eyebrow">02 / Make it your own</p>
          <h2>
            Your room.
            <br />
            <em>Your palette.</em>
          </h2>
          <RoomPaletteControls
            colour={colour}
            design={design}
            furnitureLabel={furnitureLabel}
            onColour={(id) => choose(scene.id, id, "colour_selected")}
            onDesign={changeDesign}
          />
          <p className="rv-scheme-summary">{roomDesignSummary(design)}</p>
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
                    `${location.origin}${lookUrl(scene.id, colour.id, design)}`,
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
                and palette are saved in the address.
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
        AI-assisted illustrative interiors, inspired by real Apex installation
        photography. These are design scenes, not photographs of completed rooms
        or exact fabric simulations. Oslo colour changes preserve the scene’s
        folds and proportions. Room colours and lighting are illustrative.
        Confirm fabric, heading and measurements with samples and a specialist
        survey; the preview does not predict opening or blackout performance.
      </p>
      <dialog
        ref={dialog}
        className="rv-dialog"
        aria-label={`Enlarged ${scene.name} in Oslo ${colour.name}`}
        onClose={() => enlargeButton.current?.focus()}
      >
        <div>
          <p>
            {scene.name} · Oslo {colour.name} · Lights {design.lights}
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
