import SocialShare from "./SocialLinks";

function getBlockHtml(block) {
  const html = block?.saveContent || block?.dynamicContent || block?.originalContent || "";
  return html && typeof html === "string" ? html.trim() : "";
}

const BlogContent = ({ blocks = [] }) => {
  const sortedBlocks = [...(blocks || [])].sort(
    (a, b) => (a?.order ?? 0) - (b?.order ?? 0)
  );

  const blocksHtml = sortedBlocks
    .map(getBlockHtml)
    .filter(Boolean)
    .join("");

  return (
    <section className="bg-[#f8f8f3]">
      <div className="generic-description max-w-247.5 mx-auto px-2.5 mb-0">
        {blocksHtml ? (
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blocksHtml }}
          />
        ) : null}

        <div className="mt-20.5">
          <SocialShare />
        </div>
      </div>
    </section>
  );
};

export default BlogContent;
