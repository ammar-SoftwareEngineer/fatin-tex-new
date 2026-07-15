const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchSondosData(lang = "en") {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/sondos-dyeing`,
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
      console.error("Failed to fetch sondos data:", data);
      return { success: false, message: "Failed To Fetch Sondos Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Sondos data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
