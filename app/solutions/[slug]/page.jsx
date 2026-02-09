import Testimonial from "@/components/About/Testimonial";
import Banner from "@/components/Banner";
import { BlockRenderer } from "@/components/blocks";
import InfiniteSlider from "@/components/Home/LogoSlider";
import Features from "@/components/solutions/Features";
import MoreSolutions from "@/components/solutions/MoreSolutions";
import OurImpactSolutions from "@/components/solutions/OurImpactSolutions";
import UseCases from "@/components/solutions/UseCases";
import { client } from "@/lib/graphql/client";
import {
    GET_HOMEPAGE_ENTITIES,
    GET_SOLUTION_BY_SLUG,
    GET_SOLUTIONS_BY_SLUG,
} from "@/lib/graphql/queries";
import { getSolutionSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getSolutionBlocks(slug) {
  try {
    // Try solutionBy with idType: SLUG first
    const { data: slugData } = await client.query({
      query: GET_SOLUTION_BY_SLUG,
      variables: { slug },
      fetchPolicy: "no-cache",
    });
    if (slugData?.solutionBy?.blocksJSON) {
      return JSON.parse(slugData.solutionBy.blocksJSON);
    }
  } catch {
    // Fallback: fetch by ID if slug lookup fails
  }

  // Fallback: solutions(where: { name: $slug })
  try {
    const { data } = await client.query({
      query: GET_SOLUTIONS_BY_SLUG,
      variables: { slug },
      fetchPolicy: "no-cache",
    });
    const node = data?.solutions?.nodes?.[0];
    if (node?.blocksJSON) return JSON.parse(node.blocksJSON);
  } catch {
    // ignore
  }
  return [];
}

function collectIdsFromBlocks(blocks) {
  const clientIds = new Set();
  const testimonialIds = new Set();
  blocks.forEach((block) => {
    if (block?.name === "carbon-fields/client-list") {
      const data = block?.attributes?.data || {};
      (data.selected_clients || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? (item?.id ?? item?.value ?? item?.ID)
            : item;
        if (id != null && id !== "") clientIds.add(Number(id));
      });
    }
    if (block?.name === "carbon-fields/home-testimonial-section") {
      const data = block?.attributes?.data || {};
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
  let clients = [];
  let testimonials = [];

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
      console.error("Error fetching solution entities:", error);
    }
  }

  return { clients, testimonials };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return {};
  return getSolutionSeoMetadata(slug);
}

export default async function SolutionDetailsPage({ params }) {
  const { slug } = await params;
  if (!slug) return null;

  const blocks = await getSolutionBlocks(slug);
  const entities = await getSolutionEntities(blocks);

  if (!blocks || blocks.length === 0) {
    return (
      <>
        <Banner
          bannerTopTitle="[ C-Store Commander ]"
          bannerImage="/assets/solutions/Car_Refuel.png"
          bannerTitle="Your All-in-One POS & Retail Management System"
          bannerDescription="A customizable, full-featured point-of-sale and back-office platform built specifically for fuel and convenience retail. Streamline transactions, manage inventory, control pumps, and more — all from a single interface."
          bannerButtonTitle="Request a Demo"
          bannerButtonURL="#"
        />
        <InfiniteSlider />
        <UseCases />
        <Features />
        <OurImpactSolutions />
        <Testimonial />
        <MoreSolutions />
      </>
    );
  }

  return <BlockRenderer blocks={blocks} entities={entities} />;
}
