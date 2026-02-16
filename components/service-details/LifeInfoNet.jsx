"use client";

import { useRef, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import LifeInfoNetCard from "./LifeInfoNetCard";

const DEFAULT_ITEMS = [
  { image: "/assets/service-details/infront/01.png", title: "Retail Gas Stations" },
  { image: "/assets/service-details/infront/02.png", title: "Convenience Stores" },
  { image: "/assets/service-details/infront/03.png", title: "Unattended Fuel Sites" },
  { image: "/assets/service-details/infront/04.png", title: "Fleet Fueling Operations" },
  { image: "/assets/service-details/infront/05.png", title: "First Nations Retail" },
];

export default function LifeInfoNet({
  topTitle = "[ Life at InfoNet ]",
  title = "Perfect for All Retail Fuel & Convenience Environments",
  shortDescription = "Designed for operators who need reliable installations, compatible hardware, and hands-on support.",
  services,
}) {
  const [leftOffset, setLeftOffset] = useState(0);
  const containerRef = useRef(null);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  // Build items from services prop or fallback
  const items =
    Array.isArray(services) && services.length > 0
      ? services.map((s) => ({
        image: s.featuredImage?.node?.mediaItemUrl || "/assets/service-details/infront/01.png",
        title: s.title || "",
        slug: s.slug,
      }))
      : DEFAULT_ITEMS;

  useEffect(() => {
    const calculateLeftOffset = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerLeft = containerRect.left;
        const leftPadding = 20;
        setLeftOffset(containerLeft + leftPadding);
      }
    };

    calculateLeftOffset();
    window.addEventListener("resize", calculateLeftOffset);

    return () => {
      window.removeEventListener("resize", calculateLeftOffset);
    };
  }, []);

  return (
    <>
      <div className="pt-20 lg:pt-25 bg-[#F8F8F3]">
        <div
          className="container  lg:pr-0 lg:pl-[20px] 2xl:pl-0 pr-5 pl-5"
          ref={containerRef}
        >
          <div className="w-full">
            <div className="w-full ">
              <div className="top-title mb-5">{topTitle}</div>
              <h2 className="heading-h2 mb-5 max-w-162.25">
                {title}
              </h2>
              <p className="paragraph-text mb-10 lg:mb-20 max-w-162.25">
                {shortDescription}
              </p>
            </div>
          </div>
        </div>

        <div
          className="w-full relative life-info-net"
          style={{ left: `${leftOffset}px` }}
        >
          <div className="relative infonet-left left:0 2xl:-left-[20px]">
            <Carousel
              plugins={[plugin.current]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {items.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 sm:basis-[calc(50%-8px)] md:basis-[calc(33.333%-8px)] lg:basis-[calc(25%-8px)] 2xl:basis-[calc(18%-8px)]"
                  >
                    <LifeInfoNetCard
                      image={item.image}
                      title={item.title}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
