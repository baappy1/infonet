import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";
import { fetchGraphQL } from "@/lib/graphql";
import {
    CAREER_PAGE_ID,
    GET_CAREERS,
    GET_MEDIA_BY_IDS,
    GET_PAGE_BLOCKS,
} from "@/lib/graphql/queries";
import { print } from "graphql";
import { Suspense } from "react";
import CareerPageContent from "./CareerPageContent";

export const revalidate = 60;

async function getCareerPageBlocks() {
  try {
    const data = await fetchGraphQL(print(GET_PAGE_BLOCKS), {
      pageId: CAREER_PAGE_ID,
    });
    if (data?.pageBy?.blocksJSON) {
      return JSON.parse(data.pageBy.blocksJSON);
    }
    return [];
  } catch (error) {
    console.error("Error fetching career page blocks:", error);
    return [];
  }
}

function collectGalleryImageIds(blocks) {
  const ids = new Set();
  (blocks || []).forEach((block) => {
    if (block?.name === "carbon-fields/career-life-at-company") {
      const data = block?.attributes?.data || {};
      (data.gallery_images || []).forEach((id) => {
        const n = Number(id);
        if (n) ids.add(n);
      });
    }
  });
  return Array.from(ids);
}

async function getCareerPageEntities(blocks) {
  const galleryIds = collectGalleryImageIds(blocks);
  const hasGalleryIds = galleryIds.length > 0;

  const [mediaResult, careersResult] = await Promise.all([
    hasGalleryIds
      ? fetchGraphQL(print(GET_MEDIA_BY_IDS), { ids: galleryIds })
          .then((data) => data?.mediaItems?.nodes || [])
          .catch((err) => {
            console.error("Error fetching career page media:", err);
            return [];
          })
      : Promise.resolve([]),
    fetchGraphQL(print(GET_CAREERS))
      .then((data) => data?.careers?.nodes || [])
      .catch((err) => {
        console.error("Error fetching careers:", err);
        return [];
      }),
  ]);

  return { mediaItems: mediaResult, careers: careersResult };
}

export default async function CareerPage() {
  return (
    <div className="bg-[#f8f8f3]">
      <Suspense
        fallback={
          <>
            <IndustryBannerSkeleton />
            <IndustryContentSkeleton />
          </>
        }
      >
        <CareerPageContent
          getCareerPageBlocks={getCareerPageBlocks}
          getCareerPageEntities={getCareerPageEntities}
        />
      </Suspense>
    </div>
  );
}
