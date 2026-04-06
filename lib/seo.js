import { fetchGraphQL } from './graphql';
import { print } from "graphql";
import {
  GET_INDUSTRIE_SEO_BY_ID,
  GET_PAGE_SEO_BY_ID,
  GET_POST_SEO_BY_ID,
  GET_SERVICE_SEO_BY_ID,
  GET_SOLUTION_SEO_BY_ID,
  HOME_PAGE_ID,
} from "./graphql/queries";

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

function stripDomainToPath(inputUrl) {
  if (!inputUrl || typeof inputUrl !== "string") return null;
  const trimmed = inputUrl.trim();
  if (!trimmed) return null;
  // Already relative
  if (trimmed.startsWith("/")) return trimmed.replace(/\/+$/, "") || "/";
  // Attempt to parse absolute URL and return pathname (+ query/hash if present)
  try {
    const u = new URL(trimmed);
    const path = `${u.pathname || "/"}${u.search || ""}${u.hash || ""}`;
    return (path || "/").replace(/\/+$/, "") || "/";
  } catch {
    return null;
  }
}

function toBoolFromYoastRobots(value) {
  if (value == null) return null;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const v = value.toLowerCase().trim();
    if (v === "1" || v === "true" || v === "yes") return true;
    if (v === "0" || v === "false" || v === "no") return false;
    if (v.includes("noindex") || v.includes("nofollow")) return true;
    if (v.includes("index") || v.includes("follow")) return false;
  }
  return null;
}

function pickImageUrl(imageNode) {
  if (!imageNode) return null;
  return (
    imageNode?.sourceUrl ||
    imageNode?.mediaItemUrl ||
    imageNode?.node?.sourceUrl ||
    imageNode?.node?.mediaItemUrl ||
    null
  );
}

export function extractYoastSchemaRaw(seo) {
  const raw = seo?.schema?.raw;
  return typeof raw === "string" && raw.trim() ? raw : null;
}

export function yoastToNextMetadata({
  seo,
  titleFallback,
  excerptFallback,
  featuredImageFallback,
  urlPathFallback,
} = {}) {
  const titleRaw = seo?.title || seo?.opengraphTitle || titleFallback || DEFAULT_TITLE;
  const metaDescRaw =
    seo?.metaDesc ||
    seo?.opengraphDescription ||
    (excerptFallback ? excerptFallback.replace(/<[^>]+>/g, "").trim() : "") ||
    DEFAULT_DESCRIPTION;

  const title = String(titleRaw || "").trim() || DEFAULT_TITLE;
  const description = String(metaDescRaw || "").trim().slice(0, 160) || DEFAULT_DESCRIPTION;

  const canonicalPath =
    stripDomainToPath(seo?.canonical) ||
    stripDomainToPath(seo?.opengraphUrl) ||
    (typeof urlPathFallback === "string" ? stripDomainToPath(urlPathFallback) : null);

  const noindex = toBoolFromYoastRobots(seo?.metaRobotsNoindex);
  const nofollow = toBoolFromYoastRobots(seo?.metaRobotsNofollow);
  const robots =
    noindex == null && nofollow == null
      ? undefined
      : {
          index: noindex === true ? false : undefined,
          follow: nofollow === true ? false : undefined,
          googleBot: {
            index: noindex === true ? false : undefined,
            follow: nofollow === true ? false : undefined,
          },
        };

  const ogImageUrl =
    pickImageUrl(seo?.opengraphImage) ||
    pickImageUrl(featuredImageFallback) ||
    DEFAULT_OG_IMAGE;
  const twImageUrl =
    pickImageUrl(seo?.twitterImage) ||
    pickImageUrl(seo?.opengraphImage) ||
    pickImageUrl(featuredImageFallback) ||
    DEFAULT_OG_IMAGE;

  const openGraph = {
    title: String(seo?.opengraphTitle || title).trim(),
    description: String(seo?.opengraphDescription || description).trim(),
    type: seo?.opengraphType || "website",
    siteName: seo?.opengraphSiteName || undefined,
    url: canonicalPath || undefined,
    publishedTime: seo?.opengraphPublishedTime || undefined,
    modifiedTime: seo?.opengraphModifiedTime || undefined,
    images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
  };

  const twitter = {
    card: "summary_large_image",
    title: String(seo?.twitterTitle || seo?.opengraphTitle || title).trim(),
    description: String(seo?.twitterDescription || seo?.opengraphDescription || description).trim(),
    images: twImageUrl ? [twImageUrl] : undefined,
  };

  return {
    title,
    description,
    ...(robots ? { robots } : {}),
    ...(canonicalPath
      ? {
          alternates: {
            canonical: canonicalPath,
          },
        }
      : {}),
    openGraph,
    twitter,
  };
}

