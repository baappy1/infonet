import Banner from "@/components/Banner";
import { BlockRenderer } from "@/components/blocks";
import { client } from "@/lib/graphql/client";
import {
  GET_ALL_CLIENTS,
  GET_ALL_INDUSTRIES,
  GET_ALL_TESTIMONIALS,
  GET_HOMEPAGE_ENTITIES,
  GET_INDUSTRIE_BY_ID,
  GET_INDUSTRY_BY_SLUG,
  GET_PAGE_BLOCKS,
  GET_PAGE_BY_SLUG,
  GET_SERVICE_BY_SLUG,
} from "@/lib/graphql/queries";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getIndustryBySlug(slug) {
  try {
    const { data } = await client.query({
      query: GET_INDUSTRY_BY_SLUG,
      variables: { slug },
      fetchPolicy: "no-cache",
    });
    return data?.industries?.nodes?.[0] || null;
  } catch {
    return null;
  }
}

async function getIndustryBlocks(industrieId) {
  try {
    const { data } = await client.query({
      query: GET_INDUSTRIE_BY_ID,
      variables: { industrieId },
      fetchPolicy: "no-cache",
    });
    const raw = data?.industrieBy?.blocksJSON;
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function getPageBlocks(pageId) {
  try {
    const { data } = await client.query({
      query: GET_PAGE_BLOCKS,
      variables: { pageId: Number(pageId) },
      fetchPolicy: "no-cache",
    });
    const raw = data?.pageBy?.blocksJSON;
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function getPageBySlug(slug) {
  try {
    const { data } = await client.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug },
      fetchPolicy: "no-cache",
    });
    return data?.pages?.nodes?.[0] || null;
  } catch {
    return null;
  }
}

function collectIdsFromBlocks(blocks) {
  const clientIds = new Set();
  const testimonialIds = new Set();
  (blocks || []).forEach((block) => {
    const data = block?.attributes?.data || {};
    if (block?.name === "carbon-fields/client-list") {
      (data.selected_clients || []).forEach((item) => {
        const id = typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id != null && id !== "") clientIds.add(Number(id));
      });
    }
    if (block?.name === "carbon-fields/home-testimonial-section") {
      (data.selected_testimonials || []).forEach((item) => {
        const id = typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id != null && id !== "") testimonialIds.add(Number(id));
      });
    }
  });
  return {
    clientIds: Array.from(clientIds),
    testimonialIds: Array.from(testimonialIds),
  };
}

async function getIndustryEntities(blocks) {
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
      console.error("Error fetching industry entities:", error);
    }
  }

  const hasClientBlock = (blocks || []).some((b) => b?.name === "carbon-fields/client-list");
  const hasTestimonialBlock = (blocks || []).some((b) => b?.name === "carbon-fields/home-testimonial-section");

  if (hasClientBlock && clients.length === 0) {
    try {
      const { data } = await client.query({ query: GET_ALL_CLIENTS, fetchPolicy: "no-cache" });
      clients = data?.clients?.nodes || [];
    } catch {
      // ignore
    }
  }
  if (hasTestimonialBlock && testimonials.length === 0) {
    try {
      const { data } = await client.query({ query: GET_ALL_TESTIMONIALS, fetchPolicy: "no-cache" });
      testimonials = data?.testimonials?.nodes || [];
    } catch {
      // ignore
    }
  }

  // Industries for MoreIndustries section (links to other industry pages)
  let industries = [];
  try {
    const { data } = await client.query({ query: GET_ALL_INDUSTRIES, fetchPolicy: "no-cache" });
    industries = (data?.industries?.nodes || []).map((item) => ({
      id: item.id ?? item.databaseId,
      title: item.title,
      description: item.excerpt?.replace(/<[^>]+>/g, "")?.trim() || "",
      image: item.featuredImage?.node?.mediaItemUrl || "/assets/industries/convenience.png",
      slug: item.slug,
    }));
  } catch {
    // ignore
  }

  return { clients, testimonials, industries };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let industry = await getIndustryBySlug(slug);
  if (!industry) {
    const page = await getPageBySlug(slug);
    if (page)
      industry = {
        title: page.title,
        excerpt: page.excerpt,
      };
  }
  if (!industry) return { title: "Industry | InfoNet" };
  const rawDesc = industry.excerpt || "";
  const description = (typeof rawDesc === "string" ? rawDesc.replace(/<[^>]+>/g, "").trim() : "").slice(0, 160);
  return {
    title: `${industry.title} | InfoNet`,
    description,
  };
}

export default async function IndustryDetailPage({ params }) {
  const { slug } = await params;

  // 1. Try industry by slug (industries CPT)
  let industry = await getIndustryBySlug(slug);
  let blocks = null;

  if (industry) {
    blocks = await getIndustryBlocks(Number(industry.databaseId));
  } else {
    // 2. Fallback: try as WordPress Page (e.g. pageId 1160) so pageBy(pageId) blocks work
    const page = await getPageBySlug(slug);
    if (page) {
      industry = {
        databaseId: page.databaseId,
        title: page.title,
        excerpt: page.excerpt,
        slug: page.slug,
        featuredImage: page.featuredImage,
      };
      blocks = await getPageBlocks(page.databaseId);
    }
  }

  if (!industry) {
    // 3. Fallback: try service CPT for backwards compatibility
    try {
      const { data } = await client.query({
        query: GET_SERVICE_BY_SLUG,
        variables: { slug },
        fetchPolicy: "no-cache",
      });
      const service = data?.services?.nodes?.[0];
      if (!service) notFound();
      const imageUrl = service.featuredImage?.node?.mediaItemUrl || "";
      const description = service.excerpt?.replace(/<[^>]+>/g, "").trim() || "";
      return (
        <>
          <Banner
            bannerTopTitle="[ industries we serve ]"
            bannerTitle={service.title}
            bannerDescription={description}
            bannerImage={imageUrl}
            bannerButtonTitle="Contact Us"
            bannerButtonURL="/contact"
          />
          <div className="container mx-auto py-16 px-5">
            <Link
              href="/Industries"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#08090D]/80 hover:text-[#08090D]"
            >
              ← Back to Industries
            </Link>
          </div>
        </>
      );
    } catch {
      notFound();
    }
  }

  if (!blocks || blocks.length === 0) {
    const imageUrl = industry.featuredImage?.node?.mediaItemUrl || "";
    const description = industry.excerpt?.replace(/<[^>]+>/g, "").trim() || "";
    return (
      <>
        <Banner
          bannerTopTitle="[ industries we serve ]"
          bannerTitle={industry.title}
          bannerDescription={description}
          bannerImage={imageUrl}
          bannerButtonTitle="Contact Us"
          bannerButtonURL="/contact"
        />
        <div className="container mx-auto py-16 px-5">
          <Link
            href="/Industries"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#08090D]/80 hover:text-[#08090D]"
          >
            ← Back to Industries
          </Link>
        </div>
      </>
    );
  }

  const entities = await getIndustryEntities(blocks);

  return (
    <>
      <BlockRenderer blocks={blocks} entities={entities} pageType="industry" />
    </>
  );
}
