# Specialist authority and interior experience audit

Audit date: 18 October 2026. Scope: public site, repository, public gallery records and official technical sources. This is not a Search Console ranking or traffic audit; no search-performance account was available. Changes are prepared on a feature branch for pull-request review, not deployed directly.

## Implemented in this change

- Preserve existing apex, triangular, gable, track, lining, fabric, installation, gallery and review URLs. Add a distinct `/angled-window-curtains` guide for single slopes, asymmetry, retained sections and stack-back. Existing redirects remain unchanged.
- Expand installation/aftercare, linings and tracks; add `/curtain-tiebacks`. Cover safe high-level access, actual KS/CS specifications, support requirements, finished weight, light gaps and the practical use of tiebacks.
- Add a substantial DIY/self-measure guide at `/advice/buying-apex-curtains-online`, with a seven-point failure diagram, fair limitations, a buying-twice comparison and links to genuine difficult-window projects. These projects are not described as rescue jobs without evidence.
- Expand `/curtain-fabrics` for 4–6 m drops, weight versus stiffness, movement, repeats, joins, railroading, sunlight and ground-level appearance. Place structural guidance within `/curtain-tracks#structure-and-brackets` and expectation management at `/faq#what-is-possible`, avoiding duplicate thin pages.
- Make `/curtain-colours-and-tones` a substantial Colour & Interiors destination: eleven colour families, an accessible wheel and labelled controls, eight interior styles, room/mood/light guidance, illustrative open/closed and day/evening surroundings, 34 verified PT Oslo colour records and real Apex installation photographs. Family content is rendered in the initial HTML inside native disclosures, not split into thin colour landing pages.
- Apply a warm ivory, deep green and muted brass public visual system, editorial serif headings, cleaner controls, generous photographs and descriptive captions. Redesign the key specialist, homepage, gallery and reviews experiences. The review quotations remain the existing curated selection; adjacent installation imagery is not falsely attributed to the reviewer.
- Connect the specialist guides, design hub, navigation, homepage, gallery, window types and colour studio with contextual links. Add new canonical routes to the static sitemap.
- Consolidate duplicate FAQ graphs/layout content and align shared schema helpers with `https://www.apexcurtains.com`. Use visible FAQ text as the schema source and consistent organisation/website IDs. Do not add invented ratings, product offers, availability, dates or customer claims.
- Render real gallery links on the server, remove invented fallback project records, and apply a shared conservative editorial correction to collection, preview and detail views. No database rows or admin workflows are changed.

## Priority follow-ups outside this code change

| Priority | Finding | Recommended action and verification |
| --- | --- | --- |
| P1 | Both legacy `.co.uk` hosts redirect, but the observed response is a temporary 302 to `http://apexcurtains.com`, adding a protocol/host chain. | At the legacy hosting provider, change to a direct permanent 301/308 to `https://www.apexcurtains.com` preserving the complete path and query. Test home, an existing project URL, an advice URL and a query-bearing URL. Do not redirect every page to the homepage. |
| P1 | Non-www `.com` returned an edge 307 despite the repository's permanent Next redirect. | Check the hosting/domain redirect configuration for a permanent non-www to www redirect. Retain working paths, SSL and query strings; test before and after. This requires hosting configuration, not another duplicate application redirect. |
| P1 | Several gallery records contradict themselves. Public presentation now withholds disputed details. | Confirm the heading and lining against job sheets, then correct the source through the existing admin. Do not rename existing slugs just to tidy their wording. The normalizer permits corrected source records through when the conflicts disappear. |
| P1 | Most projects have a single photograph and limited technical provenance. | Add approved open/closed views, a heading/lining close-up and an installation detail where available. Record surveyed shape, confirmed track/heading/lining, approximate height only where documented, access method and a concrete constraint/solution. Avoid customer identities or exact addresses beyond agreed public attribution. |
| P2 | Search impact cannot be measured from a code audit. | Compare Search Console impressions, clicks, landing pages and queries before/after release. Group apex, triangular, angled, gable-end, high-window, tracks and lining queries. Inspect important URLs after deployment and submit the existing sitemap. Do not claim ranking or AI-citation improvements before evidence. |
| P2 | Global lint and dependency health have existing issues. | Keep baseline lint visible in CI and address unrelated operational code in a separate maintenance change. The public presentation work does not upgrade packages or alter security-sensitive workflows. |

## Gallery evidence and correction policy

The audit read the 14 public records currently exposed by the site's gallery source. It did not inspect private enquiries or professional workspace records.

