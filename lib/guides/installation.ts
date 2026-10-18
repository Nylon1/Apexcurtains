import type { SpecialistGuide } from "../specialist-guide-types";

export const installationGuide: SpecialistGuide = {
  path: "/services/premium-installation",
  enhanced: true,
  title: "Installation day. Beautifully finished.",
  metaTitle: "Installation Day & Curtain Aftercare for Apex Windows",
  description:
    "What happens on curtain installation day: specialist fitting, MiTOWER access for high apex and gable windows, dressing, steaming, handover and ongoing curtain care.",
  eyebrow: "The finishing stage / Installation & aftercare",
  intro:
    "The final visit brings the whole scheme together: the line of the track, the fall of the fabric and the way the room feels when the curtains are dressed. Careful fitting and a thoughtful handover help you enjoy that finish every day.",
  image: {
    src: "/window-types/apex-hero.jpg",
    alt: "Full-length pale curtains dressed into soft folds and tied back across an apex window",
    caption:
      "Apex installation photography · The finished hang is considered from the peak to the floor.",
  },
  sections: [
    {
      id: "before-we-arrive",
      detailInteraction: "installation-checklist",
      title: "Make room for the transformation",
      paragraphs: [
        "Before the visit, we review the agreed curtain specification, track route, fixing context and access requirements. Tell us about any changes since the survey: new flooring, a radiator, fitted furniture, ceiling work or a different door arrangement can affect the finished position.",
        "Please clear the approach to the window and put fragile objects somewhere safe. For tall glazing, the clear floor area may need to extend well into the room to accommodate access equipment and its stabilisers. We agree practical arrangements such as parking, carrying routes and furniture movement in advance. Do not attempt to remove heavy curtains or reach high fixings yourself.",
      ],
      links: [
        {
          href: "/services/measure-consultation",
          label: "Where the preparation begins",
        },
      ],
    },
    {
      id: "the-fitting-process",
      title: "From the track line to the final fold",
      paragraphs: [
        "The fitting starts with the room, not the drill. We check the proposed line against the actual window, the finished floor and the support available in the wall or ceiling. Fixings must transfer the curtain load into suitable structure. If the substrate differs from what was expected, the fixing plan needs to be resolved before proceeding.",
      ],
      points: [
        "Prepare and protect the work area, confirm access and check the agreed positions.",
        "Fit and align the track and brackets, with the support selected for the substrate and curtain load.",
        "Hang the panels using the specified hooks or carriers, checking the heading and different drops.",
        "Check the intended movement, overlap, floor clearance and tieback positions.",
        "Dress the folds, review the appearance together and demonstrate everyday use.",
      ],
      links: [
        { href: "/curtain-tracks", label: "Track choice and secure support" },
        { href: "/curtain-tiebacks", label: "Planning the open curtain shape" },
      ],
    },
    {
      id: "mitower-access",
      title: "MiTOWER access for very high windows",
      paragraphs: [
        "High apex and gable windows need a working position from which the fitter can reach the track safely and handle the curtain without stretching. A MiTOWER mobile access tower can provide a guarded platform where the room, floor and working height make it suitable. Its suitability is assessed for the individual installation; a compact tower is not automatically the answer to every tall window.",
        "The standard MiTOWER is a one-person tower. The manufacturer lists platform heights of 2, 3 and 4 metres, with nominal working heights of 4–6 metres. Working height is not platform height and does not guarantee a safe reach to a particular peak. The supplied model, configuration and current manual determine the permitted height and loading. People, tools and materials all contribute to that load.",
        "Planning includes the route through the property, assembly space, full stabiliser footprint, floor strength and level, and clearance from the glass, ceiling beams and lights. A stairwell, void, fragile floor or obstructed area can make a standard configuration unsuitable. If the required reach or base conditions cannot be achieved, we arrange a suitable alternative access method before fitting.",
        "Assembly and use belong to trained, competent people following the manufacturer’s instructions. The tower needs all specified bracing, guardrails, toe boards and stabilisers, with its castors locked and base properly supported. It is inspected after assembly and at the required intervals. The work area below is kept clear of occupants, children and pets.",
        "The fitter uses the designated internal access and stays within the guarded platform. A tower must not be moved with a person or materials on it, used with a ladder or box on the platform to gain extra reach, or used while overreaching. Repositioning is a separate operation followed by the appropriate checks. Curtains and tools also need a planned handling method so lifting or pulling does not destabilise the tower.",
        "This is an explanation of the access planning customers can expect, not an assembly guide. The current MiTOWER instructions and the site risk assessment govern the work. Please leave access equipment to the installation team; any later servicing at height needs its own safe access arrangements.",
      ],
      diagram: {
        src: "/guides/access-planning.svg",
        alt: "Planning diagram identifying high track reach, clear floor area, delivery route and ceiling obstructions in a gable room; it is not a tower assembly drawing",
        caption:
          "Access starts with the room: reach, floor support, stabiliser space and a clear route. No tower assembly or universal reach is implied.",
      },
      links: [
        {
          href: "https://www.popupproducts.co.uk/product/mitower/",
          label: "MiTOWER specifications and current instructions",
        },
        {
          href: "https://www.hse.gov.uk/construction/safetytopics/scaffold.htm",
          label: "HSE guidance on tower scaffolds",
        },
      ],
    },
    {
      id: "dressing-and-steaming",
      photo: {
        src: "/projects/cambridge-apex-curtains-cambridge.jpeg",
        alt: "Long dressed curtain folds with a matching tieback in a completed Cambridge installation",
        width: 900,
        height: 1600,
        caption:
          "Cambridge / Real Apex installation. The finished sweep and fold distribution are considered as part of the whole room.",
        href: "/gallery/cambridge-apex-curtains-cambridge",
        linkLabel: "Explore the finished room",
      },
      title: "Dressing the cloth, revealing the room",
      paragraphs: [
        "Once hung, the curtains are dressed so the folds sit in the intended rhythm. We check the heading, straighten the layers and arrange the hem. A deep or textured fabric may settle differently from a lighter weave; the aim is a natural, balanced fall that respects the character of the cloth.",
        "Where the fabric and lining care instructions permit, controlled steaming can help relax transport creases. Heat and moisture are not suitable for every material or coating. A test in an inconspicuous area, appropriate distance and careful handling matter; delicate fibres, bonded layers and blackout coatings may need another approach. We do not assume every curtain can be steamed or pressed in the same way.",
        "Tall drops and lined curtains may need time to settle. We explain what is normal for your chosen fabric and what to raise with us. If a fold needs encouragement, use the dressing method demonstrated rather than tying it tightly or pulling on the hem.",
      ],
    },
    {
      id: "handover",
      title: "Know how your curtains are meant to move",
      paragraphs: [
        "At handover, we demonstrate the agreed opening and closing method, which sections move and how to gather the fabric into its tiebacks. A sloping installation may have retained sections; it should not be forced to behave like a straight horizontal rail.",
        "Look at the scheme open and closed. Review the folds, overlap and practical clearances, and discuss any visible light around the edges. Blackout lining can reduce light through the cloth, but fitting cannot promise total darkness where environmental gaps remain. Keep the fabric and lining care details with your project information.",
      ],
      links: [
        {
          href: "/curtain-linings#blackout-lining",
          label: "Understanding blackout and light gaps",
        },
      ],
    },
    {
      id: "ongoing-care",
      disclosures: [
        {
          title: "The curtain has started to snag",
          text: "Stop pulling and check from a safe position whether a tieback is still engaged or the hem is catching. Do not climb to release a carrier or apply household lubricant. Contact Apex with the project details so the track, heading and access requirements can be considered.",
        },
        {
          title: "There are creases after hanging",
          text: "Some fabrics need time to settle after transport and fitting. Follow the dressing advice given at handover and raise persistent creases with Apex. Do not apply heat, water or tight binding without checking the care instructions for both face cloth and lining.",
        },
        {
          title: "A spill or mark needs attention",
          text: "Follow the supplied care information and seek advice before using a cleaning product. Different layers can react differently to moisture or solvents. A specialist cleaner should know the curtain construction; high-level removal and refitting may need a separate arrangement.",
        },
        {
          title: "I can see a fixing move",
          text: "Stop operating the affected curtain and keep clear of it. Contact Apex for an assessment. Do not try to tighten high fixings from furniture or continue pulling to test whether they will hold.",
        },
      ],
      title: "Keep the finish looking beautiful",
      paragraphs: [
        "Remove surface dust gently using a soft brush or a low-suction upholstery attachment only where the fabric care guidance allows. Support the cloth as you work and avoid catching trims or pulling at seams. Do not vacuum high headings from an unstable position.",
        "Treat a spill promptly without rubbing it into the fibres. Follow the specific care label and seek advice before applying water, detergent or stain remover. Face fabric and lining can respond differently to washing, so never assume a made-to-measure lined curtain is machine washable. A specialist cleaner should know the full construction, including blackout coatings and interlining.",
        "Release tiebacks before moving any travelling curtain section. Keep hems clear of damp floors, door mechanisms and heat sources, and allow the room to ventilate normally. If you notice sticking carriers, a loose fixing, a torn heading or a change in how a panel hangs, stop pulling and contact us. Heavy or high curtains may need a planned removal and refitting visit.",
      ],
      links: [
        {
          href: "/contact",
          label: "Ask about curtain care or a service visit",
        },
      ],
    },
  ],
  questions: [
    {
      question: "Will MiTOWER reach every high apex window?",
      answer:
        "No. The standard MiTOWER has defined configurations and height limits. Safe reach, floor conditions, stabiliser space and the work itself must be assessed; some rooms require another access method.",
    },
    {
      question: "Will all creases be steamed out on installation day?",
      answer:
        "Dressing and any steaming depend on the fabric and lining care instructions. Some cloth needs time to settle, and heat or moisture may be unsuitable for certain fibres or coatings.",
    },
    {
      question: "Can I take down very high curtains for cleaning myself?",
      answer:
        "Arrange advice first. High curtains can be heavy and difficult to handle, and removing them requires suitable access. A planned service visit is preferable to reaching from furniture or improvising access.",
    },
  ],
  related: [
    {
      href: "/professionals/contractors-fit-out#site-readiness",
      label: "Coordinate site readiness with your team",
    },
    {
      href: "/services/design-make-curtains",
      label: "The specification behind the finish",
    },
    { href: "/curtain-tracks", label: "The line behind the curtain" },
    { href: "/curtain-linings", label: "Choose the right lining" },
    { href: "/gallery", label: "See the finished rooms" },
  ],
  sources: [
    {
      href: "https://www.popupproducts.co.uk/product/mitower/",
      label: "Pop Up Products: MiTOWER product information and instructions",
    },
    {
      href: "https://www.hse.gov.uk/construction/safetytopics/scaffold.htm",
      label: "HSE: tower scaffold selection, inspection and use",
    },
    {
      href: "https://www.hse.gov.uk/work-at-height/introduction.htm",
      label: "HSE: planning work at height",
    },
  ],
};
