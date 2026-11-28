# Survey and consultation experience

Approved direction: 28 November 2026. Implementation candidate only; no production release is authorised by this change record.

## Confirmed business process

In the project conversation, Apex confirmed that it can provide an initial guide price and then arrange a complimentary home consultation for measurements and fabric selection. Service areas are omitted from this page copy as requested. No appointment duration, sample-delivery promise, post-visit document deadline or manufacturing timetable is inferred.

The seven-stage journey covers enquiry, guide price, home consultation and survey, material/track selection, final specification and order confirmation, bespoke making, and installation/handover. The order and handover stages are explanatory only; payment, ordering functionality and aftercare development remain outside scope.

## Implementation

- `/services` retains its title, description, canonical, WebPage schema and existing detail-navigation destinations. The seven-stage presentation includes the previous three stages' practical guidance in disclosures.
- `/services/measure-consultation` retains its title, description, canonical, social metadata, existing section anchors, technical paragraphs, table, diagram, FAQs and onward links. The obsolete survey-charge caveat is replaced with the confirmed appointment/programme wording. Its breadcrumb and primary-image schema reflect the rendered Services parent and Peterborough photograph.
- The existing `DetailExplorer` survey checklist is reused without modification: six optional items, native inputs, announced count, no persistence or submission.
- Technical content and FAQ/schema text continue to come from `surveyGuide`; navigation and related links use the same record. Schema generation is shared with the existing guide template, whose output is otherwise unchanged.
- Photographs resolve from existing studio and portfolio references. No media uploads or project records are created. Norwich is labelled as installation-stage evidence, not a survey visit.
- Each of the seven specialist pages gains one contextual link in its existing consultation block. High-level installation links to support/access; manufacturing links to geometry without implying that every trade brief includes a home visit.
- Presentation CSS is scoped to the two service pages. Existing global navigation, footer, forms, enquiry endpoints, validation, privacy and analytics are retained.

## Verification

The local verification pack is `C:/Users/hamza/Apex-Review/survey-consultation-implementation-2026-11-28`.

Checks cover the build, TypeScript, targeted ESLint, SEO foundation, specialist guidance, architectural lead delivery/validation, rendered metadata, FAQ parity, retained anchors/content, checklist keyboard operation and reset, image loading, accessible disclosures, viewport overflow, axe checks at 1440/768/390/320 px, seven specialist link destinations and regression smoke checks for the homepage, gallery and both quotation routes. Enquiry API writes are blocked during browser review; automated delivery tests use mocked responses.

Review the pull request CI and preview against the final commit before release. Do not merge or promote this candidate as part of the implementation review.
