"use client";

/**
 * Mobile top bar + full-screen menu overlay.
 * Visible only below the `lg` breakpoint.
 */
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import MobileMenuOverlay from "./MobileMenuOverlay";
import type { NavItem } from "./navTypes";

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
      {/* Sticky top bar */}
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
              priority
              sizes="90px"
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

      <AnimatePresence>
        {isOpen ? (
          <MobileMenuOverlay
            logo={logo}
            siteName={siteName}
            menuItems={menuItems}
            openDropdown={openDropdown}
            onClose={onClose}
            onToggleDropdown={onToggleDropdown}
            pathname={pathname}
            search={search}
            locale={locale}
            onSwitchLocale={onSwitchLocale}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
