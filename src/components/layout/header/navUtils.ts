import type { LayoutMenuItem } from "@/types/layoutTypes";
import type { ProductCategory } from "@/types/productTypes";
import menuRoutes from "@/lib/data/menu-routes.json";
import { getLocalizedSlug } from "@/lib/localized-slug";
import type { NavItem, NavLink } from "./navTypes";

const routes = menuRoutes as Record<string, string>;

export function resolveMenuHref(item: LayoutMenuItem): string {
  const raw = item.link?.trim();
  if (!raw) return routes[String(item.id)] ?? "#";

  try {
    const path = raw.startsWith("http") ? new URL(raw).pathname : raw;
    const cleaned = path.replace(/^\/(en|ar|tr)(?=\/|$)/i, "").replace(/\/+$/, "");
    return cleaned ? (cleaned.startsWith("/") ? cleaned : `/${cleaned}`) : "/";
  } catch {
    return raw.startsWith("/") ? raw : `/${raw}`;
  }
}

function categoryLinks(
  categories: ProductCategory[],
  locale: string,
): NavLink[] {
  return categories.flatMap((c) => {
    const slug = getLocalizedSlug(c.slug, locale);
    return [
      {
        name: c.name,
        href: slug
          ? `/products?category=${encodeURIComponent(slug)}`
          : "/categories",
      },
      ...categoryLinks(c.children ?? [], locale),
    ];
  });
}

export function mapMenuItem(
  item: LayoutMenuItem,
  categories: ProductCategory[],
  galleryLinks: NavLink[],
  locale = "en",
): NavItem {
  const href = resolveMenuHref(item);
  const children = (item.children ?? [])
    .filter((c) => c.title)
    .map((c) => ({ name: c.title, href: resolveMenuHref(c) }));

  const dropdown =
    children.length > 0
      ? children
      : href === "/categories"
        ? categoryLinks(categories, locale)
        : href === "/media"
          ? galleryLinks
          : undefined;

  return {
    name: item.title,
    href,
    dropdown: dropdown?.length ? dropdown : undefined,
  };
}

/** Active if path matches; query params must match when present on href. */
export function isLinkActive(
  pathname: string,
  search: string,
  href: string,
  exactPath = false,
): boolean {
  if (!href || href === "#") return false;

  const [path, query = ""] = href.split("?");
  const pathOk =
    path === "/"
      ? pathname === "/"
      : exactPath || query
        ? pathname === path
        : pathname === path || pathname.startsWith(`${path}/`);

  if (!pathOk) return false;
  if (!query) return true;

  const want = new URLSearchParams(query);
  const have = new URLSearchParams(search.replace(/^\?/, ""));
  return [...want].every(([k, v]) => have.get(k) === v);
}

export function isParentActive(
  item: NavItem,
  pathname: string,
  search: string,
): boolean {
  return isLinkActive(
    pathname,
    search,
    item.href,
    Boolean(item.dropdown?.length),
  );
}