function resolveHomePageDatabaseId() {
  const fromEnv =
    process.env.HOME_PAGE_ID ?? process.env.NEXT_PUBLIC_HOME_PAGE_ID;
  if (fromEnv != null && String(fromEnv).trim() !== "") {
    const n = Number(fromEnv);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return HOME_PAGE_ID;
}

async function getHomepageSeoFromGlobalQuery() {
  const data = await fetchGraphQL(GET_HOMEPAGE_SEO);

  if (!data?.seo) {
    return getDefaultMetadata();
  }

  const seo = data.seo;
  const pageDefaults = seo.contentTypes?.page;
  const frontPage = seo.openGraph?.frontPage;
  const defaultImage = seo.openGraph?.defaultImage;

  const title = frontPage?.title || pageDefaults?.title || DEFAULT_TITLE;
  const description =
    frontPage?.description || pageDefaults?.metaDesc || DEFAULT_DESCRIPTION;
  const ogImage =
    frontPage?.image?.sourceUrl || defaultImage?.sourceUrl || DEFAULT_OG_IMAGE;

  return {
    title: title.trim(),
    description: description.trim(),
    openGraph: {
      title: title.trim(),
      description: description.trim(),
      images: [{ url: ogImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title.trim(),
      description: description.trim(),
      images: [ogImage],
    },
  };
}

/**
 * Fetches homepage SEO from WordPress and returns Next.js Metadata.
 * Prefers Yoast fields on the front page (same as other routes); falls back to root seo query.
 */
export async function getHomepageSeoMetadata() {
  const pageId = resolveHomePageDatabaseId();

  try {
    const data = await fetchGraphQL(print(GET_PAGE_SEO_BY_ID), {
      pageId: Number(pageId),
    });
    const page = data?.pageBy;
    if (page?.seo) {
      return yoastToNextMetadata({
        seo: page.seo,
        titleFallback: page.title,
        excerptFallback: page.excerpt,
        featuredImageFallback: page.featuredImage,
        urlPathFallback: "/",
      });
    }
  } catch {
    // fall through to global Yoast query
  }

  try {
    return await getHomepageSeoFromGlobalQuery();
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

/**
 * Derives SEO metadata from a post object (avoids separate GraphQL call).
 */
export function getPostSeoMetadata(post) {
  if (!post) return getDefaultMetadata();
  return yoastToNextMetadata({
    seo: post.seo,
    titleFallback: post.title,
    excerptFallback: post.excerpt,
    featuredImageFallback: post.featuredImage,
    urlPathFallback: post?.slug ? `/blog/${post.slug}` : null,
  });
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
    return yoastToNextMetadata({
      seo: solution.seo,
      titleFallback: solution.title,
      excerptFallback: solution.excerpt,
      featuredImageFallback: solution.featuredImage,
      urlPathFallback: solution?.slug ? `/solution/${solution.slug}` : null,
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
    return yoastToNextMetadata({
      seo: node.seo,
      titleFallback: node.title,
      excerptFallback: node.excerpt,
      featuredImageFallback: node.featuredImage,
      urlPathFallback: normalizedUri,
    });
  } catch {
    return getDefaultMetadata();
  }
}

export async function getPageSeoMetadataById(pageId, urlPathFallback) {
  if (!pageId) return getDefaultMetadata();
  try {
    const data = await fetchGraphQL(print(GET_PAGE_SEO_BY_ID), { pageId: Number(pageId) });
    const page = data?.pageBy;
    if (!page) return getDefaultMetadata();
    return yoastToNextMetadata({
      seo: page.seo,
      titleFallback: page.title,
      excerptFallback: page.excerpt,
      featuredImageFallback: page.featuredImage,
      urlPathFallback,
    });
  } catch {
    return getDefaultMetadata();
  }
}

export async function getPostSeoMetadataById(postId, urlPathFallback) {
  if (!postId) return getDefaultMetadata();
  try {
    const data = await fetchGraphQL(print(GET_POST_SEO_BY_ID), { postId: Number(postId) });
    const post = data?.postBy;
    if (!post) return getDefaultMetadata();
    return yoastToNextMetadata({
      seo: post.seo,
      titleFallback: post.title,
      excerptFallback: post.excerpt,
      featuredImageFallback: post.featuredImage,
      urlPathFallback,
    });
  } catch {
    return getDefaultMetadata();
  }
}

export async function getSolutionSeoMetadataById(solutionId, urlPathFallback) {
  if (!solutionId) return getDefaultMetadata();
  try {
    const data = await fetchGraphQL(print(GET_SOLUTION_SEO_BY_ID), {
      solutionId: Number(solutionId),
    });
    const solution = data?.solutionBy;
    if (!solution) return getDefaultMetadata();
    return yoastToNextMetadata({
      seo: solution.seo,
      titleFallback: solution.title,
      excerptFallback: solution.excerpt,
      featuredImageFallback: solution.featuredImage,
      urlPathFallback,
    });
  } catch {
    return getDefaultMetadata();
  }
}

export async function getServiceSeoMetadataById(serviceId, urlPathFallback) {
  if (!serviceId) return getDefaultMetadata();
  try {
    const data = await fetchGraphQL(print(GET_SERVICE_SEO_BY_ID), {
      serviceId: Number(serviceId),
    });
    const service = data?.serviceBy;
    if (!service) return getDefaultMetadata();
    return yoastToNextMetadata({
      seo: service.seo,
      titleFallback: service.title,
      excerptFallback: service.excerpt,
      featuredImageFallback: service.featuredImage,
      urlPathFallback,
    });
  } catch {
    return getDefaultMetadata();
  }
}

export async function getIndustrieSeoMetadataById(industrieId, urlPathFallback) {
  if (!industrieId) return getDefaultMetadata();
  try {
    const data = await fetchGraphQL(print(GET_INDUSTRIE_SEO_BY_ID), {
      industrieId: Number(industrieId),
    });
    const industrie = data?.industrieBy;
    if (!industrie) return getDefaultMetadata();
    return yoastToNextMetadata({
      seo: industrie.seo,
      titleFallback: industrie.title,
      excerptFallback: industrie.excerpt,
      featuredImageFallback: industrie.featuredImage,
      urlPathFallback,
    });
  } catch {
    return getDefaultMetadata();
  }
}