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
    id: "windows",
    label: "Window types",
    title: "Find your window.",
    description:
      "From a single slope to a glazed gable wall, explore what your shape makes possible.",
    href: "/window-types",
    overview: "Explore all window types",
    image: "/window-types/apex-hero.jpg",
    imageAlt: "Apex installation following a gable roofline",
    links: [
      {
        label: "Apex curtains",
        href: "/apex-curtains",
        note: "Curtains shaped around the peak",
      },
      {
        label: "Gable-end curtains",
        href: "/gable-end-curtains",
        note: "Full glazed walls and vaulted rooms",
      },
      {
        label: "Triangular windows",
        href: "/triangular-window-curtains",
        note: "Precise angles, considered coverage",
      },
      {
        label: "Angled & sloping windows",
        href: "/angled-window-curtains",
        note: "Single slopes and asymmetric shapes",
      },
      {
        label: "Tall & large windows",
        href: "/large-window-curtains",
        note: "Scale, weight and generous glazing",
      },
      {
        label: "Barn conversions",
        href: "/barn-conversion-curtains",
        note: "Softness for architectural spaces",
      },
    ],
  },
  {
    id: "interiors",
    label: "Colour & style",
    title: "Find the feeling.",
    description:
      "Explore colour, texture and the finishing details that bring a room together.",
    href: "/curtain-colours-and-tones",
    overview: "Enter Colour & Interiors",
    image: "/window-types/triangular.jpeg",
    imageAlt: "Olive curtains connecting a triangular window to the garden",
    links: [
      {
        label: "Colour wheel & interiors",
        href: "/curtain-colours-and-tones#colour-explorer",
        note: "Colour families, room styles and light",
      },
      {
        label: "Oslo fabric collection",
        href: "/curtain-colours-and-tones#colour-selection",
        note: "Prestigious Textiles samples and palettes",
      },
      {
        label: "Room visualiser",
        href: "/room-visualiser",
        note: "Explore Oslo colours on shaped curtains",
      },
      {
        label: "Fabric for tall curtains",
        href: "/curtain-fabrics",
        note: "Drape, joins, scale and sunlight",
      },
      {
        label: "Curtain headings",
        href: "/curtain-headings",
        note: "Choose the rhythm of the folds",
      },
      {
        label: "Tiebacks & finishing",
        href: "/curtain-tiebacks",
        note: "Matching, contrasting and custom-made",
      },
      {
        label: "Curtain design guide",
        href: "/curtain-design-guide",
        note: "Bring the whole specification together",
      },
    ],
  },
  {
    id: "details",
    label: "Details & fitting",
    title: "Beautifully resolved.",
    description:
      "Understand the systems, structure and service behind a specialist curtain installation.",
    href: "/services",
    overview: "Explore the complete service",
    image: "/guides/track-fixing.svg",
    imageAlt: "Technical illustration of wall and ceiling track fixing",
    links: [
      {
        label: "Curtain tracks",
        href: "/curtain-tracks",
        note: "Forest KS / CS, white and black finishes",
      },
      {
        label: "Linings & blackout",
        href: "/curtain-linings",
        note: "Light control, drape and coloured lining",
      },
      {
        label: "Installation & aftercare",
        href: "/services/premium-installation",
        note: "High-level access, dressing and care",
      },
      {
        label: "Survey & consultation",
        href: "/services/measure-consultation",
        note: "Geometry, fixing surfaces and access",
      },
      {
        label: "Design & manufacture",
        href: "/services/design-make-curtains",
        note: "Made for the measured installation",
      },
      {
        label: "Fixings & structure",
        href: "/curtain-tracks#structure-and-brackets",
        note: "Wall, ceiling and load considerations",
      },
      {
        label: "Curtain accessories",
        href: "/curtain-accessories",
        note: "The supporting finishing details",
      },
    ],
  },
  {
    id: "work",
    label: "Our work",
    title: "Real rooms. Real experience.",
    description:
      "See completed installations and hear from the customers who live with them.",
    href: "/gallery",
    overview: "Explore all completed projects",
    image: "/projects/cambridge-apex-curtains-cambridge.jpeg",
    imageAlt: "Completed Apex curtain installation in Cambridge",
    links: [
      {
        label: "Project gallery",
        href: "/gallery",
        note: "Real Apex installation photographs",
      },
      {
        label: "Customer reviews",
        href: "/reviews",
        note: "Experiences of the complete service",
      },
      {
        label: "About Apex",
        href: "/about-apex-curtains",
        note: "The team behind your curtains",
      },
      {
        label: "UK service areas",
        href: "/areas",
        note: "Find out about your area",
      },
    ],
  },
  {
    id: "advice",
    label: "Advice",
    title: "Clarity before you begin.",
    description:
      "Honest answers to the questions that matter for unusual windows.",
    href: "/advice",
    overview: "Explore specialist advice",
    image: "/guides/diy-failure-points.svg",
    imageAlt:
      "Diagram of important apex curtain measuring and fitting considerations",
    links: [
      {
        label: "What is actually possible?",
        href: "/faq#what-is-possible",
        note: "Opening, coverage, height and light gaps",
      },
      {
        label: "Measuring an apex window",
        href: "/advice/how-to-measure-for-apex-curtains",
        note: "What the specialist survey needs to resolve",
      },
      {
        label: "Buying online & DIY fitting",
        href: "/advice/buying-apex-curtains-online",
        note: "Common errors and the cost of correction",
      },
      {
        label: "Ask Arlo",
        href: "/arlo-curtain-advisor",
        note: "Explore early ideas with the curtain advisor",
      },
      {
        label: "Frequently asked questions",
        href: "/faq",
        note: "Practical answers for your project",
      },
    ],
  },
  {
    id: "professionals",
    label: "Professionals",
    title: "Plan the detail early.",
    description:
      "Advice and resources for specifying curtains alongside the architecture.",
    href: "/professionals",
    overview: "Professional & specifier hub",
    image: "/guides/window-shapes.svg",
    imageAlt: "Architectural window shapes illustrated for planning",
    links: [
      {
        label: "Architects",
        href: "/professionals/architects",
        note: "Geometry, recesses and fixing provisions",
      },
      {
        label: "Interior designers",
        href: "/professionals/interior-designers",
        note: "A considered finish for your scheme",
      },
      {
        label: "Developers & housebuilders",
        href: "/professionals/developers-housebuilders",
        note: "Planning the curtain into the build",
      },
      {
        label: "Contractors & fit-out",
        href: "/professionals/contractors-fit-out",
        note: "Coordinate site readiness and installation",
      },
      {
        label: "Specifier resources",
        href: "/professionals/specifier-resources",
        note: "Project information and planning guidance",
      },
      {
        label: "Submit a project for review",
        href: "/professionals/project-review",
        note: "Start an early specification conversation",
      },
      {
        label: "Professional workspace",
        href: "/professionals/workspace/login",
        note: "Access your existing projects",
      },
      {
        label: "Commercial track installation",
        href: "/commercial-curtain-track-installation",
        note: "Specialist installation support",
      },
    ],
  },
];
