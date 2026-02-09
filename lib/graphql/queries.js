import { gql } from '@apollo/client';

export const GET_PAGE_BLOCKS = gql`
  query GetPageBlocks($pageId: Int!) {
    pageBy(pageId: $pageId) {
      id
      blocksJSON
      blocks {
        attributesJSON
        dynamicContent
        originalContent
        saveContent
      }
    }
  }
`;

// Page by slug (for industry/content stored as WordPress Page)
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!) {
    pages(first: 1, where: { name: $slug }) {
      nodes {
        id
        databaseId
        title
        excerpt
        slug
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

// Solution by slug (for /solutions/[slug] page)
export const GET_SOLUTION_BY_SLUG = gql`
  query GetSolutionBySlug($slug: String!) {
    solutionBy(slug: $slug) {
      id
      databaseId
      blocksJSON
    }
  }
`;

// Solution by ID (fallback)
export const GET_SOLUTION_BY_ID = gql`
  query GetSolutionById($id: Int!) {
    solutionBy(solutionId: $id) {
      id
      databaseId
      blocksJSON
    }
  }
`;

// Solutions by slug (fallback when solutionBy idType:SLUG not available)
export const GET_SOLUTIONS_BY_SLUG = gql`
  query GetSolutionsBySlug($slug: String!) {
    solutions(first: 1, where: { name: $slug }) {
      nodes {
        id
        databaseId
        blocksJSON
      }
    }
  }
`;

// Extra content for homepage sections (clients, industries, testimonials, posts)
// Note: industries uses industriesBy(id) per-item - no connection, fetched separately
export const GET_HOMEPAGE_ENTITIES = gql`
  query GetHomepageEntities(
    $clientIds: [ID]
    $testimonialIds: [ID]
    $postIds: [ID]
  ) {
    clients(first: 100, where: { in: $clientIds }) {
      nodes {
        id
        databaseId
        title
        clientId
        clientLogo
      }
    }
    testimonials(first: 100, where: { in: $testimonialIds }) {
      nodes {
        id
        databaseId
        title
        testimonialDescription
        testimonialImage
        testimonialLogo
        testimonialDesignation
      }
    }
    posts(first: 100, where: { in: $postIds }) {
      nodes {
        id
        databaseId
        slug
        title
        date
        excerpt
        featuredImageId
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

// Homepage page ID in WordPress
export const HOME_PAGE_ID = 739;

// About (Who We Are) page ID in WordPress
export const ABOUT_PAGE_ID = 1014;

// Leadership page ID in WordPress
export const LEADERSHIP_PAGE_ID = 1049;

// Affiliations & Partners page ID in WordPress
export const AFFILIATIONS_PAGE_ID = 1085;

// Career page ID in WordPress
export const CAREER_PAGE_ID = 910;

// Industries page ID in WordPress
export const INDUSTRIES_PAGE_ID = 1160;

// Team members (for leadership page) - uses clientDesignation, clientImage
export const GET_TEAMS = gql`
  query GetTeams($teamIds: [Int]) {
    teams(first: 100, where: { in: $teamIds }) {
      nodes {
        id
        databaseId
        title
        clientDesignation
        clientImage
      }
    }
  }
`;

export const GET_ALL_TEAMS = gql`
  query GetAllTeams {
    teams(first: 50) {
      nodes {
        id
        databaseId
        title
        clientDesignation
        clientImage
      }
    }
  }
`;

// Global theme options (Carbon Fields)
export const GET_THEME_OPTIONS = gql`
  query GetThemeOptions {
    crbThemeOptions {
      companyLogo
      letstalkTitle
      letstalkUrl
      footerLogo
      copyrightText
      footerTitle
      footerShortDescription
      footerButtonTitle
      footerButtonUrl
      footerButtonTitleTwo
      footerButtonUrlTwo
    }
  }
`;

// Services by IDs (for home-industry-section when block selects from service CPT)
export const GET_SERVICES_BY_IDS = gql`
  query GetServicesByIds($serviceIds: [ID]) {
    services(first: 100, where: { in: $serviceIds }) {
      nodes {
        id
        databaseId
        title
        excerpt
        slug
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

// Build industries query for given IDs (industriesBy requires single id, no connection)
export function buildIndustriesQuery(ids) {
  if (!ids?.length) return null;
  const fragment = `id databaseId title excerpt slug featuredImage { node { mediaItemUrl } }`;
  const selections = ids
    .map((_, i) => `industry_${i}: industriesBy(industriesId: $id${i}) { ${fragment} }`)
    .join("\n");
  const variables = ids.map((_, i) => `$id${i}: Int!`).join(" ");
  return gql`
    query GetIndustriesByIds(${variables}) {
      ${selections}
    }
  `;
}

// All testimonials (fallback when no testimonials selected in block)
export const GET_ALL_TESTIMONIALS = gql`
  query GetAllTestimonials {
    testimonials(first: 20) {
      nodes {
        id
        databaseId
        title
        testimonialDescription
        testimonialImage
        testimonialLogo
        testimonialDesignation
      }
    }
  }
`;

// All clients (fallback when no clients selected in block)
export const GET_ALL_CLIENTS = gql`
  query GetAllClients {
    clients(first: 50) {
      nodes {
        id
        databaseId
        title
        clientId
        clientLogo
      }
    }
  }
`;

// All industries (fallback when industry block exists but no industries selected)
export const GET_ALL_INDUSTRIES = gql`
  query GetAllIndustries {
    industries(first: 20) {
      nodes {
        id
        databaseId
        title
        excerpt
        slug
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

// Industries for home IndustryServe section (first 6)
export const GET_INDUSTRIES_FIRST_6 = gql`
  query GetIndustriesFirst6 {
    industries(first: 6) {
      nodes {
        id
        databaseId
        title
        excerpt
        slug
        featuredImage {
          node {
            mediaItemUrl
            title
          }
        }
      }
    }
  }
`;

// Industry by slug (for /Industries/[slug] detail page)
export const GET_INDUSTRY_BY_SLUG = gql`
  query GetIndustryBySlug($slug: String!) {
    industries(first: 1, where: { name: $slug }) {
      nodes {
        id
        databaseId
        title
        excerpt
        slug
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

// Industry blocks by ID (industries CPT has blocks like solutions)
export const GET_INDUSTRIE_BY_ID = gql`
  query GetIndustrieById($industrieId: Int!) {
    industrieBy(industrieId: $industrieId) {
      blocksJSON
    }
  }
`;

// Service by slug (fallback when IndustryServe links from service CPT)
export const GET_SERVICE_BY_SLUG = gql`
  query GetServiceBySlug($slug: String!) {
    services(first: 1, where: { name: $slug }) {
      nodes {
        id
        databaseId
        title
        excerpt
        slug
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

// Primary menu – use menu ID from WordPress (Appearance → Menus; ID is in the URL or set NEXT_PUBLIC_PRIMARY_MENU_ID)
// Uses menu(id, idType: DATABASE_ID) with proper childItems hierarchy
export const GET_MENU = gql`
  query GetMenu($menuId: Int!) {
    menu(id: $menuId, idType: DATABASE_ID) {
      id
      databaseId
      name
      slug
      menuItems(first: 200) {
        nodes {
          id
          databaseId
          label
          url
          path
          parentId
          childItems(first: 200) {
            nodes {
              id
              databaseId
              label
              url
              path
              parentId
              childItems(first: 200) {
                nodes {
                  id
                  databaseId
                  label
                  url
                  path
                  parentId
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Convert WordPress menu URL to local path for Next.js (handles full URLs and uri paths)
export function toLocalPath(url) {
  if (!url || url === "#") return "#";
  let path = url;
  try {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const u = new URL(url);
      path = u.pathname;
    }
    path = path.replace(/\/$/, "") || "/";
    if (path.includes("/homepage") || path.endsWith("/homepage")) path = "/";
    path = path.replace(/^\/wordpress\/infonet/i, "") || "/";
    return path;
  } catch {
    return path;
  }
}

// Process WordPress menu nodes into top-level items (filter duplicates)
// Items may have path, url, or uri depending on WPGraphQL schema
function getItemLink(item) {
  return item?.path ?? item?.url ?? item?.uri ?? item?.href ?? null;
}

export function processMenuItems(nodes) {
  if (!nodes?.length) return [];
  // API returns flat list: keep only top-level items (parentId null)
  const topLevel = nodes.filter((node) => node?.parentId == null);
  // Fallback: filter by child URLs if parentId not available (older schema)
  if (topLevel.length === 0) {
    const childUrls = new Set();
    nodes.forEach((node) => {
      const children = node.childItems?.nodes ?? node.childItems ?? [];
      (Array.isArray(children) ? children : []).forEach((c) => {
        const link = getItemLink(c);
        if (link != null) childUrls.add(link);
      });
    });
    return nodes.filter((node) => {
      const link = getItemLink(node);
      if (link != null && childUrls.has(link)) return false;
      const children = node.childItems?.nodes ?? node.childItems ?? [];
      const hasChildren = Array.isArray(children) && children.length > 0;
      return (link === "#" && hasChildren) || (link != null && link !== "#");
    });
  }
  return topLevel;
}

// Careers (job listings for career page)
export const GET_CAREERS = gql`
  query GetCareers {
    careers(first: 50) {
      nodes {
        id
        databaseId
        slug
        title
        jobLocation
        jobType
        jobDesignation
      }
    }
  }
`;

// Career by ID (for career details page)
export const GET_CAREER_BY_ID = gql`
  query GetCareerById($careerId: Int!) {
    careerBy(careerId: $careerId) {
      id
      databaseId
      title
      slug
      jobType
      jobSalary
      jobLocation
      jobExperience
      jobDesignation
      blocksJSON
    }
  }
`;

// Career by slug (fallback for slug-based URLs)
export const GET_CAREER_BY_SLUG = gql`
  query GetCareerBySlug($slug: String!) {
    careers(first: 1, where: { name: $slug }) {
      nodes {
        id
        databaseId
        title
        slug
        jobType
        jobSalary
        jobLocation
        jobExperience
        jobDesignation
        blocksJSON
      }
    }
  }
`;

// Media items by IDs (gallery_images: [954, 953, 952, 1386] - WordPress media post IDs)
export const GET_MEDIA_BY_IDS = gql`
  query GetMediaByIds($ids: [ID]) {
    mediaItems(first: 50, where: { in: $ids }) {
      nodes {
        id
        databaseId
        sourceUrl
      }
    }
  }
`;

// Recent posts (fallback when no posts selected in block)
export const GET_RECENT_POSTS = gql`
  query GetRecentPosts {
    posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        slug
        title
        date
        excerpt
        featuredImageId
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

// All posts for blog/insights listing (used by all-posts-section)
export const GET_ALL_POSTS = gql`
  query GetAllPosts($first: Int = 100) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

// Blog/Insights page ID in WordPress (page with insight-sticky-section + all-posts-section blocks). Set in .env as BLOG_PAGE_ID or here.
export const BLOG_PAGE_ID = parseInt(process.env.NEXT_PUBLIC_BLOG_PAGE_ID || "0", 10);

// Post by slug (for /blog/[slug] page) – fetches blocks with saveContent/dynamicContent for HTML rendering
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      databaseId
      title
      date
      excerpt
      slug
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      categories {
        edges {
          node {
            id
            name
          }
        }
      }
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
`;

// Post by ID (alternative when slug is not available)
export const GET_POST_BY_ID = gql`
  query GetPostById($postId: Int!) {
    postBy(postId: $postId) {
      id
      databaseId
      title
      date
      excerpt
      slug
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      categories {
        edges {
          node {
            id
            name
          }
        }
      }
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
`;
