import {
  professionalGuide,
  oxfordProfessionalImage,
  airportProfessionalImage,
  surveyDiagram,
  coordinationDiagram,
  releaseDiagram,
} from "./professional-shared.ts";

export const architectsGuide = professionalGuide({
  path: "/professionals/architects",
  title: "Curtain specification for architects.",
  metaTitle:
    "Architectural Curtain & Track Specification Support for Architects",
  description:
    "Coordinate curtains for apex, gable-end and double-height glazing: track routes, recess space, structural fixing zones, clear openings and installation access.",
  eyebrow: "For architects / Design the interface",
  intro:
    "A curtain occupies space, carries weight and changes the view. Resolve its relationship with the glazing, structure and room while those decisions can still shape the architecture.",
  image: oxfordProfessionalImage,
  sections: [
    {
      id: "curtain-envelope",
      title: "Draw the curtain as well as the window",
      paragraphs: [
        "For an apex, triangular or gable-end window, a glazing elevation is only the starting point. Establish the proposed curtain route, the separate roof slopes, side drops and finished floor reference. A symmetrical drawing should not become an assumption about the built opening.",
        "Show the intended open and closed positions. A shaped upper section may remain retained while the lower cloth is drawn aside or tied back. Following a sloping roofline does not establish that a curtain will travel freely across it or that all glazing will become clear.",
        "Record the minimum usable opening for doors and circulation, not only the desired view. This gives the team a functional brief against which track arrangement, heading and stack position can be reviewed.",
      ],
      diagram: surveyDiagram,
      links: [
        {
          href: "/gable-end-curtains",
          label: "Gable-end curtain arrangements",
        },
        {
          href: "/angled-window-curtains",
          label: "Angled and sloping windows",
        },
        {
          href: "/advice/how-to-measure-for-apex-curtains",
          label: "Geometry needed for an initial brief",
        },
      ],
    },
    {
      id: "recess-and-clearance",
      title: "Reserve space for the complete curtain",
      paragraphs: [
        "A rail profile is narrower than the fabric suspended beneath it. Coordinate recess width and depth with heading projection, forward and backward folds, lining bulk, hooks, brackets and the space needed to fit or service the system.",
        "Stack-back is the space occupied by gathered cloth along the opening. Fold depth is the space it occupies towards and away from the glass. Both can change with the fabric, lining and heading; neither can be specified from track width alone.",
        "Overlay the curtain envelope on the reflected ceiling plan and relevant sections. Check handles, opening leaves, radiators, lighting, ventilation grilles, beams and joinery. Agree any required clearance with the responsible supplier rather than adopting a generic curtain recess dimension.",
      ],
      diagram: coordinationDiagram,
      links: [
        {
          href: "/curtain-headings#tracks-and-space",
          label: "Explore fold depth and stack-back",
        },
        { href: "/curtain-tracks", label: "Forest KS / CS and fixing methods" },
      ],
    },
    {
      id: "structural-support",
      title: "Coordinate the load path before closing up",
      paragraphs: [
        "The curtain, lining and heading determine the finished load. Track capacity, brackets, fixings and the supporting construction must be considered together, including the gathered load where curtains stack. A rail rating does not verify the wall or ceiling connection.",
        "Identify the intended fixing zone on the drawing and record the actual build-up: plasterboard and backing, timber, masonry or steel, as applicable. Continuity matters along a shaped route. Concealed support may need evidence from the builder or assessment by the appropriate structural specialist.",
        "Confirm who provides and approves the support, who sets out the track and which information Apex still needs. Keep the record with the latest drawing revision so changes to ceilings, insulation, glazing trims or backing do not leave the curtain detail behind.",
      ],
      disclosures: [
        {
          title: "Can we avoid fixing to window frames?",
          text: "Wall or ceiling support may allow the glazing frame to remain untouched, but the available structure, clearances and frame supplier's requirements must be checked. Do not assume a suitable support exists above a visually continuous frame.",
        },
        {
          title: "Can every shaped track be motorised?",
          text: "No. The standard KS and CS systems described in Apex's track guide are manually operated. A powered arrangement, especially on a slope, requires a separately confirmed system and geometry. Establish feasibility before specifying power, controls or access panels.",
        },
      ],
      links: [
        {
          href: "/curtain-tracks#structure-and-brackets",
          label: "Fixings and structural requirements",
        },
        {
          href: "/professionals/contractors-fit-out#fixing-evidence",
          label: "Information to coordinate with the contractor",
        },
      ],
    },
    {
      id: "access-and-operation",
      title: "Design for fitting and future maintenance",
      paragraphs: [
        "High glazing needs a practical route to the fixing position. Review room access, floor space for the proposed equipment, changes in level, fragile finishes and overhead obstructions. A double-height void can be reachable during construction and difficult to reach once stairs, furniture or joinery are installed.",
        "The access method depends on the work and site conditions. MiTOWER may be suitable for some installations, but height alone does not decide suitability. Plan future access to retained curtain sections, carriers and hooks as well as the first installation.",
      ],
      links: [
        {
          href: "/services/premium-installation#mitower-access",
          label: "High-level access and MiTOWER planning",
        },
        {
          href: "/curtain-tiebacks",
          label: "Tiebacks and retained window coverage",
        },
      ],
    },
    {
      id: "design-review",
      title: "A useful architectural review package",
      paragraphs: [
        "Send the current drawing issue and identify the unresolved decision. Early advice can test the arrangement; final dimensions, support and manufacture details still need project-specific confirmation.",
      ],
      table: {
        caption: "Information that makes coordination productive",
        headings: ["Provide", "Include"],
        rows: [
          [
            "GA plan and window schedule",
            "Room/opening references, dimensions and current revision.",
          ],
          [
            "Elevation and section",
            "Each slope, floor datum, track intent and changes of plane.",
          ],
          [
            "Reflected ceiling / detail drawings",
            "Recess build-up, fixing zone, services and access to hardware.",
          ],
          [
            "Operation brief",
            "Moving and retained areas, required clear opening and reachable controls.",
          ],
          [
            "Programme and responsibilities",
            "Who confirms support, when finishes close up and when the final survey is possible.",
          ],
        ],
      },
      links: [
        {
          href: "/professionals/specifier-resources/project-information-checklist",
          label: "Use the project information checklist",
        },
        {
          href: "/gallery/pinch-pleat-curtains-oxford-oxford",
          label: "See the completed Oxford gable",
        },
        {
          href: "/professionals/project-review",
          label: "Discuss the architectural detail",
        },
      ],
    },
  ],
  questions: [
    {
      question: "When should an architect involve Apex Curtains?",
      answer:
        "Ideally while the track position, ceiling/recess detail and structural backing can still be coordinated. Existing completed rooms can also be reviewed, but the available support and clearances may limit the arrangement.",
    },
    {
      question: "Can a standard recess detail be used for every curtain?",
      answer:
        "No. Confirm the full fabric and hardware envelope for the selected heading, lining, track and operation. Fold depth, stack-back and access to the fixings are separate considerations.",
    },
    {
      question: "Does a project review approve the building structure?",
      answer:
        "No. Apex can identify curtain support requirements and missing information. The suitability of the supporting construction must be confirmed by the responsible project team or structural specialist where required.",
    },
  ],
  related: [
    {
      href: "/professionals/interior-designers",
      label: "Coordinate the textile scheme",
    },
    {
      href: "/professionals/contractors-fit-out",
      label: "Resolve the site interface",
    },
    {
      href: "/professionals/specifier-resources",
      label: "Open the technical library",
    },
  ],
});

