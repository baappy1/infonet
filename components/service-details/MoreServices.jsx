import Image from "next/image";
import Link from "next/link";

export default function MoreServices({
  topTitle,
  title,
  shortDescription,
  industries,
  moreSolutionTitle,
  moreSolutionDes,
  moreFeatureImage,
  moreSolutionUrl,
}) {
  const hasAnyBlockData = [
    topTitle,
    title,
    shortDescription,
    moreSolutionTitle,
    moreSolutionDes,
    moreFeatureImage,
    moreSolutionUrl,
  ].some((v) => (typeof v === "string" ? v.trim() : Boolean(v)));

  // No block data → don't show the section at all
  if (!hasAnyBlockData) return null;

  const cardTitle = typeof moreSolutionTitle === "string" ? moreSolutionTitle : "";
  const cardDescription =
    typeof moreSolutionDes === "string" ? moreSolutionDes : "";
  const customImageUrl =
    moreFeatureImage &&
    (typeof moreFeatureImage === "string"
      ? moreFeatureImage
      : moreFeatureImage?.url ||
        moreFeatureImage?.sourceUrl ||
        moreFeatureImage?.mediaItemUrl);
  const imageSrc = customImageUrl || null;
  const linkHref = moreSolutionUrl || null;
  const hasLink = Boolean(linkHref);
  const hasHeader = [topTitle, title, shortDescription].some((v) =>
    typeof v === "string" ? v.trim() : Boolean(v),
  );
  const hasCardContent = Boolean(
    (typeof cardTitle === "string" && cardTitle.trim()) ||
      (typeof cardDescription === "string" && cardDescription.trim()) ||
      imageSrc ||
      linkHref,
  );

  if (!hasHeader && !hasCardContent) return null;

  return (
    <>
      <div className="bg-[#F8F8F3] pb-30 lg:pb-62.5">
        <div className="container lg:px-0 px-5 xl:px-5 2xl:px-0">
          {/* Header */}
          <div className="flex flex-col">
            {hasHeader ? (
              <div className="w-full  mb-20">
                {topTitle ? <div className="top-title mb-5">{topTitle}</div> : null}
                {title ? (
                  <h2 className="heading-h2 max-w-162.25 text-[#08090D] w-full">
                    {title}
                  </h2>
                ) : null}
                {shortDescription ? (
                  <p className="paragraph-text mt-5 max-w-162.25">
                    {shortDescription}
                  </p>
                ) : null}
              </div>
            ) : null}

            {hasCardContent ? (
              hasLink ? (
              <Link
                href={linkHref}
                className="w-full relative cursor-pointer group"
              >
                {imageSrc ? (
                  <Image
                    className="rounded-lg h-117 object-cover w-full"
                    src={imageSrc}
                    width={1320}
                    height={468}
                    alt={cardTitle || ""}
                  />
                ) : null}
                <div
                  className="rounded-lg z-10 absolute top-0 left-0 h-full w-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)",
                  }}
                ></div>
                <div className="absolute z-11 bottom-0 left-0 w-full p-7.5 text-white">
                  {cardTitle ? (
                    <h3 className="font-manrope text-[24px] leading-7.5 mb-2.5 group-hover:underline">
                      {cardTitle}
                    </h3>
                  ) : null}
                  {cardDescription ? (
                    <p className="text-[14px] leading-5 font-manrope font-medium text-white/80">
                      {cardDescription}
                    </p>
                  ) : null}
                </div>
              </Link>
            ) : (
              <div className="w-full relative cursor-pointer">
                {imageSrc ? (
                  <Image
                    className="rounded-lg h-117 object-cover w-full"
                    src={imageSrc}
                    width={1320}
                    height={468}
                    alt={cardTitle || ""}
                  />
                ) : null}
                <div
                  className="rounded-lg z-10 absolute top-0 left-0 h-full w-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)",
                  }}
                ></div>
                <div className="absolute z-11 bottom-0 left-0 w-full p-7.5 text-white">
                  {cardTitle ? (
                    <h3 className="font-manrope text-[24px] leading-7.5 mb-2.5 hover:underline">
                      {cardTitle}
                    </h3>
                  ) : null}
                  {cardDescription ? (
                    <p className="text-[14px] leading-5 font-manrope font-medium text-white/80">
                      {cardDescription}
                    </p>
                  ) : null}
                </div>
              </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
