"use client";

/**
 * Desktop navigation bar.
 * Logo sits in the center with menu links on both sides.
 */
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import LanguageMenu from "./LanguageMenu";
import DesktopNavLink from "./DesktopNavLink";
import type { NavItem } from "./navTypes";
import { isParentActive } from "./navUtils";

type DesktopNavbarProps = {
  scrolled: boolean;
  logo: string;
  siteName: string;
  leftLinks: NavItem[];
  rightLinks: NavItem[];
  openDropdown: string | null;
  onOpenDropdown: (name: string) => void;
  onCloseDropdown: () => void;
  pathname: string;
  search: string;
  locale: string;
  onSwitchLocale: (code: string) => void;
};

export default function DesktopNavbar({
  scrolled,
  logo,
  siteName,
  leftLinks,
  rightLinks,
  openDropdown,
  onOpenDropdown,
  onCloseDropdown,
  pathname,
  search,
  locale,
  onSwitchLocale,
}: DesktopNavbarProps) {
  return (
    <nav
      className={`hidden lg:block fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/40 backdrop-blur-xl shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full mx-auto px-5 py-4 flex items-center justify-center gap-16">
        {/* Left side links */}
        <ul className="flex items-center justify-end gap-16 text-lg font-medium text-nowrap">
          {leftLinks.map((item) => (
            <DesktopNavLink
              key={item.name}
              item={item}
              parentActive={isParentActive(item, pathname, search)}
              isOpen={openDropdown === item.name}
              onOpen={() => onOpenDropdown(item.name)}
              onClose={onCloseDropdown}
              pathname={pathname}
              search={search}
            />
          ))}
        </ul>

        {/* Center logo */}
        <Link href="/" className="shrink-0 relative z-10">
          <Image
            src={logo}
            alt={siteName}
            width={100}
            height={70}
            className="object-contain"
            priority
            sizes="100px"
          />
        </Link>

        {/* Right side links + language switcher */}
        <div className="flex items-center justify-start gap-10">
          <ul className="flex items-center gap-16 text-lg font-medium text-nowrap">
            {rightLinks.map((item) => (
              <DesktopNavLink
                key={item.name}
                item={item}
                parentActive={isParentActive(item, pathname, search)}
                isOpen={openDropdown === item.name}
                onOpen={() => onOpenDropdown(item.name)}
                onClose={onCloseDropdown}
                pathname={pathname}
                search={search}
              />
            ))}
          </ul>

          <LanguageMenu
            locale={locale}
            onSwitch={onSwitchLocale}
            variant="desktop"
          />
        </div>
      </div>

      {/* Soft gold glow behind the bar */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[350px] h-[180px] bg-[#e0bc80]/20 blur-3xl rounded-full pointer-events-none" />
    </nav>
  );
}
