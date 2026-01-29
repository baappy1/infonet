"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const Logos = [
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
  // Removed duplicates: 01-04 were duplicated as 07-10
];

export default function InfiniteSlider() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    
    if (!track || !wrapper) return;

    const items = Array.from(track.children);
    let trackWidth = track.scrollWidth;
    const wrapperWidth = wrapper.offsetWidth;

    // Clear any existing clones first
    const clones = track.querySelectorAll('[data-clone="true"]');
    clones.forEach(clone => clone.remove());

    // Duplicate items for seamless infinite scroll
    // We need enough clones to fill at least 2x the wrapper width
    const neededClones = Math.ceil((wrapperWidth * 2) / trackWidth) + 1;
    
    for (let i = 0; i < neededClones; i++) {
      items.forEach((item, index) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('data-clone', 'true');
        clone.setAttribute('data-index', `${i}-${index}`);
        track.appendChild(clone);
      });
    }

    trackWidth = track.scrollWidth;
    
    // Create GSAP animation
    animationRef.current = gsap.to(track, {
      x: `-=${trackWidth / 2}`,
      duration: 80,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (trackWidth / 2))
      }
    });

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="pt-[50px] lg:pt-[100px] pb:[45px] lg:pb-[120px] bg-[#F8F8F3] overflow-hidden">
      <div className="container">
        <div className="text-center uppercase mb-7.5 lg:mb-14 px-2.5 lg:pl-0 lg:pr-0 text-sm leading-4.5 lg:text-base lg:leading-5.5">
          Helping 100+ leading companies get better results
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
          className="z-[99] absolute left-[-2px] rotate-[-180deg] top-[-3px] transform w-[48px] h-[40px] flex sm:hidden"
          style={{
            background:
              "linear-gradient(270deg, #F8F8F3 67.97%, rgba(248, 248, 243, 0) 100%)",
          }}
        ></div>

        {/* Right fade gradient - Mobile */}
        <div
          className="z-[99] absolute right-[-2px] top-[-3px] transform w-[48px] h-[40px] flex sm:hidden"
          style={{
            background:
              "linear-gradient(270deg, #F8F8F3 67.97%, rgba(248, 248, 243, 0) 100%)",
          }}
        ></div>

        <div
          ref={wrapperRef}
          className="w-full overflow-hidden pb-[20px] lg:pb-[50px] border-b border-dashed border-b-[#08090D33]"
        >
          <div ref={trackRef} className="flex gap-[34px] lg:gap-[63px] w-max">
            {Logos.map((item) => (
              <div
                key={item.id}
                className="w-auto h-[39px] lg:h-[48px] flex items-center justify-center flex-shrink-0"
                data-original="true"
              >
                <Image
                  width={142}
                  height={42}
                  className="h-[22px] lg:h-[42px] w-auto object-contain"
                  src={item.icon}
                  alt={`Partner logo ${item.id}`}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}