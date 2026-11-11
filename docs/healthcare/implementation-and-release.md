# Apex Healthcare implementation and release record

Prepared 11 November 2026 on `feat/healthcare-screening`, based on current `origin/main` (`cebf62b`). This is a review implementation, not a production release. The owner's later direction selects **Louvolite Ex-Lite** as the initial roller-blind range and a luxury clinical presentation.

- Draft pull request: https://github.com/Nylon1/Apexcurtains/pull/39
- Review preview: https://apexcurtains-43nc-63x7uv1x2-hamzas-projects-4ef62f35.vercel.app/professionals/healthcare
- Fabric browser: https://apexcurtains-43nc-63x7uv1x2-hamzas-projects-4ef62f35.vercel.app/professionals/healthcare/fabrics
- Louvolite range: https://apexcurtains-43nc-63x7uv1x2-hamzas-projects-4ef62f35.vercel.app/professionals/healthcare/roller-blinds
- Dental settings: https://apexcurtains-43nc-63x7uv1x2-hamzas-projects-4ef62f35.vercel.app/professionals/healthcare/settings/dental-practices
- Enquiry preview: https://apexcurtains-43nc-63x7uv1x2-hamzas-projects-4ef62f35.vercel.app/professionals/healthcare/quotation

These immutable preview links show application commit `b4b5cd6`. Existing Vercel protection is unchanged. The preview built successfully and the hub was verified in Chrome and with an authenticated HTTP 200 response. GitHub workflow run [42991662359](https://github.com/Nylon1/Apexcurtains/actions/runs/42991662359) passed. The subsequent documentation commit records these results without changing application code. The PR is draft, unmerged, and not authorised for production release.

## Architecture and scope

The existing Next.js App Router, Apex public editorial palette, navigation and commercial guide are retained. Healthcare lives under `/professionals/healthcare`; no separate Site or CurtainsUK implementation was created. Existing enquiry/Arlo/Atelier endpoints are unchanged. Healthcare uses the existing Supabase/Resend technology and existing `apex_atelier_staff` membership check, with separate private tables, storage bucket and enquiry endpoint.

New public pages (42 total):

- `/professionals/healthcare` — hub, four categories, clinical settings and complete service.
- `/professionals/healthcare/reusable-curtains`
- `/professionals/healthcare/fabrics`
- `/professionals/healthcare/medical-tracks`
- `/professionals/healthcare/roller-blinds`
- `/professionals/healthcare/disposable-curtains`
- `/professionals/healthcare/survey-installation`
- `/professionals/healthcare/replacement-maintenance`
- `/professionals/healthcare/quotation`
- `/professionals/healthcare/settings/dental-practices`
- `/professionals/healthcare/settings/gp-surgeries`
- `/professionals/healthcare/settings/hospitals`
- `/professionals/healthcare/settings/private-clinics-physiotherapy`
- `/professionals/healthcare/settings/care-homes`
- 28 individual `/professionals/healthcare/products/{id}` pages generated from approved records.

Modified: Professionals primary/menu navigation, shared professional navigation, commercial installation guide, XML page sitemap, privacy notice and staff app navigation. New staff page `/admin/healthcare`; private endpoints `/api/healthcare/enquiries` and `/api/healthcare/files/{id}`. Staff pages remain noindex and outside public sitemaps.

## Catalogue and images

| Supplier | Published records | Actual colourways | Withheld records |
| --- | ---: | ---: | ---: |
| Panaz | 12 curtain base cloths | 0 printed colourways | Additional designs/combinations remain research candidates |
| Forest | 3 MTS profiles, with 5 documented length references | White finish | No cross-supplier compatibility assumed |
| Louvolite | 13 Ex-Lite colour records | 13, with 39 width-specific roller references | Finished-blind hardware/supply route requires project confirmation |
| Behrens | 0 | 0 published | 50 size/colour/heading records, including one supplier-code typo |

Total: 78 stored product records, 28 publishable. Every published record has genuine matching imagery, official source URLs and verification date. All image permissions are based on the owner's explicit confirmation of existing written rights on 11 November 2026; the agreements themselves were not inspected and their location/conditions have not been supplied.

Panaz imagery is original, low-resolution base-cloth photography extracted from the supplier's accessible curtain card; it must never be presented as a printed colourway. Shared photographs cover documented standard/wide or treated/untreated bases. Louvolite has 13 colour swatches and a supplier Slate roomset, labelled as supplier photography rather than an Apex project. Forest has three profile illustrations and a system illustration. Behrens images returned HTTP 403; restrictions were not bypassed.

Sources, exact asset mappings and limitations: `panaz-source-review.md`, `panaz-image-provenance.json`, `panaz-additional-bases.json`, `forest-behrens-source-review.md`, `forest-behrens-assets.json`, `louvolite-assets.json`.

## Documents and claims

Linked official technical documents:

- Panaz September 2025 curtain basecloth card (composition, width, weight, listed application and fire standards).
- Forest January 2026 MTS brochure (profiles, article codes, components and bending information).
- Louvolite 2026 Ex-Lite commercial card (13 colours, width references, material properties and care).

No new independently issued, current SKU-specific fire certificates were obtained. Behrens' older 2013 report is sample-specific and carries duplication restrictions; it is recorded as evidence with limitations, not mirrored or treated as universal certification. Manufacturer-listed standards are clearly distinguished from independent certificates.

BioCote is attached only to MTS Standard. No Forest/Behrens fixed-hook or EasyClick compatibility is approved. Forest's Flat/Straight naming and continuous-curve disagreement are disclosed. No Ex-Lite/Forest hardware pairing is assumed. No universal disposable replacement interval or unapproved Apex trimming route is offered. No prices, stock claims or supplier lead-time promises are invented.

## Enquiry and staff workflow

The browser supports search, colour/collection/pattern/type/property filters, up-to-four comparison, image enlargement, named colour selection, local shortlist and samples. The quotation form accepts multiple categories/products, quantities, approximate dimensions, facility/site/contact details, supply scope, timescale, previous reference and requirements.

The server validates all fields and resolves selected products from the publishable catalogue. It stores an exact product/reference/colour/quantity snapshot. A unique UUID-derived AH reference and database fingerprint prevent duplicate submissions; processing leases handle concurrent retries. Email/IP-derived HMAC rate keys, honeypot, same-origin checks and server-side limits provide spam controls. No raw IP is stored.

Uploads: up to three JPEG/PNG/PDF files, 3 MB aggregate, with a bounded request stream. Images are decoded, size-limited, normalised to JPEG and stripped of metadata. PDFs require signature/EOF checks and reject common active/encrypted content; this is **not antivirus certification**. They remain private attachments, never inline previews or public URLs. Staff should use the organisation's protected viewer/scanning process. File names are replaced with neutral names. Downloads require confirmed Apex staff membership and return attachment/no-store/nosniff headers.

Lead storage precedes notification. Resend uses a stable idempotency key; a failed notification does not lose the lead. Staff can inspect status, retry within the safe provider window, add notes and follow-up status, and retain a customer-approved room/track specification when retention was requested. After 23 hours an ambiguous notification is held for provider-log review. The staff list shows the latest 50 enquiries and supports exact-reference lookup. A customer confirmation email is not sent automatically; the on-screen reference confirms storage.

No personal form entries are saved to localStorage. Shortlist data contains only product IDs, quantity and sample intent. Failed submissions keep entered values and selected files in the current form. Browser refresh/navigation can discard unsubmitted contact details.

## Catalogue maintenance

`lib/healthcare/products.json` is the governed catalogue; `catalogue.ts` validates structure and gates publication. Unknown specification values are `null`, displayed as “Specification available on request”. Status values: `verified-published`, `awaiting-technical-confirmation`, `awaiting-image-permission`, `incomplete`, `retired`.

1. Obtain an authorised supplier CSV/JSON export and correctly matched image files. Keep permission and technical evidence with the supplier record.
2. Map supplier fields to the schema. CSV uses one product per row, with JSON in `properties`, `applications`, `specs`, `images`, `documents`, `sources`, `limitations` columns. JSON uses an array of records. The checked-in catalogue is the schema example.
3. Put licensed images below `public/healthcare/{supplier}/`; retain source, purpose, rights basis and colourway mapping. Never generate replacement fabric swatches.
4. Run `npx tsx scripts/healthcare-catalogue.ts --input authorised-export.json --out reviewed-catalogue.json`. The importer is local-only; it performs no automatic scraping and refuses to overwrite the production catalogue directly.
5. Review the diff, exact application/finish/certificates, image mapping and rights. Replace the catalogue only after that review; run `npm run healthcare:check`, healthcare tests and the build. Retire records rather than silently replacing their IDs.
6. Release through the protected PR workflow. Retired/incomplete products disappear from listings, detail routes, shortlist acceptance and sitemap; historical lead snapshots are preserved.

## Backend release dependency

Migration: `supabase/migrations/20261111083340_healthcare_enquiries.sql`. It was created with the Supabase CLI and is prepared for review. **It has not been applied to production.** The connected Apex project `uibuztamqgrvntpwalrt` has no preview branch. Creating an isolated branch returned “Branching is supported only on the Pro plan or above”; no branch was created and no plan upgrade was attempted.

Use an approved staging Supabase instance (or an upgraded branch) to test the hosted submission before release. The code accepts dedicated server-only `HEALTHCARE_SUPABASE_URL` and `HEALTHCARE_SUPABASE_SERVICE_ROLE_KEY`; otherwise it reuses existing Apex backend credentials. Apply the migration to that staging instance and provision the appropriate staff/auth fixtures. Configure `RESEND_API_KEY` and a controlled `HEALTHCARE_NOTIFICATION_TO` recipient for staging. Local `.env.local` currently has no Resend key. No credentials belong in Git or the client bundle.

Without the migration the form returns an understandable storage-unavailable error, retains entries and does not claim successful delivery. Do not merge/release until the hosted success, upload, staff access and notification checks pass. After release approval, apply the reviewed additive migration to the intended Apex database through its established process and deploy the reviewed commit. Do not use the CurtainsUK database.

Retention: Apex must agree an operational retention/deletion schedule. Rate buckets are removed after two hours during submissions. Leads and uploads have no automatic purge in this implementation; authorised deletion must remove the private storage objects as well as database records. Incomplete uploads should be reviewed and removed under the agreed retention procedure.

## QA and outstanding supplier inputs

See the final verification addendum for exact check results and preview/PR links. Local integration tests run the real route handler and real migration against embedded PostgreSQL, with **mocked external storage/email transports**. These do not establish hosted Supabase or actual inbox delivery.

External dependencies: Panaz exact printed-design/base/colour export and high-resolution imagery; Behrens accessible approved media pack, current SKU-specific certificates/care, corrected Cream large-hook code; exact trade supply routes, current availability, bespoke MOQ/limits/lead time and warranties; authorised track/hook/heading checks; Ex-Lite permitted disinfectant protocol and finished-system configuration; underlying image permission agreement references. Physical-device Safari and actual clinical installation approval remain outside browser emulation.

The original full-catalogue definition of done is **not yet met**. This implementation deliberately exposes verified information and keeps those dependencies explicit.

## Verification addendum — 11 November 2026

- Production build passed: 197 prerendered pages across the existing site, including 42 public healthcare routes.
- Healthcare catalogue validation passed: 78 stored records, 28 published.
- 13 healthcare integration checks passed against the real migration and route handler using embedded PostgreSQL and mocked storage/email transports.
- Three rendered healthcare checks passed across all 42 routes, unique metadata, schema parsing, sitemap coverage, every published image, withheld-product 404s and unauthorised private-file access.
- Existing regression suites passed: SEO 18, sitemap 4, Atelier 27, web-app 5, redirects 7, visualiser 10 and specialist guidance 9 (including the three rendered checks).
- Targeted ESLint passed on all changed TypeScript/TSX files. Repository-wide lint is not claimed clean.
- Browser checks covered mobile 390 px, tablet 768 px and desktop, the clinical settings pages, filtering, four-product comparison limit, image enlargement/Escape, shortlist persistence and sample selection. The production-built form displayed a storage error and preserved entered synthetic contact fields and the shortlist when the staging schema was unavailable.
- Hosted database success, actual inbox delivery and authenticated staff operations remain release gates. Production data and deployment have not been changed.

Temporary supplier research downloads under `tmp/healthcare-louvolite` remain untracked and excluded from the PR. Automatic approval review blocked their removal.
