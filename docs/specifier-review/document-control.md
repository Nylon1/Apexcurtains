# Document control and technical release

## Current status

P01 is authorised for preliminary public issue, not for construction. On 27 November 2026 the project owner explicitly instructed: "Remove the two controls and publish PR #52; audit separately". This supersedes the earlier publication hold. Supplier dimensional review and named Apex technical approval are removed as publication prerequisites for this exact P01 manifest only. Their evidence records remain pending: no technical or supplier approval is claimed.

Confirmed business responsibilities remain unchanged. Apex supplies Forest curtain systems, manufactures curtains, installs manual and motorised tracks, sets up and programmes motors, tests, commissions and hands over. Qualified electricians undertake required hardwiring and applicable testing/certification. Third-party integrations and ongoing support terms are assessed individually.

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

## Publication control

The public-issue check still requires business-scope evidence, publication authority against the exact download manifest, registered source fingerprints, artifact integrity and exclusion of numerical product specifications. It recognises the recorded P01-only removal of the supplier and Apex technical publication prerequisites. Future revisions do not inherit that removal automatically. Changed artifacts require a new manifest and publication authorisation.

Public guidance is not an approved construction specification. Exact motor assembly clearance, electrical requirements, structural support, fixing selection, installation and maintenance access must be confirmed for each project. Forest questions remain open. D01 remains an internal-review archive outside current public downloads; earlier public Git history remains.

Never silently overwrite an issued edition. Increment revision, retain the prior issue and evidence, regenerate and review all outputs and record fresh publication authority. No named engineering approval is inferred from the publication instruction.

## Review triggers

Recheck manufacturer documents before every resource issue and before project procurement. Reopen review when the manufacturer changes a document or product code, a new system variant is introduced, Apex's scope changes, or a technical discrepancy is reported. Nominate an Apex document owner as part of technical approval; no owner or periodic review interval has been assumed.
