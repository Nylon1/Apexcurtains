export type SettingPhotograph = {
  src: string;
  alt: string;
  title: string;
  credit: string;
  source: string;
  permission: "owner-confirmed" | "unsplash-licence" | "pixabay-licence" | "cc-by-2.0";
  rightsEvidence: string;
  licenceLabel?: string;
  adaptation?: string;
  original: string;
  context: string;
  position?: string;
  verifiedAt: string;
};

const supplierRights =
  "Apex owner confirmed existing written supplier image permissions on 2026-11-11. Agreement location not supplied; no independent licence inspection.";
const forestPage = "https://www.forestgroup.co.uk/en/markets/healthcare";
const forestBrochure = "https://www.forestgroup.com/user_files/download_files/download_2090_FOREST_MTS_EN_120126_WEB.pdf";
const panazBrochure = "https://panaz.com/wp-content/uploads/2023/07/Case-Studies-Brochure-June-2023.pdf";

// Setting photography is intentionally separate from verified catalogue imagery.
// A curtain, blind or fabric visible in a setting does not establish its product identity.
export const settingPhotographs = {
  ward: {
    src: "/healthcare/settings/forest-daylit-ward.webp",
    alt: "A daylit hospital ward with ceiling tracks and privacy curtains around the beds",
    title: "Daylight, space and patient privacy",
    credit: "Forest Group",
    source: forestBrochure,
    original: `${forestBrochure}#page=1`,
    permission: "owner-confirmed",
    rightsEvidence: supplierRights,
    context: "Supplier setting · not an Apex installation",
    verifiedAt: "2026-11-11",
  },
  tracks: {
    src: "/healthcare/settings/forest-curved-track-room.webp",
    alt: "Curved ceiling-mounted curtain tracks in a hospital room, with screening curtains drawn back",
    title: "A track route shaped around the room",
    credit: "Forest Group",
    source: forestPage,
    original: "https://www.forestgroup.co.uk/user_files/blocks/4/image/Healthcare_inzet_02.png",
    permission: "owner-confirmed",
    rightsEvidence: supplierRights,
    context: "Supplier setting · not an Apex installation",
    verifiedAt: "2026-11-11",
  },
  bays: {
    src: "/healthcare/settings/forest-screened-bays.webp",
    alt: "Hospital treatment bays separated by turquoise privacy curtains on overhead tracks",
    title: "Privacy between treatment bays",
    credit: "Forest Group",
    source: forestPage,
    original: "https://www.forestgroup.co.uk/user_files/blocks/4/image/Healthcare_inzet_04.png",
    permission: "owner-confirmed",
    rightsEvidence: supplierRights,
    context: "Supplier setting · curtain fabric and heading are not identified",
    verifiedAt: "2026-11-11",
  },
  dental: {
    src: "/healthcare/settings/dental-treatment-room.webp",
    alt: "Dental treatment room with a blue dental chair, examination light and window blind",
    title: "A considered dental treatment space",
    credit: "Ozkan Guner / Unsplash",
    source: "https://unsplash.com/photos/a-dental-room-with-a-blue-chair-and-dental-equipment-KRJwZrjuKpE",
    original: "https://images.unsplash.com/photo-1643660527190-4f401370f788",
    permission: "unsplash-licence",
    rightsEvidence: "https://unsplash.com/license",
    context: "Illustrative setting · the blind shown is not identified as Ex-Lite",
    position: "50% 63%",
    verifiedAt: "2026-11-11",
  },
  clinic: {
    src: "/healthcare/settings/clinical-patient-room.webp",
    alt: "An empty clinical patient room with a bed, bedside services and a pale neutral interior",
    title: "Space for individual care",
    credit: "Martha Dominguez de Gouveia / Unsplash",
    source: "https://unsplash.com/photos/empty-hospital-bed-ShJUYkshceY",
    original: "https://images.unsplash.com/photo-1512677859289-868722942457",
    permission: "unsplash-licence",
    rightsEvidence: "https://unsplash.com/license",
    context: "Illustrative clinical setting · not an Apex installation",
    verifiedAt: "2026-11-11",
  },
  examination: {
    src: "/healthcare/settings/medical-examination-room.webp",
    alt: "A modern medical examination room with an examination couch, ultrasound equipment and neutral roller blinds",
    title: "Privacy and comfort in the consulting room",
    credit: "Shixart1985 / Wikimedia Commons",
    source: "https://commons.wikimedia.org/wiki/File:Modern_medical_examination_room.jpg",
    original: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Modern_medical_examination_room.jpg",
    permission: "cc-by-2.0",
    rightsEvidence: "https://creativecommons.org/licenses/by/2.0/",
    licenceLabel: "CC BY 2.0",
    adaptation: "Resized and cropped for layout",
    context: "Illustrative examination room · products shown are not identified",
    verifiedAt: "2026-11-11",
  },
  treatment: {
    src: "/healthcare/settings/physiotherapy-treatment-room.webp",
    alt: "A physiotherapy treatment room with an examination couch, privacy partitions and a window",
    title: "A quiet space for examination and treatment",
    credit: "garten-gg / Pixabay",
    source: "https://pixabay.com/photos/health-treatment-physical-therapy-2661057/",
    original: "https://cdn.pixabay.com/photo/2017/08/20/09/39/bless-you-2661057_1280.jpg",
    permission: "pixabay-licence",
    rightsEvidence: "https://pixabay.com/service/license-summary/",
    context: "Illustrative treatment-room setting · not an Apex installation",
    verifiedAt: "2026-11-11",
  },
  careDining: {
    src: "/healthcare/settings/panaz-care-home-dining.webp",
    alt: "De Vijverhof retirement-home dining room with supported chairs, wooden tables and softly curtained windows",
    title: "De Vijverhof retirement home, the Netherlands",
    credit: "Panaz",
    source: panazBrochure,
    original: `${panazBrochure}#page=20`,
    permission: "owner-confirmed",
    rightsEvidence: supplierRights,
    context: "Supplier project reference · Panaz documents the upholstery, not the curtains shown",
    verifiedAt: "2026-11-11",
  },
  careLounge: {
    src: "/healthcare/settings/panaz-care-home-lounge.webp",
    alt: "Floral upholstered chairs and warm natural finishes in a communal space at De Vijverhof retirement home",
    title: "A softer, more familiar care environment",
    credit: "Panaz · De Vijverhof",
    source: panazBrochure,
    original: `${panazBrochure}#page=20`,
    permission: "owner-confirmed",
    rightsEvidence: supplierRights,
    context: "Supplier project reference · upholstery shown is outside this curtain catalogue",
    verifiedAt: "2026-11-11",
  },
} satisfies Record<string, SettingPhotograph>;

export type SettingPhotoKey = keyof typeof settingPhotographs;
export const sectorPhotographs: Record<string, SettingPhotoKey> = {
  "dental-practices": "dental",
  "gp-surgeries": "examination",
  hospitals: "ward",
  "private-clinics-physiotherapy": "treatment",
  "care-homes": "careDining",
};
export const sectionPhotographs: Record<string, SettingPhotoKey> = {
  "reusable-curtains": "bays",
  "medical-tracks": "tracks",
  "roller-blinds": "dental",
  "disposable-curtains": "clinic",
  "survey-installation": "tracks",
  "replacement-maintenance": "ward",
};
