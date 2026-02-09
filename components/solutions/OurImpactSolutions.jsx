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

const DEFAULT_TOP_TITLE = "[ Our Impact ]";
const DEFAULT_TITLE = "Powering Retail & Fuel Operations Across North America";
const DEFAULT_DESCRIPTION =
  "A snapshot of how Infonet Technology keeps businesses running smoothly, efficiently, and reliably — every single day.";
const DEFAULT_IMPACT_ITEMS = [
  {
    cardTitle: "92%",
    cardDescription:
      "Improvement in overall charger uptime within the first three months",
  },
  {
    cardTitle: "37%",
    cardDescription: "Reduction in customer-reported charging issues",
  },
  {
    cardTitle: "42%",
    cardDescription:
      "Increase in repeat charging sessions across upgraded stations",
  },
  {
    cardTitle: "3x",
    cardDescription: "Faster average charging session start time",
  },
];
const DEFAULT_BUTTON_TEXT = "explore our solutions";
const DEFAULT_BUTTON_LINK = "/contact";

export default function OurImpactSolutions({
  topTitle = DEFAULT_TOP_TITLE,
  title = DEFAULT_TITLE,
  shortDescription = DEFAULT_DESCRIPTION,
  impactItems = DEFAULT_IMPACT_ITEMS,
  buttonText = DEFAULT_BUTTON_TEXT,
  buttonLink = DEFAULT_BUTTON_LINK,
}) {
  const shouldReduce = useReducedMotion();

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  const items =
    Array.isArray(impactItems) && impactItems.length > 0
      ? impactItems.map((i) => ({
          cardTitle: i.impact_title ?? i.cardTitle,
          cardDescription: i.impact_description ?? i.cardDescription,
        }))
      : DEFAULT_IMPACT_ITEMS;

  return (
    <div className="bg-[#F8F8F3]">
      <div className="container lg:pr-[0] lg:pl-[0] pr-[20px] pl-[20px] pt-22.5 lg:pt-55">
        {/* Header Section */}
        <motion.div
          className="text-center"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            variants={shouldReduce ? {} : itemVariants}
            className="top-title mb-[20px]"
          >
            {topTitle}
          </motion.div>

          <motion.div
            variants={shouldReduce ? {} : itemVariants}
            className="font-manrope lg:mb-[0px] text-[28px] mx-auto max-w-[649px] leading-[30px] lg:text-[40px] lg:leading-[50px]"
          >
            {title}
          </motion.div>

          <motion.div
            variants={shouldReduce ? {} : itemVariants}
            className="mt-5 font-manrope font-medium text-[14px] mx-auto max-w-162.25 leading-5 lg:text-[16px] lg:leading-5.5 opacity-80"
          >
            {shortDescription}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 mt-15 mx-auto max-w-[990px]"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]"
              variants={shouldReduce ? {} : itemVariants}
            >
              <OurImpactCard
                cardTitle={item.cardTitle}
                cardDescription={item.cardDescription}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-12 sm:mt-17.5">
          <Link
            className="inline-flex lg:px-[16px] px-[16px] py-[12px] lg:py-[12px] text-[14px] leading-[18px] font-medium box-border rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white hover:text-[#08090D] uppercase gap-[10px]"
            href={buttonLink || "/contact"}
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
      </div>
    </div>
  );
}
