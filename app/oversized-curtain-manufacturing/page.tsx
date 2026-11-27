import SpecialistServicePage from "@/components/specialists/SpecialistServicePage";
import { architecturalMetadata } from "@/components/architecture/ArchitecturalGuidePage";
import { architecturalGuides } from "@/lib/architectural-curtains";

const guide = architecturalGuides.workroom;
export const metadata = architecturalMetadata(guide);

export default function Page() {
  return <SpecialistServicePage name="workroom" />;
}
