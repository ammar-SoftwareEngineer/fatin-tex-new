/**
 * Fetch blogs list and blog details from the backend API.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchBlogsData(lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/blogs?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Blogs data fetch error:", message);
    return { success: false, message };
  }
}

export async function fetchBlogDetailsData(slug: string, lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${slug}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 60 },
    });
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Blog details fetch error:", message);
    return { success: false, message };
  }
}
