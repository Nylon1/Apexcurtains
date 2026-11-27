import { guideMetadata } from "@/components/guides/SpecialistGuidePage";
import TechnicalResourceLibrary from "@/components/professionals/TechnicalResourceLibrary";
import { resourcesGuide } from "@/lib/guides/professional-resources";

export const metadata = guideMetadata(resourcesGuide);

export default function Page() {
  return <TechnicalResourceLibrary />;
}
