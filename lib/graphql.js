function getGraphQLEndpoint() {
  const base =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    process.env.NEXT_PUBLIC_SITES_API ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "";
  if (!base) {
    throw new Error(
      "Missing WordPress GraphQL base URL. Set NEXT_PUBLIC_WORDPRESS_API_URL (preferred) or NEXT_PUBLIC_SITES_API / NEXT_PUBLIC_BACKEND_URL.",
    );
  }
  // If it already ends with /graphql, use as-is
  if (base.replace(/\/+$/, "").endsWith("/graphql")) {
    return base;
  }
  // Otherwise, append /graphql to the base site URL
  return base.replace(/\/+$/, "") + "/graphql";
}

const GRAPHQL_TIMEOUT_MS = 30000; // 30 seconds - abort slow requests and use fallbacks

/**
 * Next.js Data Cache can treat POSTs to the same URL as one entry unless the URL differs.
 * GraphQL always POSTs to the same endpoint; vary the URL so each query+variables gets its own cache slot.
 */
function graphqlFetchUrl(query, variables) {
  const base = getGraphQLEndpoint();
  const payload = query + JSON.stringify(variables ?? {});
  let h1 = 5381;
  let h2 = 52711;
  for (let i = 0; i < payload.length; i++) {
    const c = payload.charCodeAt(i);
    h1 = (Math.imul(33, h1) ^ c) >>> 0;
    h2 = (Math.imul(33, h2) ^ c * (i + 1)) >>> 0;
  }
  const key = `${h1.toString(16)}_${h2.toString(16)}`;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}_gql=${encodeURIComponent(key)}`;
}

export async function fetchGraphQL(query, variables = {}, options = {}) {
  const inputTags = Array.isArray(options?.tags) ? options.tags : ["cms"];
  // Ensure global tag is always present so CMS webhooks can clear everything safely.
  const tags = Array.from(new Set(["all", ...inputTags]));
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GRAPHQL_TIMEOUT_MS);

  try {
    const res = await fetch(graphqlFetchUrl(query, variables), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      signal: controller.signal,
      next: { revalidate: 60, tags },
    });

    if (!res.ok) {
      throw new Error("GraphQL request failed");
    }

    const raw = await res.text();
    let json;
    try {
      json = JSON.parse(raw);
    } catch {
      throw new Error("Invalid JSON response from WordPress GraphQL endpoint");
    }

    if (json.errors) {
      throw new Error("GraphQL errors occurred");
    }

    return json.data;
  } finally {
    clearTimeout(timeoutId);
  }
}
