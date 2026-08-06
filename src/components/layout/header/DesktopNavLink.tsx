"use client";

/**
 * Single desktop menu link.
 * Supports a simple link or a hover dropdown submenu.
 */
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import type { NavItem } from "./navTypes";
import { isLinkActive } from "./navUtils";
import { transitionFast } from "@/lib/motion";

type DesktopNavLinkProps = {
  item: NavItem;
  parentActive: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  pathname: string;
  search: string;
};

export default function DesktopNavLink({
  item,
  parentActive,
  isOpen,
  onOpen,
  onClose,
  pathname,
  search,
}: DesktopNavLinkProps) {
  const linkClass = parentActive
    ? "text-[#e0bc80]"
    : "text-white hover:text-[#e0bc80]";

  // Underline that grows on hover / active
  const underlineClass = `absolute left-0 -bottom-1 h-[2px] bg-[#e0bc80] transition-all duration-300 ${
    parentActive ? "w-full" : "w-0 group-hover:w-full"
  }`;

  // Simple link (no dropdown)
  if (!item.dropdown?.length) {
    return (
      <li className="relative group">
        <Link
          href={item.href || "#"}
          className={`relative transition duration-300 ${linkClass}`}
        >
          {item.name}
          <span className={underlineClass} />
        </Link>
      </li>
    );
  }

  // Parent link + hover dropdown
  return (
    <li className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <div className="flex items-center gap-2">
        <Link
          href={item.href || "#"}
          className={`relative transition duration-300 ${linkClass}`}
        >
          {item.name}
          <span className={underlineClass} />
        </Link>

        <button
          type="button"
          onClick={onOpen}
          aria-expanded={isOpen}
          aria-label={`${item.name} menu`}
          className={`transition ${linkClass}`}
        >
          <FaChevronDown
            className={`text-xs transition duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key={`${item.name}-dropdown`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={transitionFast}
            className="absolute top-full left-0 pt-3"
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
