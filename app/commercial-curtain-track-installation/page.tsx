import SpecialistGuidePage, { guideMetadata } from "@/components/guides/SpecialistGuidePage";
import { commercialGuide } from "@/lib/guides/professional-commercial";

export const metadata = guideMetadata(commercialGuide);

export default function Page() {
  return <SpecialistGuidePage guide={commercialGuide} />;
}
