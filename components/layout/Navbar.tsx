"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { ArrowRight, Phone } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Window Types", href: "/window-types" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Advice", href: "/advice" },
  { label: "Areas", href: "/areas" },
  { label: "Get Advice", href: "/contact", highlight: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-2 sm:px-6 sm:pt-4 lg:px-8">
        <div
          className={`mx-auto max-w-7xl rounded-full border transition-all duration-300 h-[56px] sm:h-auto${
            scrolled
              ? "border-white/15 bg-black/55 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "border-white/10 bg-white/5 backdrop-blur-md"
          }`}
        >
          <div className="flex items-center justify-between px-3 py-2 sm:px-6 sm:py-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-white">
                AC
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wide text-white">
                  Apex Curtains
                </div>
                <div className="hidden text-[11px] text-white/45 sm:block">
                  Apex, triangular & architectural windows
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative rounded-full px-4 py-2 text-sm transition ${
                      active
                        ? "text-[#f5d38a]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 rounded-full transition ${
                        active
                          ? "bg-[#f5d38a]/10 shadow-[0_0_22px_rgba(245,211,138,0.18)]"
                          : "bg-transparent"
                      }`}
                    />
                    <span className="relative">{item.label}</span>
                    <span
                      className={`absolute left-1/2 -bottom-1 h-[2px] -translate-x-1/2 rounded-full bg-[#f5d38a] transition-all duration-300 ${
                        active ? "w-8 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

             <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/arlo-curtain-advisor"
                className="inline-flex items-center gap-2 rounded-full bg-[#f5d38a] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#e6c476]"
              >
                Ask Arlo 
                
              </Link>
                 
              <Link
                href="/start-designing"
                className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-gray-100"
              >
                Start your Curtain Journey
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md lg:hidden">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="text-base font-semibold text-white">Apex Curtains</div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 pt-3">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-4">
              <div className="mb-5 flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-2xl border px-4 py-3 ${
                        active
                          ? "border-[#f5d38a]/30 bg-[#f5d38a]/10 text-[#f5d38a]"
                          : "border-white/10 bg-white/5 text-white/85"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3">
                <button className="rounded-full border border-[#f5d38a]/25 bg-[#f5d38a]/10 px-4 py-3 text-sm text-[#f5d38a]">
                  Ask Arlo
                </button>

                <Link
                  href="/start-designing"
                  className="rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Start Designing
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}