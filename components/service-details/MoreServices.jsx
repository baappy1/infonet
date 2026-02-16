import Image from "next/image";
import Link from "next/link";

export default function MoreServices({
  topTitle = "[ More services ]",
  title = "Additional Services to Support Your Business",
  shortDescription = "From hardware sourcing to hands-on training, our services are designed to help your operations run efficiently and reliably.",
  industries,
}) {
  // Show only the latest (first) item from the array
  const latest =
    Array.isArray(industries) && industries.length > 0 ? industries[0] : null;

  return (
    <>
      <div className="bg-[#F8F8F3] pb-30 lg:pb-62.5">
        <div className="container lg:pr-[0] lg:pl-[0] pr-[20px] pl-[20px]">
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

            {latest ? (
              <Link
                href={`/Industries/${latest.slug || ""}`}
                className="w-full relative cursor-pointer group"
              >
                <Image
                  className="rounded-lg h-117 object-cover w-full"
                  src={
                    latest.featuredImage?.node?.mediaItemUrl ||
                    "/assets/service-details/service-details.webp"
                  }
                  width={1320}
                  height={468}
                  alt={latest.title || "Industry"}
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
                    {latest.title || ""}
                  </h3>
                  <p className="text-[14px] leading-5 font-manrope font-medium text-white/80">
                    {(latest.excerpt || "").replace(/<[^>]+>/g, "").trim()}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="w-full relative  cursor-pointer">
                <Image
                  className="rounded-lg h-117 object-cover"
                  src="/assets/service-details/service-details.webp"
                  width={1320}
                  height={468}
                  alt="hardware image"
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
                    Hardware Sourcing
                  </h3>
                  <p className="text-[14px] leading-5 font-manrope font-medium text-white/80">
                    We provide certified, fully compatible hardware for POS,
                    pumps, scanners, and more, ensuring your systems run smoothly
                    from day one.
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
