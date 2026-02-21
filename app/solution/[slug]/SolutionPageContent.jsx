import Testimonial from "@/components/About/Testimonial";
import Banner from "@/components/Banner";
import { BlockRenderer } from "@/components/blocks";
import InfiniteSlider from "@/components/Home/LogoSlider";
import CoreValues from "@/components/solutions/CoreValues";
import Features from "@/components/solutions/Features";
import MoreSolutions from "@/components/solutions/MoreSolutions";
import OurImpactSolutions from "@/components/solutions/OurImpactSolutions";
import UseCases from "@/components/solutions/UseCases";

export default async function SolutionPageContent({
  slug,
  getSolutionBlocks,
  getSolutionEntities,
}) {
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
          bannerButtonTitle2="Download Brochure"
          bannerButtonURL2="#"
        />
        <InfiniteSlider />
        <UseCases />
        <CoreValues />
        <Features />
        <OurImpactSolutions />
        <Testimonial />
        <MoreSolutions />
      </>
    );
  }

  return <BlockRenderer blocks={blocks} entities={entities} pageType="solution" />;
}
