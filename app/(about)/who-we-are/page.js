import { BlockRenderer } from "@/components/blocks";
import { client } from "@/lib/graphql/client";
import {
    ABOUT_PAGE_ID,
    GET_ALL_TESTIMONIALS,
    GET_HOMEPAGE_ENTITIES,
    GET_PAGE_BLOCKS,
} from "@/lib/graphql/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getAboutPageBlocks() {
  try {
    const { data } = await client.query({
      query: GET_PAGE_BLOCKS,
      variables: { pageId: ABOUT_PAGE_ID },
      fetchPolicy: "no-cache",
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
  blocks.forEach((block) => {
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
  let testimonials = [];

  if (testimonialIds.length > 0) {
    try {
      const { data } = await client.query({
        query: GET_HOMEPAGE_ENTITIES,
        variables: { testimonialIds, clientIds: [], postIds: [] },
        fetchPolicy: "no-cache",
      });
      testimonials = data?.testimonials?.nodes || [];
    } catch (error) {
      console.error("Error fetching about page testimonials:", error);
    }
  }

  if (testimonials.length === 0) {
    try {
      const { data } = await client.query({
        query: GET_ALL_TESTIMONIALS,
        fetchPolicy: "no-cache",
      });
      testimonials = data?.testimonials?.nodes || [];
    } catch (error) {
      console.error("Error fetching fallback testimonials:", error);
    }
  }

  return { testimonials };
}

export default async function WhoWeArePage() {
  const blocks = await getAboutPageBlocks();
  const entities = await getAboutPageEntities(blocks);

  return <BlockRenderer blocks={blocks} entities={entities} />;
}