export const designersGuide = professionalGuide({
  path: "/professionals/interior-designers",
  title: "Curtain specification for interior designers.",
  metaTitle: "Curtain Specification Support for Interior Designers",
  description:
    "Specify specialist curtains with confidence: fabric drape, heading, lining, colour, stack-back and fitting for apex, gable-end and double-height interiors.",
  eyebrow: "For interior designers / Protect the scheme",
  intro:
    "Take the curtain from a beautiful sample to a convincing part of the room. We help connect colour, texture and proportion with the way a shaped or very tall curtain will hang and operate.",
  image: {
    src: "/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg",
    alt: "Deep blue pencil pleat curtains framing timber gable glazing in a Peterborough bedroom",
    caption:
      "Peterborough / Real Apex installation. Colour, timber and the sweep of the curtain work together.",
  },
  sections: [
    {
      id: "room-brief",
      title: "Specify how the room should feel and function",
      paragraphs: [
        "Begin each opening with a short design and use brief: daylight, evening privacy, sleeping conditions, view, doors and furniture. A dramatic gable sitting room and a triangular bedroom may need different curtain arrangements even if the glazing looks similar.",
        "Record the appearance when open as carefully as the closed elevation. Shaped curtains can retain cloth along the upper slopes; tiebacks reveal a different amount of glass from a traversing curtain. Agree that visual outcome before selecting an image as the design reference.",
      ],
      links: [
        {
          href: "/curtain-colours-and-tones",
          label: "Colour, light and interior palettes",
        },
        { href: "/curtain-tiebacks", label: "Understand tied-back coverage" },
        {
          href: "/triangular-window-curtains",
          label: "Triangular window arrangements",
        },
      ],
    },
    {
      id: "fabric-at-scale",
      title: "Judge the cloth at the intended scale",
      paragraphs: [
        "A small memo shows colour and surface, but not the weight, seam placement or fall of a long drop. For a 4–6 m design, discuss drape, stiffness, fabric width, repeat and joining strategy before estimating quantities. A heavier cloth can have presence while adding demands on hardware, handling and stack space.",
        "Linen and linen-rich fabrics can respond to humidity and settle in use. A textured plain can read almost flat from ground level; a subtle repeat may become more noticeable across a broad curtain. Railroading is only an option where the supplier permits the orientation and the usable width suits the proposed drop.",
        "Use the actual fabric specification and check samples in the room against walls, flooring, timber, metal finishes and upholstery. The Oslo visualiser helps explore a palette; its screen colours and illustrative scenes do not replace physical samples or approve a made-to-measure result.",
      ],
      photo: {
        src: "/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg",
        alt: "Blue curtains, timber window frames and bedroom furnishings in a real Peterborough installation",
        width: 1200,
        height: 1600,
        caption:
          "Peterborough / A real pencil pleat installation. The photograph shows the finished colour relationship; it does not identify an Oslo fabric.",
        href: "/gallery/peterborough-bedroom-blackout-curtains-peterborough",
        linkLabel: "Explore the bedroom project",
      },
      links: [
        {
          href: "/curtain-fabrics",
          label: "Fabric selection for very tall curtains",
        },
        { href: "/room-visualiser", label: "Explore Oslo colours in a room" },
        {
          href: "/services/design-make-curtains#cutting-and-joins",
          label: "Discuss construction and joins",
        },
      ],
    },
    {
      id: "heading-and-lining",
      title: "Bring heading, lining and hardware together",
      paragraphs: [
        "The heading controls the rhythm at the top; the lining changes body and bulk. Specify them as a combination. Double pinch pleat gives a sewn, tailored structure; pencil pleat gives gathered texture; wave relies on a compatible heading and carrier arrangement with room for folds in both directions.",
        "Standard, blackout, thermal blackout and coloured linings address different briefs. Blackout lining restricts light through the lined cloth, while track position, overlaps, sides, floor clearance and other room light sources affect darkness. Extra layers can also alter drape and the space occupied by the open curtain.",
      ],
      table: {
        caption: "Decisions to agree alongside the visual scheme",
        headings: ["Design decision", "Specification consequence"],
        rows: [
          [
            "Heading and fullness",
            "Fabric requirement, fold depth, hook/carrier compatibility and stack volume.",
          ],
          [
            "Lining and optional interlining",
            "Combined weight, softness, bulk and care requirements.",
          ],
          [
            "White or optional black aluminium track",
            "Relationship with ceiling, frame and visible hardware.",
          ],
          [
            "Matching or contrasting tiebacks",
            "Scale, fixing position, curtain sweep and remaining glass coverage.",
          ],
        ],
      },
      links: [
        { href: "/curtain-headings", label: "Compare heading construction" },
        {
          href: "/curtain-linings",
          label: "Lining and light-control guidance",
        },
        { href: "/curtain-tracks", label: "White and black track options" },
      ],
    },
    {
      id: "design-schedule",
      title: "Give every opening a clear design record",
      paragraphs: [
        "Use the same opening reference on the room plan, elevation and curtain schedule. Record what is approved, what is provisional and who will confirm it. A moodboard supports the brief, but cannot define the finished drop or the route of a shaped track.",
        "A fabric substitution can change width, drape, repeat, weight and quantities even when its colour looks similar. Recheck the complete combination before release, including the lining, heading, hardware and seam strategy. Agree samples, programme and any changes to cost before cutting.",
      ],
      points: [
        "Room/opening reference and current drawing revision.",
        "Fabric collection, colour/reference, supplier width and repeat/orientation information.",
        "Heading, lining, optional interlining and tieback choice.",
        "Intended track finish, open position, stack location and floor relationship.",
        "Sample approvals, unresolved decisions and who is authorised to confirm them.",
      ],
      links: [
        {
          href: "/professionals/specifier-resources/project-information-checklist",
          label: "Prepare the specification inputs",
        },
        {
          href: "/professionals/developers-housebuilders#controlled-options",
          label: "Manage repeated schemes and substitutions",
        },
      ],
    },
    {
      id: "installation-finish",
      title: "Protect the finish through installation",
      paragraphs: [
        "Coordinate furniture delivery, decoration and floor completion with the survey and fitting sequence. High-level access may need a larger clear area than the final curtain occupies. Confirm protection and access before the room is fully dressed.",
        "At handover, review folds, hems, tieback position, operation and the agreed view. Keep the chosen fabric and lining references with the care guidance so future cleaning or replacement components are matched to the actual installation.",
      ],
      links: [
        {
          href: "/services/premium-installation",
          label: "Dressing, installation and aftercare",
        },
        {
          href: "/professionals/architects#recess-and-clearance",
          label: "Coordinate recess and clearances",
        },
        {
          href: "/professionals/project-review",
          label: "Discuss your interior scheme",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Can I start with my preferred fabric?",
      answer:
        "Yes. Share the reference and supplier information so drape, usable width, repeat, weight and care can be considered for the shaped or tall curtain. Suitability and availability need confirmation before the fabric is specified.",
    },
    {
      question: "Will the room visualiser show the exact finished colour?",
      answer:
        "No. It is a design aid using illustrative scenes. Screens, daylight, artificial lighting, the lining and the scale of the curtain all affect appearance; approve the physical materials in the project setting.",
    },
    {
      question: "Can blackout lining guarantee a completely dark bedroom?",
      answer:
        "No. Light can remain above, beside, between and below the curtains or enter elsewhere in the room. Specify the coverage and installation geometry alongside the lining.",
    },
  ],
  related: [
    {
      href: "/curtain-colours-and-tones",
      label: "Develop the interior palette",
    },
    { href: "/curtain-headings", label: "Choose the structure of the fold" },
    {
      href: "/professionals/architects",
      label: "Coordinate with the architecture",
    },
  ],
});

export const developersGuide = professionalGuide({
  path: "/professionals/developers-housebuilders",
  title: "Curtain packages for developers & housebuilders.",
  metaTitle: "Curtain & Track Packages for Developers and Housebuilders",
  description:
    "Plan curtains for feature glazing, show homes and repeated plots: individual surveys, controlled specifications, backing provision, manufacture release and handover.",
  eyebrow: "For developers / From show home to handover",
  intro:
    "Create a consistent interior standard while respecting the geometry of each plot. The curtain package needs its own survey, decisions and place in the build programme.",
  image: oxfordProfessionalImage,
  sections: [
    {
      id: "plot-specific",
      title: "Repeat the design intent, verify each opening",
      paragraphs: [
        "A house type can provide a useful baseline for the fabric, heading, lining and track finish. It does not prove that every built opening has identical slopes, side heights, recesses or floor levels. Mirrored plots, frame changes and site tolerances can alter the shaped curtain.",
        "Give each opening a plot-and-room reference. Keep measured information attached to that opening rather than copying a completed order into the next plot. Identify whether a dimension is from design drawings, an initial site visit or the agreed final survey.",
        "The Oxford photograph shows a completed residential gable installation. It is useful evidence of the visible curtain arrangement, not evidence of a multi-plot contract or a standard house-type specification.",
      ],
      diagram: surveyDiagram,
      links: [
        {
          href: "/services/measure-consultation",
          label: "What the specialist survey resolves",
        },
        {
          href: "/gallery/pinch-pleat-curtains-oxford-oxford",
          label: "See the Oxford residential installation",
        },
      ],
    },
    {
      id: "controlled-options",
      title: "Define the base specification and the options",
      paragraphs: [
        "For a show home or purchaser option, record the full combination: face fabric and colour, lining, heading, track, tiebacks and installation scope. A named colour alone is not a repeatable specification.",
        "Treat substitutions as changes to the package. A new fabric width or repeat can change joins and quantities; a heavier lining can change the load and stack. Confirm availability and any batch considerations when planning phased orders. Do not promise an exact repeat from a screen image or a previous sample alone.",
      ],
      table: {
        caption: "What can be standardised, and what needs plot confirmation",
        headings: ["Baseline choice", "Verify for each plot"],
        rows: [
          [
            "Colour and textile scheme",
            "Approved references, availability and agreed substitutions.",
          ],
          [
            "Heading and lining",
            "Suitability for actual drop, curtain weight and operation.",
          ],
          [
            "Track approach",
            "Route, fixing zone, clearances and support evidence.",
          ],
          [
            "Finished appearance",
            "Floor datum, stack-back, tieback position and clear opening.",
          ],
          [
            "Installation sequence",
            "Access, site readiness and any purchaser changes.",
          ],
        ],
      },
      links: [
        {
          href: "/professionals/interior-designers#design-schedule",
          label: "Build a useful curtain schedule",
        },
        {
          href: "/curtain-fabrics",
          label: "Fabric scale and construction considerations",
        },
      ],
    },
    {
      id: "release-gates",
      title: "Give manufacture a clear release point",
      paragraphs: [
        "A target handover date is not a manufacturing dimension. Agree when support, finished levels, geometry and textile choices will be confirmed, then allow the project-specific manufacture and installation programme to follow.",
        "Changes after release need to be reviewed against work already completed. Altered flooring, plaster thickness, door hardware or a revised ceiling line can affect fit and access. Confirm the consequence for cost and timing rather than assuming a made-to-measure curtain can absorb the change.",
      ],
      diagram: releaseDiagram,
      disclosures: [
        {
          title: "Before ceilings and recesses are closed",
          text: "Coordinate backing location and continuity, the track/curtain envelope and any relevant access or service provisions. Record the actual construction before it becomes concealed.",
        },
        {
          title: "Before manufacture is released",
          text: "Agree the final surveyed references, approved textile and hardware combination, operation and floor relationship, together with the scope and outstanding responsibilities.",
        },
        {
          title: "Before the installation visit",
          text: "Confirm the agreed building work is complete, the working area is accessible, wet/dusty work is resolved and the access/protection plan still fits the room.",
        },
      ],
      links: [
        {
          href: "/services/design-make-curtains",
          label: "From specification to manufacture",
        },
        {
          href: "/professionals/contractors-fit-out#site-readiness",
          label: "Site readiness for fitting",
        },
      ],
    },
    {
      id: "procurement",
      title: "Make scope and ownership explicit",
      paragraphs: [
        "Identify who approves the design, who supplies backing or remedial building work, who confirms dimensions and who releases manufacture. If curtains or tracks are supplied separately, agree checking, compatibility, delivery and installation responsibilities before ordering.",
        "For an initial review, provide plot and window schedules, house-type drawings, show-home design intent, likely quantities, site location and phased dates. Mark purchaser choices and building information still outstanding so the initial allowance is understood in context.",
      ],
      links: [
        {
          href: "/professionals/specifier-resources/project-information-checklist",
          label: "Prepare the plot information",
        },
        {
          href: "/professionals/project-review",
          label: "Discuss a phased curtain package",
        },
      ],
    },
    {
      id: "handover",
      title: "Carry the specification through to the occupier",
      paragraphs: [
        "Inspect each opening against the agreed arrangement: curtain movement, visible coverage, hems, tiebacks, dressing and any remaining snag items. Keep care guidance and fabric, lining and track references with the plot record.",
        "For very high curtains, explain the maintenance access plan and which parts should not be pulled or adjusted from below. If the professional workspace is already available to your project team, use the existing authorised access to keep the relevant records together.",
      ],
      links: [
        {
          href: "/services/premium-installation",
          label: "Installation and aftercare",
        },
        {
          href: "/professionals/workspace/login",
          label: "Sign in to your existing project workspace",
        },
        {
          href: "/curtain-accessories",
          label: "Replacement and care of supporting components",
        },
      ],
    },
  ],
  questions: [
    {
      question:
        "Can one set of measurements be used for identical house types?",
      answer:
        "A repeated design is a starting point, not proof of identical built geometry. Confirm the relevant dimensions, finished levels and fixing conditions for each opening through the agreed survey process.",
    },
    {
      question: "Can curtains be planned before a show home is finished?",
      answer:
        "Yes. Early coordination helps establish design intent, support, recess space and programme. Final manufacturing dimensions and the approved textile/hardware combination still need to be confirmed at the appropriate stage.",
    },
    {
      question: "Can installation be phased across plots?",
      answer:
        "Discuss the plot schedule, location, quantities and readiness dates with Apex. The scope, sequencing and availability need to be agreed for the project; no standard lead time applies to every package.",
    },
  ],
  related: [
    {
      href: "/professionals/contractors-fit-out",
      label: "Coordinate site delivery",
    },
    {
      href: "/professionals/interior-designers",
      label: "Agree the interior specification",
    },
    {
      href: "/professionals/specifier-resources",
      label: "Build the project brief",
    },
  ],
});

export const contractorsGuide = professionalGuide({
  path: "/professionals/contractors-fit-out",
  title: "Curtains for contractors & fit-out teams.",
  metaTitle: "Curtain Track Installation for Contractors & Fit-out Teams",
  description:
    "Coordinate specialist curtain installation with fixing substrates, setting out, services, access, RAMS, programme and site-readiness information for fit-out teams.",
  eyebrow: "For contractors / Coordinate the installation",
  intro:
    "A good installation starts before the fitter arrives. Resolve the support, track line, access and sequence so the curtain package fits both the construction and the completed interior.",
  image: airportProfessionalImage,
  sections: [
    {
      id: "fixing-evidence",
      title: "Establish what the track will be fixed to",
      paragraphs: [
        "Provide the construction build-up along the proposed track route, including the depth and continuity of any backing. A decorative plasterboard surface, suspended ceiling or glazing trim is not evidence of a suitable load path.",
        "Timber, masonry and steel each need an appropriate connection. The fixing choice depends on the actual material, its condition, access and the load/geometry of the curtain package. Where support is uncertain, agree who investigates and confirms it before an installation date is relied on.",
        "Photographs taken before boarding can help locate support, but need a clear opening reference and dimensions to relate them to the finished room. Drawings should reflect what was built. Do not treat a generic bracket spacing or rail capacity as approval of concealed construction.",
      ],
      detailInteraction: "fixings",
      links: [
        {
          href: "/curtain-tracks#structure-and-brackets",
          label: "Fixings, brackets and structural considerations",
        },
        {
          href: "/professionals/architects#structural-support",
          label: "Coordinate support with the design team",
        },
      ],
    },
    {
      id: "setting-out",
      title: "Set out from the finished installation",
      paragraphs: [
        "Agree the track centreline, height and projection against the relevant finished floor and wall/ceiling references. Check the curtain envelope at handles, opening doors, radiators, ceiling lights, grilles, sprinklers and joinery. Coordinate any required clearances with the relevant trade.",
        "For shaped glazing, establish each slope and the intended changes in direction. Confirm how the curtain is retained, opened or tied back; a track that follows an apex does not imply unrestricted travel. Keep these decisions consistent across the elevation, schedule and latest site setting-out information.",
      ],
      diagram: coordinationDiagram,
      links: [
        {
          href: "/curtain-headings#tracks-and-space",
          label: "Allow for folds and gathered fabric",
        },
        {
          href: "/services/measure-consultation#geometry",
          label: "Survey references for shaped windows",
        },
      ],
    },
    {
      id: "access-plan",
      title: "Plan the whole access route",
      paragraphs: [
        "Access planning includes unloading, carrying long track lengths, reaching the room, assembling suitable equipment and working at the fixing position. Check doorways, stairs, lifts, changes in floor level, floor suitability and obstructions above and beside the work.",
        "A MiTOWER or another access method is selected for the actual task and space. Tower work requires competent assembly/use, suitable support and the relevant inspection arrangements. Coordinate protection, working areas and separation from other trades or occupants through the site plan.",
        "Tell Apex about inductions, permits, security arrangements and any site-specific RAMS requirements early. Access height alone does not establish a safe method, and an item of equipment shown in a guide does not approve its use on a particular site.",
      ],
      links: [
        {
          href: "/services/premium-installation#mitower-access",
          label: "MiTOWER and high-level installation",
        },
        {
          href: "/commercial-curtain-track-installation#operational-sites",
          label: "Working in occupied commercial spaces",
        },
      ],
    },
    {
      id: "site-readiness",
      title: "Agree readiness before booking the final visit",
      paragraphs: [
        "Use the following as a coordination check, then confirm any open items with the responsible team. It is not a safety assessment or permission to start work. Dates and the scope of each visit remain project-specific.",
      ],
      checklist: [
        "Latest drawing and opening schedule agree with the work on site.",
        "Fixing substrate and any required backing/remedial work have been confirmed.",
        "Finished floor levels, ceiling lines and relevant joinery are known.",
        "Wet and dusty work will not compromise the curtains or installation.",
        "The agreed access route, working area and protection arrangements are available.",
        "Tracks, curtains and accessories are identified by room/opening where delivered separately.",
        "Site contact, attendance, permits and documentation requirements have been coordinated.",
      ],
      links: [
        {
          href: "/professionals/specifier-resources/project-information-checklist",
          label: "Use the full project checklist",
        },
        {
          href: "/services/premium-installation",
          label: "What happens during fitting and dressing",
        },
      ],
    },
    {
      id: "responsibilities",
      title: "Close the gaps between trades",
      paragraphs: [
        "Agree the scope before placing an order: who supplies the curtain and track, confirms measurements, provides suitable support, arranges access and protection, and completes any remedial finishes. Separate supply and installation can work when those interfaces are explicit.",
        "At completion, check fixing security, agreed operation, end stops and supporting components, hems, dressing and tieback positions. Record snag items and care instructions with the installed references. Do not force a snagging curtain; establish whether the issue is fabric, carriers, obstruction or alignment.",
      ],
      table: {
        caption: "Questions to settle at package review",
        headings: ["Interface", "Record"],
        rows: [
          [
            "Support",
            "Who confirms substrate suitability and completes building work?",
          ],
          [
            "Dimensions",
            "Which survey and drawing revision control manufacture?",
          ],
          [
            "Scope",
            "Supply only, installation, dressing, access and protection inclusions.",
          ],
          [
            "Changes",
            "Who approves revised geometry, materials, cost or programme?",
          ],
          [
            "Handover",
            "Who witnesses operation, signs off snags and retains care information?",
          ],
        ],
      },
      links: [
        {
          href: "/commercial-curtain-track-installation",
          label: "Commercial package scope and evidence",
        },
        {
          href: "/curtain-accessories",
          label: "Hooks, carriers and finishing components",
        },
        {
          href: "/professionals/project-review",
          label: "Review the installation brief",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Can Apex install a track into an existing finished ceiling?",
      answer:
        "It may be possible once the build-up, suitable fixing points, services and required load are understood. Additional information or building work may be needed; the visible finish alone does not confirm suitability.",
    },
    {
      question: "Can you coordinate RAMS and site documentation?",
      answer:
        "For suitable commercial projects, risk assessments, method statements and insurance details can be provided where required. Share the site's documentation, induction and access requirements early so the scope can be agreed.",
    },
    {
      question: "Does a checked readiness list approve the installation?",
      answer:
        "No. It helps organise the conversation. Site conditions, the actual system, safe access and responsibilities still need to be confirmed by the appropriate people before work starts.",
    },
  ],
  related: [
    {
      href: "/professionals/architects",
      label: "Resolve the design interface",
    },
    {
      href: "/professionals/developers-housebuilders",
      label: "Plan phased plots and handover",
    },
    {
      href: "/commercial-curtain-track-installation",
      label: "Review commercial installation support",
    },
  ],
  sources: [
    {
      href: "https://www.hse.gov.uk/construction/safetytopics/scaffold.htm",
      label: "HSE: tower scaffold planning and use",
    },
  ],
});
