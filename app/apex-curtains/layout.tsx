import type { ReactNode } from "react";
import { canonicalMetadata } from "@/lib/seo-metadata";
export const metadata = canonicalMetadata("/apex-curtains");
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
