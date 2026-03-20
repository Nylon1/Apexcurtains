const SITE_URL = "https://apexcurtains.com";

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
      "@type": "LocalBusiness",
      name: "Apex Curtains",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
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
      "@type": "Organization",
      name: "Apex Curtains",
    },
    publisher: {
      "@type": "Organization",
      name: "Apex Curtains",
    },
  };
}

export function faqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
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

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
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
      "@type": "Organization",
      name: "Apex Curtains",
    },
  };
}