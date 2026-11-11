import { notFound } from "next/navigation";
import {
  getProduct,
  publishedProducts,
  productUrl,
} from "@/lib/healthcare/catalogue";
import ProductDetail from "@/components/healthcare/ProductDetail";
import {
  Breadcrumbs,
  healthcareMetadata,
} from "@/components/healthcare/HealthcareShell";
import { SITE_URL } from "@/lib/seo-metadata";
export function generateStaticParams() {
  return publishedProducts.map((p) => ({ slug: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  return p
    ? healthcareMetadata(
        `${p.supplier} ${p.name} · ${p.reference}`,
        p.description,
        `/products/${p.id}`,
      )
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const colourways =
    p.supplier === "Louvolite"
      ? publishedProducts.filter(
          (v) => v.supplier === p.supplier && v.collection === p.collection,
        )
      : [];
  return (
    <div className="hc-detail-wrap">
      <Breadcrumbs current={p.name} path={`products/${p.id}`} />
      <ProductDetail product={p} colourways={colourways} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${p.supplier} ${p.name}`,
            description: p.description,
            sku: p.reference,
            brand: { "@type": "Brand", name: p.supplier },
            url: `${SITE_URL}${productUrl(p)}`,
            image: p.images.map((i) => `${SITE_URL}${i.src}`),
            material: p.specs.Composition || p.specs.Material || undefined,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
