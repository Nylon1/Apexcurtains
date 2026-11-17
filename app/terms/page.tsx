import type { Metadata } from "next";
import Link from "next/link";
import { atelierTermsClauses, atelierTermsVersion } from "@/lib/atelier/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions — Made-to-Measure Orders",
  description:
    "Read the Apex Curtains terms for bespoke curtains and Roman blinds, including measurements, lining, installation, payments, cancellation and aftercare.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-apex-navy-900 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -right-20 top-4 h-80 w-80 rounded-full bg-[#f5d38a]/10 blur-[110px]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-sm"
          >
            <Link href="/" className="text-white/50 transition hover:text-white">
              Home
            </Link>
            <span className="text-white/30" aria-hidden="true">/</span>
            <span className="text-[#f5d38a]">Terms & Conditions</span>
          </nav>
          <div className="inline-flex rounded-full border border-[#f5d38a]/25 bg-[#f5d38a]/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f5d38a]">
            Apex Curtains · Bespoke Orders
          </div>
          <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Made-to-Measure Curtains &amp; Blinds
            <span className="mt-2 block font-serif font-normal italic text-[#f5d38a]">
              Terms & Conditions
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-8 text-white/75 sm:text-base">
            Please read these terms before confirming your order. They explain
            our made-to-measure service, what to expect from specialist window
            coverings, and the arrangements for payment, installation and
            aftercare.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">
            Your individual written project summary records the agreed products,
            measurements, specifications and payment schedule.
          </p>
          <p className="mt-5 text-xs text-white/45">
            Document version: {atelierTermsVersion}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid items-start gap-9 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 lg:sticky lg:top-24">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5d38a]">
              On this page
            </h2>
            <nav aria-label="Terms sections" className="mt-5">
              <ol className="space-y-3">
                {atelierTermsClauses.map((clause, index) => (
                  <li key={clause.title}>
                    <a
                      href={`#section-${index + 1}`}
                      className="group flex gap-3 text-xs leading-5 text-white/65 transition hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5d38a]"
                    >
                      <span className="shrink-0 text-[#f5d38a]/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{clause.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article aria-label="Apex Curtains made-to-measure order terms" className="space-y-5">
            {atelierTermsClauses.map((clause, index) => (
              <section
                id={`section-${index + 1}`}
                key={clause.title}
                className="scroll-mt-28 rounded-[26px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.13)] sm:p-8"
              >
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5d38a]">
                  Section {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="text-2xl font-semibold leading-snug text-white sm:text-[27px]">
                  {clause.title}
                </h2>
                <p className="mt-5 max-w-3xl whitespace-pre-line text-sm leading-8 text-white/75 sm:text-[15px] sm:leading-8">
                  {clause.body}
                </p>
              </section>
            ))}

            <div className="rounded-[26px] border border-[#f5d38a]/20 bg-[#f5d38a]/[0.06] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">
                Questions about your order?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
                Our team can clarify specifications, explain particular
                window requirements or answer questions about these terms
                before you confirm your made-to-measure order.
              </p>
              <a
                href="mailto:hello@apexcurtains.com"
                className="mt-5 inline-flex rounded-full border border-[#f5d38a]/35 px-5 py-3 text-sm font-medium text-[#f5d38a] transition hover:bg-[#f5d38a]/10"
              >
                hello@apexcurtains.com
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
