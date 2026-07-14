"use client";

import Image from "next/image";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import LanguageMenu from "./LanguageMenu";
import type { NavItem } from "./navTypes";
import { isLinkActive, isParentActive } from "./navUtils";

type MobileNavbarProps = {
  scrolled: boolean;
  logo: string;
  siteName: string;
  menuItems: NavItem[];
  isOpen: boolean;
  openDropdown: string | null;
  onOpen: () => void;
  onClose: () => void;
  onToggleDropdown: (name: string) => void;
  pathname: string;
  search: string;
  locale: string;
  onSwitchLocale: (code: string) => void;
};

function MobileLink({
  item,
  parentActive,
  isOpen,
  onToggle,
  onNavigate,
  pathname,
  search,
}: {
  item: NavItem;
  parentActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  pathname: string;
  search: string;
}) {
  if (!item.dropdown?.length) {
    return (
      <Link
        href={item.href || "/"}
        onClick={onNavigate}
        className={`text-lg border-b border-white/10 pb-4 transition ${
          parentActive
            ? "text-[#e0bc80]"
            : "text-white hover:text-[#e0bc80]"
        }`}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div className="border-b border-white/10 pb-4">
      <div className="w-full flex items-center justify-between gap-3">
        <Link
          href={item.href || "/"}
          onClick={onNavigate}
          className={`text-lg transition ${
            parentActive
              ? "text-[#e0bc80]"
              : "text-white hover:text-[#e0bc80]"
          }`}
        >
          {item.name}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="text-white p-1"
          aria-label={`${item.name} menu`}
        >
          <FaChevronDown
            className={`transition duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 mt-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3 pl-3">
          {item.dropdown.map((sub) => {
            const subActive = isLinkActive(pathname, search, sub.href);
            return (
              <Link
                key={sub.href}
                href={sub.href}
                onClick={onNavigate}
                className={`transition ${
                  subActive
                    ? "text-[#e0bc80]"
                    : "text-gray-300 hover:text-[#e0bc80]"
                }`}
              >
                {sub.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MobileNavbar({
  scrolled,
  logo,
  siteName,
  menuItems,
  isOpen,
  openDropdown,
  onOpen,
  onClose,
  onToggleDropdown,
  pathname,
  search,
  locale,
  onSwitchLocale,
}: MobileNavbarProps) {
  return (
    <>
      <nav
        className={`lg:hidden fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/40 backdrop-blur-xl shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="w-full mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="shrink-0 relative z-10">
            <Image
              src={logo}
              alt={siteName}
              width={90}
              height={60}
              className="object-contain"
              loading="eager"
            />
          </Link>

          <button
            onClick={onOpen}
            className="text-2xl text-white"
            type="button"
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[350px] h-[180px] bg-[#e0bc80]/20 blur-3xl rounded-full pointer-events-none" />
      </nav>

      <div
        className={`fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
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
            onClick={onClose}
            className="text-white text-2xl"
            type="button"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <div className="px-6 py-8 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-100px)]">
          {menuItems.map((item) => (
            <MobileLink
              key={item.name}
              item={item}
              parentActive={isParentActive(item, pathname, search)}
              isOpen={openDropdown === item.name}
              onToggle={() => onToggleDropdown(item.name)}
              onNavigate={onClose}
              pathname={pathname}
              search={search}
            />
          ))}

          <LanguageMenu
            locale={locale}
            onSwitch={(code) => {
              onSwitchLocale(code);
              onClose();
            }}
            variant="mobile"
          />
        </div>
      </div>
    </>
  );
}
