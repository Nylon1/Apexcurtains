# Gallery release — 27 November 2026

The owner authorised live publication of the improved gallery, with each project covering technical detail and interior relationships. The Newcastle uploads are combined with Jesmond; public names use Hemel Hempstead, Cotswold and Rickmansworth.

## Changes

- 17 new project stories and 14 refreshed archive stories; existing archive URLs retained.
- 45 optimised WebP assets, 51 photograph placements and four existing installation films.
- Search, installation filters, full photograph enlargement and responsive project layouts.
- Project metadata, structured data, gallery sitemap and airport homepage link updated.
- Versioned editorial overlays leave the underlying Supabase records unchanged. Future story updates belong in `lib/portfolio-content.json`.
- Copy describes visible details and confirmed operation; unverified specifications are omitted.

## Validation

- TypeScript, production build and targeted ESLint passed.
- Three portfolio checks cover media dimensions/files, merge identity and owner confirmations; four sitemap checks passed.
- All 31 project routes return 200 with expected canonical URLs and both editorial strands.
- Headless Chrome checked search, filters, reset, native photograph dialogs, keyboard dismissal/focus return and video playback.
- All 31 project pages and the collection checked at 390px without horizontal overflow.
- Desktop and mobile screenshots reviewed; inherited dark background override corrected and cream background verified.

Publication uses the existing GitHub-to-Vercel main branch workflow. No database migration or environment changes are required.
