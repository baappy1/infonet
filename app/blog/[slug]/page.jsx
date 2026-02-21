export const revalidate = 60;

import BlogContent from "@/components/NewsAndBlog/BlogContent";
import BlogDetails from "@/components/NewsAndBlog/BlogDetails";
import SimilarInsights from "@/components/NewsAndBlog/SimilarInsights";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_POSTS, GET_POST_BY_SLUG } from "@/lib/graphql/queries";
import { getPostSeoMetadata } from "@/lib/seo";
import { print } from "graphql";
import { cache, Suspense } from "react";

const getPostBySlug = cache(async (slug) => {
  if (!slug) return null;
  try {
    const data = await fetchGraphQL(print(GET_POST_BY_SLUG), { slug });
    return data?.postBy ?? null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
});

async function getSimilarPosts(currentSlug, limit = 3) {
  try {
    const data = await fetchGraphQL(print(GET_ALL_POSTS), { first: 4 });
    const nodes = data?.posts?.nodes ?? [];
    return nodes
      .filter((p) => p?.slug && p.slug !== currentSlug)
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching similar posts:", error);
    return [];
  }
}

async function SimilarInsightsAsync({ currentSlug }) {
  const posts = await getSimilarPosts(currentSlug, 3);
  return <SimilarInsights posts={posts} />;
}

function SimilarInsightsFallback() {
  return (
    <section className="bg-[#f8f8f3] pt-12 lg:pt-28.5 pb-25 lg:pb-55">
      <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
        <div className="h-10 w-48 bg-[#E4E4E7] rounded mb-15 animate-pulse" />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 bg-[#E4E4E7] rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return {};
  const post = await getPostBySlug(slug);
  return getPostSeoMetadata(post);
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <>
      <BlogDetails
        post={post}
        slug={slug}
        shareUrl={`${(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "")}/blog/${slug}`}
        shareTitle={post?.title || ""}
      />
      <BlogContent blocks={post?.blocks} slug={slug} />
      <Suspense fallback={<SimilarInsightsFallback />}>
        <SimilarInsightsAsync currentSlug={slug} />
      </Suspense>
    </>
  );
}
