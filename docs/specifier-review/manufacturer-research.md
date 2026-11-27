# Forest manufacturer research and claims register

Checked 27 November 2026 against the official Forest brochure and technical download indices. Dates below follow the official linked filename or printed revision; they are not independent certification dates. The structured register in `lib/specifier-resources.json` records exact URLs, page counts, reference pages and SHA-256 fingerprints of the reviewed files. Manufacturer PDFs were downloaded for research only and are not committed or republished.

Official starting points: [brochures](https://www.forestgroup.com/en/downloads/brochures), [technical documents](https://www.forestgroup.com/en/downloads/technical-documents), [order forms](https://www.forestgroup.com/en/downloads/orderforms).

## Manual tracks

| System | Published profile information | Configuration / load information | Application boundary |
| --- | --- | --- | --- |
| KS | 20 mm width × 14 mm height; separate recess variant | 8 kg/m published fabric limit; 100 mm bend radius; wall and ceiling bracket variants | Manual system. Recess, bracket projection, carriers, anchors and substrate require separate assessment. |
| CS | 20 × 20 mm regular profile. Recess drawing: 23 mm nominal section, 32 mm flange width, with an additional 24.5 mm vertical dimension in the drawing; use the original section for exact datums. | CS 15 kg/m; CS Recess 10 kg/m in the July 2026 brochure. 200 mm bend radius; continuous curving described for CS rail only. | Do not apply the regular profile's load to the recess variant. Fixing spacing and anchor adequacy are not established by the load figure. |

Sources: [KS September 2026, pp. 2–4](https://www.forestgroup.com/user_files/download_files/download_2502_FOREST_KS_NEW_EN_150926_WEB.pdf); [CS July 2026, pp. 2–4](https://www.forestgroup.com/user_files/download_files/download_2452_FOREST_CS_EN_270726_WEB.pdf). Dimensions read from the rendered manufacturer sections, not inferred from photographs.

## Motorised tracks and motor selection

The current [Shuttle Series brochure (20 November 2026), pp. 5–9](https://www.forestgroup.com/user_files/download_files/download_2545_FOREST_ShuttleSeries_NEW_EN_201126_WEB.pdf) distinguishes:

| Item | Published fact / design consequence |
| --- | --- |
| FMS | 20 × 20 mm profile; ceiling and wall brackets; left/right drive, one-way or split draw. Published lengths up to 14 m, single stack up to 10 m, 7 m one-piece. |
| FMS Plus | 19.6 mm width × 30 mm height; distinct recess-compatible assembly. |
| FMS Plus recess profile | 26 mm body × 32.2 mm height; 40 mm flange. These are not generic ceiling pocket dimensions. |
| Bending | FMS/FMS Plus excluding recess profile: 200 mm bend radius; continuous-curve sketch indicates 500 mm minimum radius. Confirm the actual configured route with the supplier. |
| FMS Dual | A single motor operates two channels for overlap. It is not evidence of two independently controlled curtain/voile layers. |
| Shuttle M | 24 V DC; separate supply. Brochure body 70 × 50 × 250 mm; published 70 kg without curves. |
| Shuttle L | 100–240 V AC, 50–60 Hz. Brochure body 70 × 50 × 280 mm; 40 kg without curves. |
| Shuttle AC | 100–240 V AC, 50–60 Hz; distinct automation interface. Body 70 × 50 × 280 mm; 40 kg without curves. |
| Shuttle Go | 110–230 V AC, 50–60 Hz; Wi-Fi included. Body 70 × 50 × 290 mm; 35 kg without curves. |
| Shuttle iOn | 14.4 V DC battery model. Body 70 × 50 × 325 mm; 25 kg without curves. |

The above motor figures are total curtain weights, **not kg/m**, and are expressly for configurations without curves. Body dimensions do not reserve assembly rotation, plugs, cable bends or service access. The load chain includes carriers, rail, brackets, anchors and supporting construction. The draft does not calculate a load from rail length or approve a motor from the weight figure alone.

### Electrical/control boundary

The M uses an external supply; the brochure lists 100–240 V AC / 50–60 Hz input and 24 V DC / 2.7 A output. L and AC have different control arrangements despite the shared nominal supply range. The connectivity matrix on page 5 is conditional on motor variant and additional equipment. No universal app/automation compatibility or wiring pinout is presented. Exact motor, controls, power supply, isolation and commissioning responsibilities are schedule fields for the project team.

### Dimensional discrepancy requiring supplier resolution

The [October 2025 S/M/L installation manual, p. 13](https://www.forestgroup.com/user_files/download_files/download_2180_FOREST_manualA5_shuttle_ENG_021025_DRUK.pdf) has different assembly dimensions: M Receiver H270/B1 77/B2 49 mm; L H305/B1 77/B2 49 mm. These must be matched to the exact supplied product and datum rather than silently selecting the smaller brochure body size. The new APX-T03 explicitly records the discrepancy. No universal motor clearance is generated.

The older April 2025 general overview contains different CS recess data and an inconsistent “per metre” motor-weight statement. Its figures are **not** used for the draft's load comparison. Current system-specific documentation is used, with project assessment still required. The overview is referenced only for its CAD-request information.

## Pockets, mounting and maintenance

- [FMS Plus Recess GEN2, straight pleated-curtain drawing, V2.1025](https://www.forestgroup.com/user_files/download_files/download_1969_FMS%20PLUS%20Recess_GEN2_Pleat%20curtain_Straight_A4.pdf): dedicated end and motor openings, component dimensions and length relationships. GEN1 and GEN2 are separate entries in the technical index. The draft links to this original rather than reproducing its cut-outs as a universal architectural detail.
- [Pelmet Protocol, August 2026](https://www.forestgroup.com/user_files/download_files/download_2469_technische%20leaflet_EN_Koofprotocol_190826.pdf): separates rail, curtain, bracket and clearance terms; identifies 92 mm attachment allowance for its listed motorised arrangements. Its pleat/wave assumptions must be checked. The schematic Apex drawings deliberately use variable dimensions, not copied generic pocket widths.
- [FMS assembly / installation V1.1](https://www.forestgroup.com/user_files/download_files/download_634_FMS_Manual_V1_1.pdf): original installation sequence and bracket/motor handling. No project-specific anchor or structure assessment can be inferred from it.
- [Current curtain-height chart](https://www.forestgroup.com/user_files/download_files/download_2532_FOREST_Curtainheight%20Chart_ENG_161026_WEB.pdf): the October 2026 indexed file replaces the previously referenced May file, but its printed document code remains BR0024EN_280526. Both identifiers are retained in the register. Reviewed cover and motorised-system page: this workroom chart distinguishes heading height and top deduction by track/carrier/heading; no universal curtain-drop deduction is issued.
- S/M/L manual p. 14 gives care/inspection and lubrication requirements for its stated system. The draft requires the installed variant's current instructions at handover rather than applying that schedule to all manual or motorised tracks. Maintain access to motors, power supplies, track and curtain removal.

## CAD / BIM investigation

The [official 3D Trackviewer page](https://www.forestgroup.com/en/downloads/forest-3d-trackviewer-app) offers an interactive viewer with access requested by form. The [current December 2025 overview, p. 8](https://www.forestgroup.com/user_files/download_files/download_2252_FOREST_ALGEMEEN_Overview_GB_241225_WEB.pdf) offers CAD files by request. The current indexed overview replaces the April 2025 reference for CAD availability only; system limits still come from the current system-specific sources. No supplier request was submitted, and no current native BIM family for every investigated system was verified as an open download. This is an availability/verification limit, not a claim that Forest has no BIM assets.

The eight Apex SVGs were therefore created only as original architectural coordination studies, not copied manufacturer geometry or BIM substitutes. Obtain current product-specific native files, revision, usage permission and configuration confirmation through the supplier before a construction model is issued.

## Business and supplier review gates

Apex confirmed supply of all Forest systems on 27 November 2026. Installation/commissioning/support scope, exact variants, discrepancy resolution, recess generation, curved configuration, complete load path, controls compatibility and maintenance instructions remain explicit confirmations. Official Forest documentation establishes manufacturer information, not Apex's installation responsibilities or project approval. The collection remains D01 for technical review; no construction dimensions or public issue have been authorised.

## Final source refresh

All nine registered PDFs were re-fetched and checked against Forest's current official indexes on 27 November 2026. Seven matched the earlier fingerprints; the curtain-height chart and overview were updated to the currently indexed files after review. URLs, SHA-256 fingerprints and index membership are recorded in `source-verification.json`. Previously reachable URLs alone were not treated as evidence of the current edition.
