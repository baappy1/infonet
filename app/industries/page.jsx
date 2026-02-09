import Testimonial from "@/components/About/Testimonial";
import Banner from "@/components/Banner";
import About from "@/components/Home/About";
import InfiniteSlider from "@/components/Home/LogoSlider";
import CoreBenefits from "@/components/industries/CoreBenefits";
import MoreIndustries from "@/components/industries/MoreIndustries";
import Reason from "@/components/industries/Reason";
import OurImpactSolutions from "@/components/solutions/OurImpactSolutions";
import { client } from "@/lib/graphql/client";
import {
  GET_ALL_CLIENTS,
  GET_ALL_INDUSTRIES,
  GET_ALL_TESTIMONIALS,
  GET_HOMEPAGE_ENTITIES,
  GET_PAGE_BLOCKS,
  INDUSTRIES_PAGE_ID,
} from "@/lib/graphql/queries";

async function getIndustryPageBlocks() {
  try {
    const { data } = await client.query({
      query: GET_PAGE_BLOCKS,
      variables: { pageId: INDUSTRIES_PAGE_ID },
      fetchPolicy: "no-cache",
    });
    if (data?.pageBy?.blocksJSON) {
      return JSON.parse(data.pageBy.blocksJSON);
    }
    return [];
  } catch (error) {
    console.error("Error fetching industries page blocks:", error);
    return [];
  }
}

function collectIdsFromBlocks(blocks) {
  const clientIds = [];
  const testimonialIds = [];
  for (const block of blocks || []) {
    const name = block?.name;
    const data = block?.attributes?.data || {};
    if (name === "carbon-fields/client-list") {
      for (const item of data.selected_clients || []) {
        const id = typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id != null && id !== "") clientIds.push(Number(id));
      }
    }
    if (name === "carbon-fields/home-testimonial-section") {
      for (const item of data.selected_testimonials || []) {
        const id = typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id != null && id !== "") testimonialIds.push(Number(id));
      }
    }
  }
  return { clientIds, testimonialIds };
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
      console.error("Error fetching industries entities:", error);
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

  return { clients, testimonials };
}

async function getIndustries() {
  try {
    const { data } = await client.query({
      query: GET_ALL_INDUSTRIES,
      fetchPolicy: "no-cache",
    });
    const nodes = data?.industries?.nodes || [];
    return nodes.map((item) => ({
      id: item.id ?? item.databaseId,
      title: item.title,
      description: item.excerpt?.replace(/<[^>]+>/g, "")?.trim() || "",
      image: item.featuredImage?.node?.mediaItemUrl || "/assets/industries/convenience.png",
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error fetching industries:", error);
    return [];
  }
}

function getBlockDataByName(blocks, name) {
  const block = (blocks || []).find((b) => b?.name === name);
  return block?.attributes?.data || {};
}

export default async function IndustryWeServe() {
  const blocks = await getIndustryPageBlocks();
  const [entities, industries] = await Promise.all([
    getIndustryEntities(blocks),
    getIndustries(),
  ]);

  const clientIdSet = new Set(
    (blocks || [])
      .filter((b) => b?.name === "carbon-fields/client-list")
      .flatMap((b) => (b?.attributes?.data?.selected_clients || []).map((item) => Number(typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item)))
      .filter(Boolean)
  );
  const testimonialIdSet = new Set(
    (blocks || [])
      .filter((b) => b?.name === "carbon-fields/home-testimonial-section")
      .flatMap((b) => (b?.attributes?.data?.selected_testimonials || []).map((item) => Number(typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item)))
      .filter(Boolean)
  );

  const allClients = entities.clients || [];
  const allTestimonials = entities.testimonials || [];
  const clients =
    clientIdSet.size > 0
      ? allClients.filter(
          (c) => clientIdSet.has(Number(c.databaseId)) || clientIdSet.has(Number(c.clientId))
        )
      : allClients;
  const testimonials =
    testimonialIdSet.size > 0
      ? allTestimonials.filter((t) => testimonialIdSet.has(Number(t.databaseId)))
      : allTestimonials;

  const logos = clients.map((c) => ({
    id: c.id ?? c.databaseId ?? c.clientId,
    icon: c.clientLogo || "/assets/logo/01.png",
    title: c.title,
  }));

  const hero = getBlockDataByName(blocks, "carbon-fields/hero-section");
  const about = getBlockDataByName(blocks, "carbon-fields/home-about-us");
  const clientList = getBlockDataByName(blocks, "carbon-fields/client-list");
  const industryReasons = getBlockDataByName(blocks, "carbon-fields/industry-reasons");
  const keyMilestones = getBlockDataByName(blocks, "carbon-fields/about-key-milestones");
  const impact = getBlockDataByName(blocks, "carbon-fields/about-impact");
  const testimonialSection = getBlockDataByName(blocks, "carbon-fields/home-testimonial-section");
  const moreFeatures = getBlockDataByName(blocks, "carbon-fields/solution-more-features");

  const heroButton = Array.isArray(hero.hero_buttons) ? hero.hero_buttons[0] : null;

  return (
    <>
      <Banner
        bannerTopTitle={hero.top_title || "[ Retail Gas Stations ]"}
        bannerImage={hero.banner_image || "/assets/solutions/Car_Refuel.png"}
        bannerTitle={hero.title || "Fueling Success for Retail Gas Stations"}
        bannerDescription={
          hero.short_description ||
          "From the forecourt to the front counter, InfoNet provides gas station operators with the technology to streamline operations, reduce errors, and maximize profitability."
        }
        bannerButtonTitle={heroButton?.button_text || "Request a Demo"}
        bannerButtonURL={heroButton?.button_url || "#"}
      />
      <About
        topTitle={about.top_title}
        title={about.title}
        description={about.short_description}
        buttonTitle={about.button_title}
        buttonUrl={about.button_url}
        clientSays={about.client_says}
        clientImage={about.client_image}
        clientName={about.client_name}
        clientDesignation={about.client_designation}
        featureImage={about.feature_image}
      />
      <InfiniteSlider
        logos={logos.length > 0 ? logos : undefined}
        title={clientList.client_list_title}
      />
      <Reason
        topTitle={industryReasons.top_title}
        title={industryReasons.title}
        shortDescription={industryReasons.short_description}
        reasons={industryReasons.reasons}
      />
      <CoreBenefits
        title={keyMilestones.title}
        milestones={keyMilestones.milestones}
      />
      <OurImpactSolutions
        topTitle={impact.top_title}
        title={impact.title}
        shortDescription={impact.short_description}
        impactItems={impact.impact_items}
        buttonText={impact.button_text}
        buttonLink={impact.button_link}
      />
      <Testimonial
        topTitle={testimonialSection.top_title}
        title={testimonialSection.title}
        items={testimonials}
      />
      <MoreIndustries
        topTitle={moreFeatures.top_title}
        title={moreFeatures.title}
        shortDescription={moreFeatures.short_description}
        moreFeatures={moreFeatures.more_features}
        industries={industries}
      />
    </>
  );
}
