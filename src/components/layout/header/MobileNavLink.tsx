"use client";

/**
 * Single mobile menu link.
 * Supports a simple link or a parent link with a collapsible dropdown.
 */
import { FaChevronDown } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import type { NavItem, NavLink } from "./navTypes";
import { isLinkActive } from "./navUtils";

type MobileNavLinkProps = {
  item: NavItem;
  parentActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  pathname: string;
  search: string;
};

export default function MobileNavLink({
  item,
  parentActive,
  isOpen,
  onToggle,
  onNavigate,
  pathname,
  search,
}: MobileNavLinkProps) {
  const activeClass = parentActive
    ? "text-[#e0bc80]"
    : "text-white hover:text-[#e0bc80]";

  // Simple link (no dropdown)
  if (!item.dropdown?.length) {
    return (
      <Link
        href={item.href || "/"}
        onClick={onNavigate}
        className={`text-lg border-b border-white/10 pb-4 transition ${activeClass}`}
      >
        {item.name}
      </Link>
    );
  }

  // Parent link + expandable submenu
  return (
    <div className="border-b border-white/10 pb-4">
      <div className="w-full flex items-center justify-between gap-3">
        <Link
          href={item.href || "/"}
          onClick={onNavigate}
          className={`text-lg transition ${activeClass}`}
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

      {/* Collapsible submenu */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] mt-4" : "max-h-0"
        }`}
      >
        <MobileSubmenu
          links={item.dropdown}
          onNavigate={onNavigate}
          pathname={pathname}
          search={search}
        />
      </div>
    </div>
  );
}

type MobileSubmenuProps = {
  links: NavLink[];
  onNavigate: () => void;
  pathname: string;
  search: string;
  depth?: number;
};

/** Submenu links, with nested children indented below their parent. */
function MobileSubmenu({
  links,
  onNavigate,
  pathname,
  search,
  depth = 0,
}: MobileSubmenuProps) {
  return (
    <div
      className={`flex flex-col gap-3 ps-3 ${
        depth > 0 ? "border-s border-white/10 text-sm" : ""
      }`}
    >
      {links.map((sub) => {
        const subActive = isLinkActive(pathname, search, sub.href, true);

        return (
          <div key={sub.href} className="flex flex-col gap-3">
            <Link
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

            {sub.children?.length ? (
              <MobileSubmenu
                links={sub.children}
                onNavigate={onNavigate}
                pathname={pathname}
                search={search}
                depth={depth + 1}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
