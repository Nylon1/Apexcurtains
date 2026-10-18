import SpecialistGuidePage, { guideMetadata } from "@/components/guides/SpecialistGuidePage";
import { resourcesGuide } from "@/lib/guides/professional-resources";

export const metadata = guideMetadata(resourcesGuide);

export default function Page() {
  return <SpecialistGuidePage guide={resourcesGuide} />;
}
