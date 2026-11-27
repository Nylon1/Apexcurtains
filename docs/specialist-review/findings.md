# Specialist service pages — design review

Prepared 27 November 2026. Status: local review build only. No production deployment, main-branch merge or database change.

Scope: the seven existing specialist routes below. Homepage and 31-project gallery were reviewed as visual and editorial references and remain unchanged. The other service pages, quotation tools, navigation and operational workflows remain outside this change.

## Design approach

The homepage establishes photographic impact and the gallery connects individual installations to technical and interior accounts. The existing specialist pages have useful guidance but do not consistently bring those two qualities together. The new designs use named installation references, generous serif typography, warm paper backgrounds and restrained green/bronze accents. Photographs retain their proportions; captions link directly to the existing stories.

Each page has its own opening and editorial sequence. Shared components handle photographs, films, diagrams, accessible FAQs and consultation links. Project content is looked up from the existing portfolio by slug; no project or media records are duplicated.

## 1. Apex curtains — /apex-curtains

**Finding:** The existing page uses older installation imagery, a repeated window-page layout and a generic palette. Its related-project introduction includes legacy heading and lining descriptions that have since been moderated in the gallery.

**Proposed design:** Open with Jesmond's full gable and layered treatment. Explain shape and movement separately, then pair a heading close-up with the two distinct curtain lines. Connect Hemel Hempstead's differing profiles and Rickmansworth's green bedroom treatment to their full stories.

**Technical improvement:** An apex elevation distinguishes supported shaped heading, retained cloth and the horizontal sheer line. Explain peak position, side heights, stack, returns and perimeter light gaps. Retain the existing FAQ subjects and both enquiry pathways.

**Review focus:** Does Jesmond communicate the residential offer clearly? The two layers are visible evidence, not an inferred motorised specification.

## 2. Gable-end curtains — /gable-end-curtains

**Finding:** The page shares much of the apex layout and older imagery. It does not make enough of the difference between the open view and the broad surface of cloth when closed.

**Proposed design:** A wide editorial opening with paired Windermere open/closed photographs. Follow with the relationship between golden cloth and timber, then Cotswold and Beeston examples before technical planning.

**Technical improvement:** Treat the whole elevation as the brief: track lines, layers, door and radiator clearance, furniture and stack-back. The diagram is illustrative and does not promise full glass clearance or a particular operating mechanism.

**Review focus:** The open/closed comparison is the central selling point. No motorisation film is added because operation has not been confirmed for these shaped installations.

## 3. Tall and double-height curtains — /tall-window-curtains

**Finding:** The current opening is a height diagram. It explains dimensions but does not immediately show the room-scale result available in the expanded portfolio.

**Proposed design:** A tall dining-room photograph anchors the opening. A clear dimensions section leads into the fitting-and-finish film, then the tall black-framed window and motorised architectural voile stories.

**Technical improvement:** Keep window height, room height and curtain drop distinct. Retain guidance on long drops, seams, stairwells and maintenance access, with existing section anchors. The real two-storey examples do not become unsupported six-metre capacity claims.

**Review focus:** The portrait composition and film should convey scale without assuming unrecorded dimensions.

## 4. Oversized architectural curtains — /oversized-architectural-curtains

**Finding:** The existing lounge image is relevant, but the page lacks a direct connection to the airport story and the new film evidence. Its text reads primarily as a general specification guide.

**Proposed design:** A broad airport-lounge opening, followed by three design decisions about span, depth and fit-out coordination. An architectural voile film introduces movement before contrasting hospitality and residential project stories.

**Technical improvement:** Explain where folded fabric collects, why two layers need clearance and what ceiling or joinery information should be shared early. Retain apartment, hospitality and structural guidance.

**Review focus:** The page should appeal to homeowners and design teams without attributing unverified fire, acoustic or motor specifications to the airport installation.

## 5. Motorised curtain systems — /motorised-curtain-systems

**Finding:** The existing page opens with a generic layers drawing and simulation. The genuine remote-operation film is stronger first evidence and is currently absent.

