export type GuideLink = { href: string; label: string };
export type DetailInteraction =
  | "track-finish"
  | "fixings"
  | "light-paths"
  | "survey-checklist"
  | "installation-checklist"
  | "curtain-layers";
export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  links?: GuideLink[];
  diagram?: { src: string; alt: string; caption: string };
  table?: { caption: string; headings: string[]; rows: string[][] };
  interaction?: "lining" | "tiebacks" | "palette";
  detailInteraction?: DetailInteraction;
  photo?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
    href: string;
    linkLabel: string;
  };
  disclosures?: { title: string; text: string }[];
};
export type SpecialistGuide = {
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  image: { src: string; alt: string; caption: string };
  sections: GuideSection[];
  questions: { question: string; answer: string }[];
  related: GuideLink[];
  sources?: GuideLink[];
  enhanced?: boolean;
};
