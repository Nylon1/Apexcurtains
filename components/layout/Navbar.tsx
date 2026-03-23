"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Sparkles, X, ArrowRight, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-2 sm:px-6 sm:pt-4 lg:px-8">
        <div
          className={`mx-auto max-w-7xl rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-white/15 bg-black/60 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "border-white/10 bg-white/5 backdrop-blur-md"
          }`}
        >
          <div className="flex items-center justify-between px-3 py-2 sm:px-5 sm:py-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white sm:h-10 sm:w-10">
                AC
              </div>

              <div className="leading-tight">
                <div className="text-sm font-semibold text-white sm:text-base">
                  Apex Curtains
                </div>
                <div className="hidden text-[10px] tracking-wide text-white/60 sm:block">
                  Apex, triangular &amp; architectural windows
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-[#E5C07B]/15 text-[#f1d48b]"
                        : item.highlight
                        ? "text-white hover:text-[#f1d48b]"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/arlo-curtain-advisor"
                className="inline-flex items-center justify-center rounded-full bg-[#E5C07B] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-105"
              >
                Ask Arlo
              </Link>

              <Link
                href="/start-designing"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Start your Curtain Journey
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-lg lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white">
                AC
              </div>
              <div className="text-base font-semibold text-white">
                Apex Curtains
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 pt-2">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-4">
              <div className="mb-4 flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-[#E5C07B]/15 text-[#f1d48b]"
                          : "text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/arlo-curtain-advisor"
                  className="inline-flex items-center justify-center rounded-full bg-[#E5C07B] px-4 py-3 text-sm font-semibold text-black"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ask Arlo
                </Link>

                <Link
                  href="/start-designing"
                  className="inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
                >
                  Start your Curtain Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

            <Link
  href="tel:08007720367"
  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
>
  <Phone className="mr-2 h-4 w-4" />
  Speak to us
</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}