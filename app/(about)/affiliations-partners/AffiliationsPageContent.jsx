import FeatureList from "@/components/Affiliations/FeatureList";
import IntegrationList from "@/components/Affiliations/IntegrationList";
import WhyMatters from "@/components/Affiliations/WhyMatters";
import Banner from "@/components/Banner";
import { BlockRenderer } from "@/components/blocks";

export default async function AffiliationsPageContent({
  getAffiliationsPageBlocks,
  getAffiliationsPageEntities,
}) {
  const blocks = await getAffiliationsPageBlocks();
  const entities = await getAffiliationsPageEntities(blocks);

  if (!blocks || blocks.length === 0) {
    return (
      <>
        <Banner
          bannerTopTitle="[ Affiliations & Partners ]"
          bannerImage="/assets/about-banner.webp"
          bannerTitle="Connecting with Leaders to Shape the Future of Retail Fueling"
          bannerDescription="InfoNet partners with the top associations and organizations that drive standards, innovation, and best practices across the convenience, petroleum, and retail-technology sectors."
          bannerButtonTitle="explore our services"
          bannerButtonURL="#"
        />
        <WhyMatters />
        <FeatureList />
        <IntegrationList />
      </>
    );
  }

  return <BlockRenderer blocks={blocks} entities={entities} />;
}
