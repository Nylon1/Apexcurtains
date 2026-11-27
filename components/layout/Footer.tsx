import Image from "next/image";
import Link from "next/link";
import { InstallApp } from "@/components/web-app/WebApp";

const exploreLinks = [
  { label: "Room Visualiser", href: "/room-visualiser" },
  { label: "Colour & Interiors", href: "/curtain-colours-and-tones" },
  { label: "Curtain Design Guide", href: "/curtain-design-guide" },
  { label: "Window Types", href: "/window-types" },
  { label: "Curtain Tracks", href: "/curtain-tracks" },
  { label: "Gallery", href: "/gallery" },
  { label: "Advice", href: "/advice" },
  { label: "Areas", href: "/areas" },
];

const specificationLinks = [
  { label: "Curtain Headings", href: "/curtain-headings" },
  { label: "Curtain Fabrics", href: "/curtain-fabrics" },
  { label: "Curtain Linings", href: "/curtain-linings" },
  { label: "Curtain Tiebacks", href: "/curtain-tiebacks" },
  { label: "Blackout, Thermal & Privacy", href: "/curtain-solutions" },
  { label: "Installation & Aftercare", href: "/services/premium-installation" },
];

const helpLinks = [
  { label: "Professional Workspace", href: "/professionals/workspace/login" },
  { label: "Professional & Specifier Hub", href: "/professionals" },
  { label: "Ask Arlo", href: "/arlo-curtain-advisor" },
  {
    label: "Measure an Apex Window",
    href: "/advice/how-to-measure-for-apex-curtains",
  },
  {
    label: "Apex Curtain Pricing",
    href: "/advice/how-much-do-apex-window-curtains-cost-in-the-uk-full-2026-pricing-guide",
  },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Reviews", href: "/reviews" },
];

const infoLinks = [
  { label: "About Apex Curtains", href: "/about-apex-curtains" },
  { label: "Press & Media", href: "/press" },
  { label: "Seen on TV", href: "/seen-on-tv" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Cookies Policy", href: "/cookies" },
];

function LinkGroup({ title, links }: { title: string; links: typeof exploreLinks }) {
  return (
    <div className="studio-footer-links">
      <h3>{title}</h3>
      <ul>{links.map(({ href, label }) => <li key={href}><Link href={href} prefetch={false}>{label}</Link></li>)}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="studio-footer">
      <div className="studio-wrap">
        <div className="studio-footer-lead">
          <Link href="/" aria-label="Apex Curtains home" prefetch={false}><Image src="/images/apex-logo-horizontal.svg" alt="Apex Curtains" width={176} height={50} /></Link>
          <div>
            <p>Specialist survey and installation across England and Wales.</p>
            <a href="tel:08007720367">0800 772 0367</a>
            <a href="mailto:hello@apexcurtains.com">hello@apexcurtains.com</a>
          </div>
          <Link href="/architectural-curtain-project-planner" className="studio-button">Discuss your project</Link>
        </div>
        <div className="studio-footer-columns">
          <LinkGroup title="Explore" links={exploreLinks} />
          <LinkGroup title="Specification" links={specificationLinks} />
          <LinkGroup title="Advice and professionals" links={helpLinks} />
          <LinkGroup title="Apex" links={[{ label: "Contact", href: "/contact" }, { label: "Start with a window photo", href: "/start-designing" }, ...infoLinks]} />
        </div>
        <div className="studio-footer-end"><span>© {new Date().getFullYear()} Apex Curtains</span><InstallApp kind="public" /></div>
      </div>
    </footer>
  );
}
