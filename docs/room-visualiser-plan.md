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

## Current furnished-room scope (owner steering, 18 October 2026)

The owner confirmed Manchester and Oxford as double pinch pleat; Oxford supplies the double-pinch architectural reference. Peterborough supplies the pencil-pleat reference and Milton Keynes the wave-pleat reference. The owner then requested only these three designs and furnished interiors like CurtainsUK. The earlier photographic prototype above records the audit/prototype sequence; the shipped preview now uses three explicitly labelled AI-assisted illustrative rooms. It does not present these interiors as completed projects or claim their cloth was installed in Oslo.

Each heading opens its own room: loft bedroom, gable living room and apex lounge. The source gallery photographs remain unchanged and linked as evidence. The room assets and generation briefs are recorded in `visualiser-interior-assets.md`. Existing scene IDs are retained for shared URLs. No surveyed width, height, fullness or fabric quantity is inferred. The supplier's 140 cm × 1 m image coverage is not a window dimension.

The compact editor has four named sections: Curtains, Walls, Flooring and Furniture, with a separate lights switch. Only the current palette is shown. Walls include vaulted ceilings; flooring changes the visible timber tone; furniture changes the main upholstery/bed linen while decorative elements retain their own finishes. The interior palette adapts CurtainsUK's existing named tones locally; these are illustrative colour ideas, not stocked paint/floor/furniture products. No cross-site dependency is introduced.

Hand-traced material masks and foreground exclusions separate the surfaces. Luminance relighting preserves structure and texture; room-light changes remove an illustrative warm-light contribution while retaining daylight through the glazing. This is not a measured illumination or blackout simulation. Only the active room image loads at full size; masks and light fields are prepared once and cached for up to two scene sizes. Repainting is on demand.

The complete room/Oslo/wall/floor/upholstery/lights scheme is allowlisted, encoded in the URL and passed into the existing enquiry without changing the Arlo or upload flow. The neutral furnished scene remains a fallback and comparison. Sticky preview remains below the header on desktop and mobile; landscape uses a smaller stage. Physical iPhone review and visual sign-off remain production release gates under the owner's brief.
