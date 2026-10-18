import SpecialistGuidePage, { guideMetadata } from "@/components/guides/SpecialistGuidePage";
import { projectReviewGuide } from "@/lib/guides/professional-resources";

export const metadata = guideMetadata(projectReviewGuide);

export default function Page() {
  return <SpecialistGuidePage guide={projectReviewGuide} />;
}
