import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryProjectBySlug } from "@/lib/gallery-projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function withLinks(text?: string) {
  if (!text) return "";

  return text
    .replace(
      /apex curtains/gi,
      `<a href="/apex-curtains" class="text-[#b8954f] underline underline-offset-4">apex curtains</a>`
    )
    .replace(
      /gable end windows/gi,
      `<a href="/gable-end-curtains" class="text-[#b8954f] underline underline-offset-4">gable end windows</a>`
    )
    .replace(
      /window types/gi,
      `<a href="/window-types" class="text-[#b8954f] underline underline-offset-4">window types</a>`
    )
    .replace(
      /curtain advice/gi,
      `<a href="/advice" class="text-[#b8954f] underline underline-offset-4">curtain advice</a>`
    )
    .replace(
      /get a quote/gi,
      `<a href="/get-curtain-quote" class="text-[#b8954f] underline underline-offset-4">get a quote</a>`
    );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getGalleryProjectBySlug(slug);

  if (!data) {
    return {
      title: "Gallery Project | Apex Curtains",
      description: "View a recent curtain installation project by Apex Curtains.",
    };
  }

  const title = `${data.title} | Apex Curtains Gallery`;
  const description =
    data.summary ||
    data.brief ||
    `View this ${data.category || "curtain"} installation project by Apex Curtains${data.location ? ` in ${data.location}` : ""}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://apexcurtains.com/gallery/${data.slug || slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://apexcurtains.com/gallery/${data.slug || slug}`,
      siteName: "Apex Curtains",
      type: "article",
      images: data.image_url
        ? [
            {
              url: data.image_url,
              alt: data.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: data.image_url ? [data.image_url] : [],
    },
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getGalleryProjectBySlug(slug);

  if (!data) {
    return notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description:
      data.summary ||
      data.brief ||
      `Apex Curtains project page for ${data.title}.`,
    image: data.image_url ? [data.image_url] : [],
    datePublished: data.created_at || undefined,
    author: {
      "@type": "Organization",
      name: "Apex Curtains",
    },
    publisher: {
      "@type": "Organization",
      name: "Apex Curtains",
    },
    mainEntityOfPage: `https://apexcurtains.com/gallery/${data.slug || slug}`,
  };

  return (
    <main className="bg-[#f8f6f1] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#8b7a54] mb-3">
            Gallery Project
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold text-[#1f1f1f] leading-tight max-w-4xl">
            {data.title}
          </h1>

          <div className="flex flex-wrap gap-3 mt-5">
            {data.location && (
              <span className="px-4 py-2 rounded-full bg-white border border-[#e5dcc8] text-sm text-[#5b5142]">
                📍 {data.location}
              </span>
            )}
            {data.category && (
              <span className="px-4 py-2 rounded-full bg-white border border-[#e5dcc8] text-sm text-[#5b5142]">
                🪟 {data.category}
              </span>
            )}
            {data.room && (
              <span className="px-4 py-2 rounded-full bg-white border border-[#e5dcc8] text-sm text-[#5b5142]">
                🏡 {data.room}
              </span>
            )}
            {data.lining && (
              <span className="px-4 py-2 rounded-full bg-white border border-[#e5dcc8] text-sm text-[#5b5142]">
                ✨ {data.lining}
              </span>
            )}
          </div>
        </div>

        {data.image_url && (
          <div className="mb-10 overflow-hidden rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white">
            <img
              src={data.image_url}
              alt={`${data.title}${data.location ? ` in ${data.location}` : ""}`}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <section className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-[#efe7d7] mb-8">
          <p className="text-[17px] leading-8 text-[#4e463c]">
            This project showcases how carefully designed{" "}
            <Link
              href="/apex-curtains"
              className="text-[#b8954f] underline underline-offset-4"
            >
              apex curtains
            </Link>{" "}
            can completely transform a space, especially in homes with angled or{" "}
            <Link
              href="/gable-end-curtains"
              className="text-[#b8954f] underline underline-offset-4"
            >
              gable end windows
            </Link>
            . Every installation is tailored to the structure of the window,
            ensuring smooth operation, clean lines, and a premium finish. If
            you&apos;re exploring options, our{" "}
            <Link
              href="/advice"
              className="text-[#b8954f] underline underline-offset-4"
            >
              curtain advice
            </Link>{" "}
            section breaks down styles, tracks, and fabrics in detail, or you
            can{" "}
            <Link
              href="/get-curtain-quote"
              className="text-[#b8954f] underline underline-offset-4"
            >
              get a quote
            </Link>{" "}
            for a fully bespoke solution.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {data.summary && (
              <section className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-[#efe7d7]">
                <h2 className="text-2xl font-semibold text-[#1f1f1f] mb-3">
                  Project Summary
                </h2>
                <p
                  className="text-[17px] leading-8 text-[#4e463c]"
                  dangerouslySetInnerHTML={{
                    __html: withLinks(data.summary),
                  }}
                />
              </section>
            )}

            {data.brief && (
              <section className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-[#efe7d7]">
                <h2 className="text-2xl font-semibold text-[#1f1f1f] mb-3">
                  Brief
                </h2>
                <p
                  className="text-[17px] leading-8 text-[#4e463c]"
                  dangerouslySetInnerHTML={{
                    __html: withLinks(data.brief),
                  }}
                />
              </section>
            )}

            {data.challenge && (
              <section className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-[#efe7d7]">
                <h2 className="text-2xl font-semibold text-[#1f1f1f] mb-3">
                  The Challenge
                </h2>
                <p
                  className="text-[17px] leading-8 text-[#4e463c]"
                  dangerouslySetInnerHTML={{
                    __html: withLinks(data.challenge),
                  }}
                />
              </section>
            )}

            {data.solution && (
              <section className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-[#efe7d7]">
                <h2 className="text-2xl font-semibold text-[#1f1f1f] mb-3">
                  Our Solution
                </h2>
                <p
                  className="text-[17px] leading-8 text-[#4e463c]"
                  dangerouslySetInnerHTML={{
                    __html: withLinks(data.solution),
                  }}
                />
              </section>
            )}

            {data.result && (
              <section className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-[#efe7d7]">
                <h2 className="text-2xl font-semibold text-[#1f1f1f] mb-3">
                  The Result
                </h2>
                <p
                  className="text-[17px] leading-8 text-[#4e463c]"
                  dangerouslySetInnerHTML={{
                    __html: withLinks(data.result),
                  }}
                />
              </section>
            )}

            <section className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-[#efe7d7]">
              <h2 className="text-2xl font-semibold text-[#1f1f1f] mb-4">
                Explore More
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/gallery"
                  className="px-5 py-3 rounded-full bg-[#f5efe2] text-[#5b5142] hover:bg-[#eadfca] transition"
                >
                  View More Projects
                </Link>
                <Link
                  href="/advice"
                  className="px-5 py-3 rounded-full bg-[#f5efe2] text-[#5b5142] hover:bg-[#eadfca] transition"
                >
                  Read Curtain Advice
                </Link>
                <Link
                  href="/get-curtain-quote"
                  className="px-5 py-3 rounded-full bg-[#d4ab5a] text-[#1f1f1f] hover:bg-[#c89d48] transition"
                >
                  Get a Quote
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-[#1f1f1f] text-white rounded-[24px] p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Need curtains for a similar window?
              </h3>
              <p className="text-white/80 leading-7 mb-5">
                We design and install curtains for apex, angled and gable end
                windows across the UK.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/get-curtain-quote"
                  className="inline-flex items-center justify-center rounded-full bg-[#d4ab5a] hover:bg-[#c89d48] text-[#1f1f1f] font-medium px-5 py-3 transition"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/advice"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 text-white font-medium px-5 py-3 transition"
                >
                  Curtain Advice
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-[#efe7d7] shadow-sm">
              <h3 className="text-xl font-semibold text-[#1f1f1f] mb-4">
                Project Details
              </h3>

              <div className="space-y-3 text-[#4e463c]">
                {data.location && (
                  <div>
                    <span className="font-medium text-[#1f1f1f]">Location:</span>{" "}
                    {data.location}
                  </div>
                )}
                {data.category && (
                  <div>
                    <span className="font-medium text-[#1f1f1f]">Window Type:</span>{" "}
                    {data.category}
                  </div>
                )}
                {data.room && (
                  <div>
                    <span className="font-medium text-[#1f1f1f]">Room:</span>{" "}
                    {data.room}
                  </div>
                )}
                {data.heading && (
                  <div>
                    <span className="font-medium text-[#1f1f1f]">Style:</span>{" "}
                    {data.heading}
                  </div>
                )}
                {data.lining && (
                  <div>
                    <span className="font-medium text-[#1f1f1f]">Lining:</span>{" "}
                    {data.lining}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-[#efe7d7] shadow-sm">
              <h3 className="text-xl font-semibold text-[#1f1f1f] mb-4">
                Important Pages
              </h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="/apex-curtains"
                  className="text-[#5b5142] hover:text-black"
                >
                  Apex Curtains
                </Link>
                <Link
                  href="/gable-end-curtains"
                  className="text-[#5b5142] hover:text-black"
                >
                  Gable End Curtains
                </Link>
                <Link
                  href="/window-types"
                  className="text-[#5b5142] hover:text-black"
                >
                  Window Types
                </Link>
                <Link
                  href="/advice"
                  className="text-[#5b5142] hover:text-black"
                >
                  Advice Hub
                </Link>
                <Link
                  href="/get-curtain-quote"
                  className="text-[#5b5142] hover:text-black"
                >
                  Get Curtain Quote
                </Link>
              </div>
            </div>

            {data.tags && data.tags.length > 0 && (
              <div className="bg-white rounded-[24px] p-6 border border-[#efe7d7] shadow-sm">
                <h3 className="text-xl font-semibold text-[#1f1f1f] mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-[#f5efe2] text-[#5b5142] text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}