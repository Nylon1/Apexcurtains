# Apex Atelier

Private staff workspace: `/admin/atelier`. The fictional, local-only walkthrough is `/admin/atelier/demo`.

## Using the atelier

1. Sign in using an existing Apex account listed in `apex_atelier_staff`. Begin a project, enter the customer, workshop and fitter email addresses, and the installation address.
2. Add named rooms and apex or standard windows. Capture measurements in millimetres, upload window/fabric/detail photographs, and enter the customer's fabric, lining, heading, length and accessories. Enter pattern repeats when applicable.
3. Review the client brochure, workroom sheet and installation pack. Draft PDFs can be downloaded before approval. The brochure contains interior colour suggestions, the standard Apex curtain-care guide and a personalised 10% voucher for any future order. Voucher redemption is manual with the Apex team.
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

The client brochure presents each room across three styled sections: a large photograph with a narrative about the chosen cloth, heading, light and silhouette; the complete individual specification and track photograph; and a colour moodboard with the actual uploaded fabric image, named complementary swatches and practical room-planning advice. The shared content in `brochure.ts` keeps the preview and PDF aligned. A separate installation preparation and handover guide precedes the three care chapters and personal voucher. Missing fabric photographs show a clearly labelled text card rather than an invented swatch.

The workroom pack uses a clean white layout with large face-fabric and lining order cards, separate cut lengths and allowances, a measurement section and simple making/finishing rows. Reference photos and longer notes follow separately, keeping the production numbers easy to find.

Use **Fabric & pattern → Your fabric photograph** to upload the customer's actual fabric image. The most recent fabric photo for that window appears beside its name, reference and colour in the brochure. Older images remain attached to the project and approved revisions keep their original selection. JPG, PNG and WebP are supported, within the existing six-photo limit per window.

**Track & fitting** offers exactly two systems: **Forest CS** (Contract System) and **Forest KS** (Klick System), each with **Black** or **White** as the required finish. The selected system's manufacturer photograph appears in the client brochure, labelled as a white product illustration, alongside the customer's actual finish. The system name and colour also appear in the workroom and fitter documents. Saved legacy custom systems and colours remain readable; a new release requires one of the current choices. Brochures with both a fabric photograph and track illustration give the track its own styled page.

Photo uploads save privately against the selected job and window. The upload controls wait while window details save, and an unsuccessful upload retains its caption for retry. Existing saved windows can receive photos even when an unrelated survey field has a save error; newly added windows must be saved first. Errors and upload confirmations also appear beside the section footer. Integration checks reopen the job, compare every image's window/category/caption, decode each stored image, verify the latest fabric selection and check the approved photo snapshot.

New selections offer **Standard** or **Blackout** lining, with a separate lining colour. Tiebacks are **Matching** (following the chosen fabric colour) or **Other** (enter the design and colour); quantity zero means none required. Tieback hook finishes are **Bronze**, **Silver chrome** or **Black**. Historical specifications remain readable, with current choices required before a new release.

The screen preview and PDF use the same customer and window specification. Each includes the customer's name, installation address and entered contact details, plus every room/window's fabric reference and colour, heading/fullness, opening, length, track and track finish, lining, interlining, pattern details, tiebacks and hooks. Workshop and fitter email addresses stay out of the client brochure. Track colour is required before a new release and also appears in the workroom and fitter documents.

New windows suggest an interior palette from the entered fabric colour, with room-specific advice referencing the recorded hardware and tieback finishes. Eight curated colour families cover neutrals, greens, earth tones, blues, rose, greys, plum and ochre. Ambiguous or supplier-only colour names receive an explicitly labelled neutral starting point for consultant review. Select a palette manually to override the suggestion, or enable automatic suggestions again. Older saved collections retain their selected palettes. Swatches are complementary interior suggestions, never claimed as exact fabric or paint matches.

## Standard curtain care

Every collection automatically includes the same Apex **Dry clean only** guide, so the Colour & care step requires no care source or typed instructions to advance or approve. Optional additional care notes and a supplier reference can still be entered; existing saved notes remain intact and appear in their own brochure section. Blank notes do not generate awaiting-confirmation placeholders or repeated care text for every window.

