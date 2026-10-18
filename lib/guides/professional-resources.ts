import {
  professionalGuide,
  oxfordProfessionalImage,
  surveyDiagram,
  releaseDiagram,
} from "./professional-shared.ts";

export const professionalHubGuide = professionalGuide({
  path: "/professionals",
  title: "Specialist curtains, considered with the architecture.",
  metaTitle:
    "Architectural Curtain Specialists for Designers, Architects & Developers",
  description:
    "Professional curtain and track specification support for architects, interior designers, developers and fit-out teams working with complex architectural glazing.",
  eyebrow: "Professional & specifier support",
  intro:
    "From an early drawing to the dressed curtain, connect the design intent with geometry, support, fabric and installation. Choose the guidance that matches your role and the decision in front of you.",
  image: oxfordProfessionalImage,
  sections: [
    {
      id: "your-role",
      title: "Start with your part of the project",
      paragraphs: [
        "Apex supports project teams specifying apex, triangular, angled, gable-end and double-height curtains, as well as large conventional glazing and commercial interiors. Each discipline brings different information to the same installation.",
      ],
      table: {
        caption: "Guidance tailored to the project team",
        headings: ["Your role", "Key decisions"],
        rows: [
          [
            "Architect",
            "Curtain envelope, recesses, support, clear opening and maintainable access.",
          ],
          [
            "Interior designer",
            "Colour, fabric, heading, lining, scale, samples and the open/closed appearance.",
          ],
          [
            "Developer or housebuilder",
            "Plot references, controlled options, individual surveys, release dates and handover.",
          ],
          [
            "Contractor or fit-out team",
            "Substrate evidence, setting out, interfaces, safe access and site readiness.",
          ],
        ],
      },
      links: [
        { href: "/professionals/architects", label: "Guidance for architects" },
        {
          href: "/professionals/interior-designers",
          label: "Guidance for interior designers",
        },
        {
          href: "/professionals/developers-housebuilders",
          label: "Guidance for developers and housebuilders",
        },
        {
          href: "/professionals/contractors-fit-out",
          label: "Guidance for contractors and fit-out teams",
        },
      ],
    },
    {
      id: "project-stage",
      title: "Resolve the right detail at the right stage",
      paragraphs: [
        "Early review establishes a feasible direction and the information still needed. Final manufacture needs confirmed dimensions, an agreed curtain/track combination and a suitable fixing approach. Keep provisional preferences separate from instructions to make.",
      ],
      diagram: releaseDiagram,
      disclosures: [
        {
          title: "Concept and design development",
          text: "Share drawings, room priorities and the intended open view. Explore the curtain route, retained upper cloth, stack position and the space needed around the glazing.",
        },
        {
          title: "Technical design and procurement",
          text: "Coordinate backing, recesses and clearances with the selected heading, textiles and track. Define responsibilities, evidence, scope and the survey/approval process.",
        },
        {
          title: "Construction and fitting",
          text: "Confirm site dimensions and readiness, protect the interiors and agree access. Review operation, dressing and outstanding items at handover.",
        },
      ],
      links: [
        {
          href: "/professionals/specifier-resources",
          label: "Find guidance for the next decision",
        },
        {
          href: "/professionals/project-review",
          label: "Start a project conversation",
        },
      ],
    },
    {
      id: "project-evidence",
      title: "Use completed work to inform the brief",
      paragraphs: [
        "The Oxford residential gable shows a shaped upper line, double pinch pleats and curtains held in matching tiebacks. The Manchester Airport lounge project demonstrates a different setting: commercial curtain and track installation coordinated with a finished interior.",
        "Use these photographs to discuss visible proportions, coverage and finish. A photograph does not establish a concealed substrate, exact curtain weight or an unrecorded track model. Those details belong in the project specification.",
      ],
      photo: {
        src: "/images/commercial/airport-lounge-main.jpeg",
        alt: "Apex curtain installation in a Manchester Airport lounge",
        width: 1824,
        height: 1026,
        caption:
          "Manchester Airport lounge / Existing Apex commercial project evidence.",
        href: "/commercial-curtain-track-installation#manchester-airport",
        linkLabel: "Read the commercial project and scope",
      },
      links: [
        {
          href: "/gallery/pinch-pleat-curtains-oxford-oxford",
          label: "Oxford: shaped residential curtains",
        },
        { href: "/gallery", label: "Explore completed Apex installations" },
        {
          href: "/room-visualiser",
          label: "Explore an illustrative Oslo room palette",
        },
      ],
    },
    {
      id: "working-together",
      title: "Bring a focused brief, or the question you cannot resolve",
      paragraphs: [
        "A useful first contact identifies the project stage, location, window type and the decision needed. Drawings, photographs and approximate dimensions help establish the next step; they do not need to masquerade as a finished specification.",
        "For teams already given access, the professional workspace is the route to existing project records. New enquiries should use project review or the normal contact route so scope and next steps can be established.",
      ],
      links: [
        {
          href: "/professionals/specifier-resources/project-information-checklist",
          label: "Prepare project information",
        },
        {
          href: "/professionals/project-review",
          label: "Discuss a new project",
        },
        {
          href: "/professionals/workspace/login",
          label: "Sign in to your existing workspace",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Can you advise before a final curtain specification exists?",
      answer:
        "Yes. Share the current drawings, room priorities and unresolved questions. An early review can identify feasibility and missing inputs, with final survey, materials and support confirmation following as appropriate.",
    },
    {
      question: "Is the professional guidance only for commercial buildings?",
      answer:
        "No. It also supports architects, designers, developers and contractors working on private homes, feature glazing, renovations and show homes. Commercial package scope is discussed separately for the relevant site.",
    },
    {
      question: "Does the workspace replace a professional enquiry?",
      answer:
        "No. The workspace login is for authorised project users. Use the project review or contact route to discuss a new enquiry and establish what information is needed.",
    },
  ],
  related: [
    {
      href: "/professionals/specifier-resources",
      label: "Use the technical reference library",
    },
    { href: "/curtain-tracks", label: "Understand the supporting system" },
    {
      href: "/services/premium-installation",
      label: "Plan installation and aftercare",
    },
  ],
});

export const resourcesGuide = professionalGuide({
  path: "/professionals/specifier-resources",
  title: "A practical library for curtain specification.",
  metaTitle: "Curtain Specifier Resources for Architects & Interior Designers",
  description:
    "A decision-led curtain specification library: geometry, tracks, fixing zones, textiles, linings, access and project information for professional teams.",
  eyebrow: "Specifier resources / Find the right detail",
  intro:
    "Start with the decision you need to make. These resources connect the curtain brief to the specialist guidance, project evidence and information needed to move it forward.",
  image: oxfordProfessionalImage,
  sections: [
    {
      id: "geometry-and-operation",
      title: "What arrangement can the window support?",
      paragraphs: [
        "Separate the glass outline from the intended curtain route. Identify the peak, individual slopes, changing drops and floor datum, then agree which parts move and where fabric remains when open. Record door access and the clear view needed by the client.",
      ],
      diagram: surveyDiagram,
      links: [
        { href: "/apex-curtains", label: "Apex curtain arrangements" },
        { href: "/gable-end-curtains", label: "Gable-end glazing" },
        {
          href: "/triangular-window-curtains",
          label: "Triangular window curtains",
        },
        {
          href: "/angled-window-curtains",
          label: "Angled and asymmetric glazing",
        },
        {
          href: "/advice/how-to-measure-for-apex-curtains",
          label: "Initial measurements and geometry",
        },
        { href: "/curtain-tiebacks", label: "Tiebacks and visible coverage" },
      ],
    },
    {
      id: "track-and-support",
      title: "What carries the curtain, and what carries the track?",
      paragraphs: [
        "Use the track guide for Apex's aluminium KS and CS offering, normal white finish and optional black upgrade. Match the actual curtain load and operation to the rail, components, brackets, fixings and supporting construction. A quoted rail limit is not a structural assessment of the building.",
        "Coordinate recess dimensions from the complete curtain and hardware envelope. Keep a current product reference with the project specification and check the instructions for the supplied system before installation.",
      ],
      links: [
        { href: "/curtain-tracks", label: "Forest KS / CS technical guide" },
        {
          href: "/curtain-tracks#structure-and-brackets",
          label: "Fixings, brackets and structure",
        },
        {
          href: "/curtain-headings#tracks-and-space",
          label: "Fold depth versus stack-back",
        },
        {
          href: "/professionals/architects#recess-and-clearance",
          label: "Recess and clearance coordination",
        },
      ],
    },
    {
      id: "textile-specification",
      title: "How will the textile behave at full size?",
      paragraphs: [
        "The fabric, heading and lining form one specification. Review usable width, repeat/orientation, joins, weight, stiffness and care, as well as the colour in the room. Extra layers and greater fullness affect the gathered volume and load.",
        "Agree light-control expectations separately from the lining name. Blackout cloth does not eliminate perimeter gaps. Colours shown on screen are an exploratory aid; physical fabric and lining samples remain the basis for material approval.",
      ],
      links: [
        {
          href: "/curtain-fabrics",
          label: "Fabric selection for very tall curtains",
        },
        {
          href: "/curtain-headings",
          label: "Pencil, double pinch and wave headings",
        },
        {
          href: "/curtain-linings",
          label: "Standard, blackout, thermal and coloured linings",
        },
        {
          href: "/services/design-make-curtains",
          label: "Cutting, joins and manufacture",
        },
        {
          href: "/curtain-colours-and-tones",
          label: "Colour and light in interiors",
        },
        {
          href: "/curtain-accessories",
          label: "Supporting accessories and compatibility",
        },
      ],
    },
    {
      id: "delivery-and-care",
      title: "How will it be fitted, operated and maintained?",
      paragraphs: [
        "Bring access, protection and sequencing into the programme before the room is fully finished. At high level, the route to the work and room for equipment matter as much as the height. Agree how retained curtains or hardware will be accessed for future care.",
      ],
      links: [
        {
          href: "/services/premium-installation#mitower-access",
          label: "MiTOWER and access planning",
        },
        {
          href: "/services/premium-installation",
          label: "Installation, dressing and aftercare",
        },
        {
          href: "/professionals/contractors-fit-out#site-readiness",
          label: "Contractor site-readiness check",
        },
        {
          href: "/commercial-curtain-track-installation",
          label: "Commercial scope and site documentation",
        },
      ],
    },
    {
      id: "project-record",
      title: "Turn the guidance into a usable project record",
      paragraphs: [
        "Use consistent opening references across the plan, elevation, schedule and photographs. Add the drawing revision, source/date of dimensions, decision status and person responsible for unresolved items. A provisional allowance should remain visibly provisional until confirmed.",
        "The checklist helps gather information; the commercial profile provides existing project evidence. Neither is a universal construction detail or an instruction to manufacture. Discuss project-specific support, dimensions, performance requirements and scope with the appropriate team.",
      ],
      links: [
        {
          href: "/professionals/specifier-resources/project-information-checklist",
          label: "Interactive project information checklist",
        },
        {
          href: "/downloads/Apex-Curtains-Commercial-Project-Profile.pdf",
          label: "Download the commercial project profile (PDF)",
        },
        {
          href: "/professionals/project-review",
          label: "Request a project discussion",
        },
        {
          href: "/professionals/workspace/login",
          label: "Existing project workspace sign-in",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Are these guides a project-specific specification?",
      answer:
        "No. They explain the decisions and evidence needed. Final dimensions, materials, system compatibility, structural support and installation method must be confirmed for the actual project.",
    },
    {
      question: "Where should I start if I only have drawings?",
      answer:
        "Start with the geometry and project-information checklist. Identify the latest revision and which dimensions are design assumptions, then use the project review route to discuss feasibility and the next survey stage.",
    },
  ],
  related: [
    { href: "/professionals/architects", label: "Architectural coordination" },
    {
      href: "/professionals/interior-designers",
      label: "Interior specification",
    },
    {
      href: "/professionals/contractors-fit-out",
      label: "Site and installation coordination",
    },
  ],
});

export const checklistGuide = professionalGuide({
  path: "/professionals/specifier-resources/project-information-checklist",
  title: "Curtain & track project information checklist.",
  metaTitle: "Curtain Project Information Checklist",
  description:
    "Prepare a specialist curtain project brief with an interactive, printable checklist for drawings, geometry, fixings, textiles, access, approvals and programme.",
  eyebrow: "Specifier resource / Prepare the brief",
  intro:
    "Gather what is known and mark what still needs confirmation. Tick items as you assemble the information; ticks stay in this page session and are not saved or submitted to Apex. You can print this page using your browser.",
  image: oxfordProfessionalImage,
  sections: [
    {
      id: "project-status",
      title: "Project, contacts and decision status",
      paragraphs: [
        "Identify who is asking, who can approve the package and the decision needed now. Label information as a design preference, provisional assumption or confirmed project input. A tick means information has been gathered, not that it has been technically approved.",
      ],
      checklist: [
        "Professional role, lead contact and project/site location.",
        "Stage: concept, design development, tender, construction or fit-out.",
        "Room/opening/plot references and number of curtains or repeated types.",
        "Current drawing issue and revision dates.",
        "Target review, survey, approval, manufacture and installation dates.",
        "Decision owners and unresolved items with the person responsible.",
      ],
      links: [
        {
          href: "/professionals/project-review",
          label: "What to expect from an initial review",
        },
        {
          href: "/professionals/developers-housebuilders",
          label: "Planning multiple plots",
        },
      ],
    },
    {
      id: "drawings-geometry",
      title: "Drawings and geometry",
      paragraphs: [
        "Use a common opening reference on every drawing and photograph. State whether dimensions come from drawings or a site survey. On an apex, both slopes and the side heights matter; width and peak height alone do not define the curtain.",
      ],
      checklist: [
        "GA plans, elevations and relevant sections; reflected ceiling plans where needed.",
        "Window schedule and photographs showing the whole wall, floor and returns.",
        "Width, separate side heights, peak position and each slope, where available.",
        "Finished floor datum, floor build-up still to be installed and ceiling/recess references.",
        "Known tolerances, asymmetric details or construction subject to change.",
        "Door swings, handles, radiators, joinery and other obstructions.",
      ],
      links: [
        {
          href: "/advice/how-to-measure-for-apex-curtains",
          label: "Initial geometry guide",
        },
        {
          href: "/services/measure-consultation",
          label: "What needs the specialist survey",
        },
      ],
    },
    {
      id: "track-support",
      title: "Track route, operation and fixing support",
      paragraphs: [
        "Show the proposed track line and intended open position, then identify the construction supporting it. If concealed structure is unknown, record it as unresolved rather than guessing from the surface finish.",
      ],
      checklist: [
        "Proposed route: following the shape, framing it or another agreed arrangement.",
        "Wall, ceiling or recess mounting intention and space for the complete curtain.",
        "Substrate/build-up, backing locations and available evidence of continuity.",
        "Services, obstructions and any prohibited fixing zones.",
        "Required operation, retained sections, draw direction and reachable operating position.",
        "Stack location, required clear opening and textile/load information if known.",
        "Power or control interfaces only for a separately confirmed compatible system.",
      ],
      links: [
        { href: "/curtain-tracks", label: "Track specification" },
        {
          href: "/curtain-tracks#structure-and-brackets",
          label: "Support and fixing guidance",
        },
        {
          href: "/curtain-headings#tracks-and-space",
          label: "Space for folds and stacking",
        },
      ],
    },
    {
      id: "curtain-details",
      title: "Curtain construction and sample decisions",
      paragraphs: [
        "Record exact references where available and keep unresolved choices visible. Samples should be reviewed in the intended lighting and alongside the lining and room finishes.",
      ],
      checklist: [
        "Face fabric supplier, collection, colour/reference and sample status.",
        "Fabric width, repeat, orientation, composition and care information.",
        "Heading, fullness intention and compatible hook/carrier arrangement.",
        "Standard, blackout, thermal blackout or coloured lining; optional interlining if agreed.",
        "Finished drop, floor clearance or pooling intention and seam considerations.",
        "Tiebacks, hold positions and matching/contrasting details.",
        "Track finish and expectations for privacy, light gaps and the open view.",
      ],
      links: [
        { href: "/curtain-fabrics", label: "Fabric at tall-window scale" },
        { href: "/curtain-linings", label: "Light control and lining choices" },
        {
          href: "/services/design-make-curtains",
          label: "Construction and manufacture",
        },
      ],
    },
    {
      id: "installation-handover",
      title: "Access, installation and handover",
      paragraphs: [
        "Coordinate the route to the work, the working area and the sequence with other trades. Confirm changes after survey before manufacture or installation proceeds.",
      ],
      checklist: [
        "Actual fixing height, floor conditions and available space for suitable access equipment.",
        "Delivery/carrying route, stairs/lifts, security and site contact.",
        "Protection, working areas and any occupied-site restrictions.",
        "Site-specific induction, permit and RAMS requirements where applicable.",
        "Readiness of ceilings, backing, decoration, flooring and joinery.",
        "Agreed supply/install responsibilities and any client-supplied components.",
        "Snagging, operation checks, dressing, care information and future maintenance access.",
      ],
      links: [
        {
          href: "/services/premium-installation#mitower-access",
          label: "High-level access planning",
        },
        {
          href: "/professionals/contractors-fit-out#site-readiness",
          label: "Contractor readiness check",
        },
        {
          href: "/professionals/project-review",
          label: "Discuss the prepared brief",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Do I need every item before contacting Apex?",
      answer:
        "No. Share the information available and identify the missing decisions. The purpose is to make uncertainties visible so the appropriate next step can be agreed.",
    },
    {
      question: "Are my checklist selections sent to Apex or saved?",
      answer:
        "No. The checkboxes are a local preparation aid in this page session. Use the contact route to discuss the project; do not rely on these ticks as a saved project record or technical approval.",
    },
  ],
  related: [
    {
      href: "/professionals/specifier-resources",
      label: "Return to the technical library",
    },
    {
      href: "/professionals/project-review",
      label: "Start the project discussion",
    },
    {
      href: "/services/measure-consultation",
      label: "Understand the survey stage",
    },
  ],
});

export const projectReviewGuide = professionalGuide({
  path: "/professionals/project-review",
  title: "Let’s review the curtain brief.",
  metaTitle: "Professional Curtain Project Review",
  description:
    "Start a professional review of shaped or tall curtains: share your project stage, drawings, geometry, design intent, fixing information and programme with Apex.",
  eyebrow: "Professional project review / A clear next step",
  intro:
    "You do not need a finished specification to start. Bring the project context and the question you need to answer, and we can establish which design, survey or site information is needed next.",
  image: oxfordProfessionalImage,
  sections: [
    {
      id: "start-the-conversation",
      title: "Tell us what you are trying to resolve",
      paragraphs: [
        "Use the existing contact route or call 0800 772 0367. Identify your professional role, project location and stage, the number/type of openings and your target dates. State the main question: feasibility, track route, support, fabric choice, light control, cost scope or installation access.",
        "If you have drawings or photographs, tell us what is available so the appropriate way to share and review them can be agreed. This page is preparation guidance; it is not a drawing-upload or instant quotation tool.",
      ],
      links: [
        { href: "/contact", label: "Contact the project team" },
        { href: "tel:08007720367", label: "Call 0800 772 0367" },
        {
          href: "mailto:hello@apexcurtains.com?subject=Professional%20curtain%20project%20enquiry",
          label: "Email a professional enquiry",
        },
      ],
    },
    {
      id: "useful-inputs",
      title: "A focused first brief",
      paragraphs: [
        "Send current information with clear opening references and revision dates. Mark rough dimensions as approximate and flag anything still under design. Missing information is useful to know; assumptions presented as confirmed dimensions are much harder to manage.",
      ],
      table: {
        caption: "Starting information and the question it answers",
        headings: ["Input", "Why it helps"],
        rows: [
          [
            "Role, site and project stage",
            "Identifies the team, setting and decision timetable.",
          ],
          [
            "Plans, elevations, sections and window schedule",
            "Connects each opening to the room and construction.",
          ],
          [
            "Photos and approximate dimensions",
            "Shows geometry, height, returns and visible obstructions.",
          ],
          [
            "Design intent and material preferences",
            "Frames the heading, fabric, lining and open-view discussion.",
          ],
          [
            "Support and access information",
            "Identifies what is known about the fixing zone and reach to it.",
          ],
          [
            "Scope and programme",
            "Clarifies supply/install requirements, phasing and target dates.",
          ],
        ],
      },
      links: [
        {
          href: "/professionals/specifier-resources/project-information-checklist",
          label: "Work through the full information checklist",
        },
        {
          href: "/professionals/specifier-resources",
          label: "Find the relevant technical guide",
        },
      ],
    },
    {
      id: "review-outcomes",
      title: "Agree what happens after the first conversation",
      paragraphs: [
        "The next step may be a request for a missing section drawing, a discussion of material samples, a site survey or a more defined package scope. Where an initial estimate is appropriate, it depends on the information and assumptions available.",
        "An early review is not approval to manufacture. The actual geometry, finished levels, curtain/hardware specification, support and access still need the appropriate confirmation. Survey arrangements, any charges, deliverables and timing should be agreed for the project.",
      ],
      diagram: releaseDiagram,
      links: [
        {
          href: "/services/measure-consultation",
          label: "Survey and consultation",
        },
        {
          href: "/services/design-make-curtains",
          label: "Specification before manufacture",
        },
      ],
    },
    {
      id: "responsibility-and-changes",
      title: "Keep open decisions visible",
      paragraphs: [
        "Identify the person who can approve the design and the people responsible for structure, construction and access. Apex can help identify curtain requirements and questions; the supporting building construction and any project performance obligations need the appropriate project evidence.",
        "If ceilings, floors, frames, fabrics or the opening arrangement change, share the revised information before relying on an earlier recommendation or price. Keep the latest issue with the opening reference so a superseded drawing does not become the basis for manufacture.",
      ],
      links: [
        {
          href: "/professionals/architects",
          label: "Architectural design coordination",
        },
        {
          href: "/professionals/contractors-fit-out#responsibilities",
          label: "Installation responsibilities",
        },
        {
          href: "/commercial-curtain-track-installation",
          label: "Commercial package requirements",
        },
      ],
    },
    {
      id: "existing-projects",
      title: "Already working with Apex?",
      paragraphs: [
        "Authorised professional-project users can sign in to the existing workspace. If you need access or are unsure which project record to use, contact the Apex team. Avoid treating an illustrative visualiser scene or a public guide as the approved project specification.",
      ],
      links: [
        {
          href: "/professionals/workspace/login",
          label: "Sign in to your project workspace",
        },
        { href: "/gallery", label: "Review real completed installations" },
      ],
    },
  ],
  questions: [
    {
      question: "Can you review a project from drawings before a site visit?",
      answer:
        "Drawings, photographs and approximate dimensions can support an initial discussion. Final manufacturing dimensions, concealed support and the installation method still need the agreed project-specific confirmation.",
    },
    {
      question: "Does the first review include an immediate fixed quotation?",
      answer:
        "Not necessarily. The available information and agreed scope determine whether an initial estimate is appropriate or more information is needed first. Confirm assumptions, exclusions, survey arrangements and timing with Apex.",
    },
    {
      question: "Can I submit a project through the workspace login?",
      answer:
        "The login is for authorised existing users. For a new professional enquiry, use the contact or telephone route to establish the project and next steps.",
    },
  ],
  related: [
    {
      href: "/professionals/specifier-resources/project-information-checklist",
      label: "Prepare the brief",
    },
    {
      href: "/professionals/specifier-resources",
      label: "Explore the technical library",
    },
    {
      href: "/commercial-curtain-track-installation",
      label: "Review commercial experience",
    },
  ],
});
