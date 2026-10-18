import TrackedLink from "@/components/analytics/TrackedLink";

export default function FinalCta() {
  return (
    <section
      className="home-section home-enquiry"
      id="tell-us-about-your-window"
    >
      <div>
        <p className="editorial-eyebrow">Your room starts here</p>
        <h2>
          Tell us about
          <br />
          your window.
        </h2>
        <p>
          A photograph, a shape, an idea for the room. Start with what you know;
          we’ll help you work through the details.
        </p>
        <div className="home-actions">
          <TrackedLink
            href="/start-designing"
            eventName="curtain_journey_start_click"
            eventData={{ source: "homepage_final" }}
            className="home-button"
          >
            Start your project ↗
          </TrackedLink>
          <a href="tel:08007720367" className="home-button home-button-outline">
            Call 0800 772 0367
          </a>
        </div>
      </div>
      <div className="home-enquiry-notes">
        <h3>A few details. A considered beginning.</h3>
        <ol>
          <li>
            <span>01</span>
            <div>
              <strong>Your window and room</strong>
              <p>
                Choose the closest shape and tell us what you want the curtains
                to do.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Your style and photograph</strong>
              <p>
                Explore fabric, lining and heading preferences. Add a photo now
                or later.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>How to reach you</strong>
              <p>
                Your postcode and contact details help us plan the next
                conversation.
              </p>
            </div>
          </li>
        </ol>
        <p className="home-note">
          If you have approximate width and height, keep them handy for the
          consultation. Manufacturing measurements are confirmed through the
          specialist survey.
        </p>
      </div>
    </section>
  );
}
