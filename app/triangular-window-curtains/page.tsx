import WindowEditorialPage from "@/components/guides/WindowEditorialPage";
import { windowStories } from "@/lib/window-stories";
export const metadata = {
  title: "Triangular Window Curtains | Made to Measure",
  description:
    "Made-to-measure triangular window curtains with specialist survey and fitting. Explore shaped panels, opening positions, blackout lining and real installations.",
};
const faqs = [
  {
    q: "Can curtains be fitted to triangular windows?",
    a: "Yes. Triangular windows often need a bespoke curtain approach, but with the right planning they can be dressed beautifully and in a way that suits the room.",
  },
  {
    q: "What are triangular window curtains?",
    a: "Triangular window curtains are made-to-measure curtain solutions designed for sharply angled, pointed or unusual shaped windows where standard curtain systems are not suitable.",
  },
  {
    q: "Do triangular window curtains work for privacy and blackout?",
    a: "Yes. Depending on the room and the design direction, triangular window curtains can be made with privacy, blackout or thermal lining options.",
  },
  {
    q: "Are triangular window curtains only for modern homes?",
    a: "No. They can work in both contemporary and traditional spaces. The key is choosing the right curtain style, fabric and overall visual balance for the room.",
  },
];
const answers = [
  {
    question: "How do you curtain a triangular window?",
    answer:
      "A triangular window normally needs a made-to-measure curtain and a track route designed around the angle. The exact solution depends on the slope, fixing surface, curtain stack position and whether the room needs privacy, blackout, thermal comfort or mainly a decorative finish.",
  },
  {
    question: "Can a curtain track follow a triangular window?",
    answer:
      "Yes, where the structure and fixing points allow it. A specialist track can be planned around an angled line, but the curtain heading and how the curtain opens and stacks must be designed with the track rather than treated as separate decisions.",
  },
  {
    question: "Can triangular window curtains be blackout?",
    answer:
      "Yes. Blackout lining can be used, but the shape of the glazing can create edge gaps that need to be considered. For bedrooms or media rooms, the track position, curtain overlap and surrounding surfaces matter as much as the lining itself.",
  },
  {
    question: "What curtain style works on triangular windows?",
    answer:
      "Wave and pinch-pleat styles can both work, depending on the geometry and the look required. Cleaner architectural rooms may suit a more tailored heading, while softer interiors can take more fullness. The track route and available stacking space should guide the final choice.",
  },
  {
    question: "How are triangular windows measured?",
    answer:
      "The key measurements include the base width, side heights, peak or angle position, slope lengths, proposed track line and available fixing surfaces. The floor and any nearby doors, beams or radiators also need to be checked before manufacture.",
  },
  {
    question: "Are triangular curtains suitable for tall glazing?",
    answer:
      "Yes. They can work very well on tall triangular glazing, but the weight of the curtains, track specification, fixing points and safe installation access become more important as the window height and scale increase.",
  },
];
export default function Page() {
  return (
    <WindowEditorialPage
      story={windowStories.triangular}
      questions={[
        ...faqs,
        ...answers.map((item) => ({ q: item.question, a: item.answer })),
      ]}
    />
  );
}
