export type NavigationGroup = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  overview: string;
  image: string;
  imageAlt: string;
  links: { label: string; href: string; note: string }[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    id: "work",
    label: "Projects",
    title: "Selected installations",
    description: "See how curtains change the way a room feels, from a glazed gable to a finished hospitality interior.",
    href: "/gallery",
    overview: "View the portfolio",
    image: "/projects/pinch-pleat-curtains-oxford-oxford.jpeg",
    imageAlt: "Curtains framing a broad Oxford gable",
    links: [
      { label: "Residential projects", href: "/gallery", note: "Real installations in shaped and architectural spaces" },
      { label: "Commercial installations", href: "/commercial-curtain-track-installation", note: "Curtains and tracks for commercial interiors" },
      { label: "Client reviews", href: "/reviews", note: "Experiences of the complete service" },
    ],
  },
  {
    id: "windows",
    label: "Specialisms",
    title: "Curtains for the architecture",
    description: "Find guidance for the shape, scale and operation of your curtains.",
    href: "/window-types",
    overview: "Explore window types",
    image: "/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg",
    imageAlt: "Ink-blue curtains following a triangular roofline",
    links: [
      { label: "Apex curtains", href: "/apex-curtains", note: "Curtains shaped around the peak" },
      { label: "Gable-end curtains", href: "/gable-end-curtains", note: "Full glazed walls and vaulted rooms" },
      { label: "Tall and double-height curtains", href: "/tall-window-curtains", note: "Two-storey glazing, mezzanines and stairwells" },
      { label: "Oversized architectural curtains", href: "/oversized-architectural-curtains", note: "Expansive glazing, voiles and heavy linings" },
      { label: "Motorised curtain systems", href: "/motorised-curtain-systems", note: "Electric tracks and independent controls" },
      { label: "Large window curtains", href: "/large-window-curtains", note: "Floor-to-ceiling glazing and wide patio doors" },
      { label: "Other shaped windows", href: "/window-types", note: "Triangular, angled and barn conversion windows" },
    ],
  },
  {
    id: "details",
    label: "How we work",
    title: "From survey to fitting",
    description: "Explore what goes into specifying, making and installing a curtain for a challenging window.",
    href: "/services",
    overview: "Explore the complete service",
    image: "/projects/cambridge-apex-curtains-cambridge.jpeg",
    imageAlt: "Finished curtain folds and tieback from a Cambridge project",
    links: [
      { label: "Survey and consultation", href: "/services/measure-consultation", note: "Geometry, fixing surfaces and access" },
      { label: "Design and manufacture", href: "/oversized-curtain-manufacturing", note: "Fabric, construction and workroom planning" },
      { label: "High-level installation", href: "/high-level-curtain-installation", note: "Survey, difficult access and commissioning" },
      { label: "Installation and aftercare", href: "/services/premium-installation", note: "Dressing, handover and care" },
      { label: "Fabric, tracks and headings", href: "/curtain-design-guide", note: "A guide to designing the whole treatment" },
      { label: "Room visualiser", href: "/room-visualiser", note: "Explore curtain colour with room finishes" },
      { label: "Advice and resources", href: "/advice", note: "Guides for measuring, fabric and ordering" },
      { label: "About Apex", href: "/about-apex-curtains", note: "The team and approach behind your curtains" },
    ],
  },
  {
    id: "professionals",
    label: "Professionals",
    title: "Plan the detail early",
    description: "Bring drawings, specifications and design intent together with the curtain team.",
    href: "/professionals",
    overview: "Professional and specifier hub",
    image: "/images/commercial/airport-lounge-main.jpeg",
    imageAlt: "Long dark curtains in the completed Manchester Airport lounge",
    links: [
      { label: "Architects", href: "/professionals/architects", note: "Geometry, recesses and fixing provisions" },
      { label: "Interior designers", href: "/professionals/interior-designers", note: "Colour, cloth and construction" },
      { label: "Developers and contractors", href: "/professionals/developers-housebuilders", note: "Planning the curtain into the build" },
      { label: "Contractors and fit-out", href: "/professionals/contractors-fit-out", note: "Site readiness and installation" },
      { label: "Trade partnerships", href: "/professionals/trade-partnerships", note: "Workrooms, retailers and subcontract projects" },
      { label: "Specifier resources", href: "/professionals/specifier-resources", note: "Project information and planning guidance" },
      { label: "Professional workspace", href: "/professionals/workspace/login", note: "Access existing project records" },
      { label: "Healthcare screening", href: "/professionals/healthcare", note: "Existing healthcare specification service" },
    ],
  },
];
