import { BlockRenderer } from "@/components/blocks";
import { client } from "@/lib/graphql/client";
import {
    buildIndustriesQuery,
    GET_ALL_CLIENTS,
    GET_ALL_INDUSTRIES,
    GET_ALL_TESTIMONIALS,
    GET_HOMEPAGE_ENTITIES,
    GET_INDUSTRIES_FIRST_6,
    GET_PAGE_BLOCKS,
    GET_RECENT_POSTS,
    GET_SERVICES_BY_IDS,
    HOME_PAGE_ID,
} from "@/lib/graphql/queries";
import { getHomepageSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  return getHomepageSeoMetadata();
}

async function getHomePageBlocks() {
  try {
    const { data } = await client.query({
      query: GET_PAGE_BLOCKS,
      variables: { pageId: HOME_PAGE_ID },
      fetchPolicy: "no-cache", // Always fetch fresh data from WordPress
    });

    if (data?.pageBy?.blocksJSON) {
      return JSON.parse(data.pageBy.blocksJSON);
    }
    return [];
  } catch (error) {
    console.error("Error fetching page blocks:", error);
    return [];
  }
}

function collectIds(blocks) {
  const clientIds = new Set();
  const industryIds = new Set();
  const serviceIds = new Set();
  const testimonialIds = new Set();
  const postIds = new Set();
  let hasInsightBlock = false;
  let hasClientListBlock = false;
  let hasIndustryBlock = false;
  let hasTestimonialBlock = false;

  blocks.forEach((block) => {
    const name = block?.name;
    const data = block?.attributes?.data || {};

    if (name === "carbon-fields/client-list") {
      hasClientListBlock = true;
      (data.selected_clients || []).forEach((item) => {
        const id = typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id != null && id !== "") clientIds.add(Number(id));
      });
    }

    if (name === "carbon-fields/home-industry-section") {
      hasIndustryBlock = true;
      (data.selected_industries || []).forEach((item) => {
        const id = typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id == null || id === "") return;
        const subtype = typeof item === "object" ? (item?.subtype || item?.type) : null;
        // Carbon Fields may store service CPT refs as subtype "service"
        if (subtype === "service") {
          serviceIds.add(Number(id));
        } else {
          industryIds.add(Number(id));
        }
      });
    }

    if (name === "carbon-fields/home-testimonial-section") {
      hasTestimonialBlock = true;
      (data.selected_testimonials || []).forEach((item) => {
        const id = typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id != null && id !== "") testimonialIds.add(Number(id));
      });
    }

    if (name === "carbon-fields/home-insight-section") {
      hasInsightBlock = true;
      (data.selected_posts || []).forEach((item) => {
        const id = typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id != null && id !== "") postIds.add(Number(id));
      });
    }
  });

  const result = {
    clientIds: Array.from(clientIds),
    industryIds: Array.from(industryIds),
    serviceIds: Array.from(serviceIds),
    testimonialIds: Array.from(testimonialIds),
    postIds: Array.from(postIds),
    hasInsightBlock,
    hasClientListBlock,
    hasIndustryBlock,
    hasTestimonialBlock,
  };
  return result;
}

async function getHomePageEntities(blocks) {
  const {
    clientIds,
    industryIds,
    serviceIds,
    testimonialIds,
    postIds,
    hasInsightBlock,
    hasClientListBlock,
    hasIndustryBlock,
    hasTestimonialBlock,
  } = collectIds(blocks);

  const hasEntityIds =
    clientIds.length ||
    industryIds.length ||
    serviceIds.length ||
    testimonialIds.length ||
    postIds.length;

  let entities = {
    clients: [],
    industries: [],
    testimonials: [],
    posts: [],
  };

  // Fetch main entities when we have IDs (industries fetched separately - no connection)
  if (hasEntityIds) {
    try {
      const { data } = await client.query({
        query: GET_HOMEPAGE_ENTITIES,
        variables: {
          clientIds,
          testimonialIds,
          postIds,
        },
        fetchPolicy: "no-cache",
      });

      entities = {
        clients: data?.clients?.nodes || [],
        industries: [],
        testimonials: data?.testimonials?.nodes || [],
        posts: data?.posts?.nodes || [],
      };
    } catch (error) {
      console.error("Error fetching homepage entities:", error);
    }
  }

  // Fetch industries by ID (industriesBy requires single id, no connection)
  if (industryIds.length > 0) {
    try {
      const query = buildIndustriesQuery(industryIds);
      if (query) {
        const variables = Object.fromEntries(
          industryIds.map((id, i) => [`id${i}`, id])
        );
        const { data } = await client.query({
          query,
          variables,
          fetchPolicy: "no-cache",
        });
        const nodes = industryIds
          .map((_, i) => data?.[`industry_${i}`])
          .filter(Boolean);
        entities.industries = nodes;
      }
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  }

  // Fetch services by ID (when block selects from service CPT, subtype "service")
  if (serviceIds.length > 0) {
    try {
      const { data } = await client.query({
        query: GET_SERVICES_BY_IDS,
        variables: { serviceIds: serviceIds.map(String) },
        fetchPolicy: "no-cache",
      });
      const nodes = data?.services?.nodes || [];
      // Preserve block selection order
      const byId = Object.fromEntries(nodes.map((n) => [Number(n.databaseId), n]));
      entities.industries = serviceIds.map((id) => byId[id]).filter(Boolean);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  // Fallback: fetch all testimonials when testimonial block exists but none selected
  if (hasTestimonialBlock && entities.testimonials.length === 0) {
    try {
      const { data } = await client.query({
        query: GET_ALL_TESTIMONIALS,
        fetchPolicy: "no-cache",
      });
      entities.testimonials = data?.testimonials?.nodes || [];
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  }

  // Fallback: fetch all clients when client-list block exists but no clients selected
  if (hasClientListBlock && entities.clients.length === 0) {
    try {
      const { data } = await client.query({
        query: GET_ALL_CLIENTS,
        fetchPolicy: "no-cache",
      });
      entities.clients = data?.clients?.nodes || [];
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  // Industry section: use industries(first: 6) from industries CPT
  if (hasIndustryBlock) {
    try {
      const { data } = await client.query({
        query: GET_INDUSTRIES_FIRST_6,
        fetchPolicy: "no-cache",
      });
      entities.industries = data?.industries?.nodes || [];
      // Fallback if industries(first: 6) returns empty
      if (entities.industries.length === 0) {
        const { data: fallback } = await client.query({
          query: GET_ALL_INDUSTRIES,
          fetchPolicy: "no-cache",
        });
        entities.industries = fallback?.industries?.nodes || [];
      }
    } catch (error) {
      console.error("Error fetching industries:", error);
      try {
        const { data } = await client.query({
          query: GET_ALL_INDUSTRIES,
          fetchPolicy: "no-cache",
        });
        entities.industries = data?.industries?.nodes || [];
      } catch (e) {
        console.error("Error fetching industries fallback:", e);
      }
    }
  }

  // Fallback: fetch recent posts when insight block exists but no posts selected
  if (hasInsightBlock && entities.posts.length === 0) {
    try {
      const { data } = await client.query({
        query: GET_RECENT_POSTS,
        fetchPolicy: "no-cache",
      });
      entities.posts = data?.posts?.nodes || [];
    } catch (error) {
      console.error("Error fetching recent posts:", error);
    }
  }

  return entities;
}

export default async function Home() {
  const blocks = await getHomePageBlocks();
  const entities = await getHomePageEntities(blocks);

  return (
    <>
      <BlockRenderer blocks={blocks} entities={entities} />
    </>
  );
}