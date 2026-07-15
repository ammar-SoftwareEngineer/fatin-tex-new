import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import BlogDetail from "@/components/blogs/BlogDetail";
import JsonLd from "@/components/seo/JsonLd";
import { fetchBlogDetailsData } from "@/api/blogsService";
import { fetchLayoutData } from "@/api/layoutService";
import { createEntityMetadata } from "@/lib/seo/entity-metadata";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo/json-ld";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { localeUrl } from "@/lib/seo/site";
import { setupPageLocale } from "@/lib/page-utils";
import { isApiError } from "@/types/layoutTypes";
import type { BlogDetailsApiResponse } from "@/types/blogTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const response = await fetchBlogDetailsData(slug, locale);

  if (isApiError(response) || !(response as BlogDetailsApiResponse)?.data) {
    return {};
  }

  const blog = (response as BlogDetailsApiResponse).data;

  return createEntityMetadata({
    locale,
    collection: "blogs",
    slug: blog.slug,
    title: blog.title,
    description: blog.excerpt,
    image: blog.image,
    publishedAt: blog.published_at,
    modifiedAt: blog.published_at,
    type: "article",
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const locale = await setupPageLocale(params);
  const { slug } = await params;

  const [detailsResponse, layoutData, tNav] = await Promise.all([
    fetchBlogDetailsData(slug, locale),
    fetchLayoutData(locale),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  if (
    isApiError(detailsResponse) ||
    !(detailsResponse as BlogDetailsApiResponse)?.data
  ) {
    notFound();
  }

  const blog = (detailsResponse as BlogDetailsApiResponse).data;
  const siteName = !isApiError(layoutData)
    ? layoutData.data?.branding?.site_name
    : undefined;
  const blogSlug = getLocalizedSlug(blog.slug, locale);

  return (
    <>
      <JsonLd data={buildArticleJsonLd(locale, blog, siteName)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: tNav("home"), url: localeUrl(locale) },
          { name: tNav("blogs"), url: localeUrl(locale, "/blogs") },
          {
            name: blog.title,
            url: localeUrl(locale, `/blogs/${blogSlug}`),
          },
        ])}
      />
      <BlogDetail blog={blog} />
    </>
  );
}
