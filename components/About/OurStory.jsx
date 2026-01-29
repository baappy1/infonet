import Link from "next/link";
import Image from "next/image";
import OurStoryCard from "./OurStoryCard";

export default function OurStory() {
  return (
    <>
      <div className="bg-[#F8F8F3] pt-[90px] lg:pt-[100px]  pb-[60px]  lg:pb-[120px]">
        <div className="container mx-auto 2xl:px-[0] px-[20px]">
          <div className="flex flex-col lg:flex-row  gap-[40px] lg:gap-[8.45%]">
            <div className="w-full lg:w-[40.7%]">
              <div className="top-title mb-[20px]">[ OUR STORY ]</div>
              <h2 className="font-manrope text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px] mb-[20px]">
                A Journey of Innovation and Trusted Partnerships
              </h2>
              <p className="font-manrope text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] mb-[56px] font-medium">
                From our early days as a small development team in Canada to
                becoming a preferred technology provider for operators across:
              </p>

              <ul className="">
                  <OurStoryCard 
                    title="Deep industry understanding"
                    icon="assets/about/story/01.svg"
                  />
                  <OurStoryCard 
                    title="Real-world customer feedback"
                    icon="assets/about/story/02.svg"
                  />
                  <OurStoryCard 
                    title="Purpose-built engineering"
                    icon="assets/about/story/03.svg"
                  />
                  <OurStoryCard 
                    title="Long-term relationships"
                    icon="assets/about/story/04.svg"
                  />
              </ul>
            </div>
            <div className="w-full lg:w-[50.85%]">
              <Image
                width={671}
                height={536}
                className="w-full object-cover rounded-[8px]"
                src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/about.png"
                alt="Our Story"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
