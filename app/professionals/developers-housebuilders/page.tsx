import SpecialistGuidePage, { guideMetadata } from "@/components/guides/SpecialistGuidePage";
import { developersGuide } from "@/lib/guides/professional-roles";

export const metadata = guideMetadata(developersGuide);

export default function Page() {
  return <SpecialistGuidePage guide={developersGuide} />;
}
