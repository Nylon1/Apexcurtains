# PR 52 final release candidate

27 November 2026. Status: **D01 technical review candidate — not approved for public issue; do not merge.** The professional workspace and specialist-page programmes remain unchanged.

## Completed refinement

- Reviewed all five PDFs, 13 A4 pages, for typography, spacing, illustration readability and page boundaries. Body text increased from 10 to 10.5 pt with 14.5 pt leading. Embedded fonts, vector drawings, source hyperlinks, page numbering, revision/date, preliminary status and contact details retained.
- Added a native editable two-page A4 APX-T05 Word template. Paragraphs and placeholders can be edited in Word; pagination may change after completion. It is not a protected or rasterised form. PDF and plain text remain available.
- Added reference, revision, date, format and page count beside all seven technical downloads. Plain text is explicitly unpaginated. The existing commercial profile is separately labelled as seven pages, with no invented reference, revision or issue date.
- Rechecked all nine official Forest sources. Replaced the curtain-height chart and general overview links with the currently indexed files. The remaining seven fingerprints were unchanged. The newer height-chart filename and its older printed document code are both disclosed.
- Recorded the business confirmation that Apex supplies all Forest systems. The resources cover curtain systems only; supply is not represented as project suitability or a commitment on stock, lead time, electrical work or commissioning.
- Added a controlled download manifest and integrity check to CI, plus an explicit public-issue approval check. Changes to content or delivered files invalidate the recorded fingerprint. See [document control](document-control.md) for revision, approval and update responsibilities.

## Technical assessment

No generic anchor capacity, bracket spacing, recess width or motor clearance has been introduced. Track profile/body dimensions remain identified as manufacturer reference dimensions, not complete installation envelopes. Eight schematic drawings use variable dimensions and are marked illustrative/not to scale. Engineering, load paths, fixing selection, curved tracks, control compatibility and safe access remain project-specific assessments.

The Shuttle brochure-versus-manual dimensional discrepancy remains disclosed; it has not been resolved by selecting a preferred figure. Official manufacturer information is not technical approval of the Apex publication or an individual installation.

## Checks

- Production build and TypeScript: passed, 205 generated pages.
- Targeted component/page ESLint: passed.
- SEO foundation: 18/18 passed. Existing title, description, canonical and schema retained.
- Specialist/homepage/portfolio guidance regressions: 9/9 passed.
- Architectural brief, weight and lead-delivery regressions: 6/6 passed with mocked provider responses; no real enquiry sent.
- Desktop and mobile library checks: seven stage controls, five HTML documents, eight drawings, 50 internal destinations and all seven downloaded file fingerprints checked. No horizontal overflow or browser runtime errors.
- Automated WCAG A/AA and WCAG 2.1 AA main-content scans: zero violations in desktop collapsed, desktop expanded and mobile expanded states. This is not a full accessibility conformance certification.
- A4 PDF checks: 13 pages, embedded fonts, selectable text and linked references, no page-boundary overflow. PDFs are not represented as PDF/UA; equivalent structured HTML remains available.
- Word: generated with managed workspace python-docx. The standard renderer was attempted and reported missing LibreOffice on Windows. Installed Microsoft Word exported the document to PDF for two-page A4 visual review. No macros or editing restriction were added. Microsoft Word editing and print pagination are distinct from the fixed PDF edition.
- Draft integrity check passed. Public-issue check intentionally blocks pending the records below.

## Outstanding approval requirements

1. Confirm Apex's installation, electrical connection, controls commissioning and ongoing support responsibilities, including work by others.
2. Record a named Apex technical approver, review date and evidence against this exact manifest.
3. Obtain supplier/competent technical review of the motor dimensional discrepancy and approve its treatment before public issue.
4. Record authorised public-issue approval and a document owner. Prepare the public revision separately; publication will remain preliminary coordination guidance, never a universal construction specification.

These requirements are recorded in `lib/specifier-approval.json`. Visual direction and supply availability are confirmed; technical and publication approval are not.

## Scope and limitations

No production deployment, merge, private workspace changes, project-record duplication, new specialist-page work or roller-blind content. The production baseline remains main commit `0fcaef8df8f56c4fb5dd3de5e2d80b68de9acaba`. Private authentication and actual project exports were not exercised; their implementation is unchanged. No physical printer test or supplier approval is claimed.
