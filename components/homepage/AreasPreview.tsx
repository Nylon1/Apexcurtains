import { ChevronRight, MapPin } from "lucide-react";

const areas = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Glasgow",
  "Edinburgh",
];

export default function AreasPreview() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(125,211,252,0.05),transparent_26%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/40">
              Areas We Cover
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Specialist coverage across the UK
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">
              We provide made-to-measure apex curtain solutions for homeowners,
              loft conversions, barn conversions and architectural spaces across
              the UK.
            </p>
          </div>

          <button className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10">
            View all areas
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <a
              key={area}
              href="#"
              className="group flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-5 py-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:bg-white/[0.07]"
            >
              <span className="inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#f5d38a]/20 bg-[#f5d38a]/10 text-[#f5d38a]">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-lg font-medium">{area}</span>
              </span>

              <ChevronRight className="h-5 w-5 text-white/40 transition group-hover:translate-x-1 group-hover:text-[#f5d38a]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}