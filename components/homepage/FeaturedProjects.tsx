"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const windowCards = [
  {
    title: "Apex Windows",
    description: "For sloped tops and dramatic triangular shapes.",
    href: "/apex-curtains",
    image: "/window-types/apex-hero.jpg",
    size: "large",
  },
  {
    title: "Gable End Windows",
    description: "Large glazed walls often found in double-height spaces.",
    href: "/gable-end-curtains",
    image: "/window-types/gable-end.jpg",
    size: "medium",
  },
  {
    title: "Triangular Windows",
    description: "Elegant solutions for unusual angular glazing.",
    href: "/triangular-window-curtains",
    image: "/window-types/triangular.jpg",
    size: "medium",
  },
  {
    title: "Barn Conversions",
    description: "Curtain systems for lofty angular rooms.",
    href: "/barn-conversion-curtains",
    image: "/window-types/barn-conversion.jpg",
    size: "medium",
  },
  {
    title: "Large Windows",
    description: "Luxury drapery for expansive walls of glass.",
    href: "/large-window-curtains",
    image: "/window-types/large-window.jpg",
    size: "medium",
  },
];

export default function WindowNavigator() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f5d38a]/20 bg-[#f5d38a]/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#f5d38a]">
            <Sparkles className="h-4 w-4" />
            Window Type Explorer
          </div>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Explore solutions by
            <span className="bg-gradient-to-r from-[#f5d38a] via-white to-[#f5d38a] bg-clip-text text-transparent">
              {" "}window shape
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-white/65 sm:text-base">
            Browse the most common architectural window types we work with and
            jump straight to the right section on our Window Types page.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/window-types"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/85 transition hover:border-[#f5d38a]/25 hover:bg-white/10"
          >
            View all window types
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/arlo-curtain-advisor"
            className="inline-flex items-center gap-2 rounded-full bg-[#f5d38a] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e6c476]"
          >
            Ask Arlo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        {windowCards.map((card) => {
          const isLarge = card.size === "large";

          return (
            <Link
              key={card.title}
              href={card.href}
              className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] shadow-[0_25px_80px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#f5d38a]/25 ${
                isLarge
                  ? "min-h-[380px] lg:col-span-8"
                  : "min-h-[320px] lg:col-span-4"
              }`}
            >
              <div className="absolute inset-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="absolute -left-[120%] top-0 h-full w-[120%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-none group-hover:animate-[shine_1.3s]" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                  Specialist Fit
                </div>

                <h3
                  className={`max-w-xl font-semibold leading-tight text-white ${
                    isLarge ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
                  }`}
                >
                  {card.title}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                  {card.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#f5d38a]">
                  View details
                  <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}