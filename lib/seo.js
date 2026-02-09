import { fetchGraphQL } from './graphql';

const GET_HOMEPAGE_SEO = `
  query GetHomepageSeo {
    seo {
      contentTypes {
        page {
          metaDesc
          title
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

const DEFAULT_OG_IMAGE = '/default-og.jpg';
const DEFAULT_TITLE = 'InfoNet Technology Corporation';
const DEFAULT_DESCRIPTION = 'From gas stations to convenience stores, InfoNet delivers integrated POS and fuel management systems that keep your business running smarter, faster, and more profitably.';

/**
 * Fetches homepage SEO from WordPress and returns Next.js Metadata.
 */
export async function getHomepageSeoMetadata() {
  try {
    const data = await fetchGraphQL(GET_HOMEPAGE_SEO);

    if (!data?.seo) {
      return getDefaultMetadata();
    }

    const seo = data.seo;

    // Extract data with fallbacks
    const pageDefaults = seo.contentTypes?.page;
    const frontPage = seo.openGraph?.frontPage;
    const defaultImage = seo.openGraph?.defaultImage;

    const title = frontPage?.title || pageDefaults?.title || DEFAULT_TITLE;
    const description = frontPage?.description || pageDefaults?.metaDesc || DEFAULT_DESCRIPTION;
    const ogImage = frontPage?.image?.sourceUrl || defaultImage?.sourceUrl || DEFAULT_OG_IMAGE;

    // Build metadata object
    const metadata = {
      title: title.trim(),
      description: description.trim(),
      openGraph: {
        title: title.trim(),
        description: description.trim(),
        images: [{ url: ogImage }],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: title.trim(),
        description: description.trim(),
        images: [ogImage],
      },
    };

    return metadata;
  } catch {
    return getDefaultMetadata();
  }
}

// Helper function for default metadata
function getDefaultMetadata(overrides = {}) {
  return {
    title: overrides.title ?? DEFAULT_TITLE,
    description: overrides.description ?? DEFAULT_DESCRIPTION,
    openGraph: {
      title: overrides.title ?? DEFAULT_TITLE,
      description: overrides.description ?? DEFAULT_DESCRIPTION,
      images: [{ url: overrides.image ?? DEFAULT_OG_IMAGE }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: overrides.title ?? DEFAULT_TITLE,
      description: overrides.description ?? DEFAULT_DESCRIPTION,
      images: [overrides.image ?? DEFAULT_OG_IMAGE],
    },
  };
}

const GET_NODE_BY_URI = `
  query GetNodeSeo($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Post {
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
        }
      }
      ... on Page {
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  }
`;

const GET_SOLUTION_SEO = `
  query GetSolutionSeo($slug: String!) {
    solutionBy(slug: $slug) {
      title
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

/**
 * Fetches SEO metadata for a solution by slug.
 */
export async function getSolutionSeoMetadata(slug) {
  try {
    const data = await fetchGraphQL(GET_SOLUTION_SEO, { slug });
    const solution = data?.solutionBy;
    if (!solution) return getDefaultMetadata();

    const seo = solution.seo;
    const title = seo?.title || seo?.opengraphTitle || solution.title || DEFAULT_TITLE;
    const description = seo?.metaDesc || seo?.opengraphDescription || (solution.excerpt ? solution.excerpt.replace(/<[^>]+>/g, '').trim() : '') || DEFAULT_DESCRIPTION;
    const image = seo?.opengraphImage?.sourceUrl || solution.featuredImage?.node?.sourceUrl || DEFAULT_OG_IMAGE;

    return getDefaultMetadata({
      title: title.trim(),
      description: description.trim().slice(0, 160),
      image,
    });
  } catch {
    return getDefaultMetadata();
  }
}

/**
 * Fetches SEO metadata for a post or page by URI (e.g. "blog/my-slug" or "solutions/my-slug").
 */
export async function getSeoMetadata(uri) {
  try {
    const normalizedUri = uri.startsWith('/') ? uri : `/${uri}`;
    const data = await fetchGraphQL(GET_NODE_BY_URI, { uri: normalizedUri });

    const node = data?.nodeByUri;
    if (!node) {
      return getDefaultMetadata();
    }

    const seo = node.seo;
    const title = seo?.title || seo?.opengraphTitle || node.title || DEFAULT_TITLE;
    const description = seo?.metaDesc || seo?.opengraphDescription || (node.excerpt ? node.excerpt.replace(/<[^>]+>/g, '').trim() : '') || DEFAULT_DESCRIPTION;
    const image = seo?.opengraphImage?.sourceUrl || node.featuredImage?.node?.sourceUrl || DEFAULT_OG_IMAGE;

    return getDefaultMetadata({
      title: title.trim(),
      description: description.trim().slice(0, 160),
      image,
    });
  } catch {
    return getDefaultMetadata();
  }
}