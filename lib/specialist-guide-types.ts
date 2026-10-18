export type GuideLink = { href: string; label: string };
export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  links?: GuideLink[];
  diagram?: { src: string; alt: string; caption: string };
  table?: { caption: string; headings: string[]; rows: string[][] };
  interaction?: "lining" | "tiebacks" | "palette";
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
};
