import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { fabricsGuide } from "@/lib/guides/fabrics";
export const metadata = guideMetadata(fabricsGuide);
export default function Page() {
  return <SpecialistGuidePage guide={fabricsGuide} />;
}
