"use client";

/**
 * Single desktop menu link.
 * Supports a simple link or a hover dropdown submenu.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import type { NavItem, NavLink } from "./navTypes";
import { hasActiveLink, isLinkActive } from "./navUtils";
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
            <ul className="w-full bg-black rounded-2xl shadow-2xl p-3">
              {item.dropdown.map((sub) => (
                <DesktopSubmenuItem
                  key={sub.href}
                  link={sub}
                  onClose={onClose}
                  pathname={pathname}
                  search={search}
                />
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

type DesktopSubmenuItemProps = {
  link: NavLink;
  onClose: () => void;
  pathname: string;
  search: string;
};

/** Dropdown entry; opens a side flyout on hover when it has children. */
function DesktopSubmenuItem({
  link,
  onClose,
  pathname,
  search,
}: DesktopSubmenuItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(link.children?.length);
  const active =
    isLinkActive(pathname, search, link.href, true) ||
    hasActiveLink(link.children, pathname, search);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={link.href}
        onClick={onClose}
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition  ${
          active || open
            ? "bg-[#e0bc80] text-black"
            : "text-white hover:bg-[#e0bc80] hover:text-black"
        }`}
      >
        <span>{link.name}</span>
        {hasChildren ? (
          <FaChevronRight className="text-xs shrink-0 rtl:rotate-180" />
        ) : null}
      </Link>

      <AnimatePresence>
        {hasChildren && open ? (
          <motion.div
            key={`${link.href}-flyout`}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={transitionFast}
            className="absolute top-0 left-full rtl:left-auto rtl:right-full ps-3 z-10"
          >
            <ul className="w-56 bg-black  rounded-2xl shadow-2xl p-3">
              {link.children!.map((child) => (
                <DesktopSubmenuItem
                  key={child.href}
                  link={child}
                  onClose={onClose}
                  pathname={pathname}
                  search={search}
                />
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
