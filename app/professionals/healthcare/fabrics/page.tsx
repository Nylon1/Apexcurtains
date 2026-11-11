import CatalogueBrowser from "@/components/healthcare/CatalogueBrowser";
import { publishedProducts } from "@/lib/healthcare/catalogue";
import {
  Breadcrumbs,
  HealthcareCta,
  healthcareMetadata,
} from "@/components/healthcare/HealthcareShell";
export const metadata = healthcareMetadata(
  "Healthcare Fabric Collection · Panaz Curtain Bases",
  "Browse verified Panaz healthcare curtain base cloths. Compare documented specifications, shortlist fabrics and request samples for Apex-made clinical curtains.",
  "/fabrics",
);
export default function Page() {
  return (
    <>
      <div className="hc-page-header">
        <Breadcrumbs current="Fabric collection" path="fabrics" />
        <p className="hc-eyebrow">Panaz fabrics. Apex craftsmanship.</p>
        <h1>Start with the cloth.</h1>
        <p className="hc-lede">
          Explore the verified curtain bases, compare their properties and build
          a shortlist for your space.
        </p>
        <p>
          These are genuine base-cloth photographs. Printed designs and
          colourways require confirmation for the selected base; no design
          availability is implied by a texture image.
        </p>
      </div>
      <section className="hc-section hc-section-first">
        <CatalogueBrowser
          products={publishedProducts.filter((p) => p.category === "reusable")}
          fabrics
        />
      </section>
      <HealthcareCta />
    </>
  );
}
