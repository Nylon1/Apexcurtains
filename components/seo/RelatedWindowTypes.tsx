import Link from "next/link";

const windowTypeLinks = [
  {
    href: "/apex-curtains",
    title: "Apex Curtains",
    desc: "Curtains for angled, triangular and apex windows.",
  },
  {
    href: "/gable-end-curtains",
    title: "Gable End Curtains",
    desc: "Curtains for tall glazed feature windows and double-height spaces.",
  },
  {
    href: "/triangular-window-curtains",
    title: "Triangular Window Curtains",
    desc: "Curtains for pointed and unusual shaped glazing.",
  },
  {
    href: "/barn-conversion-curtains",
    title: "Barn Conversion Curtains",
    desc: "Curtains for vaulted rooms, beams and rustic-glazed interiors.",
  },
  {
    href: "/large-window-curtains",
    title: "Large Window Curtains",
    desc: "Curtains for wide glazing, patio doors and floor-to-ceiling glass.",
  },
];

export default function RelatedWindowTypes({
  currentHref,
  title = "Explore other window types",
}: {
  currentHref: string;
  title?: string;
}) {
  const filtered = windowTypeLinks.filter((item) => item.href !== currentHref);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-8">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.18em] text-[#f5d38a]">
            Internal navigation
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-8 text-white/68 sm:text-base">
            Explore related curtain solutions for other architectural and unusual
            window shapes.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:border-[#f5d38a]/25 hover:bg-black/30"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/68">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}