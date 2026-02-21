import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";
import { fetchGraphQL } from "@/lib/graphql";
import {
  buildIndustriesQuery,
  GET_ALL_INDUSTRIES,
  GET_HOMEPAGE_ENTITIES,
  GET_SERVICE_BLOCKS_BY_SLUG,
  GET_SERVICE_WITH_BLOCKS,
  GET_SERVICES_BY_IDS,
} from "@/lib/graphql/queries";
import { print } from "graphql";
import { Suspense } from "react";
import ServicePageContent from "./ServicePageContent";

export const revalidate = 60;

async function getServiceBlocks(slug) {
  try {
    // Fetch service by slug to get databaseId
    const slugData = await fetchGraphQL(print(GET_SERVICE_BLOCKS_BY_SLUG), {
      slug,
    });
    const node = slugData?.services?.nodes?.[0];
    const serviceId = node?.databaseId;

    // Prefer blocks connection (attributesJSON format) using serviceId
    if (serviceId) {
      try {
        const blocksData = await fetchGraphQL(print(GET_SERVICE_WITH_BLOCKS), {
          serviceId: Number(serviceId),
        });
        const connectionBlocks = blocksData?.serviceBy?.blocks;
        if (Array.isArray(connectionBlocks) && connectionBlocks.length > 0) {
          return connectionBlocks;
        }
      } catch {
        // serviceBy or blocks may not exist in schema; fall through to blocksJSON
      }
    }

    // Fallback to blocksJSON
    const parsed = node?.blocksJSON ? JSON.parse(node.blocksJSON) : [];
    return parsed;
  } catch (error) {
    console.error("Error fetching service blocks:", error);
  }
  return [];
}

function getBlockData(block) {
  let attrs = block?.attributes || block?.attrs;
  if (typeof block?.attributesJSON === "string") {
    try {
      attrs = JSON.parse(block.attributesJSON) || {};
    } catch {
      attrs = {};
    }
  }
  return attrs?.data || {};
}

const CRB_TO_BLOCK_NAME = {
  crb_hero_information_text: "carbon-fields/hero-section",
  crb_core_values_info: "carbon-fields/service-core-values",
  crb_client_list_info: "carbon-fields/client-list",
  crb_service_benefits_info: "carbon-fields/service-benefits",
  crb_solution_process_info: "carbon-fields/solution-process",
  crb_service_life_info: "carbon-fields/service-life-at-infonet",
  crb_impact_info: "carbon-fields/about-impact",
  crb_testimonial_info: "carbon-fields/home-testimonial-section",
  crb_service_industries_info: "carbon-fields/service-more-industries",
};

function getBlockName(block, data) {
  const explicit = block?.name || block?.blockName;
  if (explicit) return explicit;
  for (const key of Object.keys(CRB_TO_BLOCK_NAME)) {
    if (key in (data || {})) return CRB_TO_BLOCK_NAME[key];
  }
  return null;
}

function collectIdsFromBlocks(blocks) {
  const clientIds = new Set();
  const testimonialIds = new Set();
  const serviceIds = new Set();
  const industryIds = new Set();
  let needsIndustries = false;

  blocks.forEach((block) => {
    const data = getBlockData(block);
    const name = getBlockName(block, data);

    if (name === "carbon-fields/client-list") {
      (data.selected_clients || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id != null && id !== "") clientIds.add(Number(id));
      });
    }

    if (name === "carbon-fields/home-testimonial-section") {
      (data.selected_testimonials || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id != null && id !== "") testimonialIds.add(Number(id));
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

  const hasEntityIds =
    clientIds.length > 0 || testimonialIds.length > 0;
  const hasServiceIds = serviceIds.length > 0;
  const needsIndustriesByIds =
    needsIndustries && industryIds.length > 0;
  const needsAllIndustries = needsIndustries && industryIds.length === 0;

  const [entitiesResult, servicesResult, industriesByIdResult, allIndustriesResult] =
    await Promise.all([
      hasEntityIds
        ? fetchGraphQL(print(GET_HOMEPAGE_ENTITIES), {
            clientIds,
            testimonialIds,
            postIds: [],
          })
            .then((data) => ({
              clients: data?.clients?.nodes || [],
              testimonials: data?.testimonials?.nodes || [],
            }))
            .catch((err) => {
              console.error("Error fetching service entities:", err);
              return { clients: [], testimonials: [] };
            })
        : Promise.resolve({ clients: [], testimonials: [] }),
      hasServiceIds
        ? fetchGraphQL(print(GET_SERVICES_BY_IDS), {
            serviceIds: serviceIds.map(String),
          })
            .then((data) => {
              const nodes = data?.services?.nodes || [];
              const byId = Object.fromEntries(
                nodes.map((n) => [Number(n.databaseId), n])
              );
              return serviceIds
                .map((id) => byId[id])
                .filter(Boolean)
                .slice(0, 1);
            })
            .catch(() => [])
        : Promise.resolve([]),
      needsIndustriesByIds
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
                  .slice(0, 1)
              )
              .catch(() => []);
          })()
        : Promise.resolve([]),
      needsAllIndustries
        ? fetchGraphQL(print(GET_ALL_INDUSTRIES))
            .then((data) => (data?.industries?.nodes || []).slice(0, 1))
            .catch(() => [])
        : Promise.resolve([]),
    ]);

  return {
    clients: entitiesResult.clients,
    testimonials: entitiesResult.testimonials,
    associatedServices: servicesResult,
    serviceIndustries:
      industriesByIdResult.length > 0
        ? industriesByIdResult
        : allIndustriesResult,
  };
}

export default async function ServiceDetails({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) return null;

  return (
    <Suspense
      fallback={
        <>
          <IndustryBannerSkeleton />
          <IndustryContentSkeleton />
        </>
      }
    >
      <ServicePageContent
        slug={slug}
        getServiceBlocks={getServiceBlocks}
        getServiceEntities={getServiceEntities}
      />
    </Suspense>
  );
}