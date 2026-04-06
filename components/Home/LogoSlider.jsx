"use client";

import Image from "next/image";
import LogoLoop from "../ui/logo-loop";

const FALLBACK_LOGOS = [
  {
    id: 1,
    icon: "/assets/logo/01.png",
  },
  {
    id: 2,
    icon: "/assets/logo/02.png",
  },
  {
    id: 3,
    icon: "/assets/logo/03.png",
  },
  {
    id: 4,
    icon: "/assets/logo/04.png",
  },
  {
    id: 5,
    icon: "/assets/logo/05.png",
  },
  {
    id: 6,
    icon: "/assets/logo/06.png",
  },
];

export default function InfiniteSlider({ logos, title }) {
  const items = logos && logos.length ? logos : FALLBACK_LOGOS;

  return (
    <div className="pt-[50px] lg:pt-[100px] pb:[45px] lg:pb-[120px] bg-[#F8F8F3] overflow-hidden">
      <div className="container">
        <div className="text-center uppercase mb-7.5 lg:mb-14 px-2.5 lg:pl-0 lg:pr-0 text-sm leading-4.5 lg:text-base lg:leading-5.5">
          {title || "Helping 100+ leading companies get better results"}
        </div>
      </div>
      <div className="container mx-auto relative">
        {/* Left fade gradient - Desktop */}
        <div
          className="z-[99] absolute left-[-132px] rotate-[-180deg] top-[-20px] transform w-[227px] h-[100px] hidden sm:flex"
          style={{
            background:
              "linear-gradient(270deg, #F8F8F3 67.97%, rgba(248, 248, 243, 0) 100%)",
          }}
        ></div>

        {/* Right fade gradient - Desktop */}
        <div
          className="z-[99] absolute right-[-132px] top-[-20px] transform w-[227px] h-[100px] hidden sm:flex"
          style={{
            background:
              "linear-gradient(270deg, #F8F8F3 67.97%, rgba(248, 248, 243, 0) 100%)",
          }}
        ></div>

        {/* Left fade gradient - Mobile */}
        <div
          className="z-[99] absolute left-[-2px] rotate-[-180deg] top-0 bottom-0 transform w-[48px] h-full flex sm:hidden"
          style={{
            background:
              "linear-gradient(270deg, #F8F8F3 67.97%, rgba(248, 248, 243, 0) 100%)",
          }}
        ></div>

        {/* Right fade gradient - Mobile */}
        <div
          className="z-[99] absolute right-[-2px] top-0 bottom-0 transform w-[48px] h-full flex sm:hidden"
          style={{
            background:
              "linear-gradient(270deg, #F8F8F3 67.97%, rgba(248, 248, 243, 0) 100%)",
          }}
        ></div>

        <div
          className="w-full overflow-hidden pb-[20px] lg:pb-[50px] border-b border-dashed border-b-[#08090D33]"
        >
          <LogoLoop
            className="infonet-logoloop"
            logos={items}
            speed={40}
            pauseOnHover
            scaleOnHover={false}
            fadeOut={false}
            renderItem={(item) => (
              <div
                className="w-auto h-[48px] lg:h-[50px] flex items-center justify-center flex-shrink-0"
                data-original="true"
              >
                <Image
                  width={280}
                  height={60}
                  className="w-auto max-h-full h-full object-contain"
                  src={item.icon}
                  alt={item.title || `Partner logo ${item.id}`}
                />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
