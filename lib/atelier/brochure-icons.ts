/** Small matching line icons for the HTML collection and its printed PDF. */
export const brochureIcons = {
  clean: ["M9 6a3 3 0 1 1 3 3v3", "M12 12 2 19v2h20v-2Z"],
  vacuum: [
    "M4 20h16v-3H4Z",
    "M12 17V9a4 4 0 0 1 8 0v5",
    "M6 3v10M4 11l2 2 2-2",
  ],
  spill: [
    "M8 2s-5 6-5 9a5 5 0 0 0 10 0c0-3-5-9-5-9Z",
    "M12 17h9v4H9v-2",
    "M4 18 20 2",
  ],
  pair: ["M2 4h20M3 4v16l7-2V4M14 4v14l7 2V4", "M6 5v12M17 5v12"],
  folds: [
    "M3 3h18M5 4v17M9 4c-3 6 3 11 0 17M13 4c-3 6 3 11 0 17M17 4v17",
    "M21 7v11m-2-2 2 2 2-2",
  ],
  band: [
    "M5 2h14v20H5Z",
    "M8 2c-2 5 2 14 0 20M12 2c-2 5 2 14 0 20M16 2v20",
    "M3 11h18v4H3Z",
  ],
  release: [
    "M5 2h14v19H5Z",
    "M9 2c-3 6 3 12 0 19M15 2c-3 6 3 12 0 19",
    "M1 23h22",
  ],
  clock: ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", "M12 6v6l4 3"],
  sun: [
    "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    "M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2",
  ],
  track: [
    "M2 4h20v3H2ZM6 7v3M12 7v3M18 7v3",
    "M5 10v11M11 10v11M17 10v11",
    "M5 15h13m-3-3 3 3-3 3",
  ],
  light: [
    "M5 3h14v18H5Z",
    "M8 6v12M16 6v12",
    "M1 7h3M1 12h3M1 17h3M20 7h3M20 12h3M20 17h3",
  ],
  scroll: [
    "M6 4h12v13a3 3 0 0 1-3 3H6",
    "M6 4a3 3 0 0 0-3 3v2h6V7a3 3 0 0 0-3-3",
    "M6 20a3 3 0 0 0 3-3v-1h12v1a3 3 0 0 1-3 3H6",
    "M12 8h3M12 11h3",
  ],
  home: ["M3 11 12 3l9 8", "M5 10v11h14V10", "M9 21v-7h6v7"],
  cloth: [
    "M5 3h14v18H5Z",
    "M8 3c-3 6 3 12 0 18M12 3c-3 6 3 12 0 18M16 3c-3 6 3 12 0 18",
  ],
  palette: [
    "M21 12a9 9 0 1 0-9 9h2a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h5a3 3 0 0 0 3-3",
    "M7 8h.1M12 6h.1M17 8h.1M6 13h.1",
  ],
  care: ["M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6Z", "m8 12 3 3 5-6"],
  sparkle: ["m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"],
  gift: [
    "M3 8h18v4H3ZM5 12v9h14v-9M12 8v13",
    "M12 8C2 8 6 0 10 4l2 4c10 0 6-8 2-4Z",
  ],
  globe: [
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18",
    "M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18",
  ],
} as const;
export type BrochureIconName = keyof typeof brochureIcons;
