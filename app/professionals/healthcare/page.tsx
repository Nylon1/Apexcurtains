import Image from "next/image";
import Link from "next/link";
import { categories, HEALTHCARE_ROOT } from "@/lib/healthcare/catalogue";
import { sectors, moreSettings, serviceSteps } from "@/lib/healthcare/content";
import SettingPhotography, { PhotoCredit, SettingImage } from "@/components/healthcare/SettingPhotography";
import { sectionPhotographs, sectorPhotographs } from "@/lib/healthcare/settings-photography";
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
        <SettingPhotography photo="ward" priority className="hc-hero-visual" />
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
          {categories.map((c, i) => {
            const photo = sectionPhotographs[c.slug];
            return (
              <article className="hc-category" key={c.id}>
                <Link href={`${HEALTHCARE_ROOT}/${c.slug}`}>
                  <SettingImage photo={photo} sizes="(max-width: 530px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                  <div className="hc-category-copy">
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
                  </div>
                </Link>
                <PhotoCredit photo={photo} />
              </article>
            );
          })}
        </div>
        <p className="hc-small hc-category-note">
          Supplier and licensed setting photographs are illustrative. They are
          not Apex installations or identified examples of every product shown.
        </p>
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
        <p className="hc-small hc-settings-note">
          Real settings, shown for inspiration. Supplier and licensed photographs
          are credited below and are not Apex installations.
        </p>
        <div className="hc-sector-grid">
          {sectors.map((s, i) => (
            <article className="hc-sector-card" key={s.slug}>
              <Link href={`${HEALTHCARE_ROOT}/settings/${s.slug}`}>
                <SettingImage photo={sectorPhotographs[s.slug]} sizes="(max-width: 530px) 100vw, (max-width: 800px) 50vw, 33vw" />
                <div className="hc-sector-copy">
                  <span className="hc-number">0{i + 1}</span>
                  <h3>{s.short}</h3>
                  <p>{s.intro}</p>
                  <span className="hc-sector-arrow" aria-hidden="true">↗</span>
                </div>
              </Link>
              <PhotoCredit photo={sectorPhotographs[s.slug]} />
            </article>
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
      <section className="hc-section hc-settings-stories">
        <div className="hc-section-heading">
          <div>
            <p className="hc-eyebrow">Privacy in the spaces people use</p>
            <h2>Clinical purpose.<br />A more human setting.</h2>
          </div>
          <p>
            The route of a curtain, the light at a window, the feeling of a shared
            room. We consider the practical details alongside the experience of
            the people who spend time there.
          </p>
        </div>
        <div className="hc-photo-pair">
          <SettingPhotography photo="tracks" />
          <SettingPhotography photo="careLounge" />
        </div>
      </section>
      <section className="hc-service" id="process">
        <p className="hc-eyebrow">The Apex way</p>
        <h2>Made. Fitted. Looked after.</h2>
        <div className="hc-steps">
          {serviceSteps.map((step) => (
            <article className="hc-process-card" key={step.number}>
              <figure>
                <SettingImage photo={step.photo} sizes="(max-width: 530px) 100vw, (max-width: 1000px) 50vw, 25vw" />
                <figcaption><PhotoCredit photo={step.photo} /></figcaption>
              </figure>
              <div className="hc-process-copy">
                <span className="hc-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="hc-small hc-process-note">
          Illustrative photography of measuring, sewing, window fitting and project planning.
          These are not photographs of Apex staff or healthcare projects.
        </p>
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
