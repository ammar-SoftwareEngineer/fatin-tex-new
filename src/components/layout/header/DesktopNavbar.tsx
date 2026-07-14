"use client";

import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import LanguageMenu from "./LanguageMenu";
import type { NavItem } from "./navTypes";
import { isLinkActive, isParentActive } from "./navUtils";

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

function DesktopLink({
  item,
  parentActive,
  isOpen,
  onOpen,
  onClose,
  pathname,
  search,
}: {
  item: NavItem;
  parentActive: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  pathname: string;
  search: string;
}) {
  if (!item.dropdown?.length) {
    return (
      <li className="relative group">
        <Link
          href={item.href || "#"}
          className={`relative transition duration-300 ${
            parentActive
              ? "text-[#e0bc80]"
              : "text-white hover:text-[#e0bc80]"
          }`}
        >
          {item.name}
          <span
            className={`absolute left-0 -bottom-1 h-[2px] bg-[#e0bc80] transition-all duration-300 ${
              parentActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
      </li>
    );
  }

  return (
    <li className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <div className="flex items-center gap-2">
        <Link
          href={item.href || "#"}
          className={`relative transition duration-300 ${
            parentActive
              ? "text-[#e0bc80]"
              : "text-white hover:text-[#e0bc80]"
          }`}
        >
          {item.name}
          <span
            className={`absolute left-0 -bottom-1 h-[2px] bg-[#e0bc80] transition-all duration-300 ${
              parentActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
        <button
          type="button"
          onClick={onOpen}
          aria-expanded={isOpen}
          aria-label={`${item.name} menu`}
          className={`transition ${
            parentActive
              ? "text-[#e0bc80]"
              : "text-white hover:text-[#e0bc80]"
          }`}
        >
          <FaChevronDown
            className={`text-xs transition duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div
        className={`absolute top-full left-0 pt-3 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <ul className="w-56 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl p-3">
          {item.dropdown.map((sub) => {
            const subActive = isLinkActive(pathname, search, sub.href);
            return (
              <li key={sub.href}>
                <Link
                  href={sub.href}
                  onClick={onClose}
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
        <ul className="flex items-center justify-end gap-16 text-lg font-medium text-nowrap">
          {leftLinks.map((item) => (
            <DesktopLink
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

        <div className="flex items-center justify-start gap-10">
          <ul className="flex items-center gap-16 text-lg font-medium text-nowrap">
            {rightLinks.map((item) => (
              <DesktopLink
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

      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[350px] h-[180px] bg-[#e0bc80]/20 blur-3xl rounded-full pointer-events-none" />
    </nav>
  );
}
