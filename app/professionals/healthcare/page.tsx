import Image from "next/image";
import Link from "next/link";
import { categories, HEALTHCARE_ROOT } from "@/lib/healthcare/catalogue";
import { sectors, moreSettings, serviceSteps } from "@/lib/healthcare/content";
import {
  Breadcrumbs,
  HealthcareCta,
  healthcareMetadata,
} from "@/components/healthcare/HealthcareShell";
export const metadata = healthcareMetadata(
  "Healthcare Screening Solutions",
  "Apex manufactures clinical curtains and supplies healthcare tracks, Louvolite Ex-Lite roller blinds and disposable curtain services. Survey, installation and repeat supply.",
);
export default function Page() {
  return (
    <>
      <section className="hc-hero">
        <div className="hc-hero-copy">
          <Breadcrumbs />
          <p className="hc-eyebrow">
            Healthcare screening, thoughtfully considered
          </p>
          <h1>
            Privacy.
            <br />
            With a softer touch.
          </h1>
          <p className="hc-lede">
            Beautifully resolved curtains, tracks and blinds for spaces that
            care for people.
          </p>
          <p>
            Made by Apex. Specialist systems, carefully sourced. One complete
            service from survey to future replacement.
          </p>
          <div className="hc-actions">
            <Link className="hc-button" href={`${HEALTHCARE_ROOT}/quotation`}>
              Plan your healthcare project →
            </Link>
            <a className="hc-text-link" href="#solutions">
              Explore the collection ↓
            </a>
          </div>
        </div>
        <div className="hc-hero-visual">
          <Image
            src="/healthcare/louvolite/ex-lite-slate-roomset.webp"
            alt="Louvolite supplier interior showing Ex-Lite Slate roller blinds"
            fill
            sizes="(max-width: 800px) 100vw, 55vw"
            priority
          />
          <div className="hc-hero-caption">
            LOUVOLITE EX-LITE / SLATE
            <span>Supplier room setting · not an Apex project</span>
          </div>
        </div>
      </section>
      <div className="hc-promise">
        <span>In-house curtain manufacture</span>
        <span>Specialist product sourcing</span>
        <span>Professional installation</span>
        <span>Ongoing replacement & care</span>
      </div>
      <section className="hc-section" id="solutions">
        <div className="hc-section-heading">
          <div>
            <p className="hc-eyebrow">Four parts. One considered solution.</p>
            <h2>Screening for the whole space.</h2>
          </div>
          <p>
            Specify an individual product or bring the complete package
            together. We connect material, movement and maintenance from the
            beginning.
          </p>
        </div>
        <div className="hc-category-grid">
          {categories.map((c, i) => (
            <Link
              className="hc-category"
              key={c.id}
              href={`${HEALTHCARE_ROOT}/${c.slug}`}
            >
              <span className="hc-number">0{i + 1}</span>
              <p className="hc-eyebrow">{c.supplier}</p>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="hc-text-link">
                Explore{" "}
                {i === 0
                  ? "curtains"
                  : i === 1
                    ? "tracks"
                    : i === 2
                      ? "blinds"
                      : "disposables"}{" "}
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="hc-fabric-feature">
        <div className="hc-texture-panel">
          <Image
            src="/healthcare/panaz/satin-filament-base.jpeg"
            alt="Genuine Panaz satin filament base-cloth texture"
            width={244}
            height={246}
          />
          <span>Panaz / base-cloth texture</span>
        </div>
        <div>
          <p className="hc-eyebrow">The foundation of your curtain</p>
          <h2>
            A fabric choice
            <br />
            with substance.
          </h2>
          <p>
            Explore verified Panaz curtain bases, compare their documented
            properties and add your selections to a project. Apex makes the
            finished curtains to the agreed dimensions and specification.
          </p>
          <p className="hc-small">
            Our initial collection contains verified base cloths. The wider
            printed-design and colourway gallery will grow as exact combinations
            and high-resolution supplier assets are confirmed.
          </p>
          <Link className="hc-button" href={`${HEALTHCARE_ROOT}/fabrics`}>
            Explore the fabric collection →
          </Link>
        </div>
      </section>
      <section className="hc-section" id="settings">
        <div className="hc-section-heading">
          <div>
            <p className="hc-eyebrow">Different settings. Individual needs.</p>
            <h2>Designed around your care.</h2>
          </div>
          <p>
            From a private dental surgery to a busy hospital department, privacy
            is personal. Start with the way your rooms are used.
          </p>
        </div>
        <div className="hc-sector-grid">
          {sectors.map((s, i) => (
            <Link href={`${HEALTHCARE_ROOT}/settings/${s.slug}`} key={s.slug}>
              <span className="hc-number">0{i + 1}</span>
              <h3>{s.short}</h3>
              <p>{s.intro}</p>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <div className="hc-more-settings">
          <h3>And wherever clinical privacy matters.</h3>
          <p>{moreSettings.join(" · ")}</p>
          <p className="hc-small">
            Share the use of the room, the cleaning requirements and the
            screening needed. We will assess the appropriate specification.
          </p>
        </div>
      </section>
      <section className="hc-service">
        <p className="hc-eyebrow">The Apex way</p>
        <h2>Made. Fitted. Looked after.</h2>
        <div className="hc-steps">
          {serviceSteps.map(([n, title, text]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <Link
          className="hc-text-link"
          href={`${HEALTHCARE_ROOT}/survey-installation`}
        >
          Explore our complete service →
        </Link>
      </section>
      <HealthcareCta />
    </>
  );
}
