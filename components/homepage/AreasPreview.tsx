import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

const areaLinks = [
  { label: "London", href: "/areas/london" },
  { label: "Manchester", href: "/areas/manchester" },
  { label: "Birmingham", href: "/areas/birmingham" },
  { label: "Leeds", href: "/areas/leeds" },
  { label: "Glasgow", href: "/areas/glasgow" },
  { label: "Edinburgh", href: "/areas/edinburgh" },
];

export default function AreasPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {areaLinks.map((area) => (
          <Link
            key={area.label}
            href={area.href}
            className="group flex items-center justify-between rounded-[28px] border border-white/10 bg-white/[0.04] px-6 py-6 text-white transition duration-300 hover:-translate-y-1 hover:border-[#f5d38a]/30 hover:bg-white/[0.06]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f5d38a]/20 bg-[#f5d38a]/10 text-[#f5d38a]">
                <MapPin className="h-5 w-5" />
              </div>

              <span className="text-xl font-semibold">{area.label}</span>
            </div>

            <ChevronRight className="h-5 w-5 text-white/55 transition duration-300 group-hover:translate-x-1 group-hover:text-[#f5d38a]" />
          </Link>
        ))}
      </div>
    </section>
  );
}