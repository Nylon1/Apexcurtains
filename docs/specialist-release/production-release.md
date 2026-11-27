# Specialist pages production release

Released and verified on 27 November 2026. [PR #51](https://github.com/Nylon1/Apexcurtains/pull/51) merged at 20:15:08 UTC after all required checks passed. No release-blocking functional or visual defects were found in the checks below.

Production commit: `0fcaef8df8f56c4fb5dd3de5e2d80b68de9acaba`.

Vercel deployment: [`dpl_91dqB5wGDA1husj9Qz26EXp2oT34`](https://vercel.com/hamzas-projects-4ef62f35/apexcurtains-43nc/91dqB5wGDA1husj9Qz26EXp2oT34), READY and assigned to [www.apexcurtains.com](https://www.apexcurtains.com).

## Final refinements

The approved layouts were retained. The oversized and motorised headlines now name their services directly. Mobile opening gaps were tightened slightly, technical subheadings and paragraph spacing were clarified, and specialist links and controls received explicit visible keyboard focus styling. Existing portfolio records, shared functionality and established URLs were preserved. No new customer quotations, specifications or roller-blind content were introduced.

## Live pages and captured evidence

Full-page production screenshots are linked below. Opening contact sheets: [desktop](desktop-openings.jpg), [mobile](mobile-openings.jpg). [Mobile technical diagrams](mobile-diagrams.jpg). A local [HTML screenshot viewer](index.html) is also included.

| Live page | Production captures | Mobile performance | Accessibility | SEO | Mobile LCP |
| --- | --- | ---: | ---: | ---: | ---: |
| [Apex curtains](https://www.apexcurtains.com/apex-curtains) | [Desktop](desktop/apex-curtains.jpg) / [Mobile](mobile/apex-curtains.jpg) | 91 | 100 | 100 | 2.38s |
| [Gable-end curtains](https://www.apexcurtains.com/gable-end-curtains) | [Desktop](desktop/gable-end-curtains.jpg) / [Mobile](mobile/gable-end-curtains.jpg) | 83 | 100 | 100 | 1.08s |
| [Tall and double-height curtains](https://www.apexcurtains.com/tall-window-curtains) | [Desktop](desktop/tall-window-curtains.jpg) / [Mobile](mobile/tall-window-curtains.jpg) | 90 | 100 | 100 | 2.62s |
| [Oversized architectural curtains](https://www.apexcurtains.com/oversized-architectural-curtains) | [Desktop](desktop/oversized-architectural-curtains.jpg) / [Mobile](mobile/oversized-architectural-curtains.jpg) | 93 | 100 | 100 | 1.91s |
| [Motorised curtain systems](https://www.apexcurtains.com/motorised-curtain-systems) | [Desktop](desktop/motorised-curtain-systems.jpg) / [Mobile](mobile/motorised-curtain-systems.jpg) | 83 | 100 | 100 | 2.52s |
| [High-level curtain installation](https://www.apexcurtains.com/high-level-curtain-installation) | [Desktop](desktop/high-level-curtain-installation.jpg) / [Mobile](mobile/high-level-curtain-installation.jpg) | 85 | 100 | 100 | 1.99s |
| [Specialist curtain manufacturing](https://www.apexcurtains.com/oversized-curtain-manufacturing) | [Desktop](desktop/oversized-curtain-manufacturing.jpg) / [Mobile](mobile/oversized-curtain-manufacturing.jpg) | 82 | 100 | 100 | 2.21s |

Scores are Lighthouse 13.6.0 single-run mobile lab measurements, not field Core Web Vitals or a complete accessibility certification. All seven pages scored 100 for the automated accessibility and SEO categories. Performance ranged from 82 to 93; remaining findings include main-thread work, render-blocking resources and image delivery. Total blocking time ranged from 299 to 667ms; measured layout shift was at most 0.000063. Tall and motorised pages recorded LCP of 2.62s and 2.52s respectively.

Pre-release comparison was captured for two representative pages: Apex performance 89 → 91; motorised 86 → 83. The motorised page's measured LCP rose from 1.09s to 2.52s with its approved film-led opening, so this report does not claim a universal performance improvement. These findings are recorded for consideration, without starting another development programme. [Baseline lab data](baseline-lighthouse.json), [Apex and motorised production data](production-lighthouse.json), [remaining five production results](production-rest-lighthouse.json). Full Lighthouse HTML reports are in this folder.

## Verification completed

- All seven routes returned HTTP 200 and rendered at 1440 × 1000 desktop and 390 × 844 mobile. Additional 320, 768 and 1024px layout checks found no horizontal overflow. Openings, typography, photography and all mobile diagrams were visually inspected.
- All specialist page images decoded successfully. All three unique installation/motorisation films played and advanced their playback time. The public homepage and gallery's visible images also decoded on desktop and mobile.
- All 15 unique related portfolio links returned 200. Internal specialist-page destinations and anchors were checked; original IDs remain unique and linked anchors resolve. The shared portfolio remains at 31 projects.
- Curtain open/close, independent voile opening, one-way draw, wide elevation and single/double layers worked. Keyboard activation also worked with reduced-motion preference enabled. FAQs opened correctly.
- Consultation buttons and the photo, contact and trade-planner routes opened successfully. The primary consultation button had visible keyboard focus and Enter navigated to the planner. No enquiries were submitted; downstream lead delivery was not exercised.
- Titles, descriptions, Open Graph metadata and canonical URLs exactly matched the pre-release baseline on all seven services, the homepage and gallery. Production had no noindex directive. Each service had one H1 and parseable structured data.
- Axe scans detected zero WCAG 2 A/AA and 2.1 AA violations across all 14 desktop/mobile service renders. This was Chromium desktop/mobile viewport testing, not a physical-device Safari audit.
- The existing homepage rendered correctly and its embedded room visualiser launched. Mobile navigation opened and closed. Gallery filtering, search, empty-result reset, 31-project count, project navigation and photograph enlargement/Escape dismissal passed.
- No browser page errors occurred in the main production check. Vercel returned no error/fatal runtime entries for this deployment in the queried window ending 20:24:52 UTC.
- Pre-merge required Vercel and SEO checks passed. Targeted lint, three specialist integration tests and 18 SEO checks passed. The merged main commit also passed [SEO Foundation](https://github.com/Nylon1/Apexcurtains/actions/runs/46062347950).

Machine-readable evidence: [main live checks](production-checks.json), [additional controls and homepage checks](controls-checks.json), [preflight accessibility](preflight-accessibility.json).

## Recovery baseline

The previous production source is retained in the pushed annotated tag [baseline/pre-specialist-release-2026-11-27](https://github.com/Nylon1/Apexcurtains/tree/baseline/pre-specialist-release-2026-11-27), pointing to `474ccf0225e958fb6e948d27df3f9e81432b8262`.

The previous immutable deployment `dpl_FLPbSvvxtGGs17rNAN1M1ufUuFxV` remains READY. It can be selected for a Vercel rollback if required; the source tag also supports rebuilding the baseline. [Saved baseline and original metadata](baseline.json). No database migration or data rollback is involved.

This evidence is stored on a separate documentation branch. Production remains on the approved PR #51 merge commit. No next development programme has begun.
