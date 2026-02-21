import NewsBanner from "@/components/NewsAndBlog/NewsBanner";
import NewsDetails from "@/components/NewsAndBlog/NewsDetails";
import { fetchGraphQL } from "@/lib/graphql";
import {
    BLOG_PAGE_ID,
    GET_ALL_POSTS,
    GET_CATEGORIES,
    GET_HOMEPAGE_ENTITIES,
    GET_PAGE_BLOCKS,
} from "@/lib/graphql/queries";
import { print } from "graphql";

function getBlockData(blocks, name) {
  const block = (blocks || []).find((b) => b?.name === name);
  return block?.attributes?.data || {};
}

function getStickyPostIds(blocks) {
  const stickyBlock = getBlockData(
    blocks,
    "carbon-fields/insight-sticky-section",
  );
  const raw =
    stickyBlock.selected_posts ??
    stickyBlock.sticky_posts ??
    stickyBlock.selectedPosts ??
    [];
  return raw
    .map((item) =>
      typeof item === "object" ? (item?.id ?? item?.value ?? item?.ID) : item,
    )
    .filter((id) => id != null && id !== "")
    .map(Number);
}

export const revalidate = 60;

async function getBlogPageBlocks() {
  if (!BLOG_PAGE_ID || BLOG_PAGE_ID <= 0) return [];
  try {
    const data = await fetchGraphQL(print(GET_PAGE_BLOCKS), {
      pageId: BLOG_PAGE_ID,
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
    const data = await fetchGraphQL(print(GET_HOMEPAGE_ENTITIES), {
      clientIds: [],
      testimonialIds: [],
      postIds: stickyIds,
    });
    return data?.posts?.nodes || [];
  } catch {
    return [];
  }
}

async function getAllPosts() {
  try {
    const data = await fetchGraphQL(print(GET_ALL_POSTS), { first: 100 });
    return data?.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const data = await fetchGraphQL(print(GET_CATEGORIES));
    const edges = data?.categories?.edges || [];
    return edges.map((e) => e?.node).filter(Boolean);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function NewsAndBlogPage() {
  const [blocks, allPosts, categories] = await Promise.all([
    getBlogPageBlocks(),
    getAllPosts(),
    getCategories(),
  ]);
  const stickyIds = getStickyPostIds(blocks);
  const stickyPosts =
    stickyIds.length > 0 ? await getStickyPosts(stickyIds) : [];

  const stickyIdSet = new Set(stickyIds);
  let stickyItems;
  let postsForGrid;
  if (stickyPosts.length > 0) {
    stickyItems = stickyPosts;
    postsForGrid = allPosts.filter(
      (p) => !stickyIdSet.has(Number(p.databaseId)),
    );
  } else {
    stickyItems = allPosts.slice(0, 3);
    // postsForGrid = allPosts.slice(3);
    postsForGrid = allPosts;
  }

  const stickyBlock = getBlockData(
    blocks,
    "carbon-fields/insight-sticky-section",
  );
  const stickyFormatted = stickyItems.map((post) => ({
    id: post.id,
    databaseId: post.databaseId,
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    category: post.categories?.edges?.[0]?.node?.name || "News & Blog",
    image:
      post.featuredImage?.node?.mediaItemUrl || "/assets/newsandblog/pump.png",
  }));

  return (
    <>
      <NewsBanner
        topTitle={stickyBlock.top_title || "[ Insights ]"}
        title={stickyBlock.title || "Innovation That Fuels the Future"}
        items={stickyFormatted}
      />
      <NewsDetails items={postsForGrid} categories={categories} />
    </>
  );
}
