import type { LayoutData } from "@/types/layoutTypes";
import { formatLayoutPhone } from "@/types/layoutTypes";
import type { BlogDetailsData } from "@/types/blogTypes";
import type { ProductDetailsData } from "@/types/productTypes";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { getSiteUrl, localeUrl } from "@/lib/seo/site";

type JsonLd = Record<string, unknown>;

export function buildOrganizationJsonLd(
  locale: string,
  layout?: LayoutData | null,
): JsonLd {
  const siteUrl = getSiteUrl();
  const branding = layout?.branding;
  const contact = layout?.contact;
  const social = layout?.social_links?.map((link) => link.url).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: branding?.site_name || "Fatin Tex",
    url: localeUrl(locale),
    logo: branding?.logo || undefined,
    image: branding?.logo || undefined,
    email: contact?.email || contact?.support_email || undefined,
    telephone: formatLayoutPhone(contact) || undefined,
    address: contact?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: contact.address,
        }
      : undefined,
    sameAs: social?.length ? social : undefined,
    contactPoint: contact?.email
      ? {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: contact.email,
          telephone: formatLayoutPhone(contact) || undefined,
          availableLanguage: ["en", "ar", "tr"],
        }
      : undefined,
    "@id": `${siteUrl}/#organization`,
  };
}

export function buildWebSiteJsonLd(locale: string, siteName?: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName || "Fatin Tex",
    url: localeUrl(locale),
    inLanguage: locale,
    publisher: {
      "@id": `${getSiteUrl()}/#organization`,
    },
  };
}

export function buildProductJsonLd(
  locale: string,
  product: ProductDetailsData,
  siteName?: string,
): JsonLd {
  const slug = getLocalizedSlug(product.slug, locale);
  const url = localeUrl(locale, `/products/${slug}`);
  const images = [
    product.main_image,
    ...(product.images?.map((img) => img.url) ?? []),
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.short_description || product.description || undefined,
    image: images.length ? images : undefined,
    url,
    sku: String(product.id),
    brand: {
      "@type": "Brand",
      name: siteName || "Fatin Tex",
    },
    category: product.category?.name || undefined,
    ...(typeof product.price === "number"
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: product.price,
            availability:
              product.quantity === 0
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function buildArticleJsonLd(
  locale: string,
  blog: BlogDetailsData,
  siteName?: string,
): JsonLd {
  const slug = getLocalizedSlug(blog.slug, locale);
  const url = localeUrl(locale, `/blogs/${slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt || undefined,
    image: blog.image || undefined,
    datePublished: blog.published_at || undefined,
    dateModified: blog.published_at || undefined,
    mainEntityOfPage: url,
    url,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: siteName || "Fatin Tex",
    },
    publisher: {
      "@type": "Organization",
      name: siteName || "Fatin Tex",
      "@id": `${getSiteUrl()}/#organization`,
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
