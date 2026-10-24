# Apex Atelier

Private staff workspace: `/admin/atelier`. The fictional, local-only walkthrough is `/admin/atelier/demo`.

## Using the atelier

1. Sign in using an existing Apex account listed in `apex_atelier_staff`. Begin a project, enter the customer, workshop and fitter email addresses, and the installation address.
2. Add named rooms and apex or standard windows. Capture measurements in millimetres, upload window/fabric/detail photographs, and enter the customer's fabric, lining, heading, length and accessories. Enter pattern repeats when applicable.
3. Review the client brochure, workroom sheet and installation pack. Draft PDFs can be downloaded before approval. The brochure contains interior colour suggestions, supplier-confirmed care guidance and a personalised 10% voucher for any future order. Voucher redemption is manual with the Apex team.
4. Confirm customer choices and workroom allowances. **Approve & send the collection** freezes a revision and submits three separate emails, each with its intended PDF. Photographs and documents remain in private storage. The customer receives site photos only when the brochure photo option is selected.
5. Complete the fitter checklist and record installation/handover. Editing an approved project creates a new draft; earlier approved revisions remain available.

The onsite workflow requires an internet connection. Unsaved changes are shown and browser navigation warns before leaving them.

Each window has six sections: **Measurements**, **Fabric & pattern**, **Lining & tiebacks**, **Track & fitting**, **Colour & care**, and **Window photos**. Required details are marked with an asterisk and checked before advancing to later sections/windows. Missing-item links take you to the section to complete. Back navigation, the review checklist and saving an unfinished draft remain available. Optional notes and an unconfirmed fitting appointment may remain blank. The room/window selector remembers the last section visited for each window during the session. In the public demo only, window-photo requirements do not block navigation because uploads are unavailable; approval remains disabled.

### Window shapes and slants

Choose **Apex or other shape**, then **Two-sided apex**, **Flat-top apex**, **Triangular window**, **Single apex (high left or high right)**, or **Other shape**. Standard windows retain width and finished drop fields. Defined apex shapes require full width and left, middle and right heights from the same level bottom baseline, viewed from inside the room. A triangular window requires an explicit zero for both side heights. The middle is the peak/flat-top height; on a single slope it is measured halfway across the width.

Slants calculate automatically using the horizontal run and height difference, rounded to the nearest millimetre. Two-sided/triangular shapes can have a centred or off-centre peak; an off-centre peak requires its horizontal position from the left. Flat tops also require their horizontal width, and their start position when off-centre. A single slant uses the full width and the difference between the side heights. Its measured middle must lie between the sides; a mismatch from the straight-line midpoint is flagged for site review. Invalid/incomplete geometry does not produce a slant and blocks progression.

**Other shape** has a required free-text measurements box for custom outlines, curves, sides and units, plus overall width and longest finished drop for the full rectangular fabric allowance. Its typed measurements appear in the brochure, workroom sheet and fitter sheet. No shape or slant is invented. Each room/window keeps its own shape and measurements.

Existing saved surveys retain their recorded manual slants until the consultant reviews the shape and applies automatic calculation (or edits geometry). Historical approved revisions retain their original measurements. All shape changes require measurement reconfirmation before release.

### Personalised brochures

The customer's name and installation address have a dedicated page with a personal dedication, separate from the room and window specifications.

Use **Fabric & pattern → Your fabric photograph** to upload the customer's actual fabric image. The most recent fabric photo for that window appears beside its name, reference and colour in the brochure. Older images remain attached to the project and approved revisions keep their original selection. JPG, PNG and WebP are supported, within the existing six-photo limit per window.

**Track & fitting → Choose Forest KS** selects the Forest Group KS Klick System and includes its manufacturer photograph in the client brochure. Record the selected finish separately; the photograph is labelled as the white product illustration. Selecting a different track removes the KS illustration. Existing custom track records retain their original specification. Brochures with both a fabric photograph and KS illustration give the track its own styled page.

New selections offer **Standard** or **Blackout** lining, with a separate lining colour. Tiebacks are **Matching** (following the chosen fabric colour) or **Other** (enter the design and colour); quantity zero means none required. Tieback hook finishes are **Bronze**, **Silver chrome** or **Black**. Historical specifications remain readable, with current choices required before a new release.

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
