import { BlockRenderer } from "@/components/blocks";

export default async function WhoWeArePageContent({
  getAboutPageBlocks,
  getAboutPageEntities,
}) {
  const blocks = await getAboutPageBlocks();
  const entities = await getAboutPageEntities(blocks);

  return <BlockRenderer blocks={blocks} entities={entities} pageType="about" />;
}
