import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";
import { fetchGraphQL } from "@/lib/graphql";
import {
    AFFILIATIONS_PAGE_ID,
    GET_HOMEPAGE_ENTITIES,
    GET_PAGE_BLOCKS,
} from "@/lib/graphql/queries";
import { print } from "graphql";
import { Suspense } from "react";
import AffiliationsPageContent from "./AffiliationsPageContent";

export const revalidate = 60;

async function getAffiliationsPageBlocks() {
  try {
    const data = await fetchGraphQL(print(GET_PAGE_BLOCKS), {
      pageId: AFFILIATIONS_PAGE_ID,
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
  (blocks || []).forEach((block) => {
    if (block?.name === "carbon-fields/affiliations-integrations-logos") {
      const data = block?.attributes?.data || {};
      (data.selected_clients || data.integration_ids || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? item?.id ?? item?.value ?? item?.ID
            : item;
        if (id != null && id !== "") ids.add(Number(id));
      });
    }
  });
  return Array.from(ids);
}

async function getAffiliationsPageEntities(blocks) {
  const clientIds = collectClientIds(blocks);

  if (clientIds.length === 0) {
    return { clients: [] };
  }

  try {
    const data = await fetchGraphQL(print(GET_HOMEPAGE_ENTITIES), {
      clientIds,
      testimonialIds: [],
      postIds: [],
    });
    return { clients: data?.clients?.nodes || [] };
  } catch (error) {
    console.error("Error fetching affiliations page clients:", error);
    return { clients: [] };
  }
}

export async function generateMetadata() {
  const { getSeoMetadata } = await import("@/lib/seo");
  return getSeoMetadata("affiliations-partners");
}

export default async function AffiliationsPartnersPage() {
  return (
    <Suspense
      fallback={
        <>
          <IndustryBannerSkeleton />
          <IndustryContentSkeleton />
        </>
      }
    >
      <AffiliationsPageContent
        getAffiliationsPageBlocks={getAffiliationsPageBlocks}
        getAffiliationsPageEntities={getAffiliationsPageEntities}
      />
    </Suspense>
  );
}
