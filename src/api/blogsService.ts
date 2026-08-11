/**
 * Fetch blogs list and blog details from the backend API.
 */
import { fetchJson } from "./fetchJson";

const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchBlogsData(lang = "en") {
  try {
    return await fetchJson(`${NEXT_PUBLIC_BACKEND_BASE_URL}/blogs?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Blogs data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function fetchBlogDetailsData(slug: string, lang = "en") {
  try {
    return await fetchJson(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/blogs/${slug}`,
      {
        headers: { "Content-Type": "application/json", "Accept-Language": lang },
        method: "GET",
        next: { revalidate: 60 },
      }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Blog details fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
