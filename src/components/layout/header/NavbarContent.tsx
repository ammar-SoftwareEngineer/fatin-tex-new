"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

import type { fetchLayoutData } from "@/api/layoutService";
import {
  isApiError,
  type LayoutData,
  type LayoutMenuItem,
} from "@/types/layoutTypes";

type NavbarContentProps = {
  layoutData: Awaited<ReturnType<typeof fetchLayoutData>>;
};

type NavItem = {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
};

const languages = [
  { code: "en" as const, label: "EN" },
  { code: "ar" as const, label: "AR" },
  { code: "tr" as const, label: "TR" },
];

const TITLE_HREF_FALLBACKS: { match: RegExp; href: string }[] = [
  { match: /^home$|^الرئيسية$/i, href: "/" },
  { match: /about|من نحن|عنا/i, href: "/about" },
  { match: /product|منتج/i, href: "/products" },
  { match: /categor|فئة|فئات/i, href: "/products" },
  { match: /catalog|catel|كتالوج/i, href: "/products" },
  { match: /media|ميديا|وسائط/i, href: "/media" },
  { match: /blog|مقال|مدونة/i, href: "/blogs" },
  { match: /sondos|سندس/i, href: "/sondos-dyeing" },
  { match: /contact|تواصل|اتصل/i, href: "/contact" },
];

function normalizeHref(link?: string | null, title = ""): string {
  const raw = link?.trim();

  if (raw) {
    try {
      const url = raw.startsWith("http") ? new URL(raw) : null;
      const path = url ? url.pathname : raw;
      const cleaned = path
        .replace(/^\/(en|ar|tr)(?=\/|$)/i, "")
        .replace(/\/+$/, "");

      return cleaned === "" ? "/" : cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    } catch {
      return raw.startsWith("/") ? raw : `/${raw}`;
    }
  }

  const fallback = TITLE_HREF_FALLBACKS.find((item) => item.match.test(title));
  return fallback?.href ?? "#";
}

