/**
 * Safe fetch wrapper that handles empty or invalid JSON responses gracefully.
 */
export async function fetchJson(
  url: string,
  options?: RequestInit & { next?: { revalidate?: number } }
): Promise<unknown> {
  const response = await fetch(url, options);

  const text = await response.text();

  if (!text) {
    throw new Error(`Empty response from ${url} (status ${response.status})`);
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `Invalid JSON from ${url} (status ${response.status}): ${text.slice(0, 200)}`
    );
  }

  if (!response.ok) {
    throw Object.assign(new Error(`HTTP ${response.status} from ${url}`), {
      status: response.status,
      data,
    });
  }

  return data;
}
