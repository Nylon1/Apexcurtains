export type AdvicePost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image_url?: string;
  featured: boolean;
  published: boolean;
  meta_title?: string;
  meta_description?: string;
  focus_keyword?: string;
  related_service?: string;
  published_at?: string;
  updated_at?: string;
};

export const defaultAdvicePosts: AdvicePost[] = [
  {
    id: "1",
    title: "Curtain Consultation Questions",
    slug: "curtain-consultation-questions",
    category: "Guides",
    excerpt:
      "What you should ask before ordering curtains for apex and shaped windows.",
    content: `
      <h2>Curtain Consultation Questions</h2>
      <p>Before ordering curtains for apex and shaped windows, it helps to understand the room, the glazing, the track position and the practical finish you want to achieve.</p>
      <p>During a consultation, we normally discuss measurements, fabric choices, lining options, heading styles, stack back, operation and installation details.</p>
      <p>This process helps create a curtain scheme that looks right, works properly and suits the shape of the window.</p>
    `,
    image_url: "/apex-hero.jpg",
    featured: true,
    published: true,
    meta_title: "Curtain Consultation Questions | Apex Curtains",
    meta_description:
      "Key questions to ask during a curtain consultation for apex and shaped windows.",
    focus_keyword: "curtain consultation questions",
    related_service: "apex-curtains",
    published_at: "2026-03-20T00:00:00.000Z",
    updated_at: "2026-03-20T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Curtain Measurements for Apex Windows",
    slug: "curtain-measurements-apex-windows",
    category: "Measuring",
    excerpt:
      "Learn how measurements affect curtain fit, fullness and finish on apex windows.",
    content: `
      <h2>Curtain Measurements for Apex Windows</h2>
      <p>Accurate measurements are essential for apex windows. Width, height, slope and track position all affect the final result.</p>
      <p>For shaped glazing, even small measuring errors can affect the way curtains hang and stack.</p>
      <p>A proper site measure helps ensure the curtain scheme is designed around the actual window rather than guesswork.</p>
    `,
    image_url: "/apex-hero.jpg",
    featured: false,
    published: true,
    meta_title: "Curtain Measurements for Apex Windows | Apex Curtains",
    meta_description:
      "A practical guide to measuring apex windows for bespoke curtains.",
    focus_keyword: "curtain measurements apex windows",
    related_service: "apex-curtains",
    published_at: "2026-03-20T00:00:00.000Z",
    updated_at: "2026-03-20T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Curtain Pricing for Apex Windows",
    slug: "curtain-pricing-apex-windows",
    category: "Pricing",
    excerpt:
      "Understand what affects the cost of bespoke curtains for apex and shaped windows.",
    content: `
      <h2>Curtain Pricing for Apex Windows</h2>
      <p>Pricing for apex and shaped curtains depends on size, fabric, lining, heading style, track system and installation requirements.</p>
      <p>Large glazed areas often require more fabric, more careful planning and specialist fitting.</p>
      <p>The clearest pricing usually comes after the measurements, design direction and specification are confirmed.</p>
    `,
    image_url: "/apex-hero.jpg",
    featured: true,
    published: true,
    meta_title: "Curtain Pricing for Apex Windows | Apex Curtains",
    meta_description:
      "Find out what affects curtain pricing for apex and shaped windows.",
    focus_keyword: "curtain pricing apex windows",
    related_service: "apex-curtains",
    published_at: "2026-03-20T00:00:00.000Z",
    updated_at: "2026-03-20T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Choosing the Right Curtain Fabrics",
    slug: "curtains-discussing-fabrics",
    category: "Fabrics",
    excerpt:
      "Discover which fabrics work best for large, shaped and apex windows.",
    content: `
      <h2>Choosing the Right Curtain Fabrics</h2>
      <p>Fabric selection affects drape, light control, softness, insulation and the overall visual impact of the curtains.</p>
      <p>For apex and architectural windows, the scale of the room and the weight of the fabric matter a lot.</p>
      <p>The right fabric should suit both the shape of the glazing and the practical needs of the space.</p>
    `,
    image_url: "/apex-hero.jpg",
    featured: false,
    published: true,
    meta_title: "Choosing the Right Curtain Fabrics | Apex Curtains",
    meta_description:
      "How to choose the right curtain fabrics for apex and shaped windows.",
    focus_keyword: "curtain fabrics for apex windows",
    related_service: "apex-curtains",
    published_at: "2026-03-20T00:00:00.000Z",
    updated_at: "2026-03-20T00:00:00.000Z",
  },
];