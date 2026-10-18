# Apex Room Visualiser — audit and reuse plan

Audit: 18 October 2026. Feature branch starts at Apex production commit `e5785b8`.

## Reuse decision (before implementation)

CurtainsUK source inspected read-only at `C:/Users/hamza/curtainsuk-room-visualiser-guarded-production-20261014/lib/room-visualiser/runtime/rooms/`, alongside its restoration and packaging records. The remote `release/production` loading module has Git blob `71c40ceb9bb8e985ff20c042be1214941c2817d7`.

- Retain the room-first workspace, large scene beside named fabric controls, mobile scrolling selectors, native enlarged-view dialog, URL-backed selections and sample guidance.
- Adapt the independent loading/cache module: bounded reusable resources, rejected-request eviction and generation guards preventing stale scene loads from winning. Keep the new module local to Apex, with provenance and tests. No cross-site runtime dependencies.
- Do not port the Three.js rectangular cloth mesh, centimetre-based rectangular track contract, catalogue browser, FIXED140 pattern engine, Shopify iframe/proxy, checkout or CurtainsUK analytics names. These depend on the wrong geometry or another site's operations.
- The existing runtime loads room GLBs lazily, renders on demand, limits resource caches and preloads after readiness. Apply those principles to photographic source maps; no animation loop or 3D dependency is needed for plain Oslo colour exploration.
- CurtainsUK source and production remain unchanged. A future shared package should be extracted only after both adapters are proven, with independent version pins.

## Apex evidence and data

`lib/oslo-fabrics.json` contains 34 sourced Oslo names/references and local manufacturer swatches. It is the catalogue authority. Derive representative display RGB from those images with a reproducible build script; do not invent a palette or claim colourimetric accuracy. The 140 cm × 1 m source coverage remains documented; no new pattern scaling is involved.

Photo review: Milton Keynes has neutral cloth, clear shaped folds and visible floor contact; suitable for the first mask/illumination prototype. The gable-end image shows perspective, unequal apparent slopes and a visible track; suitable for an angled second view. The barn-conversion image shows a broad shaped track with a short flat apex and a rural outlook. The triangular garden image has four separate panels and very dark shadows; defer until edge and dark-to-light recovery are proven. Cambridge's chandelier occludes the cloth heavily; defer rather than colour over it. The homepage image contains reflections and a cropped peak; reference only.

The available photographs are installation views, not five verified room categories. Do not relabel them as a living room, double-height installation or an invented height. Preserve the room, original fabric and dimensions as unknown unless supported by project records. Recoloured previews must be identified as visualisations, with the original photograph available for comparison; source projects are not claimed to have used Oslo.

## Prototype and rendering gate

1. Build one Milton Keynes scene first, using the real photograph and a carefully traced curtain-only mask including matching tiebacks. Keep window frames, glass, floor, walls and foreground outside the mask.
2. Extract photographic luminance, remove source cloth hue, and apply sampled Oslo colour through a monotonic illumination curve with highlight headroom. Preserve fold and seam detail for cream, neutral, green/blue and dark colours. This is pixel relighting, not a flat opacity or CSS blend overlay.
3. Review the actual rendered result and mask edges before adding scenes. If it fails the realism gate, keep the prototype explicitly unfinished rather than multiplying weak scenes.
4. Only after the first gate, prepare up to three suitable existing installation views, with explicit future shape/state fields. Open/closed synthesis is out of scope; the photographed tied-back state is preserved.

## Integration and release

Use `/room-visualiser`, matching Apex's flat specialist routes. Server-render the introduction, original-photo fallback, project evidence and specialist links. Keep scene/colour in the URL, validate IDs, use named keyboard-accessible controls and a native modal for enlarged viewing. Pass a validated look through the existing enquiry with explicit visualiser fields, not through Arlo recommendation fields. Add Colour & Interiors and project links only where evidence matches.

Assets: same-origin WebP source images, mobile and desktop sizes, tiny vector masks, source hashes and derived palette metadata. Load only the active full scene; thumbnails are small. Render only on scene/colour changes. Test slow/stale loads, failed assets, context persistence, keyboard/dialog operation, no overflow at narrow widths and deterministic render invariants. Preserve URL/canonical/schema conventions.

Release requires PR checks, development-preview visual review and a **physical iPhone Safari test** supplied by a person with device access. Browser emulation does not satisfy that gate. No production deployment until these are complete and release is approved.

## Heading expansion requested during implementation

The owner confirmed on 18 October 2026 that both Manchester and Oxford gallery installations are double pinch pleat. Oxford was selected for its wider view of the room. Peterborough is explicitly recorded as pencil pleat in its gallery case study; Milton Keynes is the existing wave pleat gallery installation. The viewer now offers all three headings. Selecting a heading opens its actual installation and preserves Oslo colour; it does not claim to transform the same window between headings. The other two installation views have no heading assertion.

The five scenes preserve photographic proportions. No surveyed width, height, fabric fullness ratio or fabric quantity is inferred. The supplier's 140 cm � 1 m swatch coverage is not a window dimension. Exact metre-based sizing remains dependent on confirmed project measurements.

Oxford source: https://uibuztamqgrvntpwalrt.supabase.co/storage/v1/object/public/Gallery/projects/1776277378275-ydlvu9d8ect.jpeg . Its original and derivatives are recorded by SHA256 in the asset manifest. Manchester and Aberdeen were inspected but are not shipped as extra scenes.

Pale recolouring of the dark Peterborough source amplifies camera grain. A small mask-aware luminance filter suppresses grain before relighting, without mixing window/wall pixels into the cloth. The original photographs remain unchanged. Edge and pale-fabric realism still require customer visual review; numerical rendering tests are not a substitute.

Sticky behaviour: desktop room preview is pinned beneath the header while the controls scroll. On phones the image remains above the colour controls; landscape uses a shorter preview so swatches stay reachable. Source-project information follows the workspace and remains available on mobile.
