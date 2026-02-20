
const query = `
  query GetHomepageSeoNodeFull {
    nodeByUri(uri: "/") {
      ... on Page {
        title
        seo {
           title
           metaDesc
           opengraphTitle
           opengraphDescription
           twitterTitle
           twitterDescription
        }
      }
    }
  }
`;

fetch('http://infonet.local/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
  .then(res => res.json())
  .then()
  .catch(err => console.error(err));
