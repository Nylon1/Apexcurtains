import Link from "next/link";
import { detailsNavigation } from "@/lib/details-navigation";

export default function DetailsNavigation({ path }: { path: string }) {
  return (
    <nav className="details-navigation" aria-label="Details and fitting guides">
      <Link
        href="/services"
        aria-current={path === "/services" ? "page" : undefined}
      >
        The complete service
      </Link>
      {detailsNavigation.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={link.href === path ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