function isLinkActive(pathname: string, href: string) {
  if (!href || href === "#") return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function mapMenuItem(item: LayoutMenuItem): NavItem {
  const children = (item.children ?? []).filter((child) => child?.title);

  return {
    name: item.title,
    href: normalizeHref(item.link, item.title),
    dropdown:
      children.length > 0
        ? children.map((child) => ({
            name: child.title,
            href: normalizeHref(child.link, child.title),
          }))
        : undefined,
  };
}

export default function NavbarContent({ layoutData }: NavbarContentProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const layout: LayoutData | null = isApiError(layoutData)
    ? null
    : layoutData.data;

  const logo = layout?.branding?.logo || "/logo.png";
  const siteName = layout?.branding?.site_name || "Logo";

  const menuItems = useMemo(
    () => (layout?.menu ?? []).map(mapMenuItem),
    [layout?.menu],
  );

  const mid = Math.ceil(menuItems.length / 2);
  const leftLinks = menuItems.slice(0, mid);
  const rightLinks = menuItems.slice(mid);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code });
  };

  const renderDesktopLink = (item: NavItem, i: number) => {
    const hasDropdown = Boolean(item.dropdown?.length);

    if (hasDropdown && item.dropdown) {
      const isParentActive =
        isLinkActive(pathname, item.href) ||
        item.dropdown.some((sub) => isLinkActive(pathname, sub.href));
      const isOpen = openDropdown === item.name;

      return (
        <li
          key={`${item.name}-${i}`}
          className="relative"
          onMouseEnter={() => setOpenDropdown(item.name)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(isOpen ? null : item.name)
            }
            className={`flex items-center gap-2 transition ${
              isParentActive ? "text-[#e0bc80]" : "text-white hover:text-[#e0bc80]"
            }`}
            aria-expanded={isOpen}
          >
            {item.name}
            <FaChevronDown
              className={`text-xs transition duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`absolute top-full left-0 pt-3 transition-all duration-300 ${
              isOpen
                ? "opacity-100 visible pointer-events-auto"
                : "opacity-0 invisible pointer-events-none"
            }`}
          >
            <ul className="w-56 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl p-3">
              {item.dropdown.map((sub, idx) => {
                const subActive = isLinkActive(pathname, sub.href);

                return (
                  <li key={`${sub.name}-${idx}`}>
                    <Link
                      href={sub.href}
                      onClick={() => setOpenDropdown(null)}
                      className={`block px-4 py-3 rounded-xl transition ${
                        subActive
                          ? "bg-[#e0bc80] text-black"
                          : "text-white hover:bg-[#e0bc80] hover:text-black"
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      );
    }

    const href = item.href || "#";
    const isActive = isLinkActive(pathname, href);

    return (
      <li key={`${item.name}-${i}`} className="relative group">
        <Link
          href={href}
          className={`relative transition duration-300 ${
            isActive ? "text-[#e0bc80]" : "text-white"
          } hover:text-[#e0bc80]`}
        >
          {item.name}
          <span
            className={`absolute left-0 -bottom-1 h-[2px] bg-[#e0bc80] transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
      </li>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/40 backdrop-blur-xl shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between gap-16">
          <ul className="hidden lg:flex flex-1 items-center justify-end gap-20 text-lg font-medium">
            {leftLinks.map(renderDesktopLink)}
          </ul>

          <Link href="/" className="shrink-0 relative z-10">
            <Image
              src={logo}
              alt={siteName}
              width={100}
              height={70}
              className="object-contain"
              loading="eager"
            />
          </Link>

          <div className="hidden lg:flex flex-1 items-center justify-start gap-20">
            <ul className="flex items-center gap-20 text-lg font-medium text-nowrap">
              {rightLinks.map(renderDesktopLink)}
            </ul>

            <div className="relative group ml-auto">
              <div className="flex items-center gap-2 text-white cursor-pointer hover:text-[#e0bc80] transition">
                {t("language")}
                <FaChevronDown className="text-xs" />
              </div>
              <ul className="absolute right-0 top-full mt-4 w-44 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      type="button"
                      onClick={() => switchLocale(lang.code)}
                      className={`block w-full px-4 py-2 rounded-xl transition cursor-pointer ${
                        locale === "ar" ? "text-right" : "text-left"
                      } ${
                        locale === lang.code
                          ? "bg-[#e0bc80] text-black"
                          : "text-white hover:bg-[#fddea97e] hover:text-white"
                      }`}
                    >
                      {lang.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => setMobileMenu(true)}
            className="lg:hidden text-2xl text-white"
            type="button"
          >
            <FaBars />
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[350px] h-[180px] bg-[#e0bc80]/20 blur-3xl rounded-full pointer-events-none" />
      </nav>

      <div
        className={`fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
          <Image
            src={logo}
            alt={siteName}
            width={90}
            height={60}
            className="object-contain"
          />
          <button
            onClick={() => setMobileMenu(false)}
            className="text-white text-2xl"
            type="button"
          >
            <FaTimes />
          </button>
        </div>

        <div className="px-6 py-8 flex flex-col gap-5">
          {menuItems.map((item, i) => {
            if (item.dropdown) {
              return (
                <div key={`${item.name}-${i}`} className="border-b border-white/10 pb-4">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.name ? null : item.name)
                    }
                    className="w-full flex items-center justify-between text-white text-lg"
                  >
                    {item.name}
                    <FaChevronDown
                      className={`transition duration-300 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openDropdown === item.name ? "max-h-60 mt-4" : "max-h-0"
                    }`}
                  >
                    <div className="flex flex-col gap-3 pl-3">
                      {item.dropdown.map((sub, idx) => (
                        <Link
                          key={`${sub.name}-${idx}`}
                          href={sub.href}
                          onClick={() => setMobileMenu(false)}
                          className="text-gray-300 hover:text-[#e0bc80] transition"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={`${item.name}-${i}`}
                href={item.href ?? "/"}
                onClick={() => setMobileMenu(false)}
                className="text-white text-lg border-b border-white/10 pb-4 hover:text-[#e0bc80] transition"
              >
                {item.name}
              </Link>
            );
          })}

          <div className="pt-6">
            <p className="text-[#e0bc80] text-sm mb-4">{t("language")}</p>
            <div className="flex gap-3 flex-wrap">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    switchLocale(lang.code);
                    setMobileMenu(false);
                  }}
                  className={`px-4 py-2 rounded-full border transition ${
                    locale === lang.code
                      ? "bg-[#e0bc80] text-black border-[#e0bc80]"
                      : "border-white/20 text-white hover:bg-[#e0bc80] hover:text-black"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
