import { Ruler, MoveUpRight, Layers3, Wrench } from "lucide-react";

const items = [
  {
    icon: Ruler,
    title: "Precise Measuring",
    text: "Apex and triangular windows need far more precise measuring than standard curtain installations.",
  },
  {
    icon: MoveUpRight,
    title: "Custom Angled Tracks",
    text: "Specialist track systems are often required to follow the slope and geometry of the window correctly.",
  },
  {
    icon: Layers3,
    title: "Large Curtain Drops",
    text: "Tall glazing and vaulted spaces need fabrics, headings and support systems that work beautifully at scale.",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    text: "Difficult windows need experienced fitting, clean detailing and a solution that performs as well as it looks.",
  },
];

export default function SolutionFinder() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/40">
              Why specialist curtains matter
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Standard curtain companies usually struggle with these windows
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/65">
              Apex, gable-end and vaulted ceiling windows need more than nice
              fabric. They require smart design, the right track system,
              accurate measuring and specialist installation.
            </p>

            <div className="mt-8">
              <button className="rounded-full border border-[#f5d38a]/25 bg-[#f5d38a]/10 px-5 py-3 text-sm text-[#f5d38a] transition hover:bg-[#f5d38a]/15">
                Speak to a specialist
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:bg-white/[0.07]"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f5d38a]/20 bg-[#f5d38a]/10 text-[#f5d38a]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}