import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { coloursGuide } from "@/lib/guides/colours";
import ColourExplorer from "@/components/guides/ColourExplorer";
export const metadata = guideMetadata(coloursGuide);
export default function Page() {
  return (
    <SpecialistGuidePage guide={coloursGuide} feature={<ColourExplorer />} />
  );
}
