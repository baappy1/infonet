import Image from "next/image";
import Link from "next/link";

export default function About({
  topTitle,
  title,
  description,
  buttonTitle,
  buttonUrl,
  clientSays,
  clientImage,
  clientName,
  clientDesignation,
  featureImage,
}) {
  // Fallbacks preserve your current static design when fields are missing
  const resolvedTopTitle = topTitle || "[ About InfoNet ]";
  const resolvedTitle =
    title || "Driving Innovation in Fuel and Convenience Retail";
  const resolvedDescription =
    description ||
    "We create powerful Point-of-Sale, Back Office and Fuel Management Software Systems for today’s competitive gas station/retail fueling, convenience store and unattended/card lock fueling marketplace.";
  const resolvedButtonTitle = buttonTitle || "more about us";
  const resolvedButtonUrl = buttonUrl || "/who-we-are";
  const resolvedClientSays =
    clientSays ||
    "“The integration between our POS and fuel systems is seamless now. InfoNet helped us eliminate downtime and keep our customers happy even during high-traffic hours.”";
  const resolvedClientImage =
    clientImage ||
    "https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/6eb5238afae3694f2a7851f6cbbc1ed0566b53e0.jpg";
  const resolvedClientName = clientName || "Lisa R.";
  const resolvedClientDesignation = clientDesignation || "Operations Manager";
  const resolvedFeatureImage =
    featureImage ||
    "https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/about.png";

  return (
    <>
      <div className="bg-[#F8F8F3] pt-[90px] lg:pt-[100px]  pb-[60px]  lg:pb-[120px]">
        <div className="container mx-auto 2xl:px-[0] px-[20px]">
          <div className="flex flex-col lg:flex-row  gap-[40px] lg:gap-[8.45%]">
            <div className="w-full ">
              <div className="top-title mb-[20px]">{resolvedTopTitle}</div>
              <h2 className="font-manrope text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px] mb-[20px]">
                {resolvedTitle}
              </h2>
              <p className="font-manrope text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] mb-[20px] font-medium">
                {resolvedDescription}
              </p>
              <Link
                href={resolvedButtonUrl}
                className="inline-flex font-medium  rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white uppercase gap-[10px] px-[16px] py-[12px]"
              >
                <span className="text-[14px] leading-[18px]">
                  {resolvedButtonTitle}
                </span>
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_505_137)">
                    <path
                      d="M2.5 8H13.5"
                      stroke="#08090D"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.79999 3.5L14.3 8L9.79999 12.5"
                      stroke="#08090D"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_505_137">
                      <rect width={16} height={16} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>

              <div className="pl-[14px] lg:pl-[20px] border-l-1 border-dashed border-[#08090D33] mt-[40px] lg:mt-[66px]">
                <p className="font-medium font-manrope text-sm leading-5 lg:text-base  lg:leading-5.5">
                  {resolvedClientSays}
                </p>
                <div className="flex mt-[30px] lg:mt-[40px] gap-[16px] items-center">
                  <Image
                    width={60}
                    height={80}
                    className="h-[70px] lg:h-[80px] object-cover rounded-[30px]"
                    src={resolvedClientImage}
                    alt="Testimonial author"
                  />
                  <div>
                    <h3 className="mb-[8px] text-[14px] lg:text-[16px] font-bold leading-[18px] lg:leading-[22px] uppercase">
                      {resolvedClientName}
                    </h3>
                    <p className="text-[12px] uppercase leading-[12px]">
                      {resolvedClientDesignation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full aspect-671/536 relative  ">
              <Image
                fill
                // width={671}
                // height={536}
                className="w-full h-full object-cover rounded-lg"
                src={resolvedFeatureImage}
                alt="About InfoNet"
                // style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
