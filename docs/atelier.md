# Apex Atelier

Private staff workspace: `/admin/atelier`. The fictional, local-only walkthrough is `/admin/atelier/demo`.

## Using the atelier

1. Sign in using an existing Apex account listed in `apex_atelier_staff`. Begin a project, enter the customer, workshop and fitter email addresses, and the installation address.
2. Add named rooms and apex or standard windows. Capture measurements in millimetres, upload window/fabric/detail photographs, and enter the customer's fabric, lining, heading, length and accessories. Enter pattern repeats when applicable.
3. Review the client brochure, workroom sheet and installation pack. Draft PDFs can be downloaded before approval. The brochure contains interior colour suggestions, supplier-confirmed care guidance and a personalised 10% voucher for any future order. Voucher redemption is manual with the Apex team.
4. Confirm customer choices and workroom allowances. **Approve & send the collection** freezes a revision and submits three separate emails, each with its intended PDF. Photographs and documents remain in private storage. The customer receives site photos only when the brochure photo option is selected.
5. Complete the fitter checklist and record installation/handover. Editing an approved project creates a new draft; earlier approved revisions remain available.

The onsite workflow requires an internet connection. Unsaved changes are shown and browser navigation warns before leaving them.

### Personalised brochures

The screen preview and PDF use the same customer and window specification. Each includes the customer's name, installation address and entered contact details, plus every room/window's fabric reference and colour, heading/fullness, opening, length, track and track finish, lining, interlining, pattern details, tiebacks and hooks. Workshop and fitter email addresses stay out of the client brochure. Track colour is required before a new release and also appears in the workroom and fitter documents.

New windows suggest an interior palette from the entered fabric colour, with room-specific advice referencing the recorded hardware and tieback finishes. Eight curated colour families cover neutrals, greens, earth tones, blues, rose, greys, plum and ochre. Ambiguous or supplier-only colour names receive an explicitly labelled neutral starting point for consultant review. Select a palette manually to override the suggestion, or enable automatic suggestions again. Older saved collections retain their selected palettes. Swatches are complementary interior suggestions, never claimed as exact fabric or paint matches.

## Material method

Every face-fabric width uses the longest finished drop plus top and bottom allowances, treating an apex as a full rectangle. No triangular offcuts are subtracted. Width allocation is conservative per panel, including side hems, seams, fullness, returns and overlap. Straight repeats round each cut up; half-drop and horizontal matches require a workroom-approved cutting plan and total that covers the rectangular baseline. Lining uses its own roll width and finished drop. Extras are added separately. Offcuts are available for suitable tiebacks after grain, pattern and size checks.

## Operations

- Uses the existing Supabase auth and Apex database, with explicit staff membership and server-only service-role writes. No public signup grants staff access. Staff membership should be managed by the site administrator.
- Migration: `supabase/migrations/20261024130445_apex_atelier_surveys.sql`.
- Existing environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`.
- Sender: `Apex Curtains <hello@apexcurtains.com>`.
- Delivery `sent` means accepted by Resend, not confirmed inbox delivery. Failed/uncertain sends remain visible. Retries reuse the frozen attachment and provider idempotency key; an uncertain attempt older than 23 hours requires checking the provider log before any new delivery is arranged.
- Approved revisions preserve data and image references. Document endpoints and image endpoints require staff authentication.
- Public sample PDFs contain fictional information only. Changes made in the illustrative walkthrough affect its screen preview; the downloadable sample PDFs show the original illustrative collection.

## Verification

`npm run test:atelier` checks the core calculations and release validation. `npm run build` and targeted ESLint check the application.

`scripts/atelier-integration.mts` is opt-in with `ATELIER_INTEGRATION=1` and an optional `ATELIER_TEST_URL`. It creates a temporary fictitious user/job, verifies auth, persistence, photo storage, concurrency, approval snapshots, PDF generation and handover, then removes its fixtures. It never sends an email. Run only against the intended Apex database/environment.

`scripts/atelier-pdf-preview.mts` can be bundled to ESM with esbuild (external packages) and run with Node to generate review PDFs under `.next/atelier-qa`. Visually inspect rendered pages before updating the public samples.
