import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";
import { fetchGraphQL } from "@/lib/graphql";
import {
    ABOUT_PAGE_ID,
    GET_ALL_TESTIMONIALS,
    GET_HOMEPAGE_ENTITIES,
    GET_PAGE_BLOCKS,
} from "@/lib/graphql/queries";
import { print } from "graphql";
import { Suspense } from "react";
import WhoWeArePageContent from "./WhoWeArePageContent";

export const revalidate = 60;

async function getAboutPageBlocks() {
  try {
    const data = await fetchGraphQL(print(GET_PAGE_BLOCKS), {
      pageId: ABOUT_PAGE_ID,
    });
    if (data?.pageBy?.blocksJSON) {
      return JSON.parse(data.pageBy.blocksJSON);
    }
    return [];
  } catch (error) {
    console.error("Error fetching about page blocks:", error);
    return [];
  }
}

function collectTestimonialIds(blocks) {
  const ids = new Set();
  (blocks || []).forEach((block) => {
    if (block?.name === "carbon-fields/home-testimonial-section") {
      const data = block?.attributes?.data || {};
      (data.selected_testimonials || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id != null && id !== "") ids.add(Number(id));
      });
    }
  });
  return Array.from(ids);
}

async function getAboutPageEntities(blocks) {
  const testimonialIds = collectTestimonialIds(blocks);
  const hasIds = testimonialIds.length > 0;

  const [entitiesResult, fallbackResult] = await Promise.all([
    hasIds
      ? fetchGraphQL(print(GET_HOMEPAGE_ENTITIES), {
          testimonialIds,
          clientIds: [],
          postIds: [],
        })
          .then((data) => data?.testimonials?.nodes || [])
          .catch((err) => {
            console.error("Error fetching about page testimonials:", err);
            return [];
          })
      : Promise.resolve([]),
    fetchGraphQL(print(GET_ALL_TESTIMONIALS))
      .then((data) => data?.testimonials?.nodes || [])
      .catch(() => []),
  ]);

  const testimonials =
    entitiesResult.length > 0 ? entitiesResult : fallbackResult;

  return { testimonials };
}

export default async function WhoWeArePage() {
  return (
    <Suspense
      fallback={
        <>
          <IndustryBannerSkeleton />
          <IndustryContentSkeleton />
        </>
      }
    >
      <WhoWeArePageContent
        getAboutPageBlocks={getAboutPageBlocks}
        getAboutPageEntities={getAboutPageEntities}
      />
    </Suspense>
  );
}
