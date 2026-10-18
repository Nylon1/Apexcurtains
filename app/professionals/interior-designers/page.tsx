import SpecialistGuidePage, { guideMetadata } from "@/components/guides/SpecialistGuidePage";
import { designersGuide } from "@/lib/guides/professional-roles";

export const metadata = guideMetadata(designersGuide);

export default function Page() {
  return <SpecialistGuidePage guide={designersGuide} />;
}
