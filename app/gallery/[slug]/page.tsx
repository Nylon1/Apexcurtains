import { notFound } from "next/navigation";
import { getGalleryProjectBySlug } from "@/lib/gallery-projects";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getGalleryProjectBySlug(slug);

  if (!data) {
    return notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <p className="text-sm uppercase tracking-wide text-neutral-500 mb-2">
        Gallery
      </p>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h1>

      {(data.location || data.category || data.room) && (
        <div className="flex flex-wrap gap-3 text-sm text-neutral-600 mb-6">
          {data.location && <span>📍 {data.location}</span>}
          {data.category && <span>🪟 {data.category}</span>}
          {data.room && <span>🏡 {data.room}</span>}
        </div>
      )}

      {data.image_url && (
        <img
          src={data.image_url}
          alt={data.title}
          className="w-full rounded-2xl mb-8"
        />
      )}

      {data.summary && (
        <p className="text-lg leading-8 text-neutral-700 mb-8">{data.summary}</p>
      )}

      {data.brief && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Project Brief</h2>
          <p className="text-neutral-700 leading-8 mb-6">{data.brief}</p>
        </>
      )}

      {data.challenge && (
        <>
          <h2 className="text-2xl font-semibold mb-2">The Challenge</h2>
          <p className="text-neutral-700 leading-8 mb-6">{data.challenge}</p>
        </>
      )}

      {data.solution && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Our Solution</h2>
          <p className="text-neutral-700 leading-8 mb-6">{data.solution}</p>
        </>
      )}

      {data.result && (
        <>
          <h2 className="text-2xl font-semibold mb-2">The Result</h2>
          <p className="text-neutral-700 leading-8 mb-6">{data.result}</p>
        </>
      )}
    </div>
  );
}