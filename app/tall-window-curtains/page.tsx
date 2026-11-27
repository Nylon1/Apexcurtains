import SpecialistServicePage from "@/components/specialists/SpecialistServicePage";
import { architecturalMetadata } from "@/components/architecture/ArchitecturalGuidePage";
import { architecturalGuides } from "@/lib/architectural-curtains";

const guide = architecturalGuides.tall;
export const metadata = architecturalMetadata(guide);

export default function Page() {
  return <SpecialistServicePage name="tall" />;
}
