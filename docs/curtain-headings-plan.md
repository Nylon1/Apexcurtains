# Curtain headings authority-page redesign

18 October 2026. Existing route `/curtain-headings` retained. The current shared hub supplies four brief heading descriptions, four FAQs and a generic Cambridge photograph. Its content is useful but does not explain construction, specification, geometry or the difference between stacking width and fold depth.

## Information architecture and component plan

1. A compact editorial hero with the real Oxford installation, retained heading keywords and direct comparison/consultation actions.
2. Three illustrated heading links and a comparison table: pencil pleat, double pinch pleat and wave. Preserve single-pleat coverage as a separate, qualified section.
3. Substantial heading profiles pairing original diagrams with Peterborough, Oxford and Milton Keynes project photographs. Link each to its case study and corresponding illustrative visualiser scene. The owner confirmed Oxford and Manchester as double pinch pleat in this conversation; no unverified fabric, dimensions or track models are attached to the photographs.
4. A shaped-window section and numbered apex planning diagram covering upper line, retained cloth, side drops and tiebacks. Distinguish shaping a curtain from promising that it traverses a slope.
5. Fullness, track/hooks/heading compatibility and a small interactive plan-view diagram distinguishing fold depth from stack-back. Include lining, load, 4–6m proportions and dressing guidance.
6. Practical selection notes, FAQ, technical references and contextual links into tracks, linings, fabrics, installation, colour, tiebacks, measuring, projects and consultation.

Use server-rendered editorial content, scoped CSS, responsive/lazy real photographs and original explanatory SVGs. The only client island is the lightweight clearance comparison; essential guidance exists in ordinary HTML. Retain `#curtain-details`, the route/canonical and meaningful heading keywords. Match visible FAQ to schema and connect WebPage/BreadcrumbList to existing site IDs. No gallery source records, enquiry handlers, visualiser engine or global styles change.

## Evidence

- Existing Apex project records and photographs: Peterborough pencil pleat; Milton Keynes wave; Oxford pinch pleat, confirmed as double pinch by the owner. These are real installations, separate from the AI-assisted visualiser scenes.
- Forest wave workroom brochure: https://www.forestgroup.com/user_files/download_files/download_2047_FES_brochure_ENG_111125_WEB.pdf (listed technical principles: linked carriers, matched tape/hooks, fabric suitability and independent component/rail load limits). Used for generic system principles, not to advertise unconfirmed Forest accessories or assert slope operation.
- Forest UK wave overview: https://www.forestgroup.co.uk/uk/products/fes-forest-easyfold-system
- Jones Interiors heading tapes: https://webstore.jones-interiors.com/workroom/heading-tapes.html and https://jones-interiors.com/wp-content/uploads/2025/08/Esselle-Retail_Heritage-Tails-Collection_2024-No-Prices.pdf (gathered pencil tape and construction/fullness context; not an assertion that Apex supplies the Jones range).

No universal fullness ratio, bracket spacing, load rating, stack-back percentage or blackout guarantee. Diagrams are explanatory, not surveyed drawings or make-up instructions. Real project images must not be retouched into new evidence.

## Verification

Production build, targeted lint, SEO/specialist regressions and rendered route checks for canonical, one H1, FAQ/schema agreement, assets and local link targets. Inspect desktop, narrow phone and landscape layouts, comparison controls, keyboard focus and visualiser/enquiry handoff. Use a feature branch, PR checks and deployment preview; do not push directly to main. Physical-device testing cannot be claimed from emulation.

## Scope extension: every Details & fitting link

The owner subsequently requested the same level of useful, visual guidance across the whole Details & fitting menu. The seven entries resolve to six pages: tracks, linings, installation, survey, manufacture and accessories; Fixings & structure is the existing `curtain-tracks#structure-and-brackets` section. Preserve that destination rather than creating a duplicate SEO page. Also bring the linked services overview into the same experience.

- Retain the substantial existing track, lining and installation guidance. Add appropriate interactive diagrams, real project evidence and section-level detail instead of padding the copy.
- Replace the older icon-heavy survey/manufacture pages and short accessories hub with structured educational guides, preserving useful topics and existing URLs/metadata intent.
- Reuse SpecialistGuidePage with optional enhanced presentation, section photography, disclosures and a mobile contents menu. Apply the new presentation only to the requested pages; other specialist pages keep their layout.
- Track finish comparison and wall/ceiling load-path diagram; lining coverage/light-path controls; survey preparation checklist; curtain construction layer explorer; installation preparation checklist; tieback coverage comparison and accessory compatibility guidance.
- All important content remains server-rendered. Interactive illustrations are explicitly schematic, with no load calculator, fabricated installation dimensions, simulated total darkness or invented product offering. Keep the existing enquiry handlers and visualiser untouched.
- Use a common Details & fitting link strip and contextual links to connect these guides. Original photographs remain labelled as completed installations, not evidence of hidden fixings, particular tracks or access equipment.

Current Forest KS/CS brochures and Pop Up Products/HSE references remain the technical source of truth. No generic location pages or new SEO route volume.

## Review evidence

- Real photos reused without editing; Oxford double pinch, Peterborough pencil and Milton Keynes wave link to existing project URLs and the corresponding visualiser scenes. No dimensions, access equipment or concealed track models inferred from photographs.
- Rechecked current Forest KS September 2026 and CS July 2026 brochures through the official UK downloads page. Existing standard profile dimensions, loads, bend radii and mounting references retained. No additional Forest product variants advertised.
- Local production build generated all 153 routes successfully. Targeted ESLint passed. All 18 SEO foundation checks, 9 specialist checks (including rendered links, fragments, asset responses and FAQ/schema agreement), and 10 visualiser regression checks passed.
- Browser checks: 1366px desktop, 390px phone, 320px narrow phone and 844×390 landscape. Verified heading comparison, track finish, ceiling/wall fixing, lining length/side coverage, layer selection, survey/installation checklist feedback, tieback states and mobile contents. No document horizontal overflow at tested phone widths. Technical diagrams have a scrollable phone presentation and a full-size link.
- No lead submission or email sent. Existing visualiser engine, enquiry handlers, navigation destinations and gallery data remain unchanged. Physical iPhone testing has not been performed; browser viewport checks do not constitute that test.
- Release status: feature branch and PR preview for review; not production deployment.
