import Link from "next/link";

const faqs = [
  {
    question: "Can I send a photo instead of measuring everything myself?",
    answer:
      "Yes. In many cases, a clear photo is the best starting point. We can guide you on the most suitable next step from there.",
  },
  {
    question: "Do you help with apex, triangular and other unusual windows?",
    answer:
      "Yes. That is exactly where we add the most value. We specialise in shaped, angled and architectural glazing.",
  },
  {
    question: "Do I need to know which fabric or heading style I want?",
    answer:
      "No. We can guide you through fabrics, linings, heading styles and track options based on your room and priorities.",
  },
  {
    question: "What is the best way to get started?",
    answer:
      "The best route is to start your curtain journey and upload your window details. That gives us the clearest picture of your space.",
  },
];

export const metadata = {
  alternates: { canonical: "https://www.apexcurtains.com/contact" },
  title: "Contact Apex Curtains",
  description:
    "Get expert advice for apex, triangular and architectural windows. Upload your window details, ask questions or start your curtain journey.",
};



export default function ContactPage() {
  return (
    <main className="studio-paper-page area-page">
      <div className="studio-wrap area-guide">
        <nav className="guide-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Contact</span></nav>
        <header className="area-opening">
          <div>
            <h1>Discuss your window</h1>
            <p>Tell us about the room, the shape of the glazing and what you want the curtains to do. A photograph taken from floor level is a useful starting point.</p>
          </div>
          <aside>
            <h2>Speak to Apex</h2>
            <ul className="area-links">
              <li><a href="tel:08007720367">0800 772 0367</a></li>
              <li><a href="mailto:hello@apexcurtains.com?subject=Curtain%20Enquiry">hello@apexcurtains.com</a></li>
            </ul>
          </aside>
        </header>
        <div className="area-body">
          <section>
            <h2>Enquire about curtains</h2>
            <p>For an apex, triangular or gable window, the guided quotation asks about the shape, the room and your preferences.</p>
            <Link className="studio-button" href="/start-designing">Start a curtain quote</Link>
            <p><Link className="studio-link" href="/get-curtain-quote">See the quotation options</Link></p>
          </section>
          <section>
            <h2>Plan an architectural project</h2>
            <p>For tall glazing, oversized curtains, motorised tracks or a trade enquiry, use the project planner. You can include drawings and flag access questions for the survey.</p>
            <Link className="studio-button" href="/architectural-curtain-project-planner">Open the project planner</Link>
          </section>
          <section>
            <h2>Before you enquire</h2>
            {faqs.map(faq => <details className="area-question" key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </section>
          <nav aria-label="Explore Apex Curtains">
            <h2>Further guidance</h2>
            <ul className="area-links">
              <li><Link href="/areas">Find your service area</Link></li>
              <li><Link href="/gallery">See completed installations</Link></li>
              <li><Link href="/advice">Read the curtain advice library</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
