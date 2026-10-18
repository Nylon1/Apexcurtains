import SpecialistGuidePage, { guideMetadata } from "@/components/guides/SpecialistGuidePage";
import { contractorsGuide } from "@/lib/guides/professional-roles";

export const metadata = guideMetadata(contractorsGuide);

export default function Page() {
  return <SpecialistGuidePage guide={contractorsGuide} />;
}
