import { notFound } from "next/navigation";
import BlogDetail from "@/components/blogs/BlogDetail";
import { fetchBlogDetailsData } from "@/api/blogsService";
import { createEntityMetadata, setupPageLocale } from "@/lib/seo";
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
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
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
  const detailsResponse = await fetchBlogDetailsData(slug, locale);

  if (
    isApiError(detailsResponse) ||
    !(detailsResponse as BlogDetailsApiResponse)?.data
  ) {
    notFound();
  }

  return (
    <BlogDetail blog={(detailsResponse as BlogDetailsApiResponse).data} />
  );
}
