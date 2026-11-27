> **27 November 2026 publication update:** The owner explicitly instructed removal of the two publication controls and publication of PR #52, with the conversion audit separate. P01 is authorised for preliminary public issue. Supplier and named technical reviews remain unconfirmed but are no longer P01 publication prerequisites. Earlier hold statements below are historical and superseded. See [publication release](publication-release.md) and [document control](document-control.md).

# PR 52 preliminary publication candidate

27 November 2026. **P01 is reserved for review, not issued. Technical and supplier review remain pending; the user has authorised publication once those retained requirements are satisfied. Do not merge or publish to production.**

This is a content and publication-scope revision of the approved five-document collection. There is no new design, feature, workspace change or development programme. [Draft PR #52](https://github.com/Nylon1/Apexcurtains/pull/52) remains the review route.

The business-scope update supersedes the earlier reviewed implementation. See [verification](verification.md) and PR #52 for current checks and preview evidence. No production release is authorised to bypass technical or supplier review.

## What the preliminary edition contains

Five PDF documents (13 A4 pages), the editable two-page APX-T05 Word template and its unpaginated text version. Reference, P01 revision, date, page count and format remain beside each download. Eight existing illustrative, not-to-scale drawings use project-specific variables; none is an approved construction drawing.

The edition withholds numerical product specifications: profile/recess sizes, motor body/assembly dimensions and clearance allowances, track-length/bend-radius limits, motor load capacities and electrical ratings. It also withholds any implied universal mounting capacity, maintenance interval or lubricant prescription. Exact product codes, installed configuration, motor removal/access envelope, electrical requirements, structural support and installation details must be confirmed for each project.

Official manufacturer references remain traceable through nine registered source URLs, document titles/editions, page references and SHA-256 fingerprints. A manufacturer reference is not approval of an Apex document or of an installed system. See [manufacturer research](manufacturer-research.md) and the [source check](source-verification.json).

## Review and confirmation pack

- [Forest clarification questions](forest-questions.md) / [editable Word sheet](forest-questions.docx): six questions covering motor datums, recess/access, installed configuration, electrics/controls, support interfaces and handover. Prepared only; not sent.
- [Business responsibility confirmation](business-confirmation.md) / [editable Word sheet](business-confirmation.docx): installation, electrical work, commissioning, handover and ongoing support, with delivery-party and evidence fields. R02 records confirmed Apex manufacturing, installation, setup, programming, testing, commissioning and handover; required hardwiring/testing/certification is by an appropriately qualified electrician. Third-party integration is assessed individually, and ongoing support terms remain to be agreed.
- [Document control](document-control.md): revision/update process, evidence requirements and approval against the exact manifest. Changing final status, date or content requires regenerated files and a fresh approval fingerprint.
- [Desktop library](library-desktop.png), [mobile library](library-mobile.png), [mobile document](mobile-document.png), [PDF overview](pdf-designs.jpg) and [verification](verification.md).

## D01 preservation

The seven original D01 downloads were copied to the local internal-review archive outside the repository and web root, together with source data, generators, diagrams and the previous review pack. All seven archived download hashes were verified against the original D01 manifest before removal from current public assets.

Local archive: `C:/Users/hamza/Apex-Internal-Review/PR52/D01`. It has not been committed into this public repository. The new candidate serves only P01 downloads; retired D01 paths must return 404. Earlier D01 copies remain in this public repository's Git history and older review deployments. Removal from current downloads does not make earlier copies private. No history rewrite or retrospective confidentiality is claimed.

## Approval gates retained

1. Business scope is confirmed and recorded in the R02 register, including electrical work and third-party integration boundaries.
2. Supplier/competent technical review of the dimensional discrepancy and its treatment remains outstanding.
3. Named Apex technical approval, date and evidence against the exact manifest remain outstanding.
4. The user instructed "Publish". This authorisation is recorded against the updated candidate, subject to the retained technical/supplier requirements; it is not a waiver. A document owner still needs to be nominated.

The four controls remain intact in `lib/specifier-approval.json`; two now have evidence and two remain pending. The public-issue check blocks on supplierDimensionalReview and apexTechnicalApproval. Project-specific engineering and supplier confirmation remain necessary after publication. Any later document change must be reconciled with the recorded authority and exact manifest before release.

## Production baseline and limits

Production remains main commit `0fcaef8df8f56c4fb5dd3de5e2d80b68de9acaba`, deployment `dpl_91dqB5wGDA1husj9Qz26EXp2oT34`. No merge, production deployment, supplier outreach, portfolio/specialist programme or roller-blind expansion is included. No physical printer test, private workspace authentication/export test, supplier acceptance or technical approval is claimed.
