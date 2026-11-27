import ArchitecturalGuidePage, { architecturalMetadata } from "@/components/architecture/ArchitecturalGuidePage";
import { architecturalGuides } from "@/lib/architectural-curtains";

const guide = architecturalGuides.weight;
export const metadata = architecturalMetadata(guide);

export default function Page() {
  return <ArchitecturalGuidePage guide={guide} />;
}
