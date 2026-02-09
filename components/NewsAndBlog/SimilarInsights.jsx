import BlogCard from "../Home/BlogCard";

function formatDate(isoDate) {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function SimilarInsights({ posts = [] }) {
  if (!posts?.length) return null;

  return (
    <section className="bg-[#f8f8f3] pt-12 lg:pt-28.5 pb-25 lg:pb-55">
      <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
        <h2 className="heading-h2 mb-15">Similar Insights</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id || post.slug}
              Title={post.title}
              FeatureImage={post.featuredImage?.node?.mediaItemUrl}
              Date={formatDate(post.date)}
              Category={post.categories?.edges?.[0]?.node?.name || "News & Blog"}
              ReadMoreLink={post.slug ? `/blog/${post.slug}` : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
