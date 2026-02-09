import NewsBanner from "@/components/NewsAndBlog/NewsBanner";
import NewsDetails from "@/components/NewsAndBlog/NewsDetails";
import { client } from "@/lib/graphql/client";
import {
  BLOG_PAGE_ID,
  GET_ALL_POSTS,
  GET_HOMEPAGE_ENTITIES,
  GET_PAGE_BLOCKS,
} from "@/lib/graphql/queries";

function getBlockData(blocks, name) {
  const block = (blocks || []).find((b) => b?.name === name);
  return block?.attributes?.data || {};
}

function getStickyPostIds(blocks) {
  const stickyBlock = getBlockData(blocks, "carbon-fields/insight-sticky-section");
  const raw = stickyBlock.selected_posts ?? stickyBlock.sticky_posts ?? stickyBlock.selectedPosts ?? [];
  return raw
    .map((item) => (typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item))
    .filter((id) => id != null && id !== "")
    .map(Number);
}

async function getBlogPageBlocks() {
  if (!BLOG_PAGE_ID || BLOG_PAGE_ID <= 0) return [];
  try {
    const { data } = await client.query({
      query: GET_PAGE_BLOCKS,
      variables: { pageId: BLOG_PAGE_ID },
      fetchPolicy: "no-cache",
    });
    if (data?.pageBy?.blocksJSON) {
      return JSON.parse(data.pageBy.blocksJSON);
    }
    return [];
  } catch (error) {
    console.error("Error fetching blog page blocks:", error);
    return [];
  }
}

async function getStickyPosts(stickyIds) {
  if (!stickyIds?.length) return [];
  try {
    const { data } = await client.query({
      query: GET_HOMEPAGE_ENTITIES,
      variables: { clientIds: [], testimonialIds: [], postIds: stickyIds },
      fetchPolicy: "no-cache",
    });
    return data?.posts?.nodes || [];
  } catch {
    return [];
  }
}

async function getAllPosts() {
  try {
    const { data } = await client.query({
      query: GET_ALL_POSTS,
      variables: { first: 100 },
      fetchPolicy: "no-cache",
    });
    return data?.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function NewsAndBlogPage() {
  const blocks = await getBlogPageBlocks();
  const stickyIds = getStickyPostIds(blocks);

  const [stickyPosts, allPosts] = await Promise.all([
    stickyIds.length > 0 ? getStickyPosts(stickyIds) : [],
    getAllPosts(),
  ]);

  const stickyIdSet = new Set(stickyIds);
  let stickyItems;
  let postsForGrid;
  if (stickyPosts.length > 0) {
    stickyItems = stickyPosts;
    postsForGrid = allPosts.filter(
      (p) => !stickyIdSet.has(Number(p.databaseId))
    );
  } else {
    stickyItems = allPosts.slice(0, 3);
    postsForGrid = allPosts.slice(3);
  }

  const stickyBlock = getBlockData(blocks, "carbon-fields/insight-sticky-section");
  const stickyFormatted = stickyItems.map((post) => ({
    id: post.id,
    databaseId: post.databaseId,
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    category: post.categories?.edges?.[0]?.node?.name || "News & Blog",
    image: post.featuredImage?.node?.mediaItemUrl || "/assets/newsandblog/pump.png",
  }));

  return (
    <>
      <NewsBanner
        topTitle={stickyBlock.top_title || "[ Insights ]"}
        title={stickyBlock.title || "Innovation That Fuels the Future"}
        items={stickyFormatted}
      />
      <NewsDetails items={postsForGrid} />
    </>
  );
}
