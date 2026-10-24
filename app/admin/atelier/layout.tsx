import type { Metadata } from "next";
import "./atelier.css";
export const metadata: Metadata = {
  title: "The Atelier",
  robots: { index: false, follow: false },
  description: "The private Apex Curtains survey and design workspace.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
