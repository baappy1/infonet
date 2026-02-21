import Banner from "@/components/Banner";
import { BlockRenderer } from "@/components/blocks";
import CareerList from "@/components/Career/CareerList";
import LifeInfoNet from "@/components/Career/LifeInfoNet";
import Value from "@/components/Career/Value";
import WhyWork from "@/components/Career/WhyWork";

export default async function CareerPageContent({
  getCareerPageBlocks,
  getCareerPageEntities,
}) {
  const blocks = await getCareerPageBlocks();
  const entities = await getCareerPageEntities(blocks);

  if (!blocks || blocks.length === 0) {
    return (
      <>
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
      </>
    );
  }

  return <BlockRenderer blocks={blocks} entities={entities} />;
}
