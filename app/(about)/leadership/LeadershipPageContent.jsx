import { BlockRenderer } from "@/components/blocks";

export default async function LeadershipPageContent({
  getLeadershipPageBlocks,
  getLeadershipPageEntities,
}) {
  const blocks = await getLeadershipPageBlocks();
  const entities = await getLeadershipPageEntities(blocks);

  return <BlockRenderer blocks={blocks} entities={entities} />;
}
