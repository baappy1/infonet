function getBlockHtml(block) {
  const html = block?.saveContent || block?.dynamicContent || block?.originalContent || "";
  return html && typeof html === "string" ? html.trim() : "";
}

export default function CareerBlockContent({ blocks = [] }) {
  const sortedBlocks = [...(blocks || [])].sort(
    (a, b) => (a?.order ?? 0) - (b?.order ?? 0)
  );

  const blocksHtml = sortedBlocks
    .map(getBlockHtml)
    .filter(Boolean)
    .join("");

  if (!blocksHtml) return null;

  return (
    <div
      className="career-content font-manrope font-medium text-[16px] leading-[22px] text-[#08090D] [&_h2]:text-[24px] [&_h2]:leading-7.5 [&_h2]:mb-[30px] [&_h2]:font-manrope [&_h2]:text-[#08090D] [&_ul]:list-disc [&_ul]:pl-[20px] [&_ul]:opacity-80 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-[20px] [&_ul]:mb-[50px] [&_p]:mb-4"
      dangerouslySetInnerHTML={{ __html: blocksHtml }}
    />
  );
}
