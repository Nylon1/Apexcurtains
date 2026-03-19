"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ArloPreview() {
  return (
    <section className="relative px-4 py-28 sm:px-6 lg:px-8">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,211,138,0.08),transparent_40%)]" />

      <div className="relative mx-auto max-w-6xl">

        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.45)]">

          <div className="inline-flex items-center gap-2 text-[#f5d38a] text-sm tracking-widest uppercase">
            <Sparkles size={16} />
            Smart Curtain Advisor
          </div>

          <h2 className="mt-6 text-4xl sm:text-5xl font-semibold text-white">
            Meet <span className="text-[#f5d38a]">Arlo</span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-white/70 leading-8">
            Choosing curtains for apex and architectural windows can be confusing.
            Arlo helps you understand your window type, track systems and the best
            curtain solutions for your space.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <Link
  href="/arlo-curtain-advisor"
  className="inline-flex items-center gap-2 rounded-full bg-[#f5d38a] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#e6c476]"
>
  Ask Arlo
  <ArrowRight size={16} />
</Link>

           

          </div>

        </div>

      </div>

    </section>
  );
}