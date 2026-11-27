export type ProjectMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type PortfolioStory = {
  title: string;
  label: string;
  summary: string;
  category: string;
  room: string;
  themes: string[];
  technical: { title: string; text: string };
  interior: { title: string; text: string };
  facts: { label: string; value: string }[];
  media: ProjectMedia[];
  film?: { src: string; poster: string; description: string };
  services: { href: string; label: string }[];
};

export type PortfolioEdition = {
  projects: Record<string, PortfolioStory>;
  archive: Record<string, PortfolioStory>;
};
