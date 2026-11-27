export const studioPhotos = {
  oxford: { src: "/projects/pinch-pleat-curtains-oxford-oxford.jpeg", alt: "Sweeping curtains frame an Oxford gable and the view beyond its glazed doors", width: 1600, height: 1200, caption: "Oxford · Residential gable" },
  peterborough: { src: "/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg", alt: "Ink-blue curtains follow the roofline of a Peterborough bedroom with timber glazing", width: 1200, height: 1600, caption: "Peterborough · Triangular bedroom glazing" },
  cambridge: { src: "/projects/cambridge-apex-curtains-cambridge.jpeg", alt: "Dressed curtain folds and matching tieback in a completed Cambridge installation", width: 900, height: 1600, caption: "Cambridge · Curtain folds and tieback" },
  lounge: { src: "/images/commercial/airport-lounge-main.jpeg", alt: "Long dark curtains along the wall of a finished Manchester Airport lounge", width: 1824, height: 1026, caption: "Manchester Airport · Lounge installation" },
} as const;

export type StudioPhoto = (typeof studioPhotos)[keyof typeof studioPhotos];
