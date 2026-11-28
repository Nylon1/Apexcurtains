import { studioPhotos } from "@/lib/studio-photography";
import { portfolio } from "@/lib/portfolio";

// Resolve existing portfolio media; these are presentation references, not new records.
export const consultationPhotos = {
  oxford: studioPhotos.oxford,
  peterborough: studioPhotos.peterborough,
  norwichDetail: portfolio.projects.norwich.media[0],
  norwichInstallation: portfolio.projects.norwich.media[1],
};
