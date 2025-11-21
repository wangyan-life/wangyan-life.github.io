import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@/utils/generateOgImages";

export const GET: APIRoute = async () => {
  const png = await generateOgImageForSite();

  // ensure the returned bytes are a concrete ArrayBuffer-backed Uint8Array
  const uint8 = png as unknown as Uint8Array;
  const bytes = new Uint8Array(uint8);
  const blob = new Blob([bytes], { type: "image/png" });

  return new Response(blob, {
    headers: { "Content-Type": "image/png" },
  });
};
