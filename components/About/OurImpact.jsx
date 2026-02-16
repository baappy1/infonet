"use client";

import OurImpactCard from "@/components/About/OurImpactCard";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  visible: (isMobile) => ({
    transition: {
      staggerChildren: isMobile ? 0.1 : 0.15, // smaller stagger on mobile
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FALLBACK_ITEMS = [
  { title: "92%", description: "Improvement in overall charger uptime within the first three months" },
  { title: "37%", description: "Reduction in customer-reported charging issues" },
  { title: "42%", description: "Increase in repeat charging sessions across upgraded stations" },
  { title: "3x", description: "Faster average charging session start time" },
];

export default function OurImpact({
  topTitle = "[ Our Impact ]",
  title = "Powering Retail & Fuel Operations Across North America",
  shortDescription = "A snapshot of how Infonet Technology keeps businesses running smoothly, efficiently, and reliably — every single day.",
  impactItems = [],
  buttonText = "explore our solutions",
  buttonLink = "/contact",
}) {
  const shouldReduce = useReducedMotion();
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 1024 : false;
  const displayItems = impactItems?.length > 0 ? impactItems : FALLBACK_ITEMS;

  return (
    <div className="bg-[#F8F8F3] 2xl:pt-27 pt-11.5">
      <div className="container lg:pr-[0] lg:pl-[0] pr-[20px] pl-[20px]">
        <motion.div
          className="text-center"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          {topTitle && (
            <motion.div variants={shouldReduce ? {} : itemVariants} className="top-title mb-[20px]">
              {topTitle}
            </motion.div>
          )}
          {title && (
            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="font-manrope lg:mb-[0px] text-[28px] mx-auto max-w-[649px] leading-[30px] lg:text-[40px] lg:leading-[50px]"
            >
              {title}
            </motion.div>
          )}
          {shortDescription && (
            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="mt-[20px] font-manrope font-medium text-[14px] mx-auto max-w-[649px] leading-[20px] lg:text-[16px] lg:leading-[22px] opacity-80"
            >
              {shortDescription}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 mt-15 mx-auto max-w-[990px]"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          {displayItems.map((item, i) => (
            <motion.div
              key={i}
              className="w-full sm:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]"
              variants={shouldReduce ? {} : itemVariants}
            >
              <OurImpactCard
                cardTitle={item.title}
                cardDescription={item.description}
              />
            </motion.div>
          ))}
        </motion.div>

        {(buttonText || buttonLink) && (
          <div className="flex justify-center mt-12 sm:mt-17.5">
            <Link
              className="inline-flex lg:px-[16px] px-[16px] py-[12px] lg:py-[12px] text-[14px] leading-[18px] font-medium box-border rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white hover:text-[#08090D] uppercase gap-[10px]"
              href={buttonLink}
            >
              <span className="font-medium sm:leading-[18px] text-[14px]">
                {buttonText}
              </span>
            <svg
              width={16}
              height={16}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_433_8)">
                <path
                  d="M3.125 10H16.875"
                  stroke="#08090D"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.25 4.375L17.875 10L12.25 15.625"
                  stroke="#08090D"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </g>
              <defs>
                <clipPath id="clip0_433_8">
                  <rect width={20} height={20} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
        )}
      </div>
    </div>
  );
}
