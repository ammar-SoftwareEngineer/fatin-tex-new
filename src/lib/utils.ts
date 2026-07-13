import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { defaultLocale, isLocale } from "@/i18n/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
