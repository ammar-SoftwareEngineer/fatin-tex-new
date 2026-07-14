import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import BlogsPageView from "@/components/blogs/BlogsPage";
import { fetchBlogsData } from "@/api/blogsService";
import { isApiError } from "@/types/layoutTypes";
import type { BlogsApiResponse } from "@/types/blogTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "blogs");
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await setupPageLocale(params);
  const blogsResponse = await fetchBlogsData(locale);

  const blogs = isApiError(blogsResponse)
    ? []
    : ((blogsResponse as BlogsApiResponse).data ?? []);

  return <BlogsPageView blogs={blogs} />;
}
