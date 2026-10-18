import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { surveyGuide } from "@/lib/guides/survey";
export const metadata = guideMetadata(surveyGuide);
export default function Page() {
  return <SpecialistGuidePage guide={surveyGuide} />;
}
