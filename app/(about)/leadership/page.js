import { BlockRenderer } from "@/components/blocks";
import { client } from "@/lib/graphql/client";
import {
    GET_ALL_TEAMS,
    GET_PAGE_BLOCKS,
    GET_TEAMS,
    LEADERSHIP_PAGE_ID,
} from "@/lib/graphql/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getLeadershipPageBlocks() {
  try {
    const { data } = await client.query({
      query: GET_PAGE_BLOCKS,
      variables: { pageId: LEADERSHIP_PAGE_ID },
      fetchPolicy: "no-cache",
    });
    if (data?.pageBy?.blocksJSON) {
      return JSON.parse(data.pageBy.blocksJSON);
    }
    return [];
  } catch (error) {
    console.error("Error fetching leadership page blocks:", error);
    return [];
  }
}

function collectTeamIds(blocks) {
  const ids = new Set();
  blocks.forEach((block) => {
    if (block?.name === "carbon-fields/team-list") {
      const data = block?.attributes?.data || {};
      (data.selected_team_members || []).forEach((item) => {
        const id = typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item;
        if (id != null && id !== "") ids.add(Number(id));
      });
    }
  });
  return Array.from(ids);
}

async function getLeadershipPageEntities(blocks) {
  const teamIds = collectTeamIds(blocks);
  let teams = [];

  if (teamIds.length > 0) {
    try {
      const { data } = await client.query({
        query: GET_TEAMS,
        variables: { teamIds },
        fetchPolicy: "no-cache",
      });
      teams = data?.teams?.nodes || [];
    } catch (error) {
      console.error("Error fetching leadership page teams:", error);
    }
  }

  if (teams.length === 0) {
    try {
      const { data } = await client.query({
        query: GET_ALL_TEAMS,
        fetchPolicy: "no-cache",
      });
      teams = data?.teams?.nodes || [];
    } catch (error) {
      console.error("Error fetching fallback teams:", error);
    }
  }

  return { teams };
}

export async function generateMetadata() {
  const { getSeoMetadata } = await import("@/lib/seo");
  return getSeoMetadata("leadership");
}

export default async function LeadershipPage() {
  const blocks = await getLeadershipPageBlocks();
  const entities = await getLeadershipPageEntities(blocks);

  return <BlockRenderer blocks={blocks} entities={entities} />;
}
