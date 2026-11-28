import type { Metadata } from "next";
import Link from "next/link";
import ProjectPlanner from "@/components/architecture/ProjectPlanner";
import ArchitectureDrawing from "@/components/architecture/ArchitectureDrawing";
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
      <header className="arch-hero arch-planner-hero">
        <div className="arch-wrap">
          <nav aria-label="Breadcrumb" className="arch-crumbs">
            <Link href="/">Home</Link>
            <Link href="/get-curtain-quote">Get a curtain quote</Link>
            <span aria-current="page">Project planner</span>
          </nav>
          <div className="arch-planner-intro">
            <div>
              <h1>Architectural curtain project planner</h1>
              <p>For homeowners and professional teams. Start with the window shape and project postcode. Measurements, photos and drawings are optional.</p>
              <a href="#project-details" className="studio-link">Start the consultation <span aria-hidden="true">↓</span></a>
            </div>
            <details className="studio-disclosure arch-measurement-help">
              <summary>Which measurements are helpful?</summary>
              <ArchitectureDrawing kind="height" />
            </details>
          </div>
        </div>
      </header>
      <ProjectPlanner key={type} initialType={type} />
    </main>
  );
}
