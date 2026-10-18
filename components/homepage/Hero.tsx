"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TrackedLink from "@/components/analytics/TrackedLink";
const windowOptions = [
  {
    id: "angled",
    title: "Angled Windows",
    eyebrow: "A softer line",
    description: "Single slopes and beautifully unequal proportions.",
    href: "/angled-window-curtains",
    image: "/window-types/gable-end.jpeg",
    system: "Track and curtain planned together",
    bestFor: "Sloping ceilings",
    pricing: "Individually quoted",
    note: "Designed around each changing drop.",
  },
  {
    id: "apex",
    title: "Apex Windows",
    eyebrow: "Shaped around the roofline",
    description: "For sloped and dramatic triangular roofline glazing.",
    href: "/apex-curtains",
    image: "/window-types/apex-hero.jpg",
    system: "Custom bent aluminium track with made-to-measure lined drapery",
    bestFor: "Luxury homes",
    pricing:
      "Quoted to the window, specification and installation requirements",
    note: "Ideal when the room needs softness without losing the architectural drama.",
  },
  {
    id: "triangular",
    title: "Triangular Windows",
    eyebrow: "Architectural fit",
    description: "Elegant solutions for unusual angular glazing.",
    href: "/triangular-window-curtains",
    image: "/window-types/triangular.jpeg",
    system: "Tailored track direction with shaped curtain planning",
    bestFor: "Modern feature rooms",
    pricing:
      "Quoted to the window, specification and installation requirements",
    note: "Best where the shape itself is part of the design story.",
  },
  {
    id: "gable",
    title: "Gable End Windows",
    eyebrow: "Statement spaces",
    description: "Designed for dramatic double-height glazing.",
    href: "/gable-end-curtains",
    image: "/window-types/gable-end.jpeg",
    system: "Heavy-duty custom tracking for tall feature glazing",
    bestFor: "Open-plan spaces",
    pricing:
      "Quoted to the window, specification and installation requirements",
    note: "Works beautifully where scale, light and softness all need balancing.",
  },
  {
    id: "barn",
    title: "Barn Conversions",
    eyebrow: "Character spaces",
    description: "Curtain systems for vaulted and lofty angular rooms.",
    href: "/barn-conversion-curtains",
    image: "/window-types/barn-conversion.jpeg",
    system: "Bespoke track planning for vaulted room geometry",
    bestFor: "Barns and conversions",
    pricing:
      "Quoted to the window, specification and installation requirements",
    note: "Perfect for adding warmth to large rustic-glazed interiors.",
  },
  {
    id: "large",
    title: "Large Windows",
    eyebrow: "Grand glazing",
    description: "Luxury drapery for expansive walls of glass.",
    href: "/large-window-curtains",
    image: "/window-types/large-feature.jpeg",
    system: "Wave or pinch pleat on robust made-to-measure tracking",
    bestFor: "Wide glazed rooms",
    pricing:
      "Quoted to the window, specification and installation requirements",
    note: "A strong choice where scale and elegance matter more than complexity.",
  },
];
export default function Hero() {
  const [activeId, setActiveId] = useState("apex");
  const active = windowOptions.find((item) => item.id === activeId)!;
  return (
    <section className="magazine-hero">
      <div className="magazine-hero-copy">
        <p className="editorial-eyebrow">
          Apex Curtains / Considered interiors
        </p>
        <h1>
          Extraordinary windows.
          <br />
          <em>Beautifully dressed.</em>
        </h1>
        <p>
          Specialist curtains for apex, triangular and gable-end windows.
          Thoughtful cloth, precise making and a softer way to live with the
          light.
        </p>
        <TrackedLink
          href="/start-designing"
          eventName="curtain_journey_start_click"
          eventData={{ source: "homepage_hero" }}
          className="editorial-button"
        >
          Begin your curtain story ↗
        </TrackedLink>
        <Link href="/gallery" className="editorial-text-link">
          Explore our work
        </Link>
      </div>
      <div className="magazine-hero-photo">
        <Image
          src={active.image}
          alt={active.title + " dressed with bespoke curtains"}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 60vw"
        />
        <div className="magazine-photo-caption" aria-live="polite">
          <span>{active.eyebrow}</span>
          <h2>{active.title}</h2>
          <Link href={active.href}>Explore this window ↗</Link>
        </div>
      </div>
      <div
        className="magazine-window-picker"
        role="group"
        aria-label="Explore your window shape"
      >
        {windowOptions.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={activeId === item.id}
            onClick={() => setActiveId(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </section>
  );
}
