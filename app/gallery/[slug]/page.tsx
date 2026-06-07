import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Home,
  MapPin,
  Sparkles,
  Tag,
} from "lucide-react";
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
    `View this ${data.category || "curtain"} installation project by Apex Curtains${
      data.location ? ` in ${data.location}` : ""
    }.`;

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

function DetailPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#e5dcc8] bg-white px-4 py-2 text-sm text-[#5b5142] shadow-sm">
      {icon}
      {label}
    </span>
  );
}

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="group relative overflow-hidden rounded-[28px] border border-[#efe7d7] bg-white p-6 shadow-[0_16px_45px_rgba(35,28,18,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(35,28,18,0.10)] md:p-8">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d4ab5a] via-[#f0d38b] to-[#b8954f]" />

      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#1f1f1f]">
        {title}
      </h2>

      <div className="text-[17px] leading-8 text-[#4e463c]">{children}</div>
    </section>
  );
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
    <main className="min-h-screen bg-[#f8f6f1] text-[#1f1f1f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#eadfca] bg-[#171717] px-6 pt-32 text-white md:px-8 md:pt-40">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-[-220px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#d4ab5a]/25 blur-[130px]" />
          <div className="absolute bottom-[-220px] left-[-120px] h-[420px] w-[420px] rounded-full bg-[#d4ab5a]/15 blur-[120px]" />
          <div className="absolute right-[-160px] top-32 h-[380px] w-[380px] rounded-full bg-white/10 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-6xl pb-16">
          <Link
            href="/gallery"
            className="mb-8 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            ← Back to Gallery
          </Link>

          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4ab5a]/30 bg-[#d4ab5a]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#f0d38b]">
              <Sparkles className="h-4 w-4" />
              Featured Installation
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              {data.title}
            </h1>

            {data.summary && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                {data.summary}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              {data.location && (
                <DetailPill
                  icon={<MapPin className="h-4 w-4 text-[#b8954f]" />}
                  label={data.location}
                />
              )}

              {data.category && (
                <DetailPill
                  icon={<Camera className="h-4 w-4 text-[#b8954f]" />}
                  label={data.category}
                />
              )}

              {data.room && (
                <DetailPill
                  icon={<Home className="h-4 w-4 text-[#b8954f]" />}
                  label={data.room}
                />
              )}

              {data.lining && (
                <DetailPill
                  icon={<Sparkles className="h-4 w-4 text-[#b8954f]" />}
                  label={data.lining}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:px-8">
        {/* Showcase Image + Intro */}
        {data.image_url && (
          <section className="-mt-20 mb-14">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              {/* Image Card */}
              <div className="relative">
                <div className="rounded-[32px] border border-[#e5dcc8] bg-white p-3 shadow-[0_24px_80px_rgba(20,15,8,0.18)]">
                  <div className="relative flex h-[320px] items-center justify-center overflow-hidden rounded-[24px] bg-[#101010] sm:h-[380px] lg:h-[460px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#d4ab5a22,transparent_42%),linear-gradient(135deg,#ffffff08,transparent)]" />

                    <img
                      src={data.image_url}
                      alt={data.title}
                      className="relative z-10 max-h-full max-w-full object-contain p-2 transition duration-700 hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <p className="mt-4 text-center text-sm leading-6 text-[#7a6c55]">
                  Full project showcase — showing the curtain shape, window
                  structure and finished installation clearly.
                </p>
              </div>

              {/* Text Card */}
              <div className="rounded-[32px] border border-[#efe7d7] bg-white p-7 shadow-[0_18px_60px_rgba(35,28,18,0.07)] md:p-10">
                <p className="mb-4 inline-flex items-center rounded-full border border-[#e5dcc8] bg-[#f8f6f1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8b7a54]">
                  Project Story
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-[#1f1f1f] md:text-4xl">
                  A made-to-measure curtain project designed around the window,
                  the room and daily comfort.
                </h2>

                <p className="mt-5 text-[17px] leading-8 text-[#4e463c]">
                  This project showcases how carefully designed{" "}
                  <Link
                    href="/apex-curtains"
                    className="text-[#b8954f] underline underline-offset-4"
                  >
                    apex curtains
                  </Link>{" "}
                  can completely transform a space, especially in homes with
                  angled or{" "}
                  <Link
                    href="/gable-end-curtains"
                    className="text-[#b8954f] underline underline-offset-4"
                  >
                    gable end windows
                  </Link>
                  . Every installation is tailored to the structure of the
                  window, ensuring smooth operation, clean lines and a premium
                  finish.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Made-to-measure finish",
                    "Designed for privacy",
                    "Improved light control",
                    "Premium bedroom comfort",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-[#efe7d7] bg-[#f8f6f1] px-4 py-3 text-sm font-medium text-[#5b5142]"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#b8954f]" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/get-curtain-quote"
                    className="inline-flex items-center justify-center rounded-full bg-[#d4ab5a] px-5 py-3 text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#c89d48]"
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                  <Link
                    href="/advice"
                    className="inline-flex items-center justify-center rounded-full border border-[#e5dcc8] bg-[#f8f6f1] px-5 py-3 text-sm font-semibold text-[#5b5142] transition hover:bg-[#eadfca]"
                  >
                    Read Curtain Advice
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {data.summary && (
              <ContentSection title="Project Overview">
                <p
                  dangerouslySetInnerHTML={{
                    __html: withLinks(data.summary),
                  }}
                />
              </ContentSection>
            )}

            {data.brief && (
              <ContentSection title="The Client Brief">
                <p
                  dangerouslySetInnerHTML={{
                    __html: withLinks(data.brief),
                  }}
                />
              </ContentSection>
            )}

            {data.challenge && (
              <ContentSection title="The Challenge">
                <p
                  dangerouslySetInnerHTML={{
                    __html: withLinks(data.challenge),
                  }}
                />
              </ContentSection>
            )}

            {data.solution && (
              <ContentSection title="The Bespoke Solution">
                <p
                  dangerouslySetInnerHTML={{
                    __html: withLinks(data.solution),
                  }}
                />
              </ContentSection>
            )}

            {data.result && (
              <ContentSection title="Finished Result">
                <p
                  dangerouslySetInnerHTML={{
                    __html: withLinks(data.result),
                  }}
                />
              </ContentSection>
            )}

            <section className="relative overflow-hidden rounded-[32px] bg-[#1f1f1f] p-7 text-white shadow-[0_18px_60px_rgba(20,15,8,0.18)] md:p-10">
              <div className="absolute right-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#d4ab5a]/20 blur-[80px]" />

              <div className="relative">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#f0d38b]">
                  Explore More
                </p>

                <h2 className="text-3xl font-semibold tracking-tight">
                  Planning a similar window?
                </h2>

                <p className="mt-4 max-w-2xl text-[16px] leading-8 text-white/72">
                  Browse more projects, read practical curtain advice, or start
                  a quote for your own apex, angled or gable end window.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/gallery"
                    className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    View More Projects
                  </Link>

                  <Link
                    href="/advice"
                    className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    Read Curtain Advice
                  </Link>

                  <Link
                    href="/get-curtain-quote"
                    className="inline-flex items-center rounded-full bg-[#d4ab5a] px-5 py-3 text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#c89d48]"
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[28px] bg-[#1f1f1f] text-white shadow-[0_18px_60px_rgba(20,15,8,0.18)]">
              <div className="border-b border-white/10 bg-gradient-to-br from-[#d4ab5a]/18 to-transparent p-6">
                <h3 className="text-2xl font-semibold">
                  Need curtains for a similar window?
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/75">
                  We design and install curtains for apex, angled and gable end
                  windows across the UK.
                </p>
              </div>

              <div className="flex flex-col gap-3 p-6">
                <Link
                  href="/get-curtain-quote"
                  className="inline-flex items-center justify-center rounded-full bg-[#d4ab5a] px-5 py-3 text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#c89d48]"
                >
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/advice"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Curtain Advice
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#efe7d7] bg-white p-6 shadow-[0_16px_45px_rgba(35,28,18,0.06)]">
              <h3 className="mb-5 text-xl font-semibold text-[#1f1f1f]">
                Project Details
              </h3>

              <div className="space-y-4 text-[#4e463c]">
                {data.location && (
                  <div className="flex items-start gap-3 border-b border-[#efe7d7] pb-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#b8954f]" />
                    <div>
                      <span className="block text-sm font-semibold text-[#1f1f1f]">
                        Location
                      </span>
                      <span>{data.location}</span>
                    </div>
                  </div>
                )}

                {data.category && (
                  <div className="flex items-start gap-3 border-b border-[#efe7d7] pb-4">
                    <Camera className="mt-0.5 h-5 w-5 shrink-0 text-[#b8954f]" />
                    <div>
                      <span className="block text-sm font-semibold text-[#1f1f1f]">
                        Window Type
                      </span>
                      <span>{data.category}</span>
                    </div>
                  </div>
                )}

                {data.room && (
                  <div className="flex items-start gap-3 border-b border-[#efe7d7] pb-4">
                    <Home className="mt-0.5 h-5 w-5 shrink-0 text-[#b8954f]" />
                    <div>
                      <span className="block text-sm font-semibold text-[#1f1f1f]">
                        Room
                      </span>
                      <span>{data.room}</span>
                    </div>
                  </div>
                )}

                {data.heading && (
                  <div className="flex items-start gap-3 border-b border-[#efe7d7] pb-4">
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#b8954f]" />
                    <div>
                      <span className="block text-sm font-semibold text-[#1f1f1f]">
                        Style
                      </span>
                      <span>{data.heading}</span>
                    </div>
                  </div>
                )}

                {data.lining && (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#b8954f]" />
                    <div>
                      <span className="block text-sm font-semibold text-[#1f1f1f]">
                        Lining
                      </span>
                      <span>{data.lining}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#efe7d7] bg-white p-6 shadow-[0_16px_45px_rgba(35,28,18,0.06)]">
              <h3 className="mb-5 text-xl font-semibold text-[#1f1f1f]">
                Important Pages
              </h3>

              <div className="flex flex-col gap-3">
                {[
                  { href: "/apex-curtains", label: "Apex Curtains" },
                  { href: "/gable-end-curtains", label: "Gable End Curtains" },
                  { href: "/window-types", label: "Window Types" },
                  { href: "/services", label: "Our Services" },
                  { href: "/advice", label: "Advice Hub" },
                  { href: "/get-curtain-quote", label: "Get Curtain Quote" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between rounded-2xl border border-[#efe7d7] bg-[#f8f6f1] px-4 py-3 text-sm font-medium text-[#5b5142] transition hover:bg-[#eadfca] hover:text-black"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-[#b8954f] transition group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            {data.tags && data.tags.length > 0 && (
              <div className="rounded-[28px] border border-[#efe7d7] bg-white p-6 shadow-[0_16px_45px_rgba(35,28,18,0.06)]">
                <h3 className="mb-5 text-xl font-semibold text-[#1f1f1f]">
                  Tags
                </h3>

                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#f5efe2] px-3 py-1.5 text-sm text-[#5b5142]"
                    >
                      <Tag className="h-3.5 w-3.5 text-[#b8954f]" />
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