| Existing project slug | Conflict observed | Public correction |
| --- | --- | --- |
| `cheshire-apex-curtains-cheshire` | `Pincbh Pleat` typo; blue-lining prose versus `Blackout Stone` field | Correct the obvious heading typo; withhold the conflicting lining name/colour rather than choose one. |
| `apex-window-curtains-elegant-pinch-pleat-nottingham` | Pinch versus pencil heading; incomplete brief; thermal wording versus different lining grade | Use neutral bespoke wording, withhold heading tags/field, replace the truncated brief conservatively and retain only the common blackout description. |
| `apex-curtains-huddersfield-huddersfield` | Slug-like title; pinch versus pencil; thermal wording versus lining field; full-blackout claim | Human-readable title, neutral heading, common blackout description and improved-light-control wording. Preserve the URL. |
| Cambridge record with repeated story text | Challenge and solution identical | Omit the duplicate solution block until separate project evidence is entered. |

The shared correction does not infer facts from a photo, invent a fabric range, or overwrite the CMS. Once job-sheet confirmation exists, remove obsolete exceptional handling only after checking both collection and detail rendering.

## Technical and editorial sources

- [Forest Group UK downloads](https://forestgroup.com/uk/downloads/brochures).
- [Standard KS brochure, September 2026](https://forestgroup.com/user_files/download_files/download_2502_FOREST_KS_NEW_EN_150926_WEB.pdf): 20 × 14 mm profile, 8 kg/m, 10 cm bend radius, hand operation, wall/ceiling options and mounting reference. Other variants in the brochure are not advertised as Apex's offering.
- [Standard CS brochure, July 2026](https://forestgroup.com/user_files/download_files/download_2452_FOREST_CS_EN_270726_WEB.pdf): 20 × 20 mm profile, 15 kg/m, 20 cm radius and mounting references. Published figures are not a structural design for a slope or permission to load any substrate.
- [MiTOWER manufacturer information and instructions](https://www.popupproducts.co.uk/product/mitower/), [HSE tower scaffolds](https://www.hse.gov.uk/construction/safetytopics/scaffold.htm), [HSE work-at-height planning](https://www.hse.gov.uk/work-at-height/introduction.htm). Customer guidance is not an assembly manual or a universal promise of access.
- [Prestigious Textiles Oslo collection](https://www.prestigious.co.uk/fabrics/oslo-fjord/oslo-oslo-fjord/) and [Oslo Linen specification](https://www.prestigious.co.uk/fabrics-detail/oslo-fjord/oslo-oslo-fjord/oslo-linen/). Official rendered product listings supplied the 34 names, codes and swatches in `lib/oslo-fabrics.json`. The user confirmed Apex supplies Oslo and that PT pictures represent 140 cm width by 1 m length. Original image proportions are preserved; no photographic texture is presented as a life-size sample or a validated curtain render. “Linen” is a colour, not a claim of linen composition. Fjord and other unconfirmed ranges are not promoted.
- [Designers Guild product care](https://www.designersguild.com/en-us/product-care/l1014) and [Jotex railroading guide](https://jotexfabrics.com/guides/railroaded-fabric/): general care/construction background, subordinate to instructions for the supplied cloth.
- [Google Search guidance for AI features](https://developers.google.com/search/docs/appearance/ai-features): useful, indexable content with normal search foundations. No special AI schema or bulk page strategy guarantees citation.

## Image provenance

Existing `/window-types/` and homepage assets are first-party site images. Three additional photographs were copied from the site's existing public gallery storage to stable local paths for editorial use:

- Milton Keynes: `/Gallery/projects/1773595223625-9ldctq5eqk7.jpeg` → `public/projects/wave-pleat-apex-curtains-milton-keynes.jpeg`.
- Peterborough: `/Gallery/projects/1780856915725-yrgd79lorfk.jpeg` → `public/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg`.
- Cambridge: `/Gallery/projects/1777304375104-vp8ay8l4kqm.jpeg` → `public/projects/cambridge-apex-curtains-cambridge.jpeg`.

Manufacturer swatches retain exact source URLs in `lib/oslo-fabrics.json`, with visible PT attribution. Diagrams and the room illustration are explanatory graphics, clearly separated from real project photographs. No new fabricated installation photographs or reviews are used.

## Release safeguards

Use the feature branch and PR checks. Review desktop/mobile previews, technical claims and gallery corrections before merge. No direct production deployment, DNS change, database migration, enquiry submission, authentication change or operational API change forms part of this work. Public styles explicitly exclude admin, authentication, professional workspace and the design/quote/Arlo operational screens.

After deployment: test the existing enquiry journey with the established non-production procedure, inspect representative canonicals/JSON-LD/sitemaps, check real gallery entries and verify external manufacturer links. Hosting redirect repairs remain a separate explicit configuration task.
