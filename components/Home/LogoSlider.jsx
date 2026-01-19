"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function InfiniteSlider() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const items = Array.from(track.children);

    let trackWidth = track.scrollWidth;
    const wrapperWidth = wrapperRef.current.offsetWidth;

    // Duplicate items to ensure infinite scroll
    while (trackWidth < wrapperWidth * 5) {
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
      });
      trackWidth = track.scrollWidth;
    }

    // GSAP infinite scroll
    gsap.to(track, {
      x: -wrapperWidth,
      duration: 30, // slower scroll
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % wrapperWidth}px`,
      },
    });
  }, []);

  return (
    <div className="pt-[50px] lg:pt-[100px] pb:[45px] lg:pb-[120px] bg-[#F8F8F3] overflow-hidden">
        <div className="container">
            <div 
                className="text-center uppercase  mb-[30px] lg:mb-[56px] pl-[10px] pr-[10px]  lg:pl-0 lg:pr-0 font-[14px] leading-[18px] lg:font-[16px] lg:leading-[22px]">Helping 100+ leading companies get better results</div>
        </div>
        <div className="container mx-auto relative">
          
          <div
            className="z-[99] absolute left-[-132px] rotate-[-180deg] top-[-20px] transform w-[227px] h-[100px] hidden sm:flex"
            style={{
              background: "linear-gradient(270deg, #F8F8F3 67.97%, rgba(248, 248, 243, 0) 100%)"
            }}
          ></div>

          <div
            className="z-[99] absolute right-[-132px] top-[-20px] transform w-[227px] h-[100px] hidden sm:flex"
            style={{
              background: "linear-gradient(270deg, #F8F8F3 67.97%, rgba(248, 248, 243, 0) 100%)"
            }}
          ></div>


          <div
            className="z-[99] absolute left-[-2px] rotate-[-180deg] top-[-3px] transform w-[48px] h-[40px] flex sm:hidden"
            style={{
              background: "linear-gradient(270deg, #F8F8F3 67.97%, rgba(248, 248, 243, 0) 100%)"
            }}
          ></div>

          <div
            className="z-[99] absolute right-[-2px] top-[-3px] transform w-[48px] h-[40px] flex sm:hidden"
            style={{
              background: "linear-gradient(270deg, #F8F8F3 67.97%, rgba(248, 248, 243, 0) 100%)"
            }}
          ></div>
          


        <div
            ref={wrapperRef}
            className="w-full overflow-hidden pb-[20px] lg:pb-[50px] border-b border-dashed border-b-[#08090D33]"
        >
            <div
            ref={trackRef}
            className="flex gap-[34px] lg:gap-[63px] w-max"
            >
            {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"].map(
                (item, index) => (
                <div
                    key={index}
                    className="w-auto h-[39px] lg:h-[48px] flex items-center justify-center flex-shrink-0"
                >
                    <Image 
                      width={142}
                      height={42}
                      className="h-[22px] lg:h-[42px] w-auto object-contain"
                      src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/logo-01.svg"
                      alt="Partner logo"
                      style={{ width: "auto", height: "auto" }}
                      />
                </div>
                )
            )}
            </div>
        </div>
        </div>
    </div>
  );
}
