"use client";

import { motion, useReducedMotion } from "motion/react";
import WhyChooseCard from "@/components/Home/WhyChooseCard";

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

export default function WhyChoose() {
  const shouldReduce = useReducedMotion();

  // Detect mobile
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  return (
    <div className="2xl:pt-[24.15vh] 2xl:pb-[24vh] lg:pt-[120px] lg:pb-[120px] pt-[90px] pb-[90px] bg-[#F8F8F3]">
      <div className="container lg:pr-[0] lg:pl-[0] pr-[20px] pl-[20px]">
        
        {/* Header Section */}
        <motion.div
          className="text-center"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={shouldReduce ? {} : itemVariants} className="top-title mb-[20px]">
            [ Why Choose Us ]
          </motion.div>

          <motion.div variants={shouldReduce ? {} : itemVariants} className="font-manrope lg:mb-[0px] text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px]">
            Why Industry Leaders Trust InfoNet
          </motion.div>

          <motion.div variants={shouldReduce ? {} : itemVariants} className="mt-[20px] font-manrope font-medium text-[14px] mx-auto max-w-[649px] leading-[20px] lg:text-[16px] lg:leading-[22px] opacity-80">
            From seamless transactions to fully integrated management systems, InfoNet delivers technology solutions that help fuel retailers, convenience stores, and unattended sites operate efficiently.
          </motion.div>
        </motion.div>

        {/* Animated Cards Grid */}
        <motion.div
          className="grid gap-2 mt-[40px] lg:mt-[100px] 
                     grid-cols-1 sm:grid-cols-1 md:grid-cols-3" // mobile: 1 column, desktop: 3 columns
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Left Column */}
          <div className="flex flex-col gap-[8px]">
            {Array.from({ length: 2 }).map((_, i) => (
              <motion.div key={i} variants={shouldReduce ? {} : itemVariants}>
                <WhyChooseCard />
              </motion.div>
            ))}
          </div>

          {/* Middle Column */}
          <div className="flex flex-col gap-[8px]">
            <motion.div className="h-full" variants={shouldReduce ? {} : itemVariants}>
              <WhyChooseCard />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[8px]">
            {Array.from({ length: 2 }).map((_, i) => (
              <motion.div key={i} variants={shouldReduce ? {} : itemVariants}>
                <WhyChooseCard />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
