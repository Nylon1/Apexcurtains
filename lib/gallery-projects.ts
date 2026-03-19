export type Project = {
  id: number;
  title: string;
  location: string;
  category: string;
  room: string;
  heading: string;
  lining: string;
  image: string;
  summary: string;
  brief: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
};

export const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Barn Conversion Apex Curtains",
    location: "Yorkshire",
    category: "Apex",
    room: "Bedroom",
    heading: "Wave Pleat",
    lining: "Blackout",
    image: "/gallery/barn-conversion-apex.jpg",
    summary:
      "A dramatic apex installation designed to soften a tall glazed gable wall while keeping the room restful and luxurious.",
    brief:
      "The client wanted a curtain solution that softened the tall apex glazing while preserving the dramatic character of the room.",
    challenge:
      "A standard curtain setup would not follow the unusual roofline correctly, and the room also needed privacy and blackout performance.",
    solution:
      "A bespoke wave pleat curtain scheme was designed to work with the apex shape, using blackout lining to improve comfort and sleep quality.",
    result:
      "The room felt calmer, more luxurious and more complete, with the window transformed into a soft architectural focal point.",
    tags: ["Apex", "Bedroom", "Wave Pleat", "Blackout"],
  },
  {
    id: 2,
    title: "Triangular Window Curtains",
    location: "Surrey",
    category: "Triangular",
    room: "Lounge",
    heading: "Pencil Pleat",
    lining: "Thermal",
    image: "/gallery/triangular-lounge.jpg",
    summary:
      "Elegant tailored curtains for an unusual triangular glazing layout in a bright living space.",
    brief:
      "The aim was to dress a triangular lounge window in a way that felt elegant, soft and fully in proportion with the room.",
    challenge:
      "The sharp angles made off-the-shelf options unsuitable, and the client also wanted better comfort in a bright glazed space.",
    solution:
      "A tailored pencil pleat design was chosen, paired with thermal lining to improve comfort while keeping a timeless look.",
    result:
      "The finished installation softened the geometry beautifully and made the space feel warmer, calmer and more refined.",
    tags: ["Triangular", "Lounge", "Thermal"],
  },
];