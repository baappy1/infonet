import Image from "next/image";
import Link from "next/link";

export default function MoreServices({
  topTitle = "[ More services ]",
  title = "Additional Services to Support Your Business",
  shortDescription = "From hardware sourcing to hands-on training, our services are designed to help your operations run efficiently and reliably.",
  industries,
  moreSolutionTitle,
  moreSolutionDes,
  moreFeatureImage,
  moreSolutionUrl,
}) {
  // Prefer custom block fields; fallback to latest industry
  const latest =
    Array.isArray(industries) && industries.length > 0 ? industries[0] : null;

  const cardTitle = moreSolutionTitle || latest?.title || "Hardware Sourcing";
  const cardDescription =
    moreSolutionDes ||
    (latest?.excerpt
      ? (latest.excerpt || "").replace(/<[^>]+>/g, "").trim()
      : "") ||
    "We provide certified, fully compatible hardware for POS, pumps, scanners, and more, ensuring your systems run smoothly from day one.";
  const customImageUrl =
    moreFeatureImage &&
    (typeof moreFeatureImage === "string"
      ? moreFeatureImage
      : moreFeatureImage?.url ||
        moreFeatureImage?.sourceUrl ||
        moreFeatureImage?.mediaItemUrl);
  const imageSrc =
    customImageUrl ||
    latest?.featuredImage?.node?.mediaItemUrl ||
    "/assets/service-details/service-details.webp";
  const linkHref =
    moreSolutionUrl || (latest?.slug ? `/industries/${latest.slug}` : null);
  const hasLink = Boolean(linkHref);

  return (
    <>
      <div className="bg-[#F8F8F3] pb-30 lg:pb-62.5">
        <div className="container lg:px-0 px-5 xl:px-5 2xl:px-0">
          {/* Header */}
          <div className="flex flex-col">
            <div className="w-full  mb-20">
              <div className="top-title mb-5">{topTitle}</div>
              <h2 className="heading-h2 max-w-162.25 text-[#08090D] w-full">
                {title}
              </h2>
              <p className="paragraph-text mt-5 max-w-162.25">
                {shortDescription}
              </p>
            </div>

            {hasLink ? (
              <Link
                href={linkHref}
                className="w-full relative cursor-pointer group"
              >
                <Image
                  className="rounded-lg h-117 object-cover w-full"
                  src={imageSrc}
                  width={1320}
                  height={468}
                  alt={cardTitle}
                />
                <div
                  className="rounded-lg z-10 absolute top-0 left-0 h-full w-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)",
                  }}
                ></div>
                <div className="absolute z-11 bottom-0 left-0 w-full p-7.5 text-white">
                  <h3 className="font-manrope text-[24px] leading-7.5 mb-2.5 group-hover:underline">
                    {cardTitle}
                  </h3>
                  <p className="text-[14px] leading-5 font-manrope font-medium text-white/80">
                    {cardDescription}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="w-full relative cursor-pointer">
                <Image
                  className="rounded-lg h-117 object-cover w-full"
                  src={imageSrc}
                  width={1320}
                  height={468}
                  alt={cardTitle}
                />
                <div
                  className="rounded-lg z-10 absolute top-0 left-0 h-full w-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)",
                  }}
                ></div>
                <div className="absolute z-11 bottom-0 left-0 w-full p-7.5 text-white">
                  <h3 className="font-manrope text-[24px] leading-7.5 mb-2.5 hover:underline">
                    {cardTitle}
                  </h3>
                  <p className="text-[14px] leading-5 font-manrope font-medium text-white/80">
                    {cardDescription}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
