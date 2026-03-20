import Hero from "@/components/homepage/Hero";
import WindowNavigator from "@/components/homepage/WindowNavigator";
import WhyDifferent from "@/components/homepage/WhyDifferent";
import HomeVisitProcess from "@/components/homepage/HomeVisitProcess";
import GalleryShowcase from "@/components/homepage/GalleryShowcase";
import ApexInstallationJourney from "@/components/homepage/ApexInstallationJourney";
import FabricPersonalityQuiz from "@/components/homepage/FabricPersonalityQuiz";
import SolutionFinder from "@/components/homepage/SolutionFinder";
import ReviewsPreview from "@/components/homepage/ReviewsPreview";
import GuidesPreview from "@/components/homepage/GuidesPreview";
import AreasPreview from "@/components/homepage/AreasPreview";
import ArloPreview from "@/components/homepage/ArloPreview";
import FinalCta from "@/components/homepage/FinalCta";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0d] text-white">
      <Hero />
      <WindowNavigator />
       <HomeVisitProcess />
       <WhyDifferent />
       <GalleryShowcase />
      <ApexInstallationJourney />
      <FabricPersonalityQuiz />
      <SolutionFinder />
     
   
      <ReviewsPreview />
      <GuidesPreview />
      <AreasPreview />
      <ArloPreview />
      <FinalCta />
    </main>
  );
}