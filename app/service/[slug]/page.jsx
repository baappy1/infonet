import { BlockRenderer } from "@/components/blocks";
import { client } from "@/lib/graphql/client";
import {
  buildIndustriesQuery,
  GET_ALL_INDUSTRIES,
  GET_HOMEPAGE_ENTITIES,
  GET_SERVICE_BLOCKS_BY_SLUG,
  GET_SERVICES_BY_IDS,
} from "@/lib/graphql/queries";

async function getServiceBlocks(slug) {
  try {
    const { data } = await client.query({
      query: GET_SERVICE_BLOCKS_BY_SLUG,
      variables: { slug },
      fetchPolicy: "no-cache",
    });
    const node = data?.services?.nodes?.[0];
    const parsed = node?.blocksJSON ? JSON.parse(node.blocksJSON) : [];
    return parsed;
  } catch (error) {
    console.error("Error fetching service blocks:", error);
  }
  return [];
}

function collectIdsFromBlocks(blocks) {
  const clientIds = new Set();
  const testimonialIds = new Set();
  const serviceIds = new Set();
  const industryIds = new Set();
  let needsIndustries = false;

  blocks.forEach((block) => {
    const data = block?.attributes?.data || {};

    if (block?.name === "carbon-fields/client-list") {
      (data.selected_clients || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id != null && id !== "") clientIds.add(Number(id));
      });
    }

    if (block?.name === "carbon-fields/home-testimonial-section") {
      (data.selected_testimonials || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id != null && id !== "") testimonialIds.add(Number(id));
      });
    }

    if (block?.name === "carbon-fields/service-life-at-infonet") {
      (data.associated_services || data.selected_services || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id != null && id !== "") serviceIds.add(Number(id));
      });
    }

    if (block?.name === "carbon-fields/service-more-industries") {
      needsIndustries = true;
      (data.selected_industries || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id != null && id !== "") industryIds.add(Number(id));
      });
    }
  });

  return {
    clientIds: Array.from(clientIds),
    testimonialIds: Array.from(testimonialIds),
    serviceIds: Array.from(serviceIds),
    industryIds: Array.from(industryIds),
    needsIndustries,
  };
}

async function getServiceEntities(blocks) {
  const { clientIds, testimonialIds, serviceIds, industryIds, needsIndustries } =
    collectIdsFromBlocks(blocks);

  let clients = [];
  let testimonials = [];
  let associatedServices = [];
  let serviceIndustries = [];

  if (clientIds.length > 0 || testimonialIds.length > 0) {
    try {
      const { data } = await client.query({
        query: GET_HOMEPAGE_ENTITIES,
        variables: { clientIds, testimonialIds, postIds: [] },
        fetchPolicy: "no-cache",
      });
      clients = data?.clients?.nodes || [];
      testimonials = data?.testimonials?.nodes || [];
    } catch (error) {
      console.error("Error fetching service entities:", error);
    }
  }

  if (serviceIds.length > 0) {
    try {
      const { data } = await client.query({
        query: GET_SERVICES_BY_IDS,
        variables: { serviceIds: serviceIds.map(String) },
        fetchPolicy: "no-cache",
      });
      const nodes = data?.services?.nodes || [];
      const byId = Object.fromEntries(nodes.map((n) => [Number(n.databaseId), n]));
      associatedServices = serviceIds.map((id) => byId[id]).filter(Boolean).slice(0, 1);
    } catch (error) {
      console.error("Error fetching associated services:", error);
    }
  }

  if (needsIndustries) {
    if (industryIds.length > 0) {
      try {
        const query = buildIndustriesQuery(industryIds);
        if (query) {
          const variables = Object.fromEntries(
            industryIds.map((id, i) => [`id${i}`, id]),
          );
          const { data } = await client.query({
            query,
            variables,
            fetchPolicy: "no-cache",
          });
          serviceIndustries = industryIds
            .map((_, i) => data?.[`industry_${i}`])
            .filter(Boolean)
            .slice(0, 1);
        }
      } catch (error) {
        console.error("Error fetching industries by selected IDs:", error);
      }
    } else {
      try {
        const { data } = await client.query({
          query: GET_ALL_INDUSTRIES,
          fetchPolicy: "no-cache",
        });
        serviceIndustries = (data?.industries?.nodes || []).slice(0, 1);
      } catch (error) {
        console.error("Error fetching industries:", error);
      }
    }
  }

  return { clients, testimonials, associatedServices, serviceIndustries };
}

export default async function ServiceDetails({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) return null;

  const blocks = await getServiceBlocks(slug);
  const entities = await getServiceEntities(blocks);

  if (blocks && blocks.length > 0) {
    return <BlockRenderer blocks={blocks} entities={entities} pageType="service" />;
  }

  return null;
}