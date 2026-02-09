import Banner from "@/components/Banner";
import { BlockRenderer } from "@/components/blocks";
import CareerList from "@/components/Career/CareerList";
import LifeInfoNet from "@/components/Career/LifeInfoNet";
import Value from "@/components/Career/Value";
import WhyWork from "@/components/Career/WhyWork";
import { client } from "@/lib/graphql/client";
import {
    CAREER_PAGE_ID,
    GET_CAREERS,
    GET_MEDIA_BY_IDS,
    GET_PAGE_BLOCKS,
} from "@/lib/graphql/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getCareerPageBlocks() {
  try {
    const { data } = await client.query({
      query: GET_PAGE_BLOCKS,
      variables: { pageId: CAREER_PAGE_ID },
      fetchPolicy: "no-cache",
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
  blocks.forEach((block) => {
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
  let mediaItems = [];
  let careers = [];

  if (galleryIds.length > 0) {
    try {
      const { data } = await client.query({
        query: GET_MEDIA_BY_IDS,
        variables: { ids: galleryIds },
        fetchPolicy: "no-cache",
      });
      mediaItems = data?.mediaItems?.nodes || [];
    } catch (error) {
      console.error("Error fetching career page media:", error);
    }
  }

  try {
    const { data } = await client.query({
      query: GET_CAREERS,
      fetchPolicy: "no-cache",
    });
    careers = data?.careers?.nodes || [];
  } catch (error) {
    console.error("Error fetching careers:", error);
  }

  return { mediaItems, careers };
}

export default async function CareerPage() {
  const blocks = await getCareerPageBlocks();
  const entities = await getCareerPageEntities(blocks);

  if (!blocks || blocks.length === 0) {
    return (
      <div className="bg-[#f8f8f3]">
        <Banner
          bannerTopTitle="[ career ]"
          bannerImage="/assets/banner.webp"
          bannerTitle="Build the Future of Retail & Fuel Technology with Us"
          bannerDescription="Join a passionate, forward-thinking team at InfoNet, where we design and deliver powerful, integrated software systems that drive innovation across the fuel, convenience store, and unattended retail sectors."
          bannerButtonTitle="view open positions"
          bannerButtonURL="#"
        />
        <WhyWork />
        <Value />
        <LifeInfoNet />
        <CareerList careers={entities.careers} />
      </div>
    );
  }

  return (
    <div className="bg-[#f8f8f3]">
      <BlockRenderer blocks={blocks} entities={entities} />
    </div>
  );
}
