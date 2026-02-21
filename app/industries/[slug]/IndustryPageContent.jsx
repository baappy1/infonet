import Banner from "@/components/Banner";
import { BlockRenderer } from "@/components/blocks";
import { fetchGraphQL } from "@/lib/graphql";
import {
    GET_ALL_CLIENTS,
    GET_ALL_INDUSTRIES,
    GET_ALL_TESTIMONIALS,
    GET_HOMEPAGE_ENTITIES,
    GET_INDUSTRIE_BY_ID,
    GET_PAGE_BLOCKS,
    GET_SERVICE_BY_SLUG
} from "@/lib/graphql/queries";
import { print } from "graphql";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustryBySlug, getPageBySlug } from "./data";

async function getIndustryBlocks(industrieId) {
  try {
    const data = await fetchGraphQL(print(GET_INDUSTRIE_BY_ID), {
      industrieId,
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
    const data = await fetchGraphQL(print(GET_PAGE_BLOCKS), {
      pageId: Number(pageId),
    });
    const raw = data?.pageBy?.blocksJSON;
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function collectIdsFromBlocks(blocks) {
  const clientIds = new Set();
  const testimonialIds = new Set();
  (blocks || []).forEach((block) => {
    const data = block?.attributes?.data || {};
    if (block?.name === "carbon-fields/client-list") {
      (data.selected_clients || []).forEach((item) => {
        const id =
          typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id != null && id !== "") clientIds.add(Number(id));
      });
    }
    if (block?.name === "carbon-fields/home-testimonial-section") {
      (data.selected_testimonials || []).forEach((item) => {
        const id =
          typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
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
  const hasClientBlock = (blocks || []).some(
    (b) => b?.name === "carbon-fields/client-list"
  );
  const hasTestimonialBlock = (blocks || []).some(
    (b) => b?.name === "carbon-fields/home-testimonial-section"
  );

  const hasEntityIds = clientIds.length > 0 || testimonialIds.length > 0;

  const [entitiesResult, industriesResult, clientsFallback, testimonialsFallback] =
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
              console.error("Error fetching industry entities:", err);
              return { clients: [], testimonials: [] };
            })
        : Promise.resolve({ clients: [], testimonials: [] }),
      fetchGraphQL(print(GET_ALL_INDUSTRIES))
        .then((data) =>
          (data?.industries?.nodes || []).map((item) => ({
            id: item.id ?? item.databaseId,
            title: item.title,
            description:
              item.excerpt?.replace(/<[^>]+>/g, "")?.trim() || "",
            image:
              item.featuredImage?.node?.mediaItemUrl ||
              "/assets/industries/convenience.png",
            slug: item.slug,
          }))
        )
        .catch(() => []),
      hasClientBlock
        ? fetchGraphQL(print(GET_ALL_CLIENTS))
            .then((data) => data?.clients?.nodes || [])
            .catch(() => [])
        : Promise.resolve(null),
      hasTestimonialBlock
        ? fetchGraphQL(print(GET_ALL_TESTIMONIALS))
            .then((data) => data?.testimonials?.nodes || [])
            .catch(() => [])
        : Promise.resolve(null),
    ]);

  let clients = entitiesResult.clients;
  let testimonials = entitiesResult.testimonials;
  if (hasClientBlock && clients.length === 0 && clientsFallback) {
    clients = clientsFallback;
  }
  if (hasTestimonialBlock && testimonials.length === 0 && testimonialsFallback) {
    testimonials = testimonialsFallback;
  }

  return {
    clients,
    testimonials,
    industries: industriesResult,
  };
}

export default async function IndustryPageContent({ slug }) {
  const [industryFromSlug, page] = await Promise.all([
    getIndustryBySlug(slug),
    getPageBySlug(slug),
  ]);

  let industry = industryFromSlug;
  let blocks = null;

  if (industry) {
    blocks = await getIndustryBlocks(Number(industry.databaseId));
  } else if (page) {
    industry = {
      databaseId: page.databaseId,
      title: page.title,
      excerpt: page.excerpt,
      slug: page.slug,
      featuredImage: page.featuredImage,
    };
    blocks = await getPageBlocks(page.databaseId);
  }

  if (!industry) {
    try {
      const data = await fetchGraphQL(print(GET_SERVICE_BY_SLUG), { slug });
      const service = data?.services?.nodes?.[0];
      if (!service) notFound();
      const imageUrl = service.featuredImage?.node?.mediaItemUrl || "";
      const description =
        service.excerpt?.replace(/<[^>]+>/g, "").trim() || "";
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
    const description =
      (industry.excerpt || "").replace(/<[^>]+>/g, "").trim() || "";
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
            href="/industries"
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
    <BlockRenderer blocks={blocks} entities={entities} pageType="industry" />
  );
}
