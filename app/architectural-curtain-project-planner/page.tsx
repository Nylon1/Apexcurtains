import type { Metadata } from "next";
import Link from "next/link";
import ProjectPlanner from "@/components/architecture/ProjectPlanner";
import { architecturalPlannerPath } from "@/lib/architectural-curtains";
import { resolveProjectType } from "@/lib/architectural-enquiry";
import "@/components/architecture/architecture.css";

export const metadata: Metadata = {
  title: "Architectural curtain project planner",
  description: "Share window dimensions, photographs, drawings and access details for a tall, shaped, motorised or oversized curtain project.",
  alternates: { canonical: architecturalPlannerPath },
  openGraph: {
    title: "Architectural curtain project planner | Apex Curtains",
    description: "Share your window and project details with the Apex curtain team.",
    url: architecturalPlannerPath,
  },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const type = resolveProjectType((await searchParams).type);
  return (
    <main className="arch-page">
      <header className="arch-hero">
        <div className="arch-wrap">
          <nav aria-label="Breadcrumb" className="arch-crumbs">
            <Link href="/">Home</Link>
            <Link href="/get-curtain-quote">Get a curtain quote</Link>
            <span aria-current="page">Project planner</span>
          </nav>
          <h1>Architectural curtain project planner</h1>
          <p>Tell us about the window, the curtain you have in mind and any access or fixing constraints. Send what you know and we can discuss the details that need a survey.</p>
          <a href="#project-details" className="arch-button">Enter project details</a>
        </div>
      </header>
      <ProjectPlanner key={type} initialType={type} />
    </main>
  );
}
