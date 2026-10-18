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
    <div className={operational ? undefined : "public-presentation"}>
      {children}
    </div>
  );
}
