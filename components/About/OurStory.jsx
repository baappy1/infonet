import Image from "next/image";
import OurStoryCard from "./OurStoryCard";

const FALLBACK_CARDS = [
  { icon: "/assets/about/story/01.svg", title: "Deep industry understanding" },
  { icon: "/assets/about/story/02.svg", title: "Real-world customer feedback" },
  { icon: "/assets/about/story/03.svg", title: "Purpose-built engineering" },
  { icon: "/assets/about/story/04.svg", title: "Long-term relationships" },
];

export default function OurStory({
  topTitle = "[ OUR STORY ]",
  title = "A Journey of Innovation and Trusted Partnerships",
  shortDescription = "From our early days as a small development team in Canada to becoming a preferred technology provider for operators across:",
  cards = [],
  featureImage = "/assets/about/about.png",
}) {
  const displayCards = cards?.length > 0 ? cards : FALLBACK_CARDS;

  return (
    <>
      <div className="bg-[#F8F8F3] pt-[90px] lg:pt-[100px] pb-[60px] lg:pb-[120px]">
        <div className="container mx-auto 2xl:px-[0] px-[20px]">
          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[8.45%]">
            <div className="w-full lg:w-[40.7%]">
              {topTitle && <div className="top-title mb-[20px]">{topTitle}</div>}
              {title && (
                <h2 className="font-manrope text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px] mb-[20px]">
                  {title}
                </h2>
              )}
              {shortDescription && (
                <p className="font-manrope text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] mb-[56px] font-medium">
                  {shortDescription}
                </p>
              )}

              <ul className="">
                {displayCards.map((card, i) => (
                  <OurStoryCard
                    key={i}
                    title={card.title}
                    icon={card.icon}
                  />
                ))}
              </ul>
            </div>
            {featureImage && (
              <div className="w-full aspect-[671/536] h-full lg:w-[50.85%]">
                <Image
                  width={671}
                  height={536}
                  className="w-full object-cover rounded-lg"
                  src={featureImage}
                  alt="Our Story"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
