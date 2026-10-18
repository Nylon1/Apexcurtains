import WindowEditorialPage from "@/components/guides/WindowEditorialPage";
import { windowStories } from "@/lib/window-stories";
export const metadata = {
  title: "Gable End Curtains | Curtains for Tall Feature Windows",
  description:
    "Specialists in gable end curtains for tall glazed spaces, double-height rooms and dramatic feature windows. Bespoke design, made-to-measure curtains and expert guidance across the UK.",
};
const faqs = [
  {
    q: "Can curtains be fitted to gable end windows?",
    a: "Yes. Gable end windows often need a bespoke curtain solution because of their height, scale and unusual shape. With the right track planning and made-to-measure curtains, they can be dressed beautifully.",
  },
  {
    q: "What are gable end curtains?",
    a: "Gable end curtains are curtain systems designed for large glazed feature windows, often found in vaulted rooms, barn conversions and double-height spaces.",
  },
  {
    q: "Do gable end curtains work in very tall rooms?",
    a: "Yes. In fact, they are especially useful in tall spaces where glazing can otherwise feel cold, exposed or visually overwhelming. Curtains help soften the room and bring balance.",
  },
  {
    q: "Can gable end curtains improve privacy and warmth?",
    a: "Yes. Depending on the fabric and lining, gable end curtains can improve privacy, reduce glare and help make large glazed rooms feel warmer and more comfortable.",
  },
];
const answers = [
  {
    question: "Can curtains be fitted to very tall gable end windows?",
    answer:
      "Yes. Very tall gable glazing can be curtained, but the track specification, curtain weight, fixing points and safe access method all need to be considered early. The taller the room, the more important it is to design the track, heading and installation as one system.",
  },
  {
    question: "What tracks are used for gable end curtains?",
    answer:
      "Large gable-end installations usually need a robust specialist track selected for the span, curtain weight, fixing surface and route around the glazing. The best track is project-specific rather than simply the heaviest available system.",
  },
  {
    question: "Can gable end curtains follow the roof angle?",
    answer:
      "Yes, in many rooms the track can be planned to follow the sloping roof or gable line where suitable fixing points exist. The curtain heading and stack position then need to work with that angled route so the curtains remain practical and visually balanced.",
  },
  {
    question: "Do gable end curtains help with heat and glare?",
    answer:
      "They can. Lined curtains add a substantial fabric layer in front of large areas of glass, which can improve comfort, privacy and glare control. The exact effect depends on the fabric, lining, curtain coverage, window construction and how closely the curtains sit to the glazing.",
  },
  {
    question: "How are double-height curtain installations planned?",
    answer:
      "Planning starts with the glazing dimensions, fixing structure, curtain weight and access requirements. The team also needs to consider how the curtains will operate day to day, where they will stack and whether specialist access equipment is required for installation.",
  },
  {
    question: "What curtain heading suits a gable end window?",
    answer:
      "Wave headings can give tall contemporary rooms a clean architectural finish, while pinch pleats can create more decorative fullness. The correct choice depends on the track route, scale of the room, fabric weight and the amount of stacking space available.",
  },
];
export default function Page() {
  return (
    <WindowEditorialPage
      story={windowStories.gable}
      questions={[
        ...faqs,
        ...answers.map((item) => ({ q: item.question, a: item.answer })),
      ]}
    />
  );
}
