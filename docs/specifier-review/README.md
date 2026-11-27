# Architectural technical resources — draft review

27 November 2026 · D01 · Branch `design/specifier-technical-resources`

This proposal strengthens the existing professional library. It does not reopen the 31-project portfolio or the seven specialist service pages, rebuild the workspace, or change production. All five new documents are preliminary coordination material, not construction or manufacture instructions.

## Existing resource audit

The public pages were inspected at `https://www.apexcurtains.com` on 27 November 2026. Route status, headings, canonicals and checkbox counts are recorded in [live-baseline.json](live-baseline.json). All ten inspected routes returned HTTP 200. Workspace internals were reviewed in source; no private project records, authentication or enquiry submissions were used.

| Existing resource | What already works | Genuine gap / proposed response |
| --- | --- | --- |
| Professional hub | Audience routes, design stages, genuine project evidence, checklist, review and workspace routes | Retain. Existing links already lead to the enhanced library; no second hub needed. |
| Architect guidance | Curtain envelope, recesses, structure, access and design review | Add depth through the linked T01/T02 drawings and controlled manufacturer references, rather than rewrite the guide. |
| Interior designer guidance | Room brief, fabric scale, heading/lining, samples and schedule | T01 distinguishes finished drop, fold depth and stack-back; T02 addresses independent layers. Existing role page retained. |
| Developer / housebuilder guidance | Plot-specific geometry, controlled options, release gates and handover | T04/T05 provide shareable readiness and preliminary briefing material; individual plot records stay in the workspace. |
| Contractor / fit-out guidance | Fixing evidence, setting out, access, readiness, responsibilities; seven working checkboxes | T02 support interface and T04 hold points supplement the existing page. No duplicate online checklist. |
| Specifier library | Decision-based links to geometry, textiles, track, access and project records | Needs a stage-based document register, manufacturer research, coordinated PDFs and clearer drawings. This is the only redesigned public page. |
| Project information checklist | 33 native interactive checkboxes, clear preliminary status, geometry and site information | Retain exact route and functionality. Make non-persistence explicit when linking from the library. |
| Commercial project profile PDF | Five-page capability document with genuine project evidence and contact details | Retain as capability evidence. It is not a technical specification; do not turn it into a second brochure. |
| Professional workspace | Existing demo and separate authorised login/live routes; source supports project/aperture records, evidence, revisions, risks, RFIs, programme and handover | No rebuild or database changes. New resources point to authorised login and existing records. Authentication and permissions were not independently re-tested in this scope. |
| Specification / export | Existing authenticated issue/supersede actions and printable versioned export snapshots | T05 is a blank preliminary briefing template, not a parallel export engine. Controlled issues remain in the workspace register. |
| Existing diagrams | Survey geometry, professional coordination plan/section, release sequence; service drawings also exist | Retain them. Eight new original plates cover specific unresolved interfaces, labelled illustrative/NTS. |

Source audit included `lib/guides/professional-resources.ts`, `professional-roles.ts`, the shared guide renderer, `public/guides`, workspace export actions/pages and `docs/product/professional-platform-v1-release.md`. The public demo title has a repeated brand suffix; the login has no explicit canonical. These pre-existing workspace presentation observations are recorded, not expanded into a workspace development programme.

## Proposed collection

| Reference | Document | Pages | Consolidated topics |
| --- | --- | ---: | --- |
| APX-T01 | Architectural curtain planning | 3 | Early planning; double-height specification; glass height versus finished drop; shaped retained cloth; fullness, weight and stack-back |
| APX-T02 | Tracks, pockets and structural interfaces | 3 | Single/double independent tracks; wall/ceiling mounting; pockets/recess profiles; support information checklist |
| APX-T03 | Motorised tracks and electrical coordination | 3 | FMS/FMS Plus and Shuttle research; load/configuration; motor access; electrical/control interface; commissioning |
| APX-T04 | Site readiness, installation and maintenance | 2 | Contractor hold points; high-level access; protection; installation; operation and maintenance handover |
| APX-T05 | Preliminary curtain specification template | 2 | Aperture brief; textiles; geometry; system/interfaces; owners, assumptions and release. Includes editable UTF-8 text. |

