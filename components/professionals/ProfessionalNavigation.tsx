import Link from "next/link";

export const professionalLinks = [
  { href: "/professionals", label: "Professional hub" },
  { href: "/professionals/architects", label: "Architects" },
  { href: "/professionals/interior-designers", label: "Interior designers" },
  { href: "/professionals/developers-housebuilders", label: "Developers" },
  { href: "/professionals/contractors-fit-out", label: "Contractors" },
  { href: "/professionals/specifier-resources", label: "Specifier resources" },
  {
    href: "/commercial-curtain-track-installation",
    label: "Commercial installation",
  },
];

export default function ProfessionalNavigation({ path }: { path: string }) {
  return (
    <nav className="details-navigation" aria-label="Professional guidance">
      {professionalLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={path === href ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
