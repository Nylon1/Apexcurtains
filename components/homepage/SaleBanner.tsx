import TrackedLink from "@/components/analytics/TrackedLink";
import { ArrowUpRight } from "lucide-react";
export default function SaleBanner() {
  return (
    <aside className="home-sale" aria-label="Custom-made curtain sale">
      <p>
        <strong>25% off</strong>
        <span>custom-made curtains</span>
      </p>
      <div>
        <TrackedLink
          href="/start-designing"
          eventName="curtain_journey_start_click"
          eventData={{ source: "homepage_sale" }}
          className="home-sale-primary"
        >
          Start your project <ArrowUpRight size={16} aria-hidden="true" />
        </TrackedLink>
        <a href="tel:08007720367">Call 0800 772 0367</a>
      </div>
    </aside>
  );
}
