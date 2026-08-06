"use client";

/**
 * Full-screen mobile menu overlay with links and language switcher.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import LanguageMenu from "./LanguageMenu";
import MobileNavLink from "./MobileNavLink";
import type { NavItem } from "./navTypes";
import { isParentActive } from "./navUtils";
import { transitionBase } from "@/lib/motion";

type MobileMenuOverlayProps = {
  logo: string;
  siteName: string;
  menuItems: NavItem[];
  openDropdown: string | null;
  onClose: () => void;
  onToggleDropdown: (name: string) => void;
  pathname: string;
  search: string;
  locale: string;
  onSwitchLocale: (code: string) => void;
};

export default function MobileMenuOverlay({
  logo,
  siteName,
  menuItems,
  openDropdown,
  onClose,
  onToggleDropdown,
  pathname,
  search,
  locale,
  onSwitchLocale,
}: MobileMenuOverlayProps) {
  return (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitionBase}
      className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl lg:hidden"
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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transitionBase, delay: 0.08 }}
        className="px-6 py-8 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-100px)]"
      >
        {menuItems.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...transitionBase, delay: 0.05 + i * 0.04 }}
          >
            <MobileNavLink
              item={item}
              parentActive={isParentActive(item, pathname, search)}
              isOpen={openDropdown === item.name}
              onToggle={() => onToggleDropdown(item.name)}
              onNavigate={onClose}
              pathname={pathname}
              search={search}
            />
          </motion.div>
        ))}

        <LanguageMenu
          locale={locale}
          onSwitch={(code) => {
            onSwitchLocale(code);
            onClose();
          }}
          variant="mobile"
        />
      </motion.div>
    </motion.div>
  );
}
