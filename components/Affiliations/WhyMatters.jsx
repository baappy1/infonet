"use client";

import { motion, useReducedMotion } from "motion/react";
import WhyMattersCard from "@/components/Affiliations/WhyMattersCard";
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

export default function WhyMatters() {
  const shouldReduce = useReducedMotion();

  // Detect mobile
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  return (
    <div className="bg-[#F8F8F3] pt-12 lg:pt-25 pb-17 lg:pb-35">
      <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
        
        {/* Header Section */}
        <motion.div
          className="text-center"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={shouldReduce ? {} : itemVariants} className="top-title mb-5">
            [ Why This Matters ]
          </motion.div>

          <motion.div variants={shouldReduce ? {} : itemVariants} className="font-manrope lg:mb-0 text-[28px] mx-auto max-w-162.5 leading-7 lg:text-[40px] lg:leading-12.5">
            Our Network of Partners & Integration Ecosystem
          </motion.div>

          <motion.div variants={shouldReduce ? {} : itemVariants} className="mt-5 font-manrope font-medium text-[14px] mx-auto max-w-162.5 leading-5 lg:text-[16px] lg:leading-5.2 opacity-80">
            By combining industry affiliations with a strong technical integration network, InfoNet delivers solutions that are not only well-connected across the fuel and retail ecosystem . This allows us to :.
          </motion.div>
        </motion.div>


        <motion.div
          className="flex flex-wrap gap-10 mt-15 mx-auto max-w-247.5"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >

            <motion.div className="w-[calc(50%-30px)] lg:w-[calc(25%-30px)]" variants={shouldReduce ? {} : itemVariants}>
                <WhyMattersCard cardImage="/assets/affiliate/icon-01.svg" cardDescription="Stay at the forefront of technology trends" />
            </motion.div>

            <motion.div className="w-[calc(50%-30px)] lg:w-[calc(25%-30px)]" variants={shouldReduce ? {} : itemVariants}>
                <WhyMattersCard cardImage="/assets/affiliate/icon-01.svg" cardDescription="Stay at the forefront of technology trends" />
            </motion.div>

            <motion.div className="w-[calc(50%-30px)] lg:w-[calc(25%-30px)]" variants={shouldReduce ? {} : itemVariants}>
                <WhyMattersCard cardImage="/assets/affiliate/icon-01.svg" cardDescription="Stay at the forefront of technology trends" />
            </motion.div>

            <motion.div className="w-[calc(50%-30px)] lg:w-[calc(25%-30px)]" variants={shouldReduce ? {} : itemVariants}>
                <WhyMattersCard cardImage="/assets/affiliate/icon-01.svg" cardDescription="Stay at the forefront of technology trends" />
            </motion.div>

        </motion.div>
        
      </div>
    </div>
  );
}
