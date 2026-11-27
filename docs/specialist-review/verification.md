# Verification record

27 November 2026. Local production build on port 3014; no production deployment.

- `npm run build`: passed, including TypeScript and static generation.
- Targeted ESLint across the seven route wrappers, new component, data module and integration test: passed.
- `npx tsx --test scripts/specialist-service-check.test.ts`: 3 passed.
- `npm run seo:check`: 18 passed.
- `npm run test:specialist`: 6 passed; 3 existing environment-dependent browser checks skipped. Separate browser checks below ran against the new production build.
- All seven specialist routes: HTTP 200 at 1440 × 1000 and 390 × 844, decoded main images, one H1, original canonical URL, valid JSON-LD, unique IDs and valid jump links.
- Additional responsive checks: no horizontal overflow at 320, 768 and 1024px for any of the seven pages.
- Browser interactions: actual film playback; curtain-close and one-way draw controls; voile-open control; FAQ expansion; existing trade-planner destination. No enquiry submitted.
- Review pack: seven page sections, every local image/document reference resolves, no mobile overflow.
- Visual inspection: desktop and mobile opening contact sheets, diagrams, full opening examples and review-pack opening.

Screenshots are the implemented pages rendered locally using Chrome through Playwright. The baseline images are the current public homepage, gallery and seven specialist pages. No screenshot is an AI-generated installation or design mock-up.

The review pack is static and remains usable without the local server. Its interactive page links require `npm run start -- --port 3014` after `npm run build`.
