import ApexEntryScreen from "@/components/ApexEntryScreen";
import Hero from "@/components/homepage/Hero";
import HomeArchitecturalSpecialisms from "@/components/homepage/HomeArchitecturalSpecialisms";
import HomeWindowDiscovery from "@/components/homepage/HomeWindowDiscovery";
import HomeRoomVisualiser from "@/components/homepage/HomeRoomVisualiser";
import HomeColourStudio from "@/components/homepage/HomeColourStudio";
import HomeProjectStories from "@/components/homepage/HomeProjectStories";
import HomeExpertise from "@/components/homepage/HomeExpertise";
import HomeDetailComparisons from "@/components/homepage/HomeDetailComparisons";
import HomeServiceJourney from "@/components/homepage/HomeServiceJourney";
import HomeSpecialistStory from "@/components/homepage/HomeSpecialistStory";
import ReviewsPreview from "@/components/homepage/ReviewsPreview";
import HomeFurtherGuidance from "@/components/homepage/HomeFurtherGuidance";
import FinalCta from "@/components/homepage/FinalCta";
import HomeAdviceDock from "@/components/homepage/HomeAdviceDock";
import LazyFabricQuiz from "@/components/performance/LazyFabricQuiz";
import "./homepage.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "Apex Curtains | Apex, Gable & Architectural Window Curtains" },
  description: "UK specialists in complex, oversized and high-level curtain installations, from apex and gable windows to double-height glazing. Survey and fitting across England and Wales.",
  openGraph: {
    title: "Apex Curtains | Exceptional Curtains for Exceptional Windows",
    description: "Specialist survey, manufacture and installation for apex, gable, double-height and oversized windows across England and Wales.",
    url: "https://www.apexcurtains.com",
    type: "website",
    images: [{ url: "/window-types/apex-hero.jpg", alt: "A completed Apex gable curtain installation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Curtains | Exceptional Curtains for Exceptional Windows",
    description: "Made-to-measure curtains for apex, gable, double-height and oversized windows.",
    images: ["/window-types/apex-hero.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <ApexEntryScreen />
      <main className="home-experience">
        <Hero />
        <HomeArchitecturalSpecialisms />
        <HomeWindowDiscovery />
        <HomeProjectStories />
        <HomeRoomVisualiser />
        <HomeColourStudio />
        <HomeExpertise />
        <HomeDetailComparisons />
        <HomeServiceJourney />
        <HomeSpecialistStory />
        <ReviewsPreview />
        <HomeFurtherGuidance />
        <details className="home-quiz">
          <summary>
            Still finding your style? Explore the fabric personality quiz{" "}
            <span aria-hidden="true">+</span>
          </summary>
          <LazyFabricQuiz />
        </details>
        <FinalCta />
      </main>
      <HomeAdviceDock />
    </>
  );
}
