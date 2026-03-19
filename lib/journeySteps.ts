export type JourneyStep = {
  slug: string;
  number: string;
  title: string;
  short: string;
  intro: string;
  body1: string;
  body2: string;
  body3: string;
  image: string;
};

export const journeySteps: JourneyStep[] = [
  {
    slug: "show-us-your-window",
    number: "01",
    title: "Show us your window",
    short: "You send the photo. We start the journey.",
    intro:
      "Every great apex curtain installation starts with understanding the window properly. A photo gives us immediate context around the shape, height, proportions and room setting.",
    body1:
      "Many unusual windows look simple at first glance, but once we see the slope, apex point, side returns and surrounding walls, the right direction becomes much clearer.",
    body2:
      "This step removes guesswork. It helps us quickly understand whether the room needs softness, privacy, blackout, architectural framing or a more statement-led curtain treatment.",
    body3:
      "For the customer, this is the easy part. You send the challenge. We begin turning it into a plan.",
    image: "/journey/show-window.jpeg,"
  },
  {
    slug: "we-decode-the-shape",
    number: "02",
    title: "We decode the shape",
    short: "We work out what the window really needs.",
    intro:
      "Apex and angled windows are not standard glazing. They need a more specialist read before any curtain recommendation makes sense.",
    body1:
      "We look at roof slope, apex height, room use, privacy needs and whether the glazing should feel softened, framed or visually controlled.",
    body2:
      "This is where geometry meets design. Some spaces need wave pleat elegance, some need more softness, and some need a solution that protects the drama of the architecture.",
    body3:
      "The result is a smarter starting point and a much better final outcome than treating the window like a normal one.",
    image: "/journey/decode-shape.jpeg",
  },
  {
    slug: "we-shape-the-design",
    number: "03",
    title: "We shape the design",
    short: "Heading, lining, fullness and mood all come together.",
    intro:
      "Once the shape is understood, we move into design direction. This is where the room starts to gain personality.",
    body1:
      "We consider heading style, curtain fullness, lining choice, stack back, privacy level and how the curtains should sit with the architecture.",
    body2:
      "Some homes suit a calm architectural wave pleat. Others need tailored pinch pleat elegance, softer folds or a more luxurious curtain presence.",
    body3:
      "This stage is about making sure the final curtains do more than cover glass. They need to feel right in the room.",
    image: "/journey/design-direction.jpeg",
  },
  {
    slug: "we-make-it-beautifully",
    number: "04",
    title: "We make it beautifully",
    short: "Bespoke means made around the room, not pulled from a shelf.",
    intro:
      "This is where planning becomes craftsmanship. The curtain solution is made specifically for the shape, scale and atmosphere of the space.",
    body1:
      "Apex curtains need proper tailoring, especially where heights are dramatic, glazing is unusual or the room depends on visual balance.",
    body2:
      "The finish matters. The folds, lining, scale and proportions all contribute to whether the curtains feel cheap, ordinary or truly architectural.",
    body3:
      "When made properly, bespoke curtains turn a difficult window into one of the strongest features in the home.",
    image: "/journey/make-beautifully.jpeg",
  },
  {
    slug: "we-install-and-reveal",
    number: "05",
    title: "We install and reveal",
    short: "The room changes. The window becomes the feature.",
    intro:
      "Installation is the moment the entire process pays off. The glazing softens, the room settles and the architecture feels complete.",
    body1:
      "This is where difficult apex glazing often transforms from something hard to dress into something elegant, warm and properly finished.",
    body2:
      "The right installation improves not only the look of the room, but also comfort, privacy and the overall sense of quality.",
    body3:
      "For many clients, this is the moment they finally see the room the way it was meant to feel.",
    image: "/journey/install-reveal.jpeg",
  },
];

export function getJourneyStep(slug: string) {
  return journeySteps.find((step) => step.slug === slug);
}