export type HealthcarePage = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; paragraphs: string[]; points?: string[] }[];
  category?: "reusable" | "tracks" | "blinds" | "disposable";
};
export const pages: HealthcarePage[] = [
  {
    slug: "reusable-curtains",
    category: "reusable",
    eyebrow: "Made in the Apex workroom",
    title: "Privacy, beautifully made.",
    intro:
      "Reusable clinical curtains made in-house using suitable Panaz curtain fabrics. From one replacement to a complete treatment suite, every curtain starts with the room and its daily use.",
    sections: [
      {
        title: "The fabric is only the beginning",
        paragraphs: [
          "Choose a verified curtain base cloth, then agree the design, dimensions, heading, fullness and finishing. A healthcare collection can also contain upholstery: we only specify cloth supported for the proposed curtain application.",
          "The base-cloth photographs in our collection show the substrate. Printed designs, their colours and any additional treatments need confirmation for that particular base before manufacture.",
        ],
      },
      {
        title: "Designed for the cleaning cycle",
        paragraphs: [
          "Share your facility's laundering process and required fire performance at the outset. Apex will obtain the care information and evidence for the exact design, base, finish and construction. Antimicrobial treatment does not replace cleaning or infection-control procedures.",
        ],
        points: [
          "Cubicle and examination-room privacy",
          "Window curtains where the selected cloth is suitable",
          "Replacement curtains for surveyed existing tracks",
          "Supply only to approved dimensions, or survey and installation",
        ],
      },
      {
        title: "A specification that can be repeated",
        paragraphs: [
          "After approval, we can retain room references, finished sizes, fabric codes and heading details for subsequent orders. Changes to tracks, cleaning policy or room layout should be reviewed before repeating the specification.",
        ],
      },
    ],
  },
  {
    slug: "medical-tracks",
    category: "tracks",
    eyebrow: "Forest Medical Track System",
    title: "A clear line of privacy.",
    intro:
      "Forest MTS offers a practical basis for treatment-bay screening. Apex coordinates the track route, curtain movement, supports and installation around the room.",
    sections: [
      {
        title: "Standard, Flat and Round",
        paragraphs: [
          "Forest lists MTS Standard, Flat and Round profiles. Its web overview also uses Straight for Flat; we retain the brochure name and confirm the order code with the trade supplier. BioCote is documented for MTS Standard only.",
          "Straight runs and factory-formed curves require a dimensioned plan. Forest documents a 20 cm bend and reverse-bend radius; continuous-curve limits need factory confirmation because the current web page and brochure differ.",
        ],
      },
      {
        title: "Support belongs in the specification",
        paragraphs: [
          "Ceiling, wall and suspended installations depend on the chosen brackets, substrate and curtain load. A suspended ceiling tile is not evidence of structural support. Survey the fixing background, services, suspension height, bay layout and access before an installation is priced.",
          "Track mass is not its permitted curtain load. Fixing spacing, loading and the exact bracket schedule require a project-specific technical check.",
        ],
      },
      {
        title: "Heading and carrier compatibility",
        paragraphs: [
          "Apex reusable curtains: confirm the heading, hooks and Forest carriers together. Behrens eyelet curtains: check the eyelet spacing, carrier connection and finished drop. Fixed-hook, U-shaped and EasyClick Behrens systems: compatibility with Forest MTS is awaiting an authorised technical check.",
          "We do not advertise a universal disposable-to-MTS adaptor. Existing-track replacement enquiries should include the manufacturer, a carrier photograph and a room reference.",
        ],
      },
      {
        title: "Repair, replace or extend",
        paragraphs: [
          "We can survey damaged tracks, identify replacement carriers and end stops, and assess a new route for changed treatment layouts. Replacement components and cleaning guidance are confirmed against the actual system.",
        ],
      },
    ],
  },
  {
    slug: "roller-blinds",
    category: "blinds",
    eyebrow: "Introducing Louvolite Ex-Lite",
    title: "Calm light. Considered privacy.",
    intro:
      "Our starting clinical roller-blind range is Louvolite Ex-Lite: a plain blackout fabric with a wipe-clean surface and thirteen manufacturer-listed colours, from soft neutrals to healthcare blue and green.",
    sections: [
      {
        title: "A material with a documented starting point",
        paragraphs: [
          "Louvolite's 2026 commercial card lists 72% PVC and 28% glass fibre, 423 g/m² weight, 0.35 mm thickness and roller widths of 2, 2.5 and 3 metres. These are material widths; finished blind dimensions depend on the selected operating system.",
          "The card states BS 5867 Part 2 Type B and wipe-clean care. Confirm permitted cleaning agents, dilution and contact times against your facility's process before ordering. Louvolite describes antimicrobial properties; this is not a claim that a blind prevents infection.",
        ],
      },
      {
        title: "Blackout cloth, with the edges considered",
        paragraphs: [
          "Ex-Lite limits light through the fabric. Light can still enter around a finished blind, so a requirement for room darkness needs a separate review of gaps, cassette, side guides and installation geometry.",
          "Manual or motorised operation, large-window limits, controls and safety devices are confirmed with the finished-blind maker. Forest Atlantis and Slim Line are alternative systems for technical review; no Ex-Lite and Forest pairing is assumed compatible.",
        ],
      },
      {
        title: "One route from survey to aftercare",
        paragraphs: [
          "Apex surveys the opening, agrees the material and operating system, arranges supply through the confirmed trade route and installs the finished blind. Existing blinds can be assessed for replacement or repair. Supply availability, warranty and lead time are confirmed in the quotation.",
        ],
        points: [
          "Dental and consultation-room privacy",
          "Glare assessment for screens and examination positions",
          "Cleaning access and operating safety",
          "Cassette and guide requirements reviewed individually",
        ],
      },
    ],
  },
  {
    slug: "disposable-curtains",
    category: "disposable",
    eyebrow: "Behrens Healthcare · Supply & replacement",
    title: "Ready for the next change.",
    intro:
      "Disposable clinical curtains with a planned supply and replacement service. Start with the room, finished size and exact hook system, then agree the appropriate Behrens option.",
    sections: [
      {
        title: "The heading makes the difference",
        paragraphs: [
          "Behrens lists eyelet, small fixed-hook, large fixed-hook, U-shaped fixed-hook and EasyClick options. Each has its own stated track applications. A shared colour or size does not make different hook systems interchangeable.",
          "Hospital Blue, Sky, Woodland Green, Cream and Putty appear in the supplier range. Availability is recorded against the individual size and heading; colours and hooks are never combined into invented variants.",
        ],
      },
      {
        title: "Three sizing routes, with clear limits",
        paragraphs: [
          "Standard-size curtains can be quoted against an exact supplier item. Behrens also offers supplier-manufactured bespoke sizes, subject to confirmation of minimum quantity, dimensions, lead time and current production availability.",
          "Apex trimming is not offered as an approved route unless Behrens explicitly permits the alteration and confirms its effect on certification, curtain performance and handling.",
        ],
      },
      {
        title: "Supply and replacement, organised around you",
        paragraphs: [
          "Request initial supply, bulk quantities, a scheduled replacement visit or repeat orders. We can record customer-approved room and track specifications to simplify the next quotation.",
          "Replacement intervals follow the facility's infection-control policy and the circumstances of use. We do not prescribe one change interval for every organisation. Waste and recycling arrangements must be checked with the facility and its authorised waste provider.",
        ],
      },
    ],
  },
  {
    slug: "survey-installation",
    eyebrow: "The Apex service",
    title: "From the first measure to the final handover.",
    intro:
      "One coordinated service for survey, specification, in-house curtain manufacture, specialist sourcing and professional installation across England and Wales, subject to site and project scope.",
    sections: [
      {
        title: "Survey the room in use",
        paragraphs: [
          "Record ceiling heights, widths, drops, mounting surfaces, room routes and privacy requirements. Identify doors, equipment, services, cleaning access and the space needed to move and stack curtains.",
        ],
      },
      {
        title: "Agree the complete package",
        paragraphs: [
          "Define the curtain, track, blind, brackets and controls together. Confirm product evidence, care instructions, working dimensions and the party responsible for each approval. Supply-only orders use approved measurements and specifications.",
        ],
      },
      {
        title: "Plan around clinical operations",
        paragraphs: [
          "Agree access windows, room closures, dust and noise controls, protection and phasing with the facility. RAMS, insurance and other applicable project documentation can be coordinated where required; share your requirements before the visit.",
        ],
      },
      {
        title: "Commission and hand over",
        paragraphs: [
          "Check curtain travel, privacy coverage, blind operation and access for removal. Provide the agreed product and care references, record any outstanding actions and discuss replacement and maintenance arrangements.",
        ],
      },
    ],
  },
  {
    slug: "replacement-maintenance",
    eyebrow: "Continuity of care for your screening",
    title: "Keep every room working.",
    intro:
      "Replacement curtains, disposable supply, track servicing and blind repairs, with a room-by-room record that makes future enquiries easier.",
    sections: [
      {
        title: "Replace the curtain, retain the right track",
        paragraphs: [
          "A survey or clear system photographs can help identify an existing track. Confirm carriers, hook type, heading, usable width and finished drop before ordering replacement reusable or disposable curtains.",
        ],
      },
      {
        title: "Maintain the moving parts",
        paragraphs: [
          "Report stiff travel, missing stops, damaged carriers, loose supports and blind-control faults. We assess repair against replacement, subject to identification and availability of the correct components.",
        ],
      },
      {
        title: "Plan the next order",
        paragraphs: [
          "With your approval, Apex can retain non-patient room references, product codes, dimensions and track details for repeat supply. Quote your previous enquiry reference; we will verify the current details before releasing a new order.",
          "For disposables, agree replacement timing with your infection-control team. The schedule is specific to your facility, not a general product promise.",
        ],
      },
    ],
  },
];
export const sectors = [
  {
    slug: "dental-practices",
    title: "Dental practice screening",
    short: "Dental practices",
    intro:
      "A calm, considered surgery starts with privacy, light and surfaces that fit your cleaning routine.",
    needs: [
      "Position blinds around the patient chair and clinical working light.",
      "Review Ex-Lite cleaning compatibility with the agents used between appointments.",
      "Keep screening clear of cabinetry, suction equipment and routes through the surgery.",
    ],
    rooms:
      "Surgeries, consultation rooms, recovery spaces and street-facing reception windows.",
    brief:
      "Window orientation, chair position, cleaning protocol, privacy at night and working hours for installation.",
  },
  {
    slug: "gp-surgeries",
    title: "GP surgery screening",
    short: "GP surgeries",
    intro:
      "Practical examination-room privacy that respects the patient and the way a busy practice works.",
    needs: [
      "Plan curtain returns around examination couches and changing positions.",
      "Check access for patients, carers and mobility equipment.",
      "Identify reusable or disposable preferences room by room.",
    ],
    rooms:
      "Consultation rooms, treatment rooms, phlebotomy bays and minor-procedure spaces.",
    brief:
      "Couch layout, track photographs, laundering arrangements and the practice replacement policy.",
  },
  {
    slug: "hospitals",
    title: "Hospital privacy curtains & tracks",
    short: "Hospitals",
    intro:
      "Coordinate privacy screening across treatment bays, wards and outpatient departments with a consistent, traceable specification.",
    needs: [
      "Set out track routes against bed movement, clinical equipment and ceiling services.",
      "Confirm supports and suspension before changing bay layouts.",
      "Keep exact disposable hook and size references for repeat supply.",
    ],
    rooms:
      "Wards, outpatient treatment bays, day units and diagnostic changing spaces.",
    brief:
      "Bay plans, phasing, access restrictions, procurement requirements and product evidence schedules.",
  },
  {
    slug: "private-clinics-physiotherapy",
    title: "Private clinic & physiotherapy screening",
    short: "Private clinics & physiotherapy",
    intro:
      "Softness and discretion for treatment spaces, with a finish that supports the character of your practice.",
    needs: [
      "Balance daylight with privacy from corridors and neighbouring buildings.",
      "Create screening around treatment couches without obstructing movement.",
      "Coordinate curtain colour with the interior while retaining the required care performance.",
    ],
    rooms:
      "Physiotherapy studios, specialist consultation rooms, aesthetic clinics and rehabilitation spaces.",
    brief:
      "Treatment layout, desired light levels, room finishes and any need to reconfigure the space.",
  },
  {
    slug: "care-homes",
    title: "Care home privacy solutions",
    short: "Care homes",
    intro:
      "A comfortable, residential feel with practical screening for personal care and day-to-day support.",
    needs: [
      "Consider resident reach, dexterity, visibility and control safety.",
      "Keep curtains clear of hoists, beds and transfer routes.",
      "Match the selected material to the facility's cleaning and fire-safety requirements.",
    ],
    rooms:
      "Bedrooms, assisted-care spaces, consultation rooms and shared activity areas.",
    brief:
      "Resident needs, equipment clearances, laundry processes and installation access with minimal disruption.",
  },
];
export const moreSettings = [
  "Diagnostic & imaging centres",
  "Day surgery & recovery",
  "Optometry & audiology",
  "Community health centres",
  "Occupational health",
  "Rehabilitation & wellbeing clinics",
];
export const serviceSteps = [
  [
    "01",
    "Survey & specify",
    "Understand the room, its structure and the people who use it.",
  ],
  [
    "02",
    "Make & source",
    "Apex-made curtains, carefully matched specialist systems.",
  ],
  [
    "03",
    "Install & hand over",
    "Coordinate access, fit the package and check its operation.",
  ],
  [
    "04",
    "Maintain & repeat",
    "A clear record for repairs, replacements and future orders.",
  ],
];
