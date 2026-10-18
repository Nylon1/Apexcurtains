# Room visualiser review record

18 October 2026. Feature branch: `feature/apex-room-visualiser`.

## Implemented scope

- Five real Apex photographic views; no generated room photography or invented measurements.
- All 34 governed Oslo colour records, each with a hash of its source swatch.
- Pencil pleat (Peterborough), double pinch pleat (Oxford, owner-confirmed) and wave pleat (Milton Keynes) discovery controls. A heading choice opens the real example; it does not synthetically change the heading of another room.
- Active-only responsive scene loading, a two-entry promise cache, race protection, original-photo fallback and native enlarged view.
- Sticky room preview on desktop and mobile, shorter preview in phone landscape, named controls and visible selection.
- Shareable room/colour URL and allowlisted room, heading and colour passed into the existing enquiry. No enquiry email was sent during verification.
- Navigation, colour experience and matching gallery links; canonical route and sitemap entry.

## Automated evidence

Targeted lint and TypeScript passed. The existing enquiry component retains its four pre-existing image warnings. All 18 SEO foundation checks and seven visualiser tests passed, including all 170 scene/colour combinations, source/derivative hashes, unmasked pixels unchanged, preserved tonal variation, cache failure/retry/eviction and strict enquiry context validation. Sharp is pinned as a development dependency for reproducible asset preparation and checks; no rendering dependency is shipped to browsers.

## Browser evidence

Local browser inspection included desktop 1440px and mobile 390px / 320px, plus 740×390 landscape. Checked colour switching, named selected states, heading/scene switching, enlarged view, Escape/focus return, original photograph, query-backed state, enquiry context and horizontal overflow. Sticky room stays below the header while colour controls remain reachable. Sample mobile colour repaint measured 45–46 ms in this environment; this is not a physical-device performance result.

Source photos are not confirmed Oslo installations. The interface labels recolouring as inspiration and keeps the photographed fabric structure. Extreme recolouring, particularly pale colours from the dark Peterborough source, needs visual sign-off; tonal-range tests cannot establish photographic realism or calibrated colour accuracy.

## Outstanding release gates

- Review the development preview on a physical iPhone in Safari: all three headings; Ivory, Linen, Fern/Sky and Black; swatch scrolling; portrait/landscape; sticky preview; enlarged view; enquiry context. Record device and iOS version.
- Owner visual approval of light and dark colours and curtain edges in all scenes.
- PR required checks and preview build must pass on the exact reviewed commit.
- Production deployment only after these gates and release approval, followed by live checks.

CurtainsUK was inspected read-only. No CurtainsUK files, deployment or operational dependencies were changed.
