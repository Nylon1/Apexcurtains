import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { installationGuide } from "@/lib/guides/installation";

export const metadata = guideMetadata(installationGuide);

export default function Page() {
  return <SpecialistGuidePage guide={installationGuide} />;
}
