// TODO: replace with the real production domain before deploying (used for
// canonical URLs, Open Graph tags, and sitemap.xml). Override via the
// VITE_SITE_URL env var without touching code.
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://www.tropsimmo.com";

export const SITE_NAME = "TROPS IMMO";
export const SITE_TAGLINE = "Promoteur Immobilier";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
