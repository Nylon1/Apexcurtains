import WindowEditorialPage from "@/components/guides/WindowEditorialPage";
import { windowStories } from "@/lib/window-stories";
export const metadata = {
  title: "Apex Curtains | Curtains for Angled & Triangular Windows",
  description:
    "Specialists in apex curtains for angled, triangular and architectural windows. Bespoke design, made-to-measure curtains and expert guidance across the UK.",
};
const faqs = [
  {
    q: "Can curtains be fitted to apex windows?",
    a: "Yes. Apex windows usually need a more specialist approach than standard windows, but bespoke curtain systems can be designed to suit the slope, height and overall architecture of the room.",
  },
  {
    q: "What are apex curtains?",
    a: "Apex curtains are made-to-measure curtain solutions designed for sloped, triangular or sharply angled windows. They are usually paired with a custom track and a tailored heading style.",
  },
  {
    q: "Do apex curtains work for privacy and blackout?",
    a: "Yes. Depending on the room and the shape of the glazing, apex curtains can be designed with privacy linings, blackout linings or thermal interlinings to improve comfort and control light.",
  },
  {
    q: "Are apex curtains suitable for large feature windows?",
    a: "Yes. They are particularly effective in dramatic spaces where the glazing is a major feature. The right curtain scheme helps soften the room while still respecting the architecture.",
  },
];
const answers = [
  {
    question: "What curtains work best on apex windows?",
    answer:
      "Made-to-measure curtains on a track planned around the slope are usually the strongest option. The heading, fullness and lining should be chosen around the window geometry, room use and how much privacy, blackout or thermal comfort is needed.",
  },
  {
    question: "Can curtains follow a sloping ceiling?",
    answer:
      "Yes. A specialist track can be planned to follow an angled or sloping line where the structure and fixing points allow it. The track route, curtain heading and stacking position need to be designed together so the finished curtain hangs cleanly.",
  },
  {
    question: "Can apex curtains be blackout?",
    answer:
      "Yes. Blackout lining can be specified for apex curtains, although the overall result also depends on the window shape, track position and any light gaps around the edges. Bedrooms often need these details considered from the start rather than treating lining as an afterthought.",
  },
  {
    question: "Curtains or blinds for apex windows?",
    answer:
      "Curtains are often the more flexible solution for large, angled and dramatic apex glazing because they can follow the architecture while adding softness, privacy and insulation. Blinds may suit some shapes, but the practical limits increase as the window becomes taller or more complex.",
  },
  {
    question: "How are apex windows measured for curtains?",
    answer:
      "The useful measurements go beyond width and height. The slope, side heights, peak position, proposed track line, fixing surface, floor level and stacking space all matter. For complex or high windows, a site measure is usually the safest basis for the final design.",
  },
  {
    question: "How are very high apex curtains installed?",
    answer:
      "High installations are planned around safe access, suitable fixing points and the weight of the track and curtains. The access method depends on the building and height, so installation planning should happen alongside the curtain and track design rather than after manufacture.",
  },
];
export default function Page() {
  return (
    <WindowEditorialPage
      story={windowStories.apex}
      questions={[
        ...faqs,
        ...answers.map((item) => ({ q: item.question, a: item.answer })),
      ]}
    />
  );
}
