const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchProductsData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch products data:", data);
      return { success: false, message: "Failed To Fetch Products Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Products data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function fetchProductDetailsData(slug: string, lang = "en") {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/products/${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
        method: "GET",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch product details:", data);
      return { success: false, message: "Failed To Fetch Product Details" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Product details fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
