export type AdvicePost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  featured: boolean;
};

export const defaultAdvicePosts: AdvicePost[] = [
  {
    id: 1,
    title: "How to measure apex windows for curtains",
    slug: "how-to-measure-apex-windows-for-curtains",
    category: "Measuring",
    excerpt:
      "A practical guide to measuring width, height and angled drops correctly before ordering bespoke curtains.",
    content:
      "Measuring an apex window for curtains starts with understanding the full area you want the curtain scheme to cover, not just the visible glass. In many cases, a well-designed curtain installation will extend beyond the exact shape of the glazing so the finished result feels more balanced and luxurious. Start by identifying the widest point you want to dress, then measure the highest point of the apex. For angled windows, you may need more than one drop measurement so the curtain design follows the room geometry correctly.",
    image: "",
    featured: true,
  },
  {
    id: 2,
    title: "Do apex curtains need a special track?",
    slug: "do-apex-curtains-need-a-special-track",
    category: "Tracks",
    excerpt:
      "Understand when unusual windows require bespoke curtain track solutions.",
    content:
      "Apex curtains often do need a special track because the geometry of the window is not standard. A good apex curtain scheme is not just about hanging fabric over the glass. The track, curtain heading, lining and stack back all need to work together. In many cases, a bespoke or carefully selected specialist track is the difference between a solution that merely covers the window and one that actually completes the room beautifully.",
    image: "",
    featured: true,
  },
];