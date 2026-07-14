export type NavLink = { name: string; href: string };
export type NavItem = NavLink & { dropdown?: NavLink[] };

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
  { code: "tr", label: "TR" },
] as const;
