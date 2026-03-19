import { ArrowRight, Phone, Upload } from "lucide-react";
import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="relative px-4 py-28 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,211,138,0.08),transparent_38%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-14 lg:p-16">
          <div className="max-w-4xl">
            <div className="text-xs uppercase tracking-[0.24em] text-white/40">
              Final Step
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-6xl">
              Have a difficult window? Let’s turn it into a statement feature.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Upload a photo, speak to a specialist, or start your guided curtain
              journey with Arlo. We’ll help you find the right solution for your
              apex, triangular or architectural window.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">

  {/* PRIMARY CTA */}
  <div className="flex flex-col items-start">
    <Link
      href="/start-designing"
      className="inline-flex items-center rounded-full bg-[#f5d38a] px-6 py-3 text-sm font-medium text-black transition duration-300 hover:scale-[1.02] hover:bg-[#e6c476]"
    >
      Start Your Curtain Journey
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>

    <span className="mt-1 text-xs text-white/50">
      Takes less than a minute • No obligation
    </span>
  </div>

  {/* ASK ARLO */}
  <Link
    href="/arlo-curtain-advisor"
    className="inline-flex items-center rounded-full border border-[#f5d38a]/25 bg-white/5 px-6 py-3 text-sm text-white transition duration-300 hover:scale-[1.02] hover:bg-white/10"
  >
    Ask Arlo
  </Link>

  {/* PHONE */}
  <a
    href="tel:08007720367"
    className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm text-white transition duration-300 hover:scale-[1.02] hover:bg-white/10"
  >
    <Phone className="mr-2 h-4 w-4" />
    0800 772 0367
  </a>

</div>
        </div>
      </div>
    </section>
  );
}