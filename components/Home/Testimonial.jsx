"use client";
import Image from "next/image";
import Link from "next/link";
import TestimonialCard from "@/components/Home/TestimonialCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useState } from "react";
import { motion } from "framer-motion";
import CtaIcon from "@/components/Global/CtaIcon"
import ButtonPrev from "@/components/Global/ButtonPrev"
import ButtonNext from "@/components/Global/ButtonNext"

export default function Testimonial() {
  const [api, setApi] = useState(null); // store carousel API

  // Variants for fade-up animation
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="2xl:pt-[24.15vh] 2xl:pb-[12vh] lg:pt-[120px] lg:pb-[120px] pt-[90px] pb-[90px] bg-[#F8F8F3] testimonial-slider">
      <div className="container lg:pr-[0] lg:pl-[0] pr-[20px] pl-[20px]">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end lg:pr-[15px]">
          <div className="w-full lg:w-[41.7%]">
            <div className="top-title mb-[20px]">[ Testimonials ]</div>
            <div className="font-manrope text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px]">
              Success Stories of Industry Leaders
            </div>
          </div>
          <div className="w-full flex justify-end lg:w-[41.7%]">
            <Link
              href="/contact"
              className="hidden lg:inline-flex lg:px-[16px] px-[16px] py-[12px] lg:py-[12px] text-[14px] leading-[18px] font-medium box-border rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white hover:text-[#08090D] uppercase gap-[10px]"
            >
              <span>get in touch</span>
              <CtaIcon/>
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-[40px] lg:mt-[100px]">
          <Carousel opts={{ }} setApi={setApi} className="w-full">
            <CarouselContent className="w-full flex gap-4">
              {[...Array(5)].map((_, index) => (
                <CarouselItem key={index} className="w-full">
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <TestimonialCard />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Custom Previous Button */}
          <button
            onClick={() => api?.scrollPrev()}
            className="absolute bottom-[20px] md:bottom-[30px] left-[inherit] right-[72px] md:right-[97px] z-10 p-2 bg-[#F8F8F3] hover:bg-[#EBFF3A] cursor-pointer rounded-[4px] w-[48px] h-[40px] flex justify-center items-center"
          >
            <ButtonPrev/>
          </button>

          {/* Custom Next Button */}
          <button
            onClick={() => api?.scrollNext()}
            className="absolute bottom-[20px] md:bottom-[30px] right-[20px] md:right-[45px] z-10 p-2 bg-[#F8F8F3] hover:bg-[#EBFF3A] cursor-pointer rounded-[4px] w-[48px] h-[40px] flex justify-center items-center"
          >
            <ButtonNext/>
          </button>
        </div>


        <div className="w-full flex lg:hidden justify-center mt-[40px]">
            <Link
              href=""
              className="inline-flex lg:hidden lg:px-[16px] px-[16px] py-[12px] lg:py-[12px] text-[14px] leading-[18px] font-medium box-border rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white hover:text-[#08090D] uppercase gap-[10px]"
            >
              <span>get in touch</span>
              <CtaIcon/>
            </Link>
        </div>

      </div>
    </div>
  );
}
