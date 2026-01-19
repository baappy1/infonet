"use client";

import * as React from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Blog() {
  const [api, setApi] = React.useState(null); // carousel API
  const [selectedIndex, setSelectedIndex] = React.useState(0); // current slide

  const slides = Array.from({ length: 3 }); // ensure this matches CarouselItem count

  // Update selectedIndex when carousel changes
  const onSelect = () => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  };

  React.useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    onSelect(); // initial selection
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="bg-[#F8F8F3] pt-[0] lg:pt-[12vh] pb-[130px] lg:pb-[28.8vh]">
      <div className="container lg:pr-[0] lg:pl-[0] pr-[20px] pl-[20px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end">
          <div className="w-full lg:w-[41.7%]">
            <div className="top-title mb-[20px]">[ Insights ]</div>
            <div className="font-manrope mb-[20px] lg:mb-[0px] text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px]">
              Industry Resources & Informations
            </div>
          </div>
          <div className="w-full lg:w-[40.7%] font-manrope font-medium text-[14px] leading-[20px] lg:text-[16px] lg:leading-[22px] opacity-80">
            Stay ahead of the curve with the latest stories, research and developments shaping the fuel retail, convenience store and unattended fueling‑industry ecosystem.
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:flex flex-wrap gap-x-[22px] gap-y-[22px] mt-[40px] lg:mt-[100px]">
          <div className="w-[calc((100%-66px)/3)] flex flex-col">
            <BlogCard />
          </div>
          <div className="w-[calc((100%-66px)/3)] flex flex-col">
            <BlogCard />
          </div>
          <div className="w-[calc((100%-66px)/3)] flex flex-col">
            <BlogCard />
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden w-full mt-[40px]">
          <Carousel
            className="w-full"
            setApi={setApi}
            opts={{ align: "start", containScroll: "trimSnaps" }}
          >
            <CarouselContent className="flex gap-4">
              {slides.map((_, index) => (
                <CarouselItem
                  key={index}
                  className="flex-[0_0_100%]" // 100% width per slide on mobile
                >
                  <BlogCard />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Pagination */}
          <div className="flex justify-center mt-[20px] gap-[4px]">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-[6px] rounded-[4px] transition-all duration-200 ${
                  selectedIndex === index
                    ? "w-[16px] bg-[#08090D]" // active: width 16px
                    : "w-[10px] bg-[#08090D1A]" // inactive: width 10px
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-[60px]">
          <Link
            href=""
            className="flex font-medium justify-between box-border rounded-[4px] bg-[#F8F8F3] border-[1px] hover:border-[#EBFF3A] transition duration-150 hover:bg-[#EBFF3A] uppercase gap-[10px] px-[16px] py-[12px]"
          >
            <span className="text-[14px] leading-[18px]">view all insights</span>
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
        </div>
      </div>
    </div>
  );
}
