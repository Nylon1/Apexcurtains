import SpecialistGuidePage, { guideMetadata } from "@/components/guides/SpecialistGuidePage";
import { professionalHubGuide } from "@/lib/guides/professional-resources";

export const metadata = guideMetadata(professionalHubGuide);

export default function Page() {
  return <SpecialistGuidePage guide={professionalHubGuide} />;
}
