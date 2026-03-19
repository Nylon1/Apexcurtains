import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah L",
    location: "Cheshire",
    text: "We struggled to find anyone who understood our apex windows until we found Apex Curtains. The final installation looks incredible and works perfectly.",
  },
  {
    name: "David R",
    location: "Surrey",
    text: "The measuring, track design and installation were all handled professionally. Our gable-end curtains completely transformed the room.",
  },
  {
    name: "Emma W",
    location: "Yorkshire",
    text: "Beautiful fabrics and a truly bespoke solution. These windows are difficult but the team made it look effortless.",
  },
];

export default function ReviewsPreview() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,211,138,0.05),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">

        <div className="mb-14 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-white/40">
            Client Reviews
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Trusted by homeowners across the UK
          </h2>

          <p className="mt-4 mx-auto max-w-2xl text-white/65 leading-8">
            Our clients often come to us after struggling to find solutions for
            unusual window shapes. Here are a few of their experiences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="group rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition hover:bg-white/[0.07]"
            >

              <div className="flex mb-4 gap-1 text-[#f5d38a]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f5d38a" stroke="none" />
                ))}
              </div>

              <p className="text-white/75 leading-7 text-sm">
                "{review.text}"
              </p>

              <div className="mt-6 text-sm text-white/70">
                <strong className="text-white">{review.name}</strong> • {review.location}
              </div>

            </div>
          ))}

        </div>

        <div className="mt-12 text-center">
          <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10">
            View all reviews
          </button>
        </div>

      </div>
    </section>
  );
}