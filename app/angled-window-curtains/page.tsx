import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { angledGuide } from "@/lib/guides/angled";

export const metadata = guideMetadata(angledGuide);

export default function Page() {
  return <SpecialistGuidePage guide={angledGuide} />;
}
