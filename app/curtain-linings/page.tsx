import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { liningsGuide } from "@/lib/guides/linings";

export const metadata = guideMetadata(liningsGuide);

export default function Page() {
  return <SpecialistGuidePage guide={liningsGuide} />;
}
