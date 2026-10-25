"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PublicPresentation({
  children,
}: {
  children: ReactNode;
}) {
  const path = usePathname();
  const operational = [
    "/admin",
    "/auth",
    "/professionals/workspace",
    "/start-designing",
    "/get-curtain-quote",
    "/arlo-curtain-advisor",
  ].some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  return (
    <div
      className={
        path.startsWith("/admin/atelier")
          ? "admin-presentation atelier-presentation"
          : path === "/admin" || path.startsWith("/admin/")
            ? "admin-presentation"
            : operational
              ? undefined
              : "public-presentation"
      }
    >
      {children}
    </div>
  );
}
