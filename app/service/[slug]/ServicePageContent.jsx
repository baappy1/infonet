import { BlockRenderer } from "@/components/blocks";

export default async function ServicePageContent({
  slug,
  getServiceBlocks,
  getServiceEntities,
}) {
  const blocks = await getServiceBlocks(slug);
  const entities = await getServiceEntities(blocks);

  if (blocks && blocks.length > 0) {
    return (
      <BlockRenderer
        blocks={blocks}
        entities={entities}
        pageType="service"
      />
    );
  }

  return null;
}
