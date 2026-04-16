import type { ImageLoaderProps } from "next/image";

const SUPABASE_STORAGE_PATH = "/storage/v1/object/public/";
const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : "";

/**
 * Custom image loader for Supabase Storage URLs.
 *
 * Normalises relative storage paths (e.g. `/storage/v1/object/public/…`)
 * into fully-qualified URLs.  We intentionally do NOT append Supabase
 * image-transform query params (`width`, `quality`, `format`) because those
 * require a paid Supabase plan.  Without the paid plan the transform
 * endpoint returns an error / empty response, which causes images to fail
 * to render entirely.
 *
 * Next.js still creates multiple `<source>` entries via the `sizes` prop,
 * so the browser will pick the right breakpoint — the actual file served
 * is just the original upload, which is acceptable for public-site usage.
 */
export function supabaseImageLoader({
  src,
}: ImageLoaderProps): string {
  const trimmedSrc = src.trim();

  if (!trimmedSrc) {
    return src;
  }

  // Resolve relative Supabase storage paths to absolute URLs
  const normalizedSrc =
    trimmedSrc.startsWith(SUPABASE_STORAGE_PATH) && supabaseOrigin
      ? `${supabaseOrigin}${trimmedSrc}`
      : trimmedSrc.startsWith("//")
        ? `https:${trimmedSrc}`
        : trimmedSrc;

  return normalizedSrc;
}
