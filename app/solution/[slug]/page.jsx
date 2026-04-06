import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";
import { fetchGraphQL } from "@/lib/graphql";
import {
  GET_HOMEPAGE_ENTITIES,
  GET_SOLUTION_BY_SLUG,
  GET_SOLUTION_SEO_BY_ID,
  GET_SOLUTIONS_BY_SLUG,
} from "@/lib/graphql/queries";
import { extractYoastSchemaRaw, getSolutionSeoMetadataById } from "@/lib/seo";
import { print } from "graphql";
import { Suspense } from "react";
import SolutionPageContent from "./SolutionPageContent";

export const revalidate = 60;

async function getSolutionBlocks(slug) {
  const [slugResult, solutionsResult] = await Promise.all([
    fetchGraphQL(print(GET_SOLUTION_BY_SLUG), { slug }).catch(() => null),
    fetchGraphQL(print(GET_SOLUTIONS_BY_SLUG), { slug }).catch(() => null),
  ]);
  const blocksJSON =
    slugResult?.solutionBy?.blocksJSON ??
    solutionsResult?.solutions?.nodes?.[0]?.blocksJSON;
  if (blocksJSON) return JSON.parse(blocksJSON);
  return [];
}

function collectIdsFromBlocks(blocks) {
  const clientIds = new Set();
  const testimonialIds = new Set();
  (blocks || []).forEach((block) => {
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
  });
  return {
    clientIds: Array.from(clientIds),
    testimonialIds: Array.from(testimonialIds),
  };
}

async function getSolutionEntities(blocks) {
  const { clientIds, testimonialIds } = collectIdsFromBlocks(blocks);
  if (clientIds.length === 0 && testimonialIds.length === 0) {
    return { clients: [], testimonials: [] };
  }
  try {
    const data = await fetchGraphQL(print(GET_HOMEPAGE_ENTITIES), {
      clientIds,
      testimonialIds,
      postIds: [],
    });
    return {
      clients: data?.clients?.nodes || [],
      testimonials: data?.testimonials?.nodes || [],
    };
  } catch (error) {
    console.error("Error fetching solution entities:", error);
    return { clients: [], testimonials: [] };
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return {};
  const [slugResult, solutionsResult] = await Promise.all([
    fetchGraphQL(print(GET_SOLUTION_BY_SLUG), { slug }).catch(() => null),
    fetchGraphQL(print(GET_SOLUTIONS_BY_SLUG), { slug }).catch(() => null),
  ]);
  const databaseId =
    slugResult?.solutionBy?.databaseId ??
    solutionsResult?.solutions?.nodes?.[0]?.databaseId ??
    null;
  if (!databaseId) return {};
  return getSolutionSeoMetadataById(databaseId, `/solution/${slug}`);
}

export default async function SolutionDetailsPage({ params }) {
  const { slug } = await params;
  if (!slug) return null;

  const [slugResult, solutionsResult] = await Promise.all([
    fetchGraphQL(print(GET_SOLUTION_BY_SLUG), { slug }).catch(() => null),
    fetchGraphQL(print(GET_SOLUTIONS_BY_SLUG), { slug }).catch(() => null),
  ]);
  const databaseId =
    slugResult?.solutionBy?.databaseId ??
    solutionsResult?.solutions?.nodes?.[0]?.databaseId ??
    null;
  const seoData = databaseId
    ? await fetchGraphQL(print(GET_SOLUTION_SEO_BY_ID), {
        solutionId: Number(databaseId),
      }).catch(() => null)
    : null;
  const schemaRaw = extractYoastSchemaRaw(seoData?.solutionBy?.seo);

  return (
    <>
      {schemaRaw ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaRaw }}
        />
      ) : null}
      <Suspense
        fallback={
          <>
            <IndustryBannerSkeleton />
            <IndustryContentSkeleton />
          </>
        }
      >
        <SolutionPageContent
          slug={slug}
          getSolutionBlocks={getSolutionBlocks}
          getSolutionEntities={getSolutionEntities}
        />
      </Suspense>
    </>
  );
}
