# Apex commercial baseline and evidence brief

## Four-week measurement

Use the 28 complete UK calendar days from **28 November to 25 December 2026 inclusive**. Release-day QA on 27 November falls outside the reporting window. Compare weekly counts and retain daily aggregate snapshots so provider retention does not determine the length of the baseline.

| Intake week, GMT | Guided starts | Planner starts | Completed enquiries | Qualified leads |
| --- | --- | --- | --- | --- |
| 28 November – 4 December | Pending | Pending | Pending | Pending sales review |
| 5–11 December | Pending | Pending | Pending | Pending sales review |
| 12–18 December | Pending | Pending | Pending | Pending sales review |
| 19–25 December | Pending | Pending | Pending | Pending sales review |

- **Starts** count the first valid advance from the first step of each form when the visitor selects the optional checkbox. Going back and advancing again in the same form does not add a second start. Selection later in the form does not backfill an earlier start.
- **Consented completions** count a successful submission when the box is still selected. These and starts are counts of actions. Devices and individuals are not identified. A late opt-in, a withdrawn choice or an enquiry spanning two weeks can affect the ratio.
- **All completed enquiries** start with successful production POSTs to the lead endpoint after the email provider has accepted the message. This is an operational total, including people who declined measurement. Reconcile retries and provider delivery with the business Inbox. Subtract labelled QA, duplicates and spam in a separate adjustment. Report the raw accepted count and the reconciled count. A provider acceptance does not establish Inbox delivery.
- **Qualified leads** are distinct real enquiries that the sales team has reviewed as in scope and advanced to technical review, a survey or preparation of a quotation. Count each in its original intake week. Exclude duplicate contacts about the same job, tests and enquiries the team cannot serve. Keep an unresolved enquiry pending. Sales should use the normal private correspondence or sales record to make that judgement and supply only the weekly number, pending number and review date. Never infer qualification from project value, email delivery or form completion.
- **Coverage** is reported alongside outcomes. Divide consented completions by consented starts for the corresponding journey, marking a zero denominator unavailable. Report total completed enquiries and qualified enquiries separately. The data cannot support visitor-level attribution. There is no historical consented-start baseline.

### Collection

The checkbox starts unchecked on both forms, makes no cookie and is forgotten when the form unmounts. The four allowed count requests contain no body, query, referrer or credentials. Vercel handles ordinary connection metadata as host. The report queries only fixed production paths, methods and response codes. No enquiry content, file names, postcodes, drawing references or customer identifiers belong in the report. A qualifying technical review is an offline sales judgement.

Run the following in the linked repository with its existing Vercel read access. Use midnight-to-midnight UTC intervals for daily reports. A request to the homepage acts as a coverage check. A failed query or absent coverage remains missing. Re-run failed days and reconcile weekly totals. The query reads no request bodies, customer records or individual events.

```powershell
./scripts/commercial-baseline.ps1 -Since '2026-11-28T00:00:00Z' -Until '2026-11-29T00:00:00Z'
```

The four-week report is due on 26 December. Record later sales decisions as amendments to the appropriate intake week. Keep qualified figures provisional until reviewed by the business.

## Photography and technical evidence priorities

| Priority and proposed use | Business deliverable | Verification before publication |
| --- | --- | --- |
| 1. Tall rectangular motorised residential project, for the homepage and tall-window guide | A straight-on room elevation photographed open and closed from the same position, a portrait view including floor and head, a stack close-up and a control or track detail. Include a simple drawing with separate opening height, track height and finished curtain drop. | Project lead checks the order and survey against the installed system, fabric and actual operation. Obtain permission for the approved images and location description. A five-metre window alone establishes no curtain-drop or motor claim. |
| 2. Oversized manufacture, for the workroom guide | Photograph the cloth laid out with its scale visible, matched vertical join, heading and finished panel being prepared for transport. Supply the width count, pattern repeat, fullness and lining recorded on the job sheet. | Workroom lead checks the caption and identifies actual measured weight versus calculated weight. Remove customer details from labels and drawings. |
| 3. High-level surveying and installation | Commission an installer-approved diagram of the hanging line and fixing interface, an unobstructed room view and a finished handover detail. Record access constraints and who confirmed structural support. | Installation lead approves the description of the method and evidence of any competence, insurance or equipment claim. Describe the specific installation. Keep access instructions for customers at floor level. |
| 4. Central London apartment or penthouse | Obtain permission for interior views, agree an anonymous location credit and include one detail showing the relationship between glazing, fabric and stack. | Remove address, visible documents and identifying external views unless expressly approved. Confirm the project record and image rights before linking it as London evidence. |
| 5. Track, layering and trade handover | An approved specification extract for a real straight track, annotated section for track and voile, control schedule and one redacted handover sheet showing project responsibilities. | Check exact model, supply, limits, loading, geometry and control interface against the installed record and current manufacturer sheet. Confirm trade scope individually. |

Request original-resolution files, an approved caption and alt-text description, photographer credit, publication permissions and an internal job reference for each set. Retain the identifiable records privately. Publish only details agreed for public use.

## Development order

1. Reconcile qualified and completed enquiries each week and identify whether customers reach the intended enquiry team.
2. Publish the first approved tall rectangular case and link it from the homepage and its relevant guide.
3. Add a workroom join and open-stack example beside the existing technical diagrams.
4. Compare the two measuring articles using Search Console query data when available. Preserve both URLs while their separate purposes are assessed.
