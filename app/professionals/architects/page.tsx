import SpecialistGuidePage, { guideMetadata } from "@/components/guides/SpecialistGuidePage";
import { architectsGuide } from "@/lib/guides/professional-roles";

export const metadata = guideMetadata(architectsGuide);

export default function Page() {
  return <SpecialistGuidePage guide={architectsGuide} />;
}
