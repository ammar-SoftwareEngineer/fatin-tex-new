"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

import type { fetchLayoutData } from "@/api/layoutService";
import { isApiError, type LayoutData } from "@/types/layoutTypes";
import type { ProductCategory } from "@/types/productTypes";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import type { NavLink } from "./navTypes";
import { mapMenuItem } from "./navUtils";

type NavbarContentProps = {
  layoutData: Awaited<ReturnType<typeof fetchLayoutData>>;
  navbarCategories?: ProductCategory[];
};

export default function NavbarContent({
  layoutData,
  navbarCategories = [],
}: NavbarContentProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const layout: LayoutData | null = isApiError(layoutData)
    ? null
    : layoutData.data;
  const logo = layout?.branding?.logo || "/logo.png";
  const siteName = layout?.branding?.site_name || "Logo";

  const galleryLinks = useMemo<NavLink[]>(
    () => [
      { name: t("images"), href: "/media/images" },
      { name: t("videos"), href: "/media/videos" },
    ],
    [t],
  );

  const menuItems = useMemo(
    () =>
      (layout?.menu ?? []).map((item) =>
        mapMenuItem(item, navbarCategories, galleryLinks),
      ),
    [layout?.menu, navbarCategories, galleryLinks],
  );

  const mid = Math.ceil(menuItems.length / 2);
  const leftLinks = menuItems.slice(0, mid);
  const rightLinks = menuItems.slice(mid);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (code: string) =>
    router.replace(pathname, { locale: code });

  return (
    <>
      <DesktopNavbar
        scrolled={scrolled}
        logo={logo}
        siteName={siteName}
        leftLinks={leftLinks}
        rightLinks={rightLinks}
        openDropdown={openDropdown}
        onOpenDropdown={setOpenDropdown}
        onCloseDropdown={() => setOpenDropdown(null)}
        pathname={pathname}
        search={search}
        locale={locale}
        onSwitchLocale={switchLocale}
      />

      <MobileNavbar
        scrolled={scrolled}
        logo={logo}
        siteName={siteName}
        menuItems={menuItems}
        isOpen={mobileOpen}
        openDropdown={openDropdown}
        onOpen={() => setMobileOpen(true)}
        onClose={() => {
          setMobileOpen(false);
          setOpenDropdown(null);
        }}
        onToggleDropdown={(name) =>
          setOpenDropdown((cur) => (cur === name ? null : name))
        }
        pathname={pathname}
        search={search}
        locale={locale}
        onSwitchLocale={switchLocale}
      />
    </>
  );
}
