# Homepage visual review

[Compare all six opening views on one sheet](comparison.jpg). The three studies use the same approved headline and actual Apex photographs. Each full-page render shows the opening view and the sections below it.

| Direction | Design decision | Desktop | Mobile |
| --- | --- | --- | --- |
| A · Luxury architectural | The Oxford gable fills the opening view. Its apex and curtains establish the specialism before the visitor reads the introduction. | [1440 px](A-1440.jpg) | [390 px](A-390.jpg) |
| B · Architectural engineering | A dark specification panel sits beside the shaped Peterborough window. A measured elevation introduces the technical sequence. | [1440 px](B-1440.jpg) | [390 px](B-390.jpg) |
| C · Contemporary luxury interiors | A warm stone surface, Cambridge curtain detail and closer crop give the cloth and its finish prominence. | [1440 px](C-1440.jpg) | [390 px](C-390.jpg) |

## Recommended homepage

[Desktop opening](opening-1440.jpg) · [Mobile opening](opening-390.jpg) · [Full desktop page](candidate-1440.jpg) · [Full mobile page](candidate-390.jpg)

The Oxford opening from A gives a recognisable silhouette even on a small phone. Four large photographs introduce the specialist services. The technical drawings have their own section after the installation story. The Cambridge detail from C closes the project selection. The header and opening retain direct routes to a consultation.

The installation section shows the fitting team at work on tall windows in a luxury London apartment. The separate motorisation section pairs a real, user-operated film with the interactive curtain and voile demonstration. The owner cleared the London photograph and the film for website use and confirmed the filmed residential window is five metres high. The film carries no audio or location label. Its caption describes the movement for readers who choose to skip playback. The stated height refers to the window. Fabric, motor model and finished curtain drop are undocumented.

The tall-window service leads with the owner-cleared double-height dining-room photograph. A separate 14-second film of pale curtains on black-framed glazing is available on demand. Both installations carry descriptive captions without a specific measurement, location or automation claim. The portfolio also links to the Peterborough bedroom and the Manchester Airport lounge. The technical section shows the complete glazing elevation and the section through separate curtain and voile tracks.

The motorised service uses a full-room still from the approved film of motorised voiles in a two-storey living room. Visitors can play the sequence on demand.

A separate 13-second film shows motorised voiles covering a two-storey glazed wall. A photograph of white curtains beneath a cornice opens as a close-up under “See a pleated heading up close”. The crop shows the pleats and pole clearly and leaves the embedded social caption outside the frame. The business cleared these subsequent homepage uploads as genuine Apex work.

The 12-second two-storey fitting film follows one room from the fitting team at work to the dressed curtains between two tiers of windows. It has its own link in the installation section. The separate 27-second “When the windows are grand” film shows sheer panels opening while the outer curtains stay in place. It is reserved for a future motorisation guide. Retain its visible on-screen credit if the film is used.

The production baseline is [4e51701](https://github.com/Nylon1/Apexcurtains/commit/4e51701163ed7d6f6881977ddb8f241eecc13b69). Publication requires visual approval of the implemented candidate.

[Service photography on laptop](architectural-curtains-1366.jpg) · [Service photography on mobile](architectural-curtains-390.jpg) · [Drawings on laptop](technical-drawings-1366.jpg) · [Drawings on mobile](technical-drawings-390.jpg)

## Review checks

The homepage now opens the existing room visualiser inline from “Try tall windows” or “Try shaped windows”. The standalone visualiser and saved looks use the same renderer. Its fourth room is a still from the cleared tall-window film, with separate controls for the Oslo outer curtains and the Tranquil voile. The other three rooms also support the voile overlay. Saved links and quotation enquiries carry the selected colourway and reference.

The 21 Tranquil names and 2031 fabric references were checked against the manufacturer's collection. The catalogue records each official swatch URL. Display colours use median sRGB from the central 60% of each swatch. The simulated folds and transparency are illustrative. [Prestigious Textiles Tranquil](https://www.prestigious.co.uk/fabrics/tranquil/)

[Visualiser on desktop](visualiser-tall-1440.jpg) · [Visualiser on mobile](visualiser-tall-390.jpg)

| Check | Result |
| --- | --- |
| Responsive layout | Chrome checked at 320, 375, 390, 768, 1024, 1440 and 1920 px. The primary consultation link was visible and clickable on entry at every width. No horizontal overflow. |
| Navigation and enquiries | Mobile menu opened and closed. The hero opened the architectural planner and dispatched the existing conversion event. Specialist, project and enquiry destinations returned 200. |
| Search and links | All 64 existing homepage link destinations were retained. Title, description, canonical, social metadata and structured data matched production. |
| Media and controls | All four films played in Chrome. The heading-detail disclosure opened and closed. Independent curtain and voile controls, single-layer operation, draw direction and window selection passed. The opening loaded no film bytes. |
| Accessibility | Axe reported no WCAG 2 A, AA or WCAG 2.1 A, AA violations in the tested desktop homepage state and mobile inline visualiser state. |
| Mobile performance | The final local production build scored 96 performance, 100 accessibility and 100 SEO in Lighthouse. LCP was 2.7 s and CLS was zero. The mobile hero transferred 27 KB. The separate live baseline run scored 94, 100 and 100, with LCP of 2.3 s. Hosting conditions differ and these are lab measurements. |
| Repository checks | Production build, 18 SEO foundation checks, nine specialist guidance tests, six architectural tests and 11 visualiser tests passed. |
