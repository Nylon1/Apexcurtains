import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function GalleryPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_projects")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !data) {
    return notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      {data.image_url && (
        <img
          src={data.image_url}
          alt={data.title}
          className="w-full rounded-xl mb-6"
        />
      )}

      {data.location && (
        <p className="text-gray-600 mb-2">
          📍 {data.location}
        </p>
      )}

      {data.category && (
        <p className="text-gray-600 mb-4">
          🪟 {data.category}
        </p>
      )}

      {data.summary && (
        <p className="text-lg leading-relaxed mb-6">
          {data.summary}
        </p>
      )}

      {data.challenge && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2">The Challenge</h2>
          <p>{data.challenge}</p>
        </>
      )}

      {data.solution && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2">Our Solution</h2>
          <p>{data.solution}</p>
        </>
      )}

      {data.result && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2">The Result</h2>
          <p>{data.result}</p>
        </>
      )}
    </div>
  );
}