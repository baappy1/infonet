import FeatureList from "@/components/Affiliations/FeatureList";
import IntegrationList from "@/components/Affiliations/IntegrationList";
import WhyMatters from "@/components/Affiliations/WhyMatters";
import Banner from "@/components/Banner";
import { BlockRenderer } from "@/components/blocks";
import { client } from "@/lib/graphql/client";
import {
    AFFILIATIONS_PAGE_ID,
    GET_HOMEPAGE_ENTITIES,
    GET_PAGE_BLOCKS,
} from "@/lib/graphql/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getAffiliationsPageBlocks() {
  try {
    const { data } = await client.query({
      query: GET_PAGE_BLOCKS,
      variables: { pageId: AFFILIATIONS_PAGE_ID },
      fetchPolicy: "no-cache",
    });
    if (data?.pageBy?.blocksJSON) {
      return JSON.parse(data.pageBy.blocksJSON);
    }
    return [];
  } catch (error) {
    console.error("Error fetching affiliations page blocks:", error);
    return [];
  }
}

function collectClientIds(blocks) {
  const ids = new Set();
  blocks.forEach((block) => {
    if (block?.name === "carbon-fields/affiliations-integrations-logos") {
      const data = block?.attributes?.data || {};
      (data.selected_clients || data.integration_ids || []).forEach((item) => {
        const id = typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id != null && id !== "") ids.add(Number(id));
      });
    }
  });
  return Array.from(ids);
}

async function getAffiliationsPageEntities(blocks) {
  const clientIds = collectClientIds(blocks);
  let clients = [];

  if (clientIds.length > 0) {
    try {
      const { data } = await client.query({
        query: GET_HOMEPAGE_ENTITIES,
        variables: { clientIds, testimonialIds: [], postIds: [] },
        fetchPolicy: "no-cache",
      });
      clients = data?.clients?.nodes || [];
    } catch (error) {
      console.error("Error fetching affiliations page clients:", error);
    }
  }

  return { clients };
}

export async function generateMetadata() {
  const { getSeoMetadata } = await import("@/lib/seo");
  return getSeoMetadata("affiliations-partners");
}

export default async function AffiliationsPartnersPage() {
  const blocks = await getAffiliationsPageBlocks();
  const entities = await getAffiliationsPageEntities(blocks);

  if (!blocks || blocks.length === 0) {
    return (
      <>
        <Banner
          bannerTopTitle="[ Affiliations & Partners ]"
          bannerImage="/assets/about-banner.webp"
          bannerTitle="Connecting with Leaders to Shape the Future of Retail Fueling"
          bannerDescription="InfoNet partners with the top associations and organizations that drive standards, innovation, and best practices across the convenience, petroleum, and retail-technology sectors."
          bannerButtonTitle="explore our services"
          bannerButtonURL="#"
        />
        <WhyMatters />
        <FeatureList />
        <IntegrationList />
      </>
    );
  }

  return <BlockRenderer blocks={blocks} entities={entities} />;
}
