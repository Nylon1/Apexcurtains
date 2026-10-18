import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { manufactureGuide } from "@/lib/guides/manufacture";
export const metadata = guideMetadata(manufactureGuide);
export default function Page() {
  return <SpecialistGuidePage guide={manufactureGuide} />;
}
