import Link from "next/link";
import { architecturalGuides } from "@/lib/architectural-curtains";
import "@/components/architecture/architecture.css";

const pillars = [
  { name: "Complexity", label: "Apex and shaped windows", href: "/apex-curtains" },
  { name: "Height", label: architecturalGuides.tall.label, href: architecturalGuides.tall.path },
  { name: "Scale", label: architecturalGuides.scale.label, href: architecturalGuides.scale.path },
  { name: "Technology", label: architecturalGuides.motors.label, href: architecturalGuides.motors.path },
  { name: "Craftsmanship", label: architecturalGuides.workroom.label, href: architecturalGuides.workroom.path },
  { name: "Installation", label: architecturalGuides.install.label, href: architecturalGuides.install.path },
];

export default function HomeArchitecturalSpecialisms() {
  return (
    <section id="architectural-curtains" className="home-section home-architecture" aria-labelledby="architecture-title">
      <div className="home-section-heading">
        <h2 id="architecture-title">Curtains made for the architecture.</h2>
        <p>For windows that rise through two storeys, follow a roofline or span a whole room, we bring the fabric, track, fixings and fitting together from the first survey.</p>
      </div>
      <div className="home-architecture-list">
        {pillars.map(({ name, label, href }) => (
          <article key={name}>
            <h3>{name}</h3>
            <Link href={href} prefetch={false} className="home-text-link">{label} <span aria-hidden="true">↗</span></Link>
          </article>
        ))}
      </div>
      <div className="home-actions">
        <Link href="/oversized-architectural-curtains#apartments-and-penthouses" prefetch={false} className="home-text-link">Luxury apartments and penthouses ↗</Link>
        <Link href={architecturalGuides.trade.path} prefetch={false} className="home-text-link">Professional and trade partnerships ↗</Link>
      </div>
    </section>
  );
}
