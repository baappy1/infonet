import { BlockRenderer } from "@/components/blocks";
import { fetchGraphQL } from "@/lib/graphql";
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
import { print } from "graphql";

export const revalidate = 60;

export async function generateMetadata() {
  return getHomepageSeoMetadata();
}

async function getHomePageBlocks() {
  try {
    const data = await fetchGraphQL(print(GET_PAGE_BLOCKS), {
      pageId: HOME_PAGE_ID,
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
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id != null && id !== "") clientIds.add(Number(id));
      });
    }

    if (name === "carbon-fields/home-industry-section") {
      hasIndustryBlock = true;
      (data.selected_industries || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id == null || id === "") return;
        const subtype =
          typeof item === "object" ? item?.subtype || item?.type : null;
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
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id != null && id !== "") testimonialIds.add(Number(id));
      });
    }

    if (name === "carbon-fields/home-insight-section") {
      hasInsightBlock = true;
      (data.selected_posts || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
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

  const needsIndustriesFirst6 =
    hasIndustryBlock && industryIds.length === 0 && serviceIds.length === 0;

  // Tier 1: Run all primary fetches in parallel (only depend on block IDs)
  const [entitiesResult, industriesByIdResult, servicesResult, industriesFirst6Result] =
    await Promise.all([
      hasEntityIds
        ? fetchGraphQL(print(GET_HOMEPAGE_ENTITIES), {
            clientIds,
            testimonialIds,
            postIds,
          })
            .then((data) => ({
              clients: data?.clients?.nodes || [],
              testimonials: data?.testimonials?.nodes || [],
              posts: data?.posts?.nodes || [],
            }))
            .catch((error) => {
              console.error("Error fetching homepage entities:", error);
              return { clients: [], testimonials: [], posts: [] };
            })
        : Promise.resolve({
            clients: [],
            testimonials: [],
            posts: [],
          }),
      industryIds.length > 0
        ? (() => {
            const query = buildIndustriesQuery(industryIds);
            if (!query) return Promise.resolve([]);
            return fetchGraphQL(print(query), {
              ...Object.fromEntries(
                industryIds.map((id, i) => [`id${i}`, id])
              ),
            })
              .then((data) =>
                industryIds
                  .map((_, i) => data?.[`industry_${i}`])
                  .filter(Boolean)
              )
              .catch((error) => {
                console.error("Error fetching industries:", error);
                return [];
              });
          })()
        : Promise.resolve([]),
      serviceIds.length > 0
        ? fetchGraphQL(print(GET_SERVICES_BY_IDS), {
            serviceIds: serviceIds.map(String),
          })
            .then((data) => {
              const nodes = data?.services?.nodes || [];
              const byId = Object.fromEntries(
                nodes.map((n) => [Number(n.databaseId), n])
              );
              return serviceIds.map((id) => byId[id]).filter(Boolean);
            })
            .catch((error) => {
              console.error("Error fetching services:", error);
              return [];
            })
        : Promise.resolve([]),
      needsIndustriesFirst6
        ? fetchGraphQL(print(GET_INDUSTRIES_FIRST_6))
            .then((data) => data?.industries?.nodes || [])
            .catch(() => [])
        : Promise.resolve([]),
    ]);

  let entities = {
    clients: entitiesResult.clients,
    industries:
      industryIds.length > 0
        ? industriesByIdResult
        : serviceIds.length > 0
          ? servicesResult
          : industriesFirst6Result,
    testimonials: entitiesResult.testimonials,
    posts: entitiesResult.posts,
  };

  // Tier 2: Run fallbacks in parallel (depend on tier 1 results)
  const [
    testimonialsFallback,
    clientsFallback,
    postsFallback,
    industriesFallback,
  ] = await Promise.all([
    hasTestimonialBlock && entities.testimonials.length === 0
      ? fetchGraphQL(print(GET_ALL_TESTIMONIALS))
          .then((data) => data?.testimonials?.nodes || [])
          .catch(() => [])
      : Promise.resolve(null),
    hasClientListBlock && entities.clients.length === 0
      ? fetchGraphQL(print(GET_ALL_CLIENTS))
          .then((data) => data?.clients?.nodes || [])
          .catch(() => [])
      : Promise.resolve(null),
    hasInsightBlock && entities.posts.length === 0
      ? fetchGraphQL(print(GET_RECENT_POSTS))
          .then((data) => data?.posts?.nodes || [])
          .catch(() => [])
      : Promise.resolve(null),
    needsIndustriesFirst6 && entities.industries.length === 0
      ? fetchGraphQL(print(GET_ALL_INDUSTRIES))
          .then((data) => data?.industries?.nodes || [])
          .catch(() => [])
      : Promise.resolve(null),
  ]);

  if (testimonialsFallback) entities.testimonials = testimonialsFallback;
  if (clientsFallback) entities.clients = clientsFallback;
  if (postsFallback) entities.posts = postsFallback;
  if (industriesFallback) entities.industries = industriesFallback;

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
