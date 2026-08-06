/**
 * Shared helper functions used across the app.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { defaultLocale, isLocale } from "@/i18n/config"

/** Merge Tailwind class names safely (handles conflicts). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Split a title so the last word can be highlighted in gold.
 * Example: "Our Story" -> { start: "Our", highlight: "Story" }
 */
export function splitTitleHighlight(title?: string | null) {
  const words = title?.trim().split(/\s+/).filter(Boolean) ?? [];
  return {
    start: words.slice(0, -1).join(" "),
    highlight: words.at(-1) ?? "",
  };
}

/**
 * Pull the number and suffix from a stats string.
 * Example: "25+" -> { number: 25, suffix: "+" }
 */
export function parseStatTitle(title: string) {
  const number = parseInt(title, 10) || 0;
  const suffix = title.replace(/[0-9]/g, "");
  return { number, suffix };
}

export function localizePath(
  path: string,
  locale?: string
) {
  const activeLocale = locale ?? defaultLocale;

  // Do not localize absolute external URLs, anchors, mailto or tel links
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path === "#" ||
    path.startsWith("#")
  ) {
    return path;
  }

  // Ensure path starts with a single leading slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // If already localized with the same locale, return as-is
  if (
    normalizedPath === `/${activeLocale}` ||
    normalizedPath.startsWith(`/${activeLocale}/`)
  ) {
    return normalizedPath;
  }

  return `/${activeLocale}${normalizedPath}`;
}

export function switchLocalePath(pathname: string, newLocale: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = newLocale;
    return `/${segments.join("/")}`;
  }

  return localizePath(pathname === "/" ? "/" : pathname, newLocale);
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}
