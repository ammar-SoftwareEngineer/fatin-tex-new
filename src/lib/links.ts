export function isExternalHref(href?: string | null): boolean {
  if (!href) return false;
  return /^(https?:)?\/\//i.test(href) || href.startsWith("//");
}

export function externalLinkProps(href?: string | null) {
  if (!isExternalHref(href)) {
    return {};
  }

  return {
    target: "_blank" as const,
    rel: "noopener noreferrer" as const,
  };
}
