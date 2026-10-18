import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { tracksGuide } from "@/lib/guides/tracks";

export const metadata = guideMetadata(tracksGuide);

export default function Page() {
  return <SpecialistGuidePage guide={tracksGuide} />;
}
