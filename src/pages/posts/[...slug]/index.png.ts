import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { getPath } from "@/utils/getPath";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { SITE } from "@/config";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: getPath(post.id, post.filePath, false) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  // generateOgImageForPost returns a Uint8Array/Buffer — ensure we pass a BodyInit-compatible type
  const png = await generateOgImageForPost(props as CollectionEntry<"blog">);

  // Response body accepts ArrayBufferView (e.g., Uint8Array), so cast to Uint8Array explicitly
  const uint8 = png as unknown as Uint8Array;

  // get an ArrayBuffer that references only the used bytes (avoid including any larger shared buffer)
  // Use a Blob so Response body typing is compatible across environments
  // make a copy to ensure the underlying ArrayBuffer is a concrete ArrayBuffer (not SharedArrayBuffer)
  const bytes = new Uint8Array(uint8);
  const blob = new Blob([bytes], { type: "image/png" });

  return new Response(blob, {
    headers: { "Content-Type": "image/png" },
  });
};
