import { notFound } from "next/navigation";
import Link from "next/link";
import { sectors } from "@/lib/healthcare/content";
import { categories, HEALTHCARE_ROOT } from "@/lib/healthcare/catalogue";
import {
  Breadcrumbs,
  HealthcareCta,
  healthcareMetadata,
} from "@/components/healthcare/HealthcareShell";
export function generateStaticParams() {
  return sectors.map((s) => ({ sector: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const s = sectors.find((s) => s.slug === sector);
  return s ? healthcareMetadata(s.title, s.intro, `/settings/${s.slug}`) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const s = sectors.find((s) => s.slug === sector);
  if (!s) notFound();
  return (
    <>
      <div className="hc-page-header">
        <Breadcrumbs current={s.short} path={`settings/${s.slug}`} />
        <p className="hc-eyebrow">Healthcare settings / {s.short}</p>
        <h1>{s.title}.</h1>
        <p className="hc-lede">{s.intro}</p>
      </div>
      <div className="hc-content-sections">
        <section>
          <h2>Start with the room.</h2>
          <div>
            <p>{s.rooms}</p>
            <ul>
              {s.needs.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>
        <section>
          <h2>A useful first brief.</h2>
          <div>
            <p>{s.brief}</p>
            <p>
              Apex connects in-house curtain manufacture with specialist tracks,
              roller blinds and disposable supply. We can survey and install, or
              prepare a supply-only quotation to approved measurements.
            </p>
            <p>
              Tell us about your cleaning and fire-safety requirements, the
              working hours of the facility and any restrictions on access.
            </p>
            <Link
              className="hc-button"
              href={`${HEALTHCARE_ROOT}/quotation?setting=${encodeURIComponent(s.short)}`}
            >
              Plan screening for your {s.short.toLowerCase()} →
            </Link>
          </div>
        </section>
      </div>
      <section className="hc-section">
        <h2>Build the right package.</h2>
        <div className="hc-category-grid">
          {categories.map((c) => (
            <Link
              className="hc-category"
              href={`${HEALTHCARE_ROOT}/${c.slug}`}
              key={c.id}
            >
              <p className="hc-eyebrow">{c.supplier}</p>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span>Explore →</span>
            </Link>
          ))}
        </div>
      </section>
      <HealthcareCta />
    </>
  );
}
