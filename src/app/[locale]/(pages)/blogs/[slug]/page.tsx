import { notFound } from "next/navigation";
import BlogDetail from "@/components/blogs/BlogDetail";
import { fetchBlogDetailsData } from "@/api/blogsService";
import { createEntityMetadata, setupPageLocale } from "@/lib/seo";
import { findSlugInLocale } from "@/lib/locale-fallback";
import { redirect } from "@/i18n/navigation";
import type { BlogDetailsApiResponse } from "@/types/blogTypes";

type Props = { params: Promise<{ locale: string; slug: string }> };

async function getBlog(slug: string, locale: string) {
  const response = await fetchBlogDetailsData(slug, locale);
  return (response as BlogDetailsApiResponse)?.data ?? null;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const blog = await getBlog(slug, locale);

  if (!blog) {
    return { title: "Article Not Found", robots: { index: false, follow: false } };
  }

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

export default async function BlogDetailPage({ params }: Props) {
  const locale = await setupPageLocale(params);
  const { slug } = await params;
  const blog = await getBlog(slug, locale);

  if (!blog) {
    const localized = await findSlugInLocale(slug, locale, fetchBlogDetailsData);
    if (localized) redirect({ href: `/blogs/${localized}`, locale });
    notFound();
  }

  return <BlogDetail blog={blog} />;
}
