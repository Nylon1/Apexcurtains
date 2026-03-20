import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

const guides = [
  {
    title: "How to Measure for Apex Curtains",
    description:
      "A practical guide to understanding widths, drops and the key dimensions needed for shaped windows.",
    category: "Measuring Guide",
    href: "/advice/how-to-measure-for-apex-curtains",
  },
  {
    title: "Best Curtains for Apex Windows",
    description:
      "Discover which curtain styles, fabrics and layouts work best for apex and angled architectural glazing.",
    category: "Style Guide",
    href: "/advice/best-curtains-for-apex-windows-expert-guide",
  },
  {
    title: "What Curtain Track is Best for Apex Windows?",
    description:
      "Explore inspiring curtain ideas for apex windows, from modern wave pleats to elegant full-height designs.",
    category: "Buying Advice",
    href: "/advice/what-curtain-track-is-best-for-apex-windows",
  },
];

export default function GuidesPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f5d38a]/20 bg-[#f5d38a]/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[#f5d38a]">
            <BookOpen className="h-4 w-4" />
            Expert Advice
          </div>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Guides to help you choose the
            <span className="bg-gradient-to-r from-[#f5d38a] via-white to-[#f5d38a] bg-clip-text text-transparent">
              {" "}right curtains
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-white/65 sm:text-base">
            Explore practical advice for apex, triangular and architectural windows,
            from measuring and track systems to style ideas and buying guidance.
          </p>
        </div>

        <Link
          href="/advice"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/85 transition hover:border-[#f5d38a]/25 hover:bg-white/10 hover:text-white"
        >
          View all guides
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="group block rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#f5d38a]/25 hover:bg-white/[0.06]"
          >
            <div className="flex h-full flex-col">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#f5d38a]/20 bg-[#f5d38a]/10 text-[#f5d38a]">
                <BookOpen className="h-5 w-5" />
              </div>

              <div className="mt-5 text-xs uppercase tracking-[0.18em] text-[#f5d38a]">
                {guide.category}
              </div>

              <h3 className="mt-4 text-2xl font-semibold leading-tight text-white transition group-hover:text-[#f5d38a]">
                {guide.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-8 text-white/70">
                {guide.description}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#f5d38a]">
                Read guide
                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}