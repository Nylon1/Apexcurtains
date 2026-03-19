"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const styles = [
  {
    key: "soft",
    name: "Soft & Elegant",
    eyebrow: "Refined and calm",
    title: "A gentle, balanced look that softens the architecture beautifully.",
    description:
      "This direction works especially well in bedrooms, lounges and premium family spaces where you want the window to feel dressed without overpowering the room.",
    heading: "Often suits pinch pleat or soft wave pleat",
    lining: "Usually pairs well with privacy or light-filtering lining",
    tone: "Best for homes that want understated luxury.",
  },
  {
    key: "modern",
    name: "Modern & Architectural",
    eyebrow: "Clean and structured",
    title: "A sharper, more contemporary finish for dramatic glazing.",
    description:
      "This direction keeps the shape of the window visually strong and works especially well in extensions, gable end spaces and more minimalist interiors.",
    heading: "Often suits wave pleat on a tailored track",
    lining: "Usually pairs well with discreet lining and clean stacking",
    tone: "Best for sleek spaces with strong lines and modern detailing.",
  },
  {
    key: "warm",
    name: "Warm & Cosy",
    eyebrow: "Comfort-led",
    title: "A fuller, softer look that makes large or difficult windows feel warmer.",
    description:
      "This is ideal where insulation, comfort and softness matter just as much as appearance, especially in family rooms, lofts and converted spaces.",
    heading: "Often suits fuller pleats and richer fabrics",
    lining: "Usually benefits from thermal or blackout lining",
    tone: "Best for rooms where comfort and atmosphere matter most.",
  },
  {
    key: "dramatic",
    name: "Dramatic & Luxurious",
    eyebrow: "Statement finish",
    title: "A bolder curtain direction for feature windows that deserve presence.",
    description:
      "This approach is ideal for large apex glazing, high ceilings and focal-point rooms where the curtains should feel like part of the architecture.",
    heading: "Often suits hand-finished pleats and deeper stacks",
    lining: "Usually pairs well with premium interlining or blackout",
    tone: "Best for statement homes and high-impact interiors.",
  },
] as const;

export default function DesignDirection() {
  const [active, setActive] = useState<(typeof styles)[number]["key"]>("modern");

  const current = useMemo(
    () => styles.find((item) => item.key === active) ?? styles[1],
    [active]
  );

  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-10 -z-10 mx-auto h-[420px] max-w-5xl rounded-full bg-[#f5d38a]/6 blur-[120px]" />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.32)] sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f5d38a]/20 bg-[#f5d38a]/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#f5d38a]">
            <Sparkles className="h-4 w-4" />
            Design Direction
          </div>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What mood do you want your window to create?
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-8 text-white/65 sm:text-base">
            Choose the direction that feels closest to your room. We’ll show the kind
            of curtain solution that usually fits best.
          </p>

          <div className="mt-8 space-y-3">
            {styles.map((item) => {
              const isActive = item.key === active;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActive(item.key)}
                  className={`w-full rounded-[24px] border px-5 py-4 text-left transition ${
                    isActive
                      ? "border-[#f5d38a]/35 bg-[#f5d38a]/10 shadow-[0_0_30px_rgba(245,211,138,0.08)]"
                      : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-medium text-white">{item.name}</div>
                      <div className="mt-1 text-sm text-white/50">{item.eyebrow}</div>
                    </div>

                    {isActive && (
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f5d38a] text-black">
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.32)]">
          <div className="border-b border-white/10 px-6 py-5 sm:px-8">
            <div className="text-xs uppercase tracking-[0.22em] text-[#f5d38a]">
              {current.eyebrow}
            </div>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {current.title}
            </h3>
          </div>

          <div className="grid gap-6 p-6 sm:p-8">
            <div className="rounded-[26px] border border-white/10 bg-black/20 p-6">
              <div className="text-sm leading-8 text-white/72">
                {current.description}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                  Heading direction
                </div>
                <div className="mt-3 text-base leading-7 text-white">
                  {current.heading}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                  Lining direction
                </div>
                <div className="mt-3 text-base leading-7 text-white">
                  {current.lining}
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#f5d38a]/15 bg-[#f5d38a]/6 p-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#f5d38a]">
                Specialist note
              </div>
              <div className="mt-3 text-sm leading-8 text-white/78">
                {current.tone}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/arlo-curtain-advisor"
                className="inline-flex items-center gap-2 rounded-full bg-[#f5d38a] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#e6c476]"
              >
                Ask Arlo About This Style
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/start-designing"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white/85 transition hover:bg-white/10"
              >
                Start Designing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}