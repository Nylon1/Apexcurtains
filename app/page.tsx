import ApexEntryScreen from "@/components/ApexEntryScreen";
import Hero from "@/components/homepage/Hero";
import SaleBanner from "@/components/homepage/SaleBanner";
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
};

export default function HomePage() {
  return (
    <>
      <ApexEntryScreen />
      <main className="home-experience">
        <SaleBanner />
        <Hero />
        <HomeWindowDiscovery />
        <HomeRoomVisualiser />
        <HomeColourStudio />
        <HomeProjectStories />
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
