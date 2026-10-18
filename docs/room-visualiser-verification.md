# Room visualiser review record

18 October 2026. Feature branch: `feature/apex-room-visualiser`; draft PR #15.

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

## Outstanding release gates

- Owner visual review of the new furnished rooms, edge quality and light/dark colour rendering.
- Physical iPhone Safari test: record device/iOS, all three headings, light/dark Oslo, material controls, lighting, swiping, portrait/landscape, sticky image, enlargement and enquiry hand-off. Browser emulation does not satisfy this explicit owner requirement.
- Required PR checks and Vercel development preview must pass on the exact reviewed commit.
- Production release only after those gates and approval, followed by live checks.

CurtainsUK was inspected read-only. Its files, production visualiser and runtime dependencies remain unchanged. Interior colours and lighting are inspiration, not a calibrated paint/fabric match or measured illumination model.
