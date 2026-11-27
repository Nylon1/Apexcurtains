// Vercel already aggregates status and path. No event body or enquiry record is needed.
const events = new Set(["guided-start", "guided-complete", "planner-start", "planner-complete"]);

export async function POST(request: Request, context: RouteContext<"/api/enquiry-count/[event]">) {
  const { event } = await context.params;
  const url = new URL(request.url);
  if (!events.has(event)) return new Response(null, { status: 404 });
  // No-referrer requests can have a null Origin. Fetch Metadata still identifies the site.
  if (request.headers.get("sec-fetch-site") !== "same-origin") return new Response(null, { status: 403 });
  if (url.search) return new Response(null, { status: 400 });
  // Next may supply an empty stream for a browser POST with zero content.
  const reader = request.body?.getReader();
  if (reader && !(await reader.read()).done) {
    await reader.cancel();
    return new Response(null, { status: 400 });
  }
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
