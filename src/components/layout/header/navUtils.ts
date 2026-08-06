/**
 * Simple helpers for header & footer navigation.
 *
 * Jobs of this file:
 * 1) Clean API links into internal paths  →  /about
 * 2) Build menu items (with optional dropdown)
 * 3) Know which link is currently active
 */
import type { LayoutMenuItem } from "@/types/layoutTypes";
import type { ProductCategory } from "@/types/productTypes";
import menuRoutes from "@/lib/data/menu-routes.json";
import { getLocalizedSlug } from "@/lib/localized-slug";
import type { NavItem, NavLink } from "./navTypes";

// Fallback paths by menu id (used when API sends an empty link)
const routes = menuRoutes as Record<string, string>;

/**
 * Clean one API link.
 * Example:
 *   "https://site.com/en/about/"  →  "/about"
 *   "/ar/products"                →  "/products"
 *   "" + id: 2                    →  "/about" (from menu-routes.json)
 */
export function resolveLink(item: {
  id?: number;
  link?: string | null;
  href?: string | null;
  url?: string | null;
}): string {
  const raw = (item.link || item.href || item.url || "").trim();

  // No link from API → use the id map
  if (!raw) {
    return item.id != null ? routes[String(item.id)] ?? "#" : "#";
  }

  try {
    // Keep only the path if it's a full URL
    let path = raw.startsWith("http") ? new URL(raw).pathname : raw;

    // Remove /en, /ar, /tr from the start
    path = path.replace(/^\/(en|ar|tr)(?=\/|$)/i, "");

    // Remove trailing slash
    path = path.replace(/\/+$/, "");

    if (!path) return "/";
    return path.startsWith("/") ? path : `/${path}`;
  } catch {
    return raw.startsWith("/") ? raw : `/${raw}`;
  }
}

/** Same as resolveLink — kept for older imports. */
export function resolveMenuHref(item: LayoutMenuItem): string {
  return resolveLink(item);
}

/** Same as resolveLink — kept for older imports. */
export function resolveFooterHref(item: {
  id?: number;
  href?: string | null;
  url?: string | null;
  link?: string | null;
}): string {
  return resolveLink(item);
}

/** Build category dropdown links (flat list, including children). */
function getCategoryLinks(
  categories: ProductCategory[],
  locale: string,
): NavLink[] {
  const links: NavLink[] = [];

  for (const category of categories) {
    const slug = getLocalizedSlug(category.slug, locale);

    links.push({
      name: category.name,
      href: slug
        ? `/products?category=${encodeURIComponent(slug)}`
        : "/categories",
    });

    // Add children too
    if (category.children?.length) {
      links.push(...getCategoryLinks(category.children, locale));
    }
  }

  return links;
}

/**
 * Convert one API menu item into a nav item.
 * Adds a dropdown for Categories or Media when needed.
 */
export function mapMenuItem(
  item: LayoutMenuItem,
  categories: ProductCategory[],
  galleryLinks: NavLink[],
  locale = "en",
): NavItem {
  const href = resolveLink(item);

  // Children coming from the API
  const apiChildren = (item.children ?? [])
    .filter((child) => child.title)
    .map((child) => ({
      name: child.title,
      href: resolveLink(child),
    }));

  // If API has no children, inject defaults for special pages
  let dropdown = apiChildren;

  if (dropdown.length === 0 && href === "/categories") {
    dropdown = getCategoryLinks(categories, locale);
  }

  if (dropdown.length === 0 && href === "/media") {
    dropdown = galleryLinks;
  }

  return {
    name: item.title,
    href,
    dropdown: dropdown.length > 0 ? dropdown : undefined,
  };
}

/** True when this href matches the current page. */
export function isLinkActive(
  pathname: string,
  search: string,
  href: string,
  exactPath = false,
): boolean {
  if (!href || href === "#") return false;

  const [path, query = ""] = href.split("?");

  // Home is only active on "/"
  if (path === "/") return pathname === "/";

  // Exact match, or current path starts with this path
  const pathMatches = exactPath || query
    ? pathname === path
    : pathname === path || pathname.startsWith(`${path}/`);

  if (!pathMatches) return false;

  // No query on the link → path match is enough
  if (!query) return true;

  // All query params on the link must exist in the current URL
  const wanted = new URLSearchParams(query);
  const current = new URLSearchParams(search.replace(/^\?/, ""));

  for (const [key, value] of wanted) {
    if (current.get(key) !== value) return false;
  }

  return true;
}

/** Parent link is active when its own path matches. */
export function isParentActive(
  item: NavItem,
  pathname: string,
  search: string,
): boolean {
  // Parents with dropdowns use exact path so /products/x doesn't highlight Products wrongly
  const exact = Boolean(item.dropdown?.length);
  return isLinkActive(pathname, search, item.href, exact);
}
