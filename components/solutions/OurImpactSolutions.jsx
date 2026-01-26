"use client";

import { motion, useReducedMotion } from "motion/react";
import OurImpactCard from "@/components/About/OurImpactCard";
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

export default function OurImpactSolutions() {
  const shouldReduce = useReducedMotion();

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  return (
    <div className="bg-[#F8F8F3]">
      <div className="container mx-auto pt-55">
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
            className="top-title mb-5"
          >
            [ Our Impact ]
          </motion.div>

          <motion.div
            variants={shouldReduce ? {} : itemVariants}
            className="font-manrope lg:mb-0 text-[28px] mx-auto max-w-162.25 leading-7.5 lg:text-[40px] lg:leading-12.5"
          >
            Powering Retail & Fuel Operations Across North America
          </motion.div>

          <motion.div
            variants={shouldReduce ? {} : itemVariants}
            className="mt-5 font-manrope font-medium text-[14px] mx-auto max-w-162.25 leading-5 lg:text-[16px] lg:leading-5.5 opacity-80"
          >
            A snapshot of how Infonet Technology keeps businesses running
            smoothly, efficiently, and reliably — every single day.
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 mt-15 mx-auto px-5"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            className="w-full sm:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]"
            variants={shouldReduce ? {} : itemVariants}
          >
            <OurImpactCard
              cardTitle="92%"
              cardDescription="Improvement in overall charger uptime within the first three months"
            />
          </motion.div>

          <motion.div
            className="w-full sm:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]"
            variants={shouldReduce ? {} : itemVariants}
          >
            <OurImpactCard
              cardTitle="37%"
              cardDescription="Reduction in customer-reported charging issues"
            />
          </motion.div>

          <motion.div
            className="w-full sm:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]"
            variants={shouldReduce ? {} : itemVariants}
          >
            <OurImpactCard
              cardTitle="42%"
              cardDescription="Increase in repeat charging sessions across upgraded stations"
            />
          </motion.div>

          <motion.div
            className="w-full sm:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]"
            variants={shouldReduce ? {} : itemVariants}
          >
            <OurImpactCard
              cardTitle="3x"
              cardDescription="Faster average charging session start time"
            />
          </motion.div>
        </motion.div>

        <div className="flex justify-center mt-12 sm:mt-17.5">
          <Link
            className="inline-flex lg:px-4 px-4 py-3 lg:py-3 text-[14px] leading-4.5 font-medium box-border rounded-sm bg-[#EBFF3A] transition duration-150 hover:bg-white hover:text-[#08090D] uppercase gap-2.5"
            href="/contact"
          >
            <span className="font-medium  sm:leading-4.5 text-[14px]">
              explore our solutions
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
