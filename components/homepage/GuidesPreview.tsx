import { ArrowUpRight, BookOpen } from "lucide-react";

const guides = [
  {
    title: "How to Measure an Apex Window",
    description:
      "A practical guide to understanding widths, drops and the key dimensions needed for shaped windows.",
    category: "Measuring Guide",
  },
  {
    title: "Best Curtain Tracks for Triangular Windows",
    description:
      "Learn which track systems work best for unusual shapes, sloping lines and tall architectural glazing.",
    category: "Track Systems",
  },
  {
    title: "Curtains vs Blinds for Gable End Windows",
    description:
      "A clear comparison of visual impact, privacy, insulation and suitability for large glazed spaces.",
    category: "Buying Advice",
  },
];

export default function GuidesPreview() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,211,138,0.05),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/40">
              Advice & Guides
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Expert guidance for difficult windows
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">
              Explore practical guides, measuring advice and specialist insight
              for apex, triangular and architectural curtain projects.
            </p>
          </div>

          <button className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10">
            View all guides
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {guides.map((guide) => (
            <article
              key={guide.title}
              className="group rounded-[30px] border border-white/10 bg-white/5 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:bg-white/[0.07]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f5d38a]/20 bg-[#f5d38a]/10 text-[#f5d38a]">
                <BookOpen className="h-5 w-5" />
              </div>

              <div className="mt-5 text-xs uppercase tracking-[0.18em] text-[#f5d38a]">
                {guide.category}
              </div>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                {guide.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/65">
                {guide.description}
              </p>

              <div className="mt-6 inline-flex items-center text-sm text-white transition group-hover:text-[#f5d38a]">
                Read guide
                <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}