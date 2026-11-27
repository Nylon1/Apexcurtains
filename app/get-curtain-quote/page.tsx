import Link from "next/link";
import TrackedLink from "@/components/analytics/TrackedLink";

export const metadata = {
  alternates: { canonical: "https://www.apexcurtains.com/get-curtain-quote" },
  title: "Get a Curtain Quote | Apex Curtains",
  description:
    "Send your window details for a made-to-measure curtain quotation for apex, angled, triangular, gable-end and other difficult glazing.",
};

export default function Page() {
  return (
    <main className="studio-quote">
      <header className="studio-quote-intro studio-wrap">
        <p className="studio-kicker">Private and professional enquiries</p>
        <h1>Get a curtain quote</h1>
        <p>Start with a window photo or share what you know about a larger project. We’ll use your brief to discuss a survey and the next steps.</p>
      </header>
      <div className="studio-wrap studio-quote-paths">
        <section>
          <h2>Start with a window photo</h2>
          <p>For an apex, triangular or angled window, a photo and a few preferences are enough to begin.</p>
          <TrackedLink href="/start-designing" eventName="quote_start_designing" eventData={{ source: "get-curtain-quote" }} className="studio-button">
            Start your curtain journey
          </TrackedLink>
        </section>
        <section>
          <h2>Discuss an architectural project</h2>
          <p>For tall, oversized, motorised or trade work, share dimensions, drawings and any known constraints.</p>
          <TrackedLink href="/architectural-curtain-project-planner" eventName="architectural_project_planner_click" eventData={{ source: "get-curtain-quote" }} className="studio-button">
            Open the project planner
          </TrackedLink>
        </section>
      </div>
      <div className="studio-wrap studio-quote-contact">
        <a className="studio-link" href="tel:08007720367">Call 0800 772 0367</a>
        <Link className="studio-link" href="/curtain-design-guide">Explore the curtain design guide</Link>
      </div>
    </main>
  );
}
