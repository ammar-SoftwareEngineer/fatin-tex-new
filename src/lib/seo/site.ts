import type { Metadata } from "next";

export const SITE_URL_FALLBACK = "https://fatin-tex-new.vercel.app";

function envUrl(value?: string): string | undefined {
  const trimmed = value?.replace(/\/$/, "");
  if (!trimmed) return undefined;
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

export function getSiteUrl(): string {
  return (
    envUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    envUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    envUrl(process.env.VERCEL_URL) ||
    SITE_URL_FALLBACK
  );
}

const NON_PROD = new Set(["staging", "preview", "development"]);

/** Index unless explicitly marked as staging/preview/development. */
export function isProductionSite(): boolean {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV?.toLowerCase();
  if (siteEnv && NON_PROD.has(siteEnv)) return false;
  if (siteEnv === "production") return true;
  if (process.env.VERCEL_ENV === "preview") return false;
  if (process.env.VERCEL_ENV === "production") return true;
  return process.env.NODE_ENV === "production";
}

export function getIndexRobots(): Metadata["robots"] {
  if (!isProductionSite()) return { index: false, follow: false };

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  };
}
