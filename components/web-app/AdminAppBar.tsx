"use client";
import { usePathname } from "next/navigation";
import { AdminConnectionNotice, InstallApp } from "./WebApp";

const sections = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/atelier", label: "The Atelier" },
  { href: "/admin/projects", label: "Gallery" },
  { href: "/admin/posts", label: "Advice posts" },
];
export default function AdminAppBar() {
  const path = usePathname();
  return (
    <div className="apx-admin-chrome">
      <header className="apx-admin-bar">
        <a href="/admin" className="apx-admin-name">
          APEX <span>ADMIN</span>
        </a>
        <nav aria-label="Admin sections">
          {sections.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              aria-current={
                (
                  href === "/admin"
                    ? path === href
                    : path === href || path.startsWith(href + "/")
                )
                  ? "page"
                  : undefined
              }
            >
              {label}
            </a>
          ))}
        </nav>
        <InstallApp kind="admin" />
      </header>
      <AdminConnectionNotice />
    </div>
  );
}
