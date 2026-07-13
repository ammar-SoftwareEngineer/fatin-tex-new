import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import BlogsPageView from "@/components/blogs/BlogsPage";

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
  await setupPageLocale(params);
  return <BlogsPageView />;
}
