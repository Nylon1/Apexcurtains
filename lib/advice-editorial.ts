// Keep preview and production CMS data separate from reviewed public copy.
// A newly edited CMS article takes precedence once its legacy passage is removed.
type ArticleFields = { slug?: string | null; content?: string | null };
type Revision = { legacyText: string; title: string; excerpt: string; content: string };

const revisions: Record<string, Revision> = {
  "how-much-do-apex-window-curtains-cost-in-the-uk-full-2026-pricing-guide": {
    legacyText: "£7,000+",
    title: "What determines the cost of apex window curtains?",
    excerpt: "Use the curtain, track and installation details to compare quotations for the same window.",
    content: `## Start with the opening

Two gables of the same width can require quite different amounts of cloth. The slope, the longest drop and the way each panel opens affect the cut. A fabric with a large pattern repeat may require extra length to align the joins.

## Separate the cloth from the installed system

Ask which face fabric, lining, heading and fullness the quotation assumes. Check whether the track, supports, survey, fitting and dressing are included. For a motorised proposal, ask what operation and commissioning are included and who will confirm the electrical arrangements.

## Allow for the room

A clear floor in front of a straight window presents a different access question from glazing above a staircase. Share photographs from floor level and any drawings you already have. The survey can then establish fixing positions and access before the price is confirmed.

## Compare like for like

Check the schedule for each window, the proposed opening, the scope of installation and any exclusions. If you change the lining, track or opening arrangement, ask for the revised scope in writing. Apex quotes against the individual project.`,
  },
  "best-curtains-for-apex-windows-styles-that-actually-work": {
    legacyText: "taller windows need heavier fabrics",
    title: "Choosing a curtain style for an apex window",
    excerpt: "Start with the sloping line, the view and where the fabric can sit when the curtains are open.",
    content: `## Decide what needs to move

In a gable, the sloping upper glazing and the lower doors may have different jobs. Discuss which parts need privacy, where daylight matters and whether opening doors need clear space. A fixed shaped panel and a moving curtain on a level track are distinct arrangements.

## Match the heading to the route

Pinch pleat holds a defined fold. Wave relies on compatible carriers and space for its regular folds. Check the drawn curtain as well as the open stack, particularly near a door leaf or a return wall.

## Choose cloth and lining together

A voile can soften a view in daylight. Evening privacy depends on the light inside and outside. A lined curtain adds coverage and weight. Assess the handle, fullness and finished panel weight alongside the track and fixing support.

## Check automation on the drawing

Height alone does not establish motor compatibility. Identify the track route, draw direction and curtain weight. A motor designed for a level track needs separate, documented approval for any proposed sloping configuration.`,
  },
  "why-most-apex-curtain-installations-fail-and-how-to-get-it-right-first-time": {
    legacyText: "installations replaced",
    title: "What to check before an apex curtain installation",
    excerpt: "Agree the opening arrangement, fixing points and access before the curtains are made.",
    content: `## Draw the open and closed positions

Mark the slope, the lower doors, handles and the space where fabric can gather. Check that a drawn curtain provides the intended coverage and an open stack leaves room for everyday use.

## Confirm the fixing position

A photograph can show the visible finish, but it cannot confirm concealed support. The survey and, where needed, the building team should establish what will carry the load before the track and brackets are finalised.

## Plan access and handling

Share a floor-level view of the room, including stairs or a mezzanine. The installer can assess access for fitting, lifting the panels and future maintenance. Leave measurements at height to the survey.

## Review the finished movement

At handover, operate the curtains with the installer. Check door clearance, overlap, the open stack and any agreed controls. Keep care instructions and the track or motor reference with the project records.`,
  },
};

export function reviewedAdvice<T extends ArticleFields>(post: T) {
  const revision = post.slug ? revisions[post.slug] : undefined;
  if (!revision || !post.content?.includes(revision.legacyText)) return post;
  return { ...post, title: revision.title, excerpt: revision.excerpt, content: revision.content,
    meta_title: `${revision.title} | Apex Curtains`, meta_description: revision.excerpt };
}

export const legacyAdviceDestinations: Record<string, string> = {
  "what-curtain-track-is-best-for-apex-windows": "/curtain-tracks",
  "can-you-put-curtains-on-angled-windows": "/angled-window-curtains",
  "best-curtains-for-apex-windows-expert-guide": "/advice/best-curtains-for-apex-windows-styles-that-actually-work",
};