Total: 13 A4 pages, no marketing cover pages. Every page carries Apex branding, document reference, revision D01, date, preliminary status and contact information. Each document includes project-specific limits and linked official references. HTML counterparts use the same structured content, so the information remains available without a PDF reader. PDFs contain searchable text and vector drawings; they are not represented as tagged PDF/UA documents or fillable forms.

Stages: concept → design development → technical design → procurement → construction → installation → handover. The stage selector recommends existing document anchors; the complete register remains visible and usable without JavaScript. These are coordination stages, not a contractual stage definition.

## Design and integration

- Existing canonical, title, description, social metadata and legacy library fragment IDs are retained. FAQ schema matches the retained visible answers. No new service URLs or duplicate project records.
- Oxford, Jesmond and Norwich photography is read directly from `lib/portfolio-content.json` through the existing portfolio module. Captions describe visible evidence only; no motor, fixing or performance claims are inferred from a photograph.
- The existing professional enquiry route, telephone, email, checklist and authorised workspace sign-in are prominent. No forms are submitted during verification.
- The original library’s topic links remain in expandable “Further guidance by decision” sections. Existing resource IDs resolve to the relevant document or guidance section.
- Forest documents are linked to their official origin, not republished. Manufacturer CAD/BIM has not been recreated or claimed. See [manufacturer-research.md](manufacturer-research.md).

## Drawing register

All eight plates are original SVG studies, not to scale. No anchors, fixing centres, structural capacities or generic recess dimensions are prescribed. Lettered dimensions are project decisions. Web captions provide additional explanations and full-size links.

| Plate | Purpose |
| --- | --- |
| `height-drop` | Glazing height G versus finished curtain drop D, with floor and carrier datums |
| `apex` | Shaped route, retained cloth and agreed open view |
| `stack-back` | Along-track stack S versus fold projection F in plan |
| `single-double` | One line versus two independent curtain/voile lines; centre spacing C |
| `mounting-recess` | Ceiling, wall and pocket section concepts; clear pocket width P |
| `support` | Structural, backing, finish, bracket and track interfaces |
| `motor-clearance` | Body versus assembly, cable and removal envelope |
| `access` | Double-height working zone and access route considerations |

## Confirmation required before final issue

1. **Apex:** Which FMS/FMS Plus systems and Shuttle variants are currently supplied, installed and supported? Pending business response. No current supply commitment is implied.
2. **Forest / supplier:** Match current product codes to the brochure and installation-manual dimensional differences. Confirm the relevant body, assembly, attachment and removal envelopes.
3. **Forest / supplier:** Exact recess generation, configuration, drawings and native CAD/BIM availability. Confirm any curved arrangement and drive/end components before issuing a ceiling cut-out.
4. **Apex / workroom / supplier:** Actual curtain weight, heading, full-size stack, route, motor/duty and system suitability. Published limits are not a project selection.
5. **Responsible design team:** Substrate/backing/anchor assessment, load path and interface ownership. No generic fixing requirement is offered.
6. **Electrical contractor / integrator:** Exact motor supply, accessible isolation, control variant, third-party interfaces, commissioning and power-continuity requirements.
7. **Installer / project manager:** Installation and future maintenance access strategy, equipment/route/floor assessment, protection and readiness.
8. **Apex technical owner:** Approve the five documents, revision/date policy and owner for future manufacturer updates before any public production issue.

## Reproducible sources

- Content and official source register: `lib/specifier-resources.json`.
- Editable drawing generator: `scripts/generate-specifier-drawings.py`.
- PDF/text generator: `scripts/generate-specifier-pdfs.py` (ReportLab + svglib; local Windows Arial/Georgia fonts are not redistributed).
- PDFs/text: `public/downloads/specifier/`.
- Drawings: `public/guides/specifier/`.

Run the drawing generator before the PDF generator. The web and PDF content come from the same JSON. Do not amend the PDFs manually or silently overwrite an approved revision. D01 is explicitly a review draft.

## Review assets and verification

Review [draft PR #52](https://github.com/Nylon1/Apexcurtains/pull/52), the [desktop](library-desktop.png) and [mobile](library-mobile.png) designs, [mobile document](mobile-document.png), [PDF design overview](pdf-designs.jpg) and [verification record](verification.md). The Vercel preview and hosted checks are recorded in the verification report. Approval is required before merge or production deployment. No analytics, advertising, outreach, new service programme or roller-blind expansion is included.
