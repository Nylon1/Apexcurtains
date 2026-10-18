import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { buyingOnlineGuide } from "@/lib/guides/buying-online";
export const metadata = guideMetadata(buyingOnlineGuide);
export default function Page() {
  return <SpecialistGuidePage guide={buyingOnlineGuide} />;
}
