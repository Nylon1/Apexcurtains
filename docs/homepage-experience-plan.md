# Homepage experience plan

Prepared before implementation, 18 October 2026. Builds on draft PR #13, preserving existing page URLs and enquiry handling.

## Audit

The current homepage mounts fourteen sections plus a 3.2-second entrance overlay. It contains valuable real installation imagery, an interactive hero, useful specialist explanations, a fabric quiz and tracked enquiry links. However, design direction, specialist benefits and the service process repeat across several sections. Colour is a lower-page reading card; the window navigator is actually an interior-style selector. The reviews introduction discusses website implementation instead of the customer experience. The solution-finder's specialist button has no action.

Reuse the real `/window-types/` and public project photographs, verified project specifications, guide routes and SVGs, PT Oslo records, existing quiz and conversion event. Consolidate repeated copy into a guided sequence. Owner update: retain the entrance screen and include the curtain sale. Use a native dismissible dialog that closes automatically, appears once per session and stays closed without JavaScript. Keep the same offer visible in the homepage strip. Do not add autoplay video.

## Proposed information architecture and components

1. **Offer and hero** — `SaleBanner` and `Hero`: 25% off custom-made curtains (confirmed by owner; no invented dates or track/install discount); full-width real Apex photograph; a concise H1, UK survey/design/manufacture/install summary; two hero actions, Explore your window and Book a consultation. Offer strip includes the phone number.
2. **Window discovery** — `HomeWindowDiscovery`: seven touch-friendly illustrated choices; reveal the approach, limitations and relevant real example/authority links. All descriptions and links exist in initial HTML; no-JavaScript visitors can read every choice.
3. **Design your look** — `HomeColourStudio` using a shared `ColourFamilyWheel`: eleven colour families, a simple mood/style control, genuine Oslo swatches, complementary tones and finishing guidance. Only associate project photographs with visually relevant families; distinguish fabric imagery from installed examples.
4. **Real installations** — `HomeProjectStories`: large editorial panels for documented Milton Keynes and Peterborough projects, linking directly to their existing case studies. No unverified height or MiTOWER claims and no fabricated before/after images.
5. **Specialist details** — `HomeExpertise`: six substantial links to tracks, linings, high-level fitting, headings, tiebacks and measuring, mixing existing photographs and diagrams. `HomeDetailComparisons` adds lining/edge-gap controls, white/black track-finish illustration and a curtain-position schematic. Do not pretend these are actual before/after photographs or promise full glazing clearance.
6. **The service** — `HomeServiceJourney`: six stages from consultation through dressing/handover. Native horizontal scrolling with touch targets, crawlable stage explanations and relevant service links.
7. **Why specialist?** — an annotated apex diagram linking to the self-measure/DIY guide and covering geometry, substrate, weight, stacking, light gaps, access and floor clearance.
8. **Trust and further pathways** — revise `ReviewsPreview` into customer-facing copy; a distinct professional/specifier section; concise links to fabric selection, FAQs, about, service areas and advice. Retain `LazyFabricQuiz` as an optional native disclosure.
9. **Enquiry** — `FinalCta`: Tell us about your window; describe the existing guided enquiry and link to it, plus phone. `HomeAdviceDock` shows one restrained mobile advice action after the hero and hides near the final enquiry section. Do not build a duplicate submission endpoint.

## Evidence and interaction constraints

Only use dimensions, track models or equipment when confirmed by the project record. Existing single photographs cannot support a genuine open/closed comparison: use an explicitly schematic educational comparison. The offer applies to custom-made curtains; no date, countdown, saving amount, product price or unspecified additional scope is added.

Keep one H1, preserve useful specialist text and main conversion event, and expose priority links as ordinary anchors. Use server components for editorial content, small client islands for controls, responsive images and lazy loading below the hero. No additional animation library is needed. Honour reduced motion; avoid hover-only controls, heavy video and automatic carousels.

## Verification before review

Production build; changed-source lint; existing SEO/specialist regressions; rendered homepage links and single-H1 checks; browser tests for shape, colour, lining/finish/position and service journey controls; responsive layouts at mobile and desktop widths; enquiry entry without submitting customer data. Preserve the current protected PR workflow and preview-only deployment. Responsive browser checks do not establish physical-iPhone testing or measured field Core Web Vitals; those remain explicit release checks.

## Header organisation (owner follow-up)

Use six customer-facing groups: Window types; Colour & style; Details & fitting; Our work; Advice; Professionals. Desktop menus are click/keyboard-operated native disclosures with an overview, contextual links and a small real image or technical illustration. Mobile uses a dismissible native dialog with grouped disclosures, a visible project action and phone link. Keep professional workspace access in its own group and move Arlo into Advice. All destination URLs and operational enquiry handlers remain intact.

## Verification completed

- Production build and TypeScript passed, generating 152 static pages. Changed TS/TSX files passed ESLint. All 18 SEO foundation checks passed.
- All seven specialist checks passed with the local site running, including rendered authority pages, source/image integrity and every homepage/header destination and fragment.
- Browser checks at desktop and 390 × 844 mobile dimensions covered shape discovery, colour and mood selection, lining/edge-gap controls, white/black finishes, curtain positions, horizontal service journey, contextual advice visibility and enquiry entry. No customer data was submitted.
- Header checks covered keyboard opening, Escape, one category open at a time, mobile grouped disclosures, navigation to Reviews, dismissal and restoring page scrolling. Confirmed no horizontal page overflow at 390 px.
- Production-browser check confirmed the intro photograph/logo and curtain-only sale copy, immediate dismissal, no repeated intro after reload in the same session and no console errors. Desktop menus use native details; the mobile dialog has a native HTML navigation fallback without JavaScript.
- No dependency, API, form-processing, authentication, CMS or deployment-configuration changes. Field Core Web Vitals and a physical iPhone/Safari run have not been measured here; complete these before release. The enquiry handoff uses the established form; approximate dimensions are discussed during consultation rather than introducing a second submission flow.

# Visualiser launch and opening-screen refinement

Approved scope: publish the furnished room visualiser, give it a dedicated main-navigation position, and add an editorial homepage introduction. Preserve the existing homepage copy, URLs, sale colours and enquiry journeys.

Component plan: keep the yellow Christmas-sale heading above a compact red offer row; size the desktop hero to the remaining viewport with intrinsic content height as a minimum. Place a new server-rendered `HomeRoomVisualiser` section between window discovery and colour inspiration. Use the existing furnished gable scene, clearly labelled as an illustration, with three heading links and a primary visualiser CTA. Load its image lazily without mounting the canvas renderer on the homepage. Add a direct desktop navigation link and a prominent mobile-menu preview. Retain the visualiser's sticky preview and existing editing controls.

Release through PR #15 after local checks, responsive browser review and successful preview checks. The owner has approved the visualiser and explicitly requested production deployment; physical iPhone validation remains unperformed and must not be represented as completed.
