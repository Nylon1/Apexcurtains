import { SITE_URL } from "@/lib/seo-metadata";
import { SERVICE_AREAS } from "@/lib/service-area";

export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    provider: {
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: "Apex Curtains",
      url: SITE_URL,
    },
    areaServed: SERVICE_AREAS,
    url: `${SITE_URL}${url}`,
  };
}

export function articleSchema({
  headline,
  description,
  url,
  image,
}: {
  headline: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${SITE_URL}${url}`,
    image: image ? `${SITE_URL}${image}` : undefined,
    author: {
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: "Apex Curtains",
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: "Apex Curtains",
    },
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function projectSchema({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url: `${SITE_URL}${url}`,
    image: image ? `${SITE_URL}${image}` : undefined,
    creator: {
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: "Apex Curtains",
    },
  };
}
