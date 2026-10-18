import TrackedLink from "@/components/analytics/TrackedLink";
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
        >
          Start your project ↗
        </TrackedLink>
        <a href="tel:08007720367">Call 0800 772 0367</a>
      </div>
    </aside>
  );
}
