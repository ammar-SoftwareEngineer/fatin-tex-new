const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchCategoriesData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch categories data:", data);
      return { success: false, message: "Failed To Fetch Categories Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Categories data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function fetchCategoryDetailsData(slug: string, lang = "en") {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/categories/${slug}`,
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
      console.error("Failed to fetch category details:", data);
      return { success: false, message: "Failed To Fetch Category Details" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Category details fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
