import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";
import { fetchGraphQL } from "@/lib/graphql";
import {
    GET_ALL_TEAMS,
    GET_PAGE_BLOCKS,
    GET_TEAMS,
    LEADERSHIP_PAGE_ID,
} from "@/lib/graphql/queries";
import { print } from "graphql";
import { Suspense } from "react";
import LeadershipPageContent from "./LeadershipPageContent";

export const revalidate = 60;

async function getLeadershipPageBlocks() {
  try {
    const data = await fetchGraphQL(print(GET_PAGE_BLOCKS), {
      pageId: LEADERSHIP_PAGE_ID,
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
  (blocks || []).forEach((block) => {
    if (block?.name === "carbon-fields/team-list") {
      const data = block?.attributes?.data || {};
      (data.selected_team_members || []).forEach((item) => {
        const id =
          typeof item === "object"
            ? item?.id ?? item?.value ?? item?.ID
            : item;
        if (id != null && id !== "") ids.add(Number(id));
      });
    }
  });
  return Array.from(ids);
}

async function getLeadershipPageEntities(blocks) {
  const teamIds = collectTeamIds(blocks);
  const hasIds = teamIds.length > 0;

  const [teamsResult, fallbackResult] = await Promise.all([
    hasIds
      ? fetchGraphQL(print(GET_TEAMS), { teamIds })
          .then((data) => data?.teams?.nodes || [])
          .catch((err) => {
            console.error("Error fetching leadership page teams:", err);
            return [];
          })
      : Promise.resolve([]),
    fetchGraphQL(print(GET_ALL_TEAMS))
      .then((data) => data?.teams?.nodes || [])
      .catch(() => []),
  ]);

  const teams = teamsResult.length > 0 ? teamsResult : fallbackResult;

  return { teams };
}

export async function generateMetadata() {
  const { getSeoMetadata } = await import("@/lib/seo");
  return getSeoMetadata("leadership");
}

export default async function LeadershipPage() {
  return (
    <Suspense
      fallback={
        <>
          <IndustryBannerSkeleton />
          <IndustryContentSkeleton />
        </>
      }
    >
      <LeadershipPageContent
        getLeadershipPageBlocks={getLeadershipPageBlocks}
        getLeadershipPageEntities={getLeadershipPageEntities}
      />
    </Suspense>
  );
}
