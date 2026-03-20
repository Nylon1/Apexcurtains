"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Ruler, HelpCircle, FileText } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discuss your space and explore fabrics",
    text: "We begin by understanding your room, your window and the look you want to create. We then show suitable fabrics and guide you through what will work best in your space.",
    icon: MessageCircle,
    href: "/advice/curtains-discussing-fabrics",
  },
  {
    number: "02",
    title: "Take accurate on-site measurements",
    text: "We measure everything properly, including angles, height and structure, so the curtain scheme is built around real dimensions.",
    icon: Ruler,
    href: "/advice/curtain-measurements-apex-windows",
  },
  {
    number: "03",
    title: "Answer your questions clearly",
    text: "From headings and linings to track systems and operation, we explain everything so you feel confident in your decisions.",
    icon: HelpCircle,
    href: "/advice/curtain-consultation-questions",
  },
  {
    number: "04",
    title: "Prepare accurate pricing",
    text: "Once everything is clear, we prepare pricing based on your actual window, measurements and chosen specification.",
    icon: FileText,
    href: "/advice/curtain-pricing-apex-windows",
  },
];

export default function HomeVisitPremium() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-[40px]">
        <div className="absolute left-[10%] top-[8%] h-40 w-40 rounded-full bg-[#f5d38a]/8 blur-[90px]" />
        <div className="absolute right-[12%] top-[20%] h-52 w-52 rounded-full bg-white/5 blur-[110px]" />
        <div className="absolute bottom-[8%] left-[35%] h-44 w-44 rounded-full bg-[#f5d38a]/6 blur-[100px]" />
      </div>

      <div className="mb-18 text-center">
        <div className="inline-flex items-center rounded-full border border-[#f5d38a]/20 bg-[#f5d38a]/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#f5d38a]">
          Home Consultation
        </div>

        <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          A more considered way to
          <span className="bg-gradient-to-r from-[#f5d38a] via-white to-[#f5d38a] bg-clip-text text-transparent">
            {" "}choose your curtains
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
          Our home visit is designed to make the process feel calm, clear and
          tailored. We guide you through fabrics, measurements and key design
          decisions so everything fits your room properly.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-[#f5d38a]/25 via-white/10 to-transparent lg:block" />

        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Link href={step.href} className="group block">
                  <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition duration-500 hover:-translate-y-1 hover:border-[#f5d38a]/28 hover:shadow-[0_34px_100px_rgba(0,0,0,0.42)] sm:p-8 lg:p-9">
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                      <div className="absolute -right-12 top-0 h-44 w-44 rounded-full bg-[#f5d38a]/10 blur-[90px]" />
                      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/5 blur-[80px]" />
                    </div>

                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start">
                      <div className="flex items-start gap-5 lg:w-[230px] lg:flex-shrink-0">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f5d38a]/20 bg-[#f5d38a]/10 text-[#f5d38a] shadow-[0_0_0_6px_rgba(245,211,138,0.04)]">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="text-[11px] uppercase tracking-[0.24em] text-white/38">
                            Step {step.number}
                          </div>
                          <div className="mt-2 text-sm text-[#f5d38a]/85">
                            Consultation detail
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 border-t border-white/8 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                        <h3 className="max-w-3xl text-2xl font-semibold leading-tight text-white transition duration-300 group-hover:text-[#f5d38a] sm:text-3xl">
                          {step.title}
                        </h3>

                        <p className="mt-4 max-w-3xl text-sm leading-8 text-white/66 sm:text-base">
                          {step.text}
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#f5d38a]">
                          Explore this step
                          <span className="transition duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 rounded-[30px] border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
        <p className="mx-auto max-w-2xl text-base leading-8 text-white/62">
          No pressure, no guesswork, just clear advice, accurate planning and a
          more refined path from difficult window to finished room.
        </p>

        <div className="mt-7">
          <Link
            href="/start-designing"
            className="inline-flex items-center rounded-full bg-[#f5d38a] px-7 py-3 text-sm font-medium text-black transition hover:bg-[#e6c476]"
          >
            Start your curtain journey
          </Link>
        </div>
      </div>
    </section>
  );
}