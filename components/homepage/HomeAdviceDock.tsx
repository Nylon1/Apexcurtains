"use client";
import { useEffect, useState } from "react";
import TrackedLink from "@/components/analytics/TrackedLink";
export default function HomeAdviceDock() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("home-hero");
    const enquiry = document.getElementById("tell-us-about-your-window");
    if (!hero || !enquiry) return;
    let pastHero = false;
    let atEnquiry = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero)
          pastHero =
            !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (entry.target === enquiry)
          atEnquiry = entry.isIntersecting || entry.boundingClientRect.top < 0;
      }
      setVisible(pastHero && !atEnquiry);
    });
    observer.observe(hero);
    observer.observe(enquiry);
    return () => observer.disconnect();
  }, []);
  return visible ? (
    <div className="home-mobile-advice">
      <TrackedLink
        href="/start-designing"
        eventName="curtain_journey_start_click"
        eventData={{ source: "homepage_mobile_advice" }}
      >
        Get advice about your window ↗
      </TrackedLink>
    </div>
  ) : null;
}
