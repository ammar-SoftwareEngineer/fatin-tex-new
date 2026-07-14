import { notFound } from "next/navigation";
import BlogDetail from "@/components/blogs/BlogDetail";
import {
  fetchBlogDetailsData,
  fetchBlogsData,
} from "@/api/blogsService";
import { createEntityMetadata } from "@/lib/seo/entity-metadata";
import { setupPageLocale } from "@/lib/page-utils";
import { isApiError } from "@/types/layoutTypes";
import type {
  Blog,
  BlogDetailsApiResponse,
  BlogsApiResponse,
} from "@/types/blogTypes";

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

  const [detailsResponse, listResponse] = await Promise.all([
    fetchBlogDetailsData(slug, locale),
    fetchBlogsData(locale),
  ]);

  if (
    isApiError(detailsResponse) ||
    !(detailsResponse as BlogDetailsApiResponse)?.data
  ) {
    notFound();
  }

  const blog = (detailsResponse as BlogDetailsApiResponse).data;
  const allBlogs: Blog[] = isApiError(listResponse)
    ? []
    : ((listResponse as BlogsApiResponse).data ?? []);

  const relatedBlogs = allBlogs
    .filter((item) => item.id !== blog.id)
    .slice(0, 3);

  return <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />;
}
