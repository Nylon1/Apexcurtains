"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Lightbulb } from "lucide-react";
import { osloColours, type OsloColour } from "@/lib/visualiser/catalogue";
import {
  roomPalettes,
  type RoomDesign,
  type RoomSurface,
} from "@/lib/visualiser/room-design";

const sections = [
  { id: "curtain", label: "Curtains" },
  { id: "wall", label: "Walls" },
  { id: "floor", label: "Flooring" },
  { id: "furniture", label: "Furniture" },
] as const;

export default function RoomPaletteControls({
  colour,
  design,
  furnitureLabel,
  onColour,
  onDesign,
}: {
  colour: OsloColour;
  design: RoomDesign;
  furnitureLabel: string;
  onColour: (id: string) => void;
  onDesign: (next: RoomDesign, changed: string) => void;
}) {
  const [active, setActive] = useState<"curtain" | RoomSurface>("curtain");
  const listRef = useRef<HTMLDivElement>(null);
  const curtain = active === "curtain";
  const selectedId = curtain ? colour.id : design[active];
  const options = curtain
    ? osloColours
    : [
        { id: "original", name: "Original tone", rgb: [223, 215, 198] },
        ...roomPalettes[active],
      ];
  const selected = options.find((option) => option.id === selectedId)!;
  const surfaceLabel = sections.find((section) => section.id === active)!.label;
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!list || !item) return;
    const itemBounds = item.getBoundingClientRect();
    const bounds = list.getBoundingClientRect();
    if (matchMedia("(max-width: 800px)").matches)
      list.scrollLeft +=
        itemBounds.left -
        bounds.left -
        (list.clientWidth - itemBounds.width) / 2;
    else if (itemBounds.top < bounds.top || itemBounds.bottom > bounds.bottom)
      list.scrollTop +=
        itemBounds.top -
        bounds.top -
        (list.clientHeight - itemBounds.height) / 2;
  }, [active, selectedId]);
  return (
    <>
      <div className="rv-light-control">
        <div>
          <Lightbulb size={18} aria-hidden="true" />
          <span>
            Room lights<small>Daylight stays in the room</small>
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={design.lights === "on"}
          aria-label="Room lights"
          onClick={() =>
            onDesign(
              { ...design, lights: design.lights === "on" ? "off" : "on" },
              "lights",
            )
          }
        >
          <span aria-hidden="true" />
          {design.lights === "on" ? "On" : "Off"}
        </button>
      </div>
      <div
        className="rv-editor-sections"
        role="group"
        aria-label="Choose what to edit"
      >
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            aria-pressed={active === section.id}
            aria-controls="room-palette"
            onClick={() => setActive(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
      <div id="room-palette" className="rv-palette-panel">
        <div className="rv-selected" aria-live="polite">
          <span
            style={{ background: `rgb(${selected.rgb.join(",")})` }}
            aria-hidden="true"
          />
          <div>
            <strong>{curtain ? `Oslo ${selected.name}` : selected.name}</strong>
            <small>
              {curtain
                ? `Prestigious Textiles · ${colour.reference}`
                : active === "furniture"
                  ? furnitureLabel
                  : active === "wall"
                    ? "Walls & vaulted ceiling"
                    : "Timber floor tone"}
            </small>
          </div>
        </div>
        <div
          className="rv-colours"
          ref={listRef}
          role="group"
          aria-label={
            curtain
              ? "Choose an Oslo colour"
              : `Choose ${surfaceLabel.toLowerCase()} colour`
          }
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              aria-pressed={option.id === selectedId}
              aria-label={`${curtain ? "Oslo" : surfaceLabel} ${option.name}`}
              onClick={() =>
                curtain
                  ? onColour(option.id)
                  : onDesign({ ...design, [active]: option.id }, active)
              }
            >
              <span
                className={`rv-swatch ${option.id === "original" ? "rv-original-swatch" : ""}`}
                style={{ background: `rgb(${option.rgb.join(",")})` }}
                aria-hidden="true"
              >
                {option.id === selectedId && <Check size={16} />}
              </span>
              <span>{option.name}</span>
            </button>
          ))}
        </div>
        <p className="rv-sample-note">
          {curtain
            ? "A colour impression in this room’s light. Confirm your choice with a physical Oslo sample."
            : active === "furniture"
              ? "Explore the main upholstery. Timber, accent cushions and decorative details keep their original finish."
              : active === "floor"
                ? "Explore timber tones while keeping the grain, rug and natural shadows."
                : "Explore a wall and ceiling colour together, with the room’s architectural shadows preserved."}
        </p>
      </div>
    </>
  );
}
