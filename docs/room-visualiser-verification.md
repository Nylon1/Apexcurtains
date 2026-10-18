# Room visualiser review record

18 October 2026. Feature branch: `feature/apex-room-visualiser`; PR #15.

## Current implemented scope

- Three furnished illustrative rooms: pencil-pleat loft bedroom, double-pinch gable living room and wave-pleat apex lounge. AI-assisted assets are explicitly labelled; original gallery references remain unchanged and linked. No surveyed measurements are invented.
- All 34 governed Oslo colours with traceable source-swatch hashes and stable curtain geometry/folds.
- Compact four-section editor for curtains, walls/ceiling, timber floor and main upholstery. A separate on/off switch previews warm room lighting while preserving daylight.
- Material masks, foreground exclusions, photographic luminance relighting and local light fields; active-only responsive images and a bounded two-entry cache. No rendering library or cross-site runtime dependency.
- Sticky room on desktop and phones, shorter stage in landscape, named touch/keyboard controls, selected-state checkmarks and native enlarged view.
- Allowlisted full scheme in share URLs and the existing enquiry: room, heading, Oslo reference, walls, floor, upholstery and lights. No test email was sent.
- Navigation, Colour & Interiors and matching gallery links, canonical route and sitemap entry.

## Automated evidence

Production build passed (153 generated pages). TypeScript and targeted ESLint passed; the existing enquiry component retains its four pre-existing image warnings. All 18 SEO foundation checks passed. Ten visualiser checks passed, including all 102 scene/Oslo combinations, source and derivative hashes, mask/alpha preservation, fold variation, cache failure/retry/eviction, full-scheme URL/enquiry validation, independent material compositing, daylight preservation and material/light bounds.

React review: rendering remains dynamically imported; no per-frame loop, new third-party runtime or shared server mutable state. Native buttons/switch expose names and states; the palette is isolated in its own component. The active scene image is reused for colour changes. Route query parameters are allowlisted before reaching enquiry text or URLs.

## Browser evidence

Checked the furnished-room editor locally at desktop 1440px, phone widths 390px and 320px, and 740 × 390 landscape. The room pins at 80px below the mobile header while the palette scrolls, with no horizontal page overflow. Landscape retains reachable swatches below its shorter stage. Changing walls/floor/upholstery preserves the chosen Oslo colour. Light/dark Oslo, wall tone and furniture changes were inspected across the three rooms; vegetation, furniture and rug boundaries were refined after visual review.

Checked lights on/off, a clean URL load restoring the full scheme, enquiry context and return link, heading changes, native enlarged view and Escape/focus return. Sample colour/material repaints measured 24–44ms in this browser; this is not a physical-iPhone performance measurement. No enquiry was submitted.

## Owner-approved launch refinement

The owner reviewed the furnished visualiser and explicitly requested live deployment, a dedicated header entry and a visual homepage feature. Follow-up screenshots requested removal of the preview's empty side bands and a visible Home link.

- Added Home and Room visualiser as desktop navigation links, a prominent visualiser entry in the mobile menu, and an editorial homepage room preview with links into all three headings. The homepage uses a lazy image, without loading the canvas renderer.
- Reduced the sale banner and fitted the hero to the laptop viewport without removing the existing headline, supporting copy or consultation actions. Checked 1366 × 768 and 1280 × 720; the latter's hero finishes at approximately 714px, with both buttons visible.
- The preview now uses the room's 4:3 proportions and a viewport-height-aware grid column. Full room geometry is preserved without side bands. The enlarged view is centred and follows the same proportions. Sticky behaviour remains in place.
- Checked 1440px and 1280px desktop navigation, 390px and 320px phone widths, and 740 × 390 landscape. Landscape now uses side-by-side preview and controls. No horizontal page overflow; the full mobile image stays within the visible page width, including browsers with a scrollbar.
- Checked Home navigation, homepage heading deep links, room colour changes, material selection, sticky preview and enlarged view. Production build, targeted ESLint, 18 SEO checks, 10 visualiser checks and 7 specialist checks passed locally.

Release follows the owner's latest explicit deployment instruction, after exact-commit PR/preview checks. **Physical iPhone Safari testing has not been performed**; responsive browser checks are not a substitute and this remains a disclosed verification limitation. Production deployment and live checks must be confirmed separately.

CurtainsUK was inspected read-only. Its files, production visualiser and runtime dependencies remain unchanged. Interior colours and lighting are inspiration, not a calibrated paint/fabric match or measured illumination model.
