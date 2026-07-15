export {
  SITE_URL_FALLBACK,
  getSiteUrl,
  isProductionSite,
  getIndexRobots,
} from "./site";

export {
  HREFLANG_LOCALES,
  localeUrl,
  localePath,
  buildLanguageAlternates,
  buildSlugLanguageAlternates,
} from "./alternates";

export {
  createEntityMetadata,
  createPageMetadata,
  setupPageLocale,
} from "./metadata";
