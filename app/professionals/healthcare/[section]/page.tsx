import { notFound } from "next/navigation";
import Link from "next/link";
import { pages } from "@/lib/healthcare/content";
import { publishedProducts, HEALTHCARE_ROOT } from "@/lib/healthcare/catalogue";
import CatalogueBrowser from "@/components/healthcare/CatalogueBrowser";
import TechnicalNotes from "@/components/healthcare/TechnicalNotes";
import SettingPhotography from "@/components/healthcare/SettingPhotography";
import { sectionPhotographs } from "@/lib/healthcare/settings-photography";
import {
  Breadcrumbs,
  HealthcareCta,
  healthcareMetadata,
} from "@/components/healthcare/HealthcareShell";
export function generateStaticParams() {
  return pages.map((p) => ({ section: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const p = pages.find((p) => p.slug === section);
  return p
    ? healthcareMetadata(
        (
          {
            "reusable-curtains": "Reusable Clinical Curtains",
            "medical-tracks": "Forest Medical Curtain Tracks",
            "roller-blinds": "Clinical Roller Blinds · Louvolite Ex-Lite",
            "disposable-curtains": "Disposable Clinical Curtains",
            "survey-installation": "Healthcare Site Survey & Installation",
            "replacement-maintenance":
              "Healthcare Curtain Replacement & Maintenance",
          } as Record<string, string>
        )[section],
        p.intro,
        `/${section}`,
      )
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const p = pages.find((p) => p.slug === section);
  if (!p) notFound();
  const products = publishedProducts.filter((v) => v.category === p.category);
  return (
    <>
      <div className="hc-visual-header">
        <div className="hc-page-header">
          <Breadcrumbs current={p.eyebrow} path={section} />
          <p className="hc-eyebrow">{p.eyebrow}</p>
          <h1>{p.title}</h1>
          <p className="hc-lede">{p.intro}</p>
          <Link className="hc-button" href={`${HEALTHCARE_ROOT}/quotation`}>
            Discuss your requirements →
          </Link>
        </div>
        <SettingPhotography photo={sectionPhotographs[section]} priority />
      </div>
      <div className="hc-content-sections">
        {p.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <div>
              {s.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
              {s.points && (
                <ul>
                  {s.points.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              {s.photo && <SettingPhotography photo={s.photo} className="hc-process-detail" />}
            </div>
          </section>
        ))}
      </div>
      <TechnicalNotes category={p.category} />
      {p.category && (
        <section className="hc-section">
          <p className="hc-eyebrow">Verified supplier information</p>
          <h2>
            {p.category === "blinds"
              ? "The Ex-Lite colour collection."
              : p.category === "reusable"
                ? "Explore the curtain bases."
                : p.category === "tracks"
                  ? "Choose a track profile."
                  : "Product specification & supply."}
          </h2>
          {products.length ? (
            <CatalogueBrowser
              products={products}
              fabrics={p.category === "reusable"}
            />
          ) : (
            <div className="hc-note">
              <p>
                Behrens sizes and heading options have been researched.
                Individual product listings are awaiting accessible supplier
                images and current SKU-specific documentation.
              </p>
              <p>
                You can still request disposable curtain supply and replacement.
                Include your size, quantity and hook details; Apex will confirm
                the exact product in your quotation.
              </p>
              <Link href={`${HEALTHCARE_ROOT}/quotation`}>
                Request disposable curtain supply →
              </Link>
            </div>
          )}
        </section>
      )}
      <HealthcareCta />
    </>
  );
}