**Proposed design:** A deep-green opening with the five-metre-window film, followed by track/load, control/power and handover decisions. Keep the working movement demonstration, add the architectural voile film and link both project stories.

**Technical improvement:** Five metres explicitly refers to window height. Preserve qualified manufacturer guidance and distinguish motor limits from system selection. Horizontal movement and bends in plan do not establish suitability for an apex slope. Power, interfaces and service access remain configuration-specific.

**Review focus:** Real operation appears before the illustrative tool. Films retain native controls and do not autoplay.

## 6. High-level curtain installation — /high-level-curtain-installation

**Finding:** The existing access diagram is informative but the page does not show the team fitting or connect to the new installation-stage photographs.

**Proposed design:** Reverse the opening composition: the London fitting photograph leads on desktop. A three-stage process is followed by the two-storey fitting film, the access diagram, Warwickshire's installation sequence and Norwich's full opening before curtains are visible.

**Technical improvement:** Explain support, route, working area, handling, commissioning and later access. Photographed equipment is not presented as a universally suitable method or an instruction for customers to work at height.

**Review focus:** The stage labels must stay clear: Norwich is an installation-stage photograph, not a completed-room image.

## 7. Specialist curtain manufacturing — /oversized-curtain-manufacturing

**Finding:** The current page uses an older finished-room detail and a dated competitor ordering limit. The portfolio now provides stronger heading and cloth details, but no workshop photographs.

**Proposed design:** A warm material-focused opening with Norwich's gathered heading and long folds. Use the seam-alignment drawing to explain the cut plan, then Hemel Hempstead and Jesmond detail photographs. Add a focused manufacture-only/trade brief section.

**Technical improvement:** Explain cloth direction, usable width, repeat, seam position, heading loads, lining and handling. Replace the transient competitor dimension with an evergreen ordering-responsibility explanation while retaining the existing online-ordering anchor. Link the existing weight guidance rather than inventing a capacity.

**Review focus:** All photos are clearly described as installed-work details. Workroom footage, process certifications and unverified manufacturing specifications are not implied.

## Reviews

The existing reviews page contains a curated static selection, but source records tying quotations to these installations were not found. The owner confirmed “Use the reviews link for now.” Each page retains a customer-reviews link. No new quotations, ratings or reviewer/project associations are introduced.

## Preservation and technical sources

- Existing seven URLs, title/description metadata, canonical origins and original architectural section anchors are retained. Service, breadcrumb and visible FAQ schema are rendered server-side. No redirect or sitemap route changes.
- Existing motorisation demonstration, native video controls, FAQs and residential/trade planner destinations remain available. No enquiry was submitted during QA.
- Existing project records, homepage, gallery and Supabase state are unchanged. Images and film paths are resolved from `lib/portfolio-content.json` through `specialistProject`.
- The diagrams are labelled as illustrative, with text descriptions. They are not fabrication or structural drawings.
- Reviewed official sources: [Forest FMS](https://www.forestgroup.com/uk/products/forest-motorised-track-system), [Forest Shuttle](https://www.forestgroup.com/uk/products/forest-shuttle-curtain-motor), [HSE work-at-height introduction](https://www.hse.gov.uk/work-at-height/introduction.htm). Existing source links remain beside the relevant technical guidance.
- No roller-blind content or offering is introduced.

## Rendered review

Open `index.html` in this directory for page-by-page findings, desktop/mobile renders, baseline comparisons and links to the local interactive previews. Screenshots are taken from the actual implemented routes, not design mock-ups. Desktop: 1440 × 1000 viewport. Mobile: 390 × 844 viewport. Full-page and opening-only images are provided.

## Verification

TypeScript and targeted ESLint pass. The three specialist integration tests pass; all 18 SEO foundation checks pass. Render checks cover all seven routes at desktop and mobile sizes, image loading, canonical URLs, a single H1, valid JSON-LD, unique section IDs and working jump links. Browser checks cover real video playback, the centre/one-way and voile controls, native FAQs and the trade planner. No mobile horizontal overflow was found.

Production deployment awaits review of this pack. Local branch: `design/specialist-service-review`.
