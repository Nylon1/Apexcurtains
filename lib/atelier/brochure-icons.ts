/** Small matching line icons for the HTML collection and its printed PDF. */
export const brochureIcons = {
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
