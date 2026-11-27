"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PublicPresentation({
  children,
}: {
  children: ReactNode;
}) {
  const path = usePathname();
  const privateRoute = ["/admin", "/auth", "/professionals/workspace"]
    .some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  const consultationRoute = [
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
            : privateRoute
              ? undefined
              : consultationRoute
                ? "public-presentation studio-consultation"
                : "public-presentation"
      }
    >
      {children}
    </div>
  );
}
