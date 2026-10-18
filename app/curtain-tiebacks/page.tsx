import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { tiebacksGuide } from "@/lib/guides/tiebacks";

export const metadata = guideMetadata(tiebacksGuide);

export default function Page() {
  return <SpecialistGuidePage guide={tiebacksGuide} />;
}
