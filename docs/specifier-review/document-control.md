# Document control and technical release

## Current status

The working collection is **P01 — preliminary public edition candidate, approval pending, not for construction**. P01 is reserved for review and has not been issued. The detailed D01 pack is retained locally outside the repository/web root. Development and visual approval do not constitute technical approval. PR #52 must remain unmerged until the existing review requirements are satisfied.

On 27 November 2026 the business confirmed in this project conversation: “We supply all systems they have”, referring to Forest Group. This confirms supply availability across Forest systems; this collection remains exclusively about curtains. It does not establish stock, lead times, installation suitability, electrical connection, controls commissioning or maintenance responsibilities. Those responsibilities still need a confirmed Apex scope statement.

## Controlled source and outputs

- `lib/specifier-resources.json` owns document content, references, revision and issue date. The web page, PDF and editable template are generated from it.
- `lib/specifier-downloads.json` records actual page counts, formats, sizes and SHA-256 fingerprints. Plain text is unpaginated. The Word count describes the blank A4 template before editing; user additions can change pagination.
- JSON content/manifest fingerprints use UTF-8 with LF newlines for cross-platform reproducibility. Published artifact fingerprints use exact bytes; `.gitattributes` prevents newline conversion in the download directory.
- `lib/specifier-approval.json` records business scope and outstanding approvals. Approval must identify the approver, date, evidence and exact download manifest fingerprint. No approval is inferred from a product brochure, a successful build or a visual review.
- `docs/specifier-review/source-verification.json` records official index membership, source URLs and file fingerprints. The manufacturer source PDFs are research material and are not republished.

## Updating a draft

1. Check the official Forest brochure and technical-document indexes for current editions. Run `python scripts/verify-specifier-sources.py`. A changed or delisted file requires review, not an automatic overwrite of the registered hash.
2. Review affected claims, source page references and diagrams. Record replacements and remaining discrepancies in `manufacturer-research.md`. Manufacturer maxima never establish project suitability.
3. Update shared content; regenerate drawings only if their content changed. Generate PDFs with `python scripts/generate-specifier-pdfs.py` and APX-T05 Word with `scripts/generate-specifier-word.py` using the managed workspace Python.
4. Render and inspect every PDF page and every Word page at A4. The canonical Word renderer requires LibreOffice; where unavailable on Windows, document the fallback to installed Microsoft Word PDF export, followed by PNG inspection. Keep the rendering evidence outside published downloads.
5. Generate the download manifest with `python scripts/generate-specifier-manifest.py` only after the Word render is current. Run `npm run test:specifier`, the build and the relevant browser/regression checks. Any artifact/content change invalidates earlier manifest-based approval.
6. Commit the reviewed candidate and record its commit, checks and preview in the release report. Candidate iterations are distinguished by Git commit and manifest hash. D01 was never deployed to production, but earlier copies remain in this public repository's Git history. Removing current downloads is not retrospective confidentiality. Keep the local D01 archive separate from public assets.

## Required approval before public issue

- Apex: confirm installation, electrical connection, controls commissioning and support responsibilities, including any work by others.
- Named Apex technical approver: review all five documents and eight drawings against the intended scope, source register and limitations; record approval against the exact manifest hash.
- Supplier/competent technical reviewer: resolve or explicitly approve the treatment of the Shuttle body-versus-assembly dimensional discrepancy. No construction opening or clearance may be derived by choosing one figure arbitrarily.
- Authorised business owner: approve publication of the reviewed coordination guidance. Record evidence and approver in the approval register; run `npm run specifier:public-issue`. It is expected to block while these records are missing. This command validates recorded evidence; it cannot establish the approver's competence or substitute for human review.

P01 is currently a reserved public-edition candidate with numerical specifications withheld. After technical review, prepare the final issue status/date and regenerated manifest for explicit authorised publication approval before merging. The removal of numerical data does not waive any existing gate: installation/commissioning scope, supplier-review evidence, named technical approval and publication approval remain required. Never silently overwrite an issued PDF/DOCX/TXT. Retain prior editions and their source and approval records. Any final wording, status or date change requires a fresh manifest and approval against those exact files.

**Public coordination guidance is still not an approved construction specification.** Project manufacture/construction releases require their own surveyed geometry, selected products, structural and fixing assessment, electrical/control interfaces, safe access and named approvals in the existing professional workspace. Publication does not discharge those responsibilities.

## Review triggers

Recheck manufacturer documents before every resource issue and before project procurement. Reopen review when the manufacturer changes a document or product code, a new system variant is introduced, Apex's scope changes, or a technical discrepancy is reported. Nominate an Apex document owner as part of technical approval; no owner or periodic review interval has been assumed.