The customer brochure has three styled care pages: professional cleaning and routine maintenance; dressing the folds; and common questions about settling, hems, texture, sunlight, condensation, track movement and blackout edge light. The workroom gets the standard cleaning summary and the fitter gets a care handover reminder. All versions share `lib/atelier/care.ts`. Dry clean only is the Apex default instruction, with the cleaner directed to verify the sewn-in labels and all layers before treatment. Conflicting labels or particular instructions are referred to Apex; no universal solvent, steaming or washing method is prescribed.

Care wording reviewed against primary retailer/manufacturer guidance on 24 October 2026: [Hillarys cleaning guidance](https://www.hillarys.ie/inspiration/how-to-clean-curtains/), [Dunelm care guide](https://www.dunelm.com/info/about/how-to-care-for-your-curtains), [Blinds 2go hanging and dressing guide](https://www.blinds-2go.co.uk/content/instructions/b2g-curtain.pdf), and [Next made-to-measure guidelines](https://xcdn.next.co.uk/pdfs/buyingguide/madetomeasurecurtain.pdf). The guide is original Apex wording and deliberately avoids blanket home steaming or wet spot-cleaning advice.

## Material method

Every face-fabric width uses the longest finished drop plus **260 mm (26 cm) total for the heading and bottom hem**, treating an apex as a full rectangle. The combined allowance is shown in Making allowances and in the workroom sheet, and is added once to every width before pattern rounding. New windows and existing drafts without an explicit combined allowance use 260 mm. No triangular offcuts are subtracted. Width allocation is conservative per panel, including side hems, seams, fullness, returns and overlap. Straight repeats round each cut up; half-drop and horizontal matches require a workroom-approved cutting plan and total that covers the rectangular baseline.

Lining automatically uses **the same finished drop and total making allowance as the curtains**, with no length deduction. Its order quantity matches the face-fabric metres, including face pattern allowances. The workroom sheet also shows the cutting requirement using the lining's own roll width; lining cuts do not receive face pattern repeats. If a narrower lining roll requires more than the matching order quantity, approval requires additional lining metres. Explicit extras are added separately. Historical approved revisions retain their saved lining figures and split allowances; current drafts receive the automatic lining policy. Offcuts are available for suitable tiebacks after grain, pattern and size checks.

## Operations

- Uses the existing Supabase auth and Apex database, with explicit staff membership and server-only service-role writes. No public signup grants staff access. Staff membership should be managed by the site administrator.
- Migration: `supabase/migrations/20261024130445_apex_atelier_surveys.sql`.
- Existing environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`.
- Sender: `Apex Curtains <hello@apexcurtains.com>`.
- Delivery `sent` means accepted by Resend, not confirmed inbox delivery. Failed/uncertain sends remain visible. Retries reuse the frozen attachment and provider idempotency key; an uncertain attempt older than 23 hours requires checking the provider log before any new delivery is arranged.
- Approved revisions preserve data and image references. Document endpoints and image endpoints require staff authentication.
- Public sample PDFs contain fictional information only. Changes made in the illustrative walkthrough affect its screen preview; the downloadable sample PDFs show the original illustrative collection.

## Verification

The brochure cover uses a bundled screenshot of the Apex homepage. The three heading examples follow the customer dedication on page 3. Fabric and workroom photography separate the editorial sections, and three illustrated care spreads use concise cards from `brochure-care.ts`; the full standard policy remains in `care.ts`. HTML and generated PDFs share the same content and icons. Customer photographs and recorded specifications still take precedence in the individual room pages.

`npm run test:atelier` checks the core calculations and release validation. `npm run build` and targeted ESLint check the application.

`scripts/atelier-integration.mts` is opt-in with `ATELIER_INTEGRATION=1` and an optional `ATELIER_TEST_URL`. It creates a temporary fictitious user/job, verifies auth, persistence, photo storage, concurrency, approval snapshots, PDF generation and handover, then removes its fixtures. It never sends an email. Run only against the intended Apex database/environment.

`scripts/atelier-pdf-preview.mts` can be bundled to ESM with esbuild (external packages) and run with Node to generate review PDFs under `.next/atelier-qa`. Visually inspect rendered pages before updating the public samples.
