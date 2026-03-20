export const metadata = {
  title:
    "Curtain Measurements for Apex & Triangular Windows | Expert Guide",
  description:
    "Learn how apex and shaped windows are measured professionally for curtains, including angles, drops and track positioning.",
};

export default function Page() {
  return (
   <main className="mx-auto max-w-5xl px-4 pb-16 pt-32 text-white sm:pt-36">
      {/* HERO */}
      <section>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Accurate Curtain Measurements for
          <span className="bg-gradient-to-r from-[#f5d38a] via-white to-[#f5d38a] bg-clip-text text-transparent">
            {" "}apex and shaped windows
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
          Measuring curtains for apex, triangular and architectural windows is
          very different from standard windows. Angles, height and proportions
          all play a role in how the final curtains will look and operate.
        </p>

        <div className="mt-8 rounded-2xl border border-[#f5d38a]/20 bg-[#f5d38a]/10 p-6">
          <p className="text-white/85">
            A small measuring mistake on a shaped window can affect the entire
            result. This is why accurate, on-site measurement is one of the most
            important parts of the process.
          </p>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          Why apex windows are harder to measure
        </h2>

        <p className="mt-4 text-white/70 leading-8">
          Apex and triangular windows introduce angles that standard curtain
          measuring guides do not account for. The top point, sloping sides and
          varying wall heights all need to be considered together.
        </p>

        <ul className="mt-6 list-disc pl-6 text-white/70 leading-8">
          <li>Sloping ceilings and angled walls</li>
          <li>Uneven heights across the window</li>
          <li>Track positioning and fixing points</li>
          <li>How the curtains will stack when open</li>
        </ul>
      </section>

      {/* SECTION 2 */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          What we measure during a home visit
        </h2>

        <p className="mt-4 text-white/70 leading-8">
          During a professional consultation, we take multiple measurements to
          build a complete understanding of the window and surrounding space.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-medium">Width</h3>
            <p className="mt-2 text-sm text-white/70">
              Full span of the window and beyond, including stack-back space.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-medium">Drop</h3>
            <p className="mt-2 text-sm text-white/70">
              Multiple drop points are taken due to angled ceilings.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-medium">Apex height</h3>
            <p className="mt-2 text-sm text-white/70">
              The highest central point of the window.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-medium">Track position</h3>
            <p className="mt-2 text-sm text-white/70">
              Where the curtain track will be fixed for best visual result.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          Why DIY measurements often fail
        </h2>

        <p className="mt-4 text-white/70 leading-8">
          Measuring shaped windows without experience can lead to incorrect
          proportions, poor curtain flow and installation issues.
        </p>

        <p className="mt-4 text-white/70 leading-8">
          Common issues include curtains sitting unevenly, incorrect stacking,
          or tracks being positioned in the wrong place.
        </p>
      </section>

      {/* SECTION 4 */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          The difference professional measuring makes
        </h2>

        <p className="mt-4 text-white/70 leading-8">
          Accurate measuring ensures that the curtain design works with the
          architecture of the window, rather than against it.
        </p>

        <ul className="mt-6 list-disc pl-6 text-white/70 leading-8">
          <li>Balanced proportions across the window</li>
          <li>Correct curtain fullness and drape</li>
          <li>Smooth operation on angled tracks</li>
          <li>A cleaner, more considered final finish</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold">
          Get your windows measured properly
        </h2>

        <p className="mt-4 text-white/70 leading-8">
          If you have an apex or shaped window, the best results start with
          accurate measurements taken on site.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="/start-designing"
            className="rounded-full bg-[#f5d38a] px-6 py-3 text-sm font-medium text-black hover:bg-[#e6c476]"
          >
            Start your curtain journey
          </a>

          <a
            href="/advice"
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-white hover:bg-white/10"
          >
            View more guides
          </a>
        </div>
      </section>
    </main>
  );
}