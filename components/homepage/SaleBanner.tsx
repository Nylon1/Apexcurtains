import TrackedLink from "@/components/analytics/TrackedLink";
import { ArrowUpRight } from "lucide-react";
export default function SaleBanner() {
  return (
    <aside className="home-sale" aria-label="Seasonal curtain sale">
      <p className="home-sale-season">Seasonal sale now on</p>
      <div className="home-sale-body">
        <p className="home-sale-offer">
          <strong>Up to 25% off</strong>
          <span>custom-made curtains<small>T&amp;C apply</small></span>
        </p>
        <div className="home-sale-actions">
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
      </div>
    </aside>
  );
}
