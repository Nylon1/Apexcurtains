import Link from "next/link";
export default function HomeFurtherGuidance() {
  return (
    <>
      <section className="home-section home-professionals">
        <div>
          <p className="editorial-eyebrow">
            For considered spaces, from the outset
          </p>
          <h2>
            Architects, interior designers
            <br />& developers.
          </h2>
          <p>
            Bring the curtain into the conversation early. Track locations,
            recesses, fixing provisions, curtain weight, stack-back and access
            all influence the finished architecture.
          </p>
          <p>
            Discuss motorisation requirements before finalising the design:
            shaped routes and retained sections need individual assessment.
          </p>
          <Link href="/professionals" className="home-button home-button-light">
            Plan a project with Apex ↗
          </Link>
        </div>
        <aside>
          <p>
            Before the ceiling is closed.
            <br />
            Before the finishes are chosen.
            <br />
            <em>While the possibilities are open.</em>
          </p>
          <Link
            href="/curtain-tracks#structure-and-brackets"
            className="home-text-link"
          >
            Understand fixing requirements ↗
          </Link>
        </aside>
      </section>
      <nav
        className="home-section home-further-links"
        aria-label="Continue exploring Apex"
      >
        <p className="editorial-eyebrow">Keep exploring</p>
        <div>
          <Link href="/curtain-fabrics">Fabric for very tall curtains ↗</Link>
          <Link href="/faq">What is actually possible? ↗</Link>
          <Link href="/advice">Specialist advice ↗</Link>
          <Link href="/about-apex-curtains">Meet Apex ↗</Link>
          <Link href="/areas">Service areas ↗</Link>
          <Link href="/arlo-curtain-advisor">Explore ideas with Arlo ↗</Link>
        </div>
      </nav>
    </>
  );
}
