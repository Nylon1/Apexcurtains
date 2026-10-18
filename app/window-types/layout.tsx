import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curtains by Window Shape | Apex, Gable & Angled Glazing",
  description: "Find curtain guidance for apex, gable-end, triangular, angled and large windows. Explore real installations, track options and specialist advice.",
  alternates: { canonical: "https://www.apexcurtains.com/window-types" },
};

export default function WindowTypesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
