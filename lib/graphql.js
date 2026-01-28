export async function fetchGraphQL(query, variables = {}) {
  const res = await fetch(process.env.WORDPRESS_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('GraphQL request failed');
  }

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('GraphQL errors occurred');
  }

  return json.data;
}
