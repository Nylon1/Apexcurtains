# Quotation journey implementation

28 November 2026. Review branch only; production publication requires approval.

The guided quotation now starts with an optional photograph and groups its existing questions into five stages: photo, window, preferences, contact and review. It has persistent labels, legible colours, explicit undecided preferences, section edits, inline errors and an accurate acknowledgement. Arlo and room-visualiser context remain in the payload and in compact disclosures. No draft personal data or photographs are stored in browser storage.

The architectural planner retains three stages, conditional trade fields and optional phone/measurements. It adds a final-stage project summary with direct edits, early file feedback/removal and navigation to fields rejected by the server, including hidden earlier stages. Stage changes focus the heading and bring progress below the fixed header.

## Existing contracts

- URLs, metadata, canonical URLs, delivery endpoint, recipients, reply-to behaviour and multipart field names remain intact.
- Guided telephone and contact-time requirements remain. No additional required questions.
- Planner keeps three files / 3 MB combined, image/PDF content validation and its existing server protections.
- Guided keeps the existing 4.5 MiB total request ceiling. Client checks include multipart overhead; no new 3 MB guided file cap. Picker/type feedback matches the already advertised JPG/PNG/WebP formats. The server request ceiling remains authoritative.
- Repeated unchanged retries use a stable provider idempotency key; input/file/context edits invalidate it. The guided key has its own namespace. No automatic retries or customer receipt emails were added.
- Counting stays default-off, with the same event names and no personal fields. Start still fires on the first successful progression (now leaving the photo stage for guided enquiries); this changed boundary must be considered when comparing historical counts. Complete only fires after a confirmed successful response. Existing entry, page-view and visualiser events are retained.

## Verification

- Production build / TypeScript, targeted lint, eight architectural/delivery tests and 18 SEO checks pass.
- Eleven visualiser regression tests pass; rendered specialist/homepage/gallery checks are also run against the local production build.
- `scripts/quotation-browser-check.cjs` exercises both complete journeys at desktop/mobile sizes: consent off/on, required fields, prefill/context, optional phone in planner, file rejection and retained valid files, edits, provider error, malformed response, interrupted request, hidden-stage server validation, unchanged/changed retry keys, duplicate-submit protection and confirmation.
- Browser checks intercept every non-read request. No real enquiry or email is sent. Accessibility checks cover the main form in opening/contact/review/error/confirmation states. They are not whole-site certification.
- Local render evidence is stored outside production assets. Preview verification and GitHub CI are recorded with the pull request.

Run the browser suite against a local built server or reviewed preview using `BASE_URL` and optional `REVIEW_OUT`; Playwright, Chrome and axe-core must be available (the runner supports `NODE_PATH`). Required CI delivery/validation coverage runs through `npm run test:architecture` without browser dependencies.

Real inbox delivery, real-device iOS/Android keyboards and full assistive-technology testing are not claimed. No reviews, payment, aftercare, workspace or other conversion programme is changed.
