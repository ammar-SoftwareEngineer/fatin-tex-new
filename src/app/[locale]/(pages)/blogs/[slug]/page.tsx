import { notFound } from "next/navigation";
import BlogDetail from "@/components/blogs/BlogDetail";
import {
  fetchBlogDetailsData,
  fetchBlogsData,
} from "@/api/blogsService";
import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
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
  return createPageMetadata(params, "blogs");
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
