/**
 * Run this to verify WordPress GraphQL connection and homepage SEO.
 * Usage (from theme root): node --env-file=.env.local scripts/check-seo-connection.js
 * Or set WORDPRESS_GRAPHQL_URL first, then: node scripts/check-seo-connection.js
 */

const url = process.env.WORDPRESS_GRAPHQL_URL;
if (!url) {
  console.error('Missing WORDPRESS_GRAPHQL_URL. Set it in .env.local or run: node --env-file=.env.local scripts/check-seo-connection.js');
  process.exit(1);
}

const GET_HOMEPAGE_SEO = `
  query GetHomepageSeo {
    seo {
      meta {
        homepage {
          title
          description
        }
      }
      openGraph {
        frontPage {
          title
          description
          image {
            sourceUrl
          }
        }
        defaultImage {
          sourceUrl
        }
      }
    }
  }
`;

async function check() {
  console.log('GraphQL URL:', url);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: GET_HOMEPAGE_SEO }),
    });
    if (!res.ok) {
      console.error('HTTP error:', res.status, res.statusText);
      process.exit(1);
    }
    const json = await res.json();
    if (json.errors) {
      console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2));
      process.exit(1);
    }
    const seo = json.data?.seo;
    if (!seo) {
      console.error('No seo in response. Is add-wpgraphql-seo + Yoast active on WordPress?');
      process.exit(1);
    }
    const home = seo.meta?.homepage ?? {};
    const frontPage = seo.openGraph?.frontPage ?? {};
    console.log('\nHomepage SEO from WordPress:');
    console.log('  title:', home.title || '(empty)');
    console.log('  description:', (home.description || '(empty)').slice(0, 80) + (home.description?.length > 80 ? '...' : ''));
    console.log('  OG title:', frontPage.title || '(empty)');
    console.log('  OG image:', frontPage.image?.sourceUrl || seo.openGraph?.defaultImage?.sourceUrl || '(none)');
    console.log('\nConnection OK. Homepage metadata will use this data.');
  } catch (err) {
    console.error('Connection failed:', err.message);
    if (url.includes('infonet.local')) {
      console.log('\nFor local WordPress at http://infonet.local use: WORDPRESS_GRAPHQL_URL=http://infonet.local/graphql');
    }
    process.exit(1);
  }
}

check();
