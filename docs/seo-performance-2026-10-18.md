# Sitemap, discovery and performance review — 18 October 2026

## Baseline

Google PageSpeed Insights lab runs (not field Core Web Vitals):

| Page | Device | Performance | SEO | LCP | Blocking time | Layout shift |
| --- | --- | --- | --- | --- | --- | --- |
| Homepage | Mobile | 97 | 100 | 2.5 s | 0 ms | 0 |
| Homepage | Desktop | 100 | 100 | 0.5 s | 0 ms | 0 |
| Room visualiser | Mobile | 75 | 100 | 3.0 s | 680 ms | 0 |

Reports: [homepage](https://pagespeed.web.dev/analysis/https-www-apexcurtains-com/afssl8nez0?form_factor=mobile), [visualiser](https://pagespeed.web.dev/analysis/https-www-apexcurtains-com-room-visualiser/88nxr26bwn?form_factor=mobile). Both reported insufficient real-user data. Scores vary between lab runs; 100 SEO is a basic technical audit, not a ranking or citation guarantee.

The public sitemap crawl found 144 unique pages, two entries duplicated between static and advice sitemaps, nine missing canonicals and two advice articles incorrectly inheriting the advice-index canonical. The visualiser was already listed.

## Changes

- Footer visualiser link and prominent room-colour CTA; directory links no longer prefetch dozens of destinations when the footer becomes visible.
- One sitemap entry per page, properly escaped XML, validated dates, and no request-time lastmod dates. Static inventories are generated at build time; database inventories stay dynamic. Advice query failures return 503 rather than a misleading empty successful sitemap.
- Visualiser sitemap image and its verified 18 October content revision date.
- Explicit self-canonicals on the eleven affected pages, specific metadata where it was missing, homepage social image and existing public contact/logo details in Organization schema.
- Homepage hero uses eager loading with high fetch priority; unused global monospace font removed. Small-text contrast improved.
- Visualiser uses a 256-entry linear colour lookup and skips transparent pixels. Preparation yields between stages so input and painting can run. Geometry, assets, colour model and output remain unchanged.

## Verification

- Production build, SEO foundation checks, sitemap serialization tests, specialist-guide tests and visualiser regression tests.
- Before/after comparison against the previous renderer: byte-identical curtain output for all 34 Oslo colours across all three mobile scenes. Gable curtain preparation measured 36–39 ms before and 22–25 ms after in a local microbenchmark; this is not a page-load measurement.
- Browser checks: desktop and mobile-size visualiser, scene/colour changes, room materials, lighting, enlarged view, enquiry URL context and footer navigation. Browser emulation is not physical iPhone testing.
- `npm run seo:crawl` crawls all four live inventories, verifies status, canonical, H1, descriptions, parseable JSON-LD, robots discovery, duplicate URLs and footer linkage. Run with `APEX_TEST_BASE_URL` for a preview. The local development advice credentials do not return published records; validate the complete database inventory against the deployment with its configured environment.

## Domain configuration follow-up

The old `www.apexcurtains.co.uk` host uses a **302** redirect to `http://apexcurtains.com`; the apex `.com` host then uses Vercel's **307** redirect to `https://www.apexcurtains.com`. These overrides occur outside repository redirects. The `.co.uk` domain is not attached to this Vercel project.

At the domain/forwarding provider, replace the legacy forwarding with a permanent **301/308** directly to `https://www.apexcurtains.com`, preserving each path and query. Set the existing Vercel apex-domain redirect to permanent as well. Do not repoint DNS or change mail records as part of this code release. Repository canonical URLs and robots already use the final HTTPS www host.

The sitemap remains advertised in robots.txt. Publishing it does not imply a Search Console submission or immediate indexing.
