import { fetchGraphQL } from '@/lib/graphql';

// Fetch the "leadership" page and its blocks
async function getLeadershipPage() {
  const data = await fetchGraphQL(`
    query NewQuery {
      pageBy(uri: "leadership") {
        id
        blocks {
          attributesJSON
          dynamicContent
          originalContent
          saveContent
          name
          order
        }
      }
    }
  `);

  return data.pageBy;
}

export default async function LeadershipPage() {
  const page = await getLeadershipPage();

  if (!page) {
    return <p>Leadership page not found.</p>;
  }

  return (
    <section>
      <h1>Leadership Page</h1>
      <p>Page ID: {page.id}</p>

      <ul>
        {page.blocks.map((block, index) => (
          <li key={index} className="mb-4 p-2 border rounded">
            <p><strong>Block Name:</strong> {block.name}</p>
            <p><strong>Order:</strong> {block.order}</p>
            <p><strong>Attributes JSON:</strong> {block.attributesJSON}</p>
            <p><strong>Dynamic Content:</strong> {block.dynamicContent}</p>
            <p><strong>Original Content:</strong> {block.originalContent}</p>
            <p><strong>Saved Content:</strong> {block.saveContent}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
