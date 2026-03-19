import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Made in the UK Curtains", href: "/made-in-uk-curtains" },
  { label: "Get Quote for Curtains", href: "/start-designing" },
  { label: "Recent Projects", href: "/gallery" },
  { label: "Apex Blinds", href: "/apex-blinds" },
  { label: "About Apex Curtains", href: "/about-apex-curtains" },
  { label: "Check Your City Here", href: "/areas" },
];

const infoLinks = [
  { label: "Our Price Promise", href: "/price-promise" },
  { label: "Press & Media Enquiries", href: "/press" },
  { label: "Seen on TV", href: "/seen-on-tv" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Cookies Policy", href: "/cookies" },
  { label: "Data Subject Request", href: "/data-request" },
];

const helpLinks = [
  { label: "Arlo | Smart Apex Window Curtain Advisor", href: "/arlo-curtain-advisor" },
  { label: "Hanging Curtains on Apex Windows", href: "/advice/hanging-curtains-on-apex-windows" },
  { label: "Measuring for Curtains for Apex Windows", href: "/advice/measuring-for-curtains-for-apex-windows" },
  { label: "Curtain Trends for Angled Windows in 2025", href: "/advice/curtain-trends-for-angled-windows-in-2025" },
  { label: "How to Measure for Electric Blinds on Apex Windows", href: "/advice/how-to-measure-for-electric-blinds-on-apex-windows" },
  { label: "Motorised Blinds for Apex Windows: The Ultimate Guide", href: "/advice/motorised-blinds-for-apex-windows-the-ultimate-guide" },
  { label: "Frequently Asked Questions", href: "/advice" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-[#09090c] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,211,138,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(125,211,252,0.08),transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f5d38a]/20 bg-[#f5d38a]/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#f5d38a]">
              <Sparkles className="h-4 w-4" />
              Premium Apex Curtain Specialists
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Bespoke curtains for apex, angled and architectural windows
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Crafted for difficult windows, large glazing and luxury interiors
              across the UK.
            </p>
          </div>

       
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
            
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.9fr_0.95fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <h3 className="text-2xl font-semibold text-white">Contact us</h3>

            <div className="mt-6 space-y-4 text-white/72">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-[#f5d38a]" />
                <div>
                  <div className="text-sm text-white/45">Phone</div>
                  <a
                    href="tel:08007720367"
                    className="mt-1 block text-base text-white transition hover:text-[#f5d38a]"
                  >
                    0800 772 0367
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 text-[#f5d38a]" />
                <div>
                  <div className="text-sm text-white/45">Email</div>
                  <a
                    href="mailto:hello@apexcurtains.com"
                    className="mt-1 block text-base text-white transition hover:text-[#f5d38a]"
                  >
                    hello@apexcurtains.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-[#f5d38a]" />
                <div>
                  <div className="text-sm text-white/45">Coverage</div>
                  <div className="mt-1 text-base text-white">
                    Nationwide UK Installation
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FooterColumn title="Quick Links" items={quickLinks} highlight />
          <FooterColumn title="Information" items={infoLinks} />
          <FooterColumn title="Help" items={helpLinks} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Apex Curtains. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <span>Luxury curtain solutions for apex shaped windows</span>
            <span className="hidden sm:inline">•</span>
            <span>Made to measure across the UK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  highlight,
}: {
  title: string
  items: { label: string; href: string }[]
  highlight?: boolean
}) {
  return (
    <div>
      <h3
        className={`text-2xl font-semibold ${
          highlight ? "text-[#d6ef58]" : "text-white"
        }`}
      >
        {title}
      </h3>

      <ul className="mt-6 space-y-3">
       {items.map((item) => (
  <li key={item.href}>
    <a
      href={item.href}
      className="text-white/70 hover:text-[#f5d38a] transition"
    >
      {item.label}
    </a>
  </li>
))}
      </ul>
    </div>
  );
}