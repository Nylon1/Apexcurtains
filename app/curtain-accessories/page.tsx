import SpecialistGuidePage, {
  guideMetadata,
} from "@/components/guides/SpecialistGuidePage";
import { accessoriesGuide } from "@/lib/guides/accessories";
export const metadata = guideMetadata(accessoriesGuide);
export default function Page() {
  return <SpecialistGuidePage guide={accessoriesGuide} />;
}
