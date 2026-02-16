import BlogContent from "@/components/NewsAndBlog/BlogContent";
import BlogDetails from "@/components/NewsAndBlog/BlogDetails";
import SimilarInsights from "@/components/NewsAndBlog/SimilarInsights";
import { client } from "@/lib/graphql/client";
import { GET_ALL_POSTS, GET_POST_BY_SLUG } from "@/lib/graphql/queries";
import { getSeoMetadata } from "@/lib/seo";

async function getPostBySlug(slug) {
  if (!slug) return null;
  try {
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
      fetchPolicy: "no-cache",
    });
    return data?.postBy ?? null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

async function getSimilarPosts(currentSlug, limit = 3) {
  try {
    const { data } = await client.query({
      query: GET_ALL_POSTS,
      variables: { first: 50 },
      fetchPolicy: "no-cache",
    });
    const nodes = data?.posts?.nodes ?? [];
    return nodes
      .filter((p) => p?.slug && p.slug !== currentSlug)
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching similar posts:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return {};
  const uri = `blog/${slug}`;
  return getSeoMetadata(uri);
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const [post, similarPosts] = await Promise.all([
    getPostBySlug(slug),
    getSimilarPosts(slug),
  ]);

  return (
    <>
      <BlogDetails post={post} slug={slug} />
      <BlogContent blocks={post?.blocks} slug={slug} />
      <SimilarInsights posts={similarPosts} />
    </>
  );
}
