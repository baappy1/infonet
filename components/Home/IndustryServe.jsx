"use client";

import { motion, useReducedMotion } from "motion/react";
import ServeCard from "./ServeCard";

const containerVariants = {
  hidden: {},
  visible: (isMobile) => ({
    transition: {
      staggerChildren: isMobile ? 0 : 0.15, // stagger only on desktop
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function IndustryServe() {
  const shouldReduce = useReducedMotion();


  return (
    <div className="2xl:pt-[24.15vh] 2xl:pb-[24vh] lg:pt-[120px] lg:pb-[120px] pt-[90px] pb-[90px] bg-white">
      <div className="container lg:pr-[0] lg:pl-[0] pr-[20px] pl-[20px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end">
          <div className="w-full lg:w-[41.7%]">
            <div className="top-title mb-[20px]">[ industries we serve ]</div>
            <div className="font-manrope mb-[20px] lg:mb-[0px] text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px]">
              Industry-Specific Solutions You Can Trust
            </div>
          </div>
          <div className="w-full lg:w-[41.7%] font-manrope font-medium text-[14px] leading-[20px] lg:text-[16px] lg:leading-[22px] opacity-80">
            Custom software and systems built to meet the unique needs of fuel, retail, and fleet businesses across North America.
          </div>
        </div>

        {/* Desktop Grid */}
        <motion.div
          className="hidden lg:flex flex-wrap gap-x-[44px] gap-y-[78px] mt-[40px] lg:mt-[120px]"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={false} // desktop = not mobile
          viewport={{ once: true, amount: 0.4 }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              variants={shouldReduce ? {} : itemVariants}
              className="w-[calc((100%-132px)/3)] flex flex-col"
            >
              <ServeCard />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Grid */}
        <motion.div
          className="flex lg:hidden flex-wrap gap-x-[44px] gap-y-[40px] mt-[40px]"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={true} // mobile
          viewport={{ once: true, amount: 0.05 }} // triggers early
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              variants={shouldReduce ? {} : itemVariants}
              className="w-full sm:w-[calc((100%-88px)/2)] flex flex-col"
            >
              <ServeCard />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
