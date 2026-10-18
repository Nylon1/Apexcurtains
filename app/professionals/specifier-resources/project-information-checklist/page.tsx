import SpecialistGuidePage, { guideMetadata } from "@/components/guides/SpecialistGuidePage";
import { checklistGuide } from "@/lib/guides/professional-resources";

export const metadata = guideMetadata(checklistGuide);

export default function Page() {
  return <SpecialistGuidePage guide={checklistGuide} />;
}
