export const metadata = {
  title: "Curtain Pricing for Apex & Large Windows | What Affects the Cost",
  description:
    "Understand how curtain pricing is prepared for apex, triangular and large windows, including fabric, lining, track systems and installation factors.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 text-white">
      <section>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Accurate pricing for
          <span className="bg-gradient-to-r from-[#f5d38a] via-white to-[#f5d38a] bg-clip-text text-transparent">
            {" "}apex and shaped window curtains
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
          Pricing for apex, triangular and large architectural windows is never
          just about fabric by the metre. The final cost depends on the shape,
          scale and technical requirements of the curtain scheme.
        </p>

        <div className="mt-8 rounded-2xl border border-[#f5d38a]/20 bg-[#f5d38a]/10 p-6">
          <p className="text-white/85">
            Accurate pricing only becomes possible once the window, measurements,
            design direction and practical specification are fully understood.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          What affects curtain pricing?
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-medium">Fabric choice</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Different fabrics vary significantly in price depending on quality,
              width, texture and design.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-medium">Window size and height</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Tall windows and wide spans require more fabric, more lining and
              often more complex installation.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-medium">Heading style</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Wave, pencil pleat and hand-sewn pinch pleat all involve different
              levels of fabric usage and making detail.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-medium">Lining specification</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Standard, blackout and thermal linings affect both performance and
              overall price.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-medium">Track systems</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Shaped and apex windows often require more specialist track
              solutions than standard straight windows.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-medium">Installation complexity</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Access, height, fixing points and shaped glazing all influence the
              fitting time and approach.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          Why shaped windows need tailored pricing
        </h2>

        <p className="mt-4 text-white/70 leading-8">
          Apex and feature windows are not standard installations. The geometry
          of the space often requires more planning, more detailed measuring and
          more carefully selected systems.
        </p>

        <p className="mt-4 text-white/70 leading-8">
          A simple online estimate rarely reflects what is actually needed for a
          shaped window. This is why proper pricing is prepared after the home
          visit, not guessed in advance.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          What happens before pricing is prepared?
        </h2>

        <ul className="mt-6 list-disc pl-6 text-white/70 leading-8">
          <li>Your window and room are assessed on site</li>
          <li>Accurate measurements are taken</li>
          <li>Fabrics, headings and lining options are discussed</li>
          <li>Track requirements are identified</li>
          <li>The making and installation approach is clarified</li>
        </ul>

        <p className="mt-6 text-white/70 leading-8">
          Once those pieces are clear, the pricing can be prepared properly and
          with much greater accuracy.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          The benefit of accurate pricing
        </h2>

        <p className="mt-4 text-white/70 leading-8">
          Good pricing is not just about numbers. It gives you a clear picture
          of what is included and why the specification suits your space.
        </p>

        <p className="mt-4 text-white/70 leading-8">
          That means fewer surprises, better decisions and a smoother path from
          consultation to finished installation.
        </p>
      </section>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold">
          Get pricing based on your actual window
        </h2>

        <p className="mt-4 text-white/70 leading-8">
          If you want clear pricing for apex, triangular or large window
          curtains, start your curtain journey and we’ll prepare a specification
          based on your real measurements and room.
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