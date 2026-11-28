import { SITE_URL } from "./seo-metadata";
import type { SpecialistGuide } from "./specialist-guide-types";

export function specialistGuideSchema(
  guide: SpecialistGuide,
  parent = guide.professional
    ? { href: "/professionals", label: "Professionals" }
    : { href: "/curtain-design-guide", label: "Curtain design guide" },
) {
  const url = `${SITE_URL}${guide.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: guide.title,
        description: guide.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: `${SITE_URL}${guide.image.src}`,
          caption: guide.image.caption,
        },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          ...(guide.path === parent.href
            ? []
            : [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: parent.label,
                  item: `${SITE_URL}${parent.href}`,
                },
              ]),
          {
            "@type": "ListItem",
            position: guide.path === parent.href ? 2 : 3,
            name: guide.title,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#questions`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: guide.questions.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}
