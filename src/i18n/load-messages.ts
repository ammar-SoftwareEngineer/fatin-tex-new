import type { AbstractIntlMessages } from "next-intl";

const loaders = {
  en: {
    common: () => import("../../messages/en/common.json"),
    home: () => import("../../messages/en/home.json"),
    about: () => import("../../messages/en/about.json"),
    contact: () => import("../../messages/en/contact.json"),
    products: () => import("../../messages/en/products.json"),
    blogs: () => import("../../messages/en/blogs.json"),
    media: () => import("../../messages/en/media.json"),
    sondos: () => import("../../messages/en/sondos.json"),
  },
  ar: {
    common: () => import("../../messages/ar/common.json"),
    home: () => import("../../messages/ar/home.json"),
    about: () => import("../../messages/ar/about.json"),
    contact: () => import("../../messages/ar/contact.json"),
    products: () => import("../../messages/ar/products.json"),
    blogs: () => import("../../messages/ar/blogs.json"),
    media: () => import("../../messages/ar/media.json"),
    sondos: () => import("../../messages/ar/sondos.json"),
  },
  tr: {
    common: () => import("../../messages/tr/common.json"),
    home: () => import("../../messages/tr/home.json"),
    about: () => import("../../messages/tr/about.json"),
    contact: () => import("../../messages/tr/contact.json"),
    products: () => import("../../messages/tr/products.json"),
    blogs: () => import("../../messages/tr/blogs.json"),
    media: () => import("../../messages/tr/media.json"),
    sondos: () => import("../../messages/tr/sondos.json"),
  },
} as const;

type AppLocale = keyof typeof loaders;
type ModuleName = keyof (typeof loaders)["en"];

const loadOrder: ModuleName[] = [
  "common",
  "home",
  "about",
  "contact",
  "products",
  "blogs",
  "media",
  "sondos",
];

export async function loadMessages(
  locale: string
): Promise<AbstractIntlMessages> {
  const lng: AppLocale =
    locale === "ar" ? "ar" : locale === "tr" ? "tr" : "en";
  const bundle = loaders[lng];
  const merged: Record<string, unknown> = {};

  for (const name of loadOrder) {
    const { default: data } = await bundle[name]();
    if (name === "common") {
      Object.assign(merged, data);
    } else {
      merged[name] = data;
    }
  }

  return merged as AbstractIntlMessages;
}
