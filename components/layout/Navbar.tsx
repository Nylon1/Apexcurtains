"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import TrackedLink from "@/components/analytics/TrackedLink";
import { navigationGroups } from "@/lib/site-navigation";

export default function Navbar() {
  const pathname = usePathname();
  return <Navigation key={pathname} pathname={pathname} />;
}

function Navigation({ pathname }: { pathname: string }) {
  const header = useRef<HTMLElement>(null);
  const mobile = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  function restoreScroll() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }
  useEffect(() => {
    const node = header.current;
    function closeDesktop() {
      node
        ?.querySelectorAll<HTMLDetailsElement>("details[open]")
        .forEach((d) => {
          d.open = false;
        });
    }
    function outside(event: PointerEvent) {
      if (!node?.contains(event.target as Node)) closeDesktop();
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        const open = node?.querySelector<HTMLDetailsElement>("details[open]");
        if (open) {
          closeDesktop();
          open.querySelector("summary")?.focus();
        }
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    const desktopSize = window.matchMedia("(min-width: 1280px)");
    const closeMobileAtDesktop = () => {
      if (desktopSize.matches) mobile.current?.close();
    };
    desktopSize.addEventListener("change", closeMobileAtDesktop);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      desktopSize.removeEventListener("change", closeMobileAtDesktop);
      if (previousOverflow.current !== null)
        document.body.style.overflow = previousOverflow.current;
    };
  }, []);
  function openMobile() {
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobile.current?.showModal();
    setMobileOpen(true);
  }
  function closeMobile() {
    mobile.current?.close();
    restoreScroll();
    setMobileOpen(false);
  }
  function current(href: string) {
    return pathname === href.split("#")[0] ? ("page" as const) : undefined;
  }
  return (
    <>
      <header ref={header} className="site-header">
        <div className="site-header-bar">
          <Link href="/" className="site-logo" aria-label="Apex Curtains home">
            <Image
              src="/images/apex-logo-horizontal.svg"
              alt="Apex Curtains"
              width={170}
              height={48}
              priority
            />
          </Link>
          <nav className="site-desktop-nav" aria-label="Main navigation">
            <Link
              href="/"
              className="site-home-link"
              aria-current={current("/")}
            >
              Home
            </Link>
            {navigationGroups.map((group) => (
              <details
                key={group.id}
                name="apex-main-navigation"
                className="site-nav-group"
                onToggle={(event) => {
                  if (event.currentTarget.open)
                    header.current
                      ?.querySelectorAll<HTMLDetailsElement>("details[open]")
                      .forEach((d) => {
                        if (d !== event.currentTarget) d.open = false;
                      });
                }}
              >
                <summary
                  aria-controls={`nav-${group.id}`}
                  className={
                    group.links.some((l) => current(l.href)) ||
                    current(group.href)
                      ? "is-active"
                      : undefined
                  }
                >
                  {group.label}
                  <ChevronDown size={13} />
                </summary>
                <div
                  id={`nav-${group.id}`}
                  className="site-mega-panel"
                  onClick={(event) => {
                    if ((event.target as HTMLElement).closest("a")) {
                      const groupElement =
                        event.currentTarget.closest("details");
                      if (groupElement) groupElement.open = false;
                    }
                  }}
                >
                  <div className="site-mega-intro">
                    <p className="site-nav-eyebrow">Explore / {group.label}</p>
                    <h2>{group.title}</h2>
                    <p>{group.description}</p>
                    <Image
                      src={group.image}
                      alt={group.imageAlt}
                      width={600}
                      height={350}
                      sizes="320px"
                      className={
                        group.image.endsWith(".svg") ? "is-diagram" : undefined
                      }
                    />
                    <Link href={group.href} aria-current={current(group.href)}>
                      {group.overview} ↗
                    </Link>
                  </div>
                  <div className="site-mega-links">
                    {group.links.map((link) => (
                      <Link
                        href={link.href}
                        key={link.label}
                        aria-current={current(link.href)}
                      >
                        <span>
                          {link.label}
                          <span aria-hidden="true">↗</span>
                        </span>
                        <small>{link.note}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              </details>
            ))}
            <Link
              href="/room-visualiser"
              className="site-visualiser-link"
              aria-current={current("/room-visualiser")}
            >
              Room visualiser <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </nav>
          <div className="site-header-actions">
            <a href="tel:08007720367" className="site-header-call">
              Call us
            </a>
            <TrackedLink
              href="/start-designing"
              eventName="curtain_journey_start_click"
              eventData={{ source: "main_navigation" }}
              className="site-project-button"
            >
              Start your project <ArrowUpRight size={16} aria-hidden="true" />
            </TrackedLink>
            <button
              type="button"
              className="site-menu-toggle"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="site-mobile-menu"
              onClick={openMobile}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>
      <noscript>
        <style>{`.site-menu-toggle{display:none}`}</style>
        <nav className="site-nojs-nav" aria-label="Browse Apex pages">
          <details>
            <summary>Explore Apex pages</summary>
            <Link href="/">Home</Link>
            <Link href="/room-visualiser">Room visualiser</Link>
            {navigationGroups.map((group) => (
              <div key={group.id}>
                <h2>
                  <Link href={group.href}>{group.label}</Link>
                </h2>
                {group.links.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </details>
        </nav>
      </noscript>
      <dialog
        ref={mobile}
        id="site-mobile-menu"
        className="site-mobile-menu"
        aria-label="Apex Curtains navigation"
        onClose={() => {
          restoreScroll();
          setMobileOpen(false);
        }}
      >
        <div className="site-mobile-top">
          <Link href="/" onClick={closeMobile}>
            <Image
              src="/images/apex-logo-horizontal.svg"
              alt="Apex Curtains home"
              width={150}
              height={43}
            />
          </Link>
          <button type="button" aria-label="Close menu" onClick={closeMobile}>
            <X size={22} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <Link
            href="/"
            onClick={closeMobile}
            className="site-mobile-home"
            aria-current={current("/")}
          >
            Home ↗
          </Link>
          <Link
            href="/room-visualiser"
            onClick={closeMobile}
            className="site-mobile-visualiser"
            aria-current={current("/room-visualiser")}
          >
            <Image
              src="/visualiser/double-pinch-gable-thumb.webp"
              alt=""
              width={160}
              height={120}
              sizes="88px"
            />
            <span>
              Room visualiser <small>Design your whole room</small>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          {navigationGroups.map((group) => (
            <details key={group.id} name="apex-mobile-navigation">
              <summary>
                {group.label}
                <ChevronDown size={18} />
              </summary>
              <p>{group.description}</p>
              <Link
                href={group.href}
                onClick={closeMobile}
                aria-current={current(group.href)}
                className="site-mobile-overview"
              >
                {group.overview} ↗
              </Link>
              {group.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMobile}
                  aria-current={current(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </details>
          ))}
        </nav>
        <div className="site-mobile-contact">
          <TrackedLink
            href="/start-designing"
            eventName="curtain_journey_start_click"
            eventData={{ source: "mobile_navigation" }}
            className="site-project-button"
            onClick={closeMobile}
          >
            Start your project <ArrowUpRight size={16} aria-hidden="true" />
          </TrackedLink>
          <a href="tel:08007720367">Call 0800 772 0367</a>
          <p>
            Specialist advice for your window,
            <br />
            from the first idea to the final fold.
          </p>
        </div>
      </dialog>
    </>
  );
}
