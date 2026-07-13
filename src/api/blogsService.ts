const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchBlogsData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/blogs`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch blogs data:", data);
      return { success: false, message: "Failed To Fetch Blogs Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Blogs data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function fetchBlogDetailsData(slug: string, lang = "en") {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/blogs/${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
        method: "GET",
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch blog details:", data);
      return { success: false, message: "Failed To Fetch Blog Details" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Blog details fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
