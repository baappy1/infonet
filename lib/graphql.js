function getGraphQLEndpoint() {
  const base = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "";
  // If it already ends with /graphql, use as-is
  if (base.replace(/\/+$/, "").endsWith("/graphql")) {
    return base;
  }
  // Otherwise, append /graphql to the base site URL
  return base.replace(/\/+$/, "") + "/graphql";
}

const GRAPHQL_TIMEOUT_MS = 10000; // 10 seconds - abort slow requests and use fallbacks

export async function fetchGraphQL(query, variables = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GRAPHQL_TIMEOUT_MS);

  try {
    const res = await fetch(getGraphQLEndpoint(), {
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
      next: { revalidate: 0 },
      cache: 'no-store',
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
