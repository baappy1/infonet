"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestimonialCard from "./TestimonialCard";

export default function Testimonial() {
  return (
    <>
      <div className="bg-[#F8F8F3] pt-27 lg:pt-55 pb-30 lg:pb-71.5">
        <div className="container px-5 lg:px-0">
          <div className="top-title mb-5">[ Testimonials ]</div>

          <div className="font-manrope lg:mb-0 text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 w-[60%] lg:w-162.25">
            Success Stories of Industry Leaders
          </div>

          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                slidesToScroll: 1,
              }}
              className="w-full mt-[70px]"
            >
              <CarouselContent className="-ml-[22px]">
                <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3 pl-[22px]">
                  <TestimonialCard />
                </CarouselItem>

                <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3 pl-[22px]">
                  <TestimonialCard />
                </CarouselItem>

                <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3 pl-[22px]">
                  <TestimonialCard />
                </CarouselItem>

                <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3 pl-[22px]">
                  <TestimonialCard />
                </CarouselItem>
              </CarouselContent>

              <div className="infonet-prev-btn absolute w-12 h-10 -top-24 left-[inherit] right-13 z-10">
                <CarouselPrevious />
              </div>

              <div className="infonet-next-btn absolute w-12 h-10 -top-24 right-0 z-10">
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
