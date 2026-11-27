# Apex Curtains visual design and release review

## Direction and baseline

The design extends [draft PR #45](https://github.com/Nylon1/Apexcurtains/pull/45). The pre-design commit is `a92f870`, also captured in the [original protected preview](https://apexcurtains-43nc-c25v4wtzx-hamzas-projects-4ef62f35.vercel.app). The public production site is outside the design rollout.

The design takes its cues from interior projects and materials. The homepage opens with an Oxford installation photographed in context. The text sits beside the image on desktop and beneath an uncropped architectural view on mobile. Projects follow the hero. Fabric, survey and fitting support the stories through labelled details, photographs and drawings. The timed introduction was retired.

## Visual benchmarking

| Reference | Observation | Application at Apex |
| --- | --- | --- |
| Lutron | Architectural photography and product close-ups give technology a room context. Finish and control information use short, functional labels. | Show the use of a curtain in the space, then explain its control and supporting track. [Palladiom](https://www.lutron.com/us/en/window-treatments/palladiom) |
| Silent Gliss | Track systems are organised by operation and application. Technical material puts track geometry beside clear system descriptions. | Put systems information and diagrams beside the curtain decision that uses them. [Silent Gliss](https://www.silentgliss.co.uk/) |
| Kvadrat | Project photography relates textiles to a building. The case descriptions identify materials and work with restrained titles. | Show scale through an entire wall or interior. Close views provide a second level of detail. [Kvadrat projects](https://www.kvadrat.dk/en/projects) |
| Zimmer + Rohde | The design suite locates textiles in an interior and makes light, form and composition part of the presentation. | Pair cloth detail with architectural context. Use a quiet, warm reading surface. [Design Suite](https://www.zimmer-rohde.com/en/design-suite) |
| Dedar Milano | Material stories distinguish weave, texture and fabric use with close photography and exhibition context. | Give the make-up and finishing pages a material-led opening. [Milano Design Week](https://it.dedar.com/news/milano-design-week-2026/) |
| The Modern House | Project and journal captions provide useful context. Editorial sequences give rooms different scales and viewpoints. | Give Apex projects recognisable titles and a mix of landscape and portrait pictures. [The Modern House Journal](https://themodernhouse.com/journal) |
| Architectural Digest | Interior stories use spaces and details to carry the sequence and identify photography where available. | Let the completed property set the pace. Use meaningful captions and publish only recorded project information. [Architectural Digest home tours](https://www.architecturaldigest.com/homes) |
| Rose Uniacke and Studio Ashby | Finished rooms lead. Typography, white space and short navigation reinforce the project hierarchy. | Give Projects the first navigation position and bring the portfolio directly below the hero. [Rose Uniacke’s London Townhouse](https://www.roseuniacke.com/row/projects/london-townhouse) · [Studio Ashby](https://studioashby.com/) |

## Audit and priorities

| Priority | Surface | Before | Implemented |
| --- | --- | --- | --- |
| 1 | Homepage and masthead | Timed entry poster, tall framed header, competing buttons, cropped mobile photograph and many discovery sections before the work. | Direct opening, quieter masthead, uncropped mobile context, one prominent consultation action, followed by projects, specialisms and craftsmanship. |
| 1 | Consultation and quote | Dense single-page architectural enquiry, separate older quote styling and many optional fields in view. | A short choice of quotation routes and a three-stage consultation with optional measurements and specification details, labelled uploads, focus management, recoverable errors and confirmation. |
| 1 | Specialist authority | Repeated dark, text-only openings and a compact motor demonstration. | Light editorial openings in drawing-led, wide-image, detail-image and split-image variants. Seven precisely labelled line drawings, practical FAQs and a room-like motorised elevation. |
| 2 | Project gallery and detail | Large statement title and equal-weight featured cards above the archive. | Lead case study in a split composition, separate hospitality feature and original filterable archive. Case heroes preserve the complete photograph. |
| 2 | Established guides, apex and gable, fabrics, installation and professions | Several display typefaces and smaller caption sizes across shared templates. | Caslon display typography, responsive reading widths, balanced heading spacing, clearer captions and shared rule and table styling. Existing metadata, verification notes and technical content carry into the new design. |
| 2 | Older directory, solutions, editorial and contact pages | Dark gradients, small uppercase labels, widely rounded panels and inconsistent call-to-action styles. | Paper layouts and reduced corner radii in the shared shell. The advice article template separates its title, image and body into readable editorial sections. |
| 3 | Visualiser, healthcare, local areas and footer | Established interactive or high-volume templates with different surface treatments and dense utility lists. | Shared brand frame, reading type, link hierarchy and focus styling. The visualiser retains its scene and colour controls. Healthcare retains its distinct catalogue and enquiry behaviour. |

## Design system

The public token source is [`app/studio.css`](../app/studio.css). The architectural formats and consultation use [`architecture.css`](../components/architecture/architecture.css). Installation, fabric, local pages, articles and case-study templates inherit the shared public type and colour system.

| Element | Specification |
| --- | --- |
| Display type | Libre Caslon Display, regular. Its restrained stroke contrast and narrow proportions support long architectural headings. It is used for display sizes with a Georgia fallback. |
| Reading type | Geist, already used by Apex. Its high legibility and existing variable font support keep body, navigation and controls coherent. Main reading copy scales from 16 to 18px. Figure captions are 13px. |
| Type scale | Display 51–116px, section heading 41–83px and smaller display headings 26–46px. Individual guide and article templates constrain headings further. Body leading is typically 1.6–1.76 with a 66-character reading measure. |
| Colour | Warm paper `#f7f3eb`, stone `#ece5d9`, ink `#24352e`, muted ink `#536057`, pine `#203b33`, night `#172c25`, bronze `#795b33`, rule `#c4bbae`. Pine is used for signature actions and transitions. |
| Layout | Fluid gutters from 18px, a 1472px maximum for editorial content, shared vertical spacing from 51–128px and widths constrained by the photograph or reading task. Mobile stacks figures and copy according to their narrative role. |
| Actions | Solid, square primary actions and underlined secondary links. The consistent visible focus state works with native disclosures, dialogs, tabs and forms. A keyboard skip link bypasses the site navigation. |
| Forms | Field labels stay in view. One stage is shown at a time, with optional technical fields inside disclosures. Previously entered data and attachments survive stage changes and retry. The original lead endpoint and Resend integration are used. |
| Photography and icons | Native image aspect ratios, responsive source sizes, stable reserved dimensions and descriptive captions. Direction arrows are supplementary. Line drawings use a limited stroke palette and explanatory text. |
| Technical content | Neutral backgrounds, ruled tables, concise subsections, descriptive diagrams and text equivalents. Measurements and system examples are illustrative and remain subject to survey. |
| Motion | Short transitions for links and imagery. Curtain travel has its own eased duration. The opening is static and reduced-motion preferences shorten the experience. |

Cormorant Garamond was considered for softer, calligraphic forms and Bodoni Moda for pronounced contrast. Libre Caslon Display gave the reviewed project titles a more controlled scale. Manrope and Inter were considered for controls and body text. Keeping Geist avoids a second new download. `next/font` serves the licensed Latin Caslon subset from Apex’s own origin. [Libre Caslon Display licence](https://github.com/google/fonts/blob/main/ofl/librecaslondisplay/OFL.txt) · [Cormorant Garamond](https://github.com/CatharsisFonts/Cormorant) · [Bodoni Moda](https://github.com/indestructible-type/Bodoni) · [Manrope](https://github.com/sharanda/manrope) · [Inter](https://rsms.me/inter/)

## Photography audit and commissioning brief

| Existing asset | Use and assessment |
| --- | --- |
| Oxford gable, 1600 × 1200 | Approved existing Apex portfolio photograph. The view, doors and line of the roof make it the strongest available opening. The uncropped 4:3 mobile image preserves the whole treatment. |
| Peterborough, 1200 × 1600 | Genuine triangular bedroom installation. The portrait format shows timber glazing, dark cloth and the view. Avoid crops that lose the peak. |
| Cambridge, 900 × 1600 | Finished curtain detail. A tighter crop gives the folds and tieback useful prominence. |
| Manchester Airport, 1824 × 1026 | Genuine hospitality evidence for a long run of dark curtains. The wide crop is suited to the portfolio and oversized guide. |
| Existing project collection | Four local project photographs and the public gallery’s existing project records remain available. The old homepage photo is still relevant to shaped-window guidance. Avoid reusing it as the opening because of foreground and glass reflections. |
| Room visualiser | Existing illustrative scenes retain their labels. The new technical drawings and movement elevation are also explicitly illustrative. |

The priority photography brief is a daylit double-height interior with the full glazing visible, an approved central London apartment, and a large motorised installation with open and closed views from a fixed viewpoint. Also request a wide industrial-scale cutting or sewing photograph, cloth and seam close-ups, a recess or track detail, and an approved high-level fitting photograph with its technical context. Supply original high-resolution files, photographer and publication permissions, a privacy-approved caption, and landscape and portrait crops. Keep actual curtain drop, installation heights, equipment and specifications tied to the project record.

## Screenshots and verification

See the [screenshot index](design-review/README.md) for the desktop and mobile comparison, representative templates and interactive consultation states.

### Browser and regression results

| Check | Result |
| --- | --- |
| Full public route review | Chromium rendered 204 destinations at both 390px and 1440px, for 408 layout checks. The set includes 194 sitemap routes, nine linked public or enquiry routes and the planner’s trade entry. All returned 200 with one main heading and zero horizontal overflow. The pre-design sweep covered 390 layouts. |
| Responsive and visual review | 77 representative render checks across 320, 390, 430, 768, 1024, 1440 and 1920px. The review covered image framing, text and button hierarchy, drawing labels and navigation. The indexed comparison contains 79 screenshots. All 14 images in the separate gallery contact-sheet audit loaded. |
| Automated accessibility | Axe reported zero violations in the main content of 11 representative pages at both 390px and 1440px. Keyboard focus, mobile touch controls and the reduced-motion mode were also exercised. |
| Enquiry and original customer paths | The planner passed desktop and mobile validation, project-type branching, Back state, upload limits, photo and drawing submission, simulated provider rejection, retry and confirmation. The trade URL opened with the relevant pathway, and the original guided quote remained reachable. The prior preview’s labelled live test was reported delivered by Resend. Mailbox placement remains unverified. |
| Interactive tools | The two curtain layers, opening modes, weight estimator, navigation, homepage disclosures and mobile interaction passed. The existing visualiser checks also passed. |
| Build and regression | The production build, targeted ESLint, SEO assertions, architecture, visualiser, sitemap, redirect, specialist, healthcare route, web-app and Atelier checks passed. |
| Protected preview crawl | The design preview passed the crawl of 194 sitemap URLs and 391 internal destinations, with zero reported canonical, metadata, target or fragment issues. |

### Lighthouse lab samples

Runs used Chromium with Lighthouse throttling against a local production build. Scores are out of 100. LCP is Largest Contentful Paint, TBT is Total Blocking Time and CLS is Cumulative Layout Shift. The table records individual samples. Production field measurements remain pending.

| Page and preset | Performance | Accessibility | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile pre-design | 84 | 100 | 100 | 3.30 s | 370 ms | 0 |
| Homepage, mobile redesign | 94 | 100 | 100 | 2.68 s | 178 ms | 0 |
| Homepage, desktop redesign | 100 | 100 | 100 | 0.79 s | 11 ms | 0 |
| Motorised systems, mobile pre-design | 98 | 100 | 100 | 1.10 s | 170 ms | 0 |
| Motorised systems, mobile redesign | 98 | 100 | 100 | 1.22 s | 138 ms | 0 |

### Release status

The draft PR and protected preview are ready for visual approval. Confirm the workroom and installation capabilities and the trade scope before releasing the strategic expansion. The proposed central London and five-metre-window case studies still need approved images and documented details. Keep those stories unpublished until the records and privacy permissions are available. Search Console and real-user Core Web Vitals remain open.
