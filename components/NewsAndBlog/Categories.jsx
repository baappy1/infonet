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

export default function Categories() {
  const shouldReduce = useReducedMotion();

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  return (
    <div className="bg-[#F8F8F3]">
      <div className="max-w-[990px] mx-auto ">
        {/* Header Section */}

        <motion.div
          className="categories flex flex-wrap gap-4 mt-15 mx-auto "
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
      </div>
    </div>
  );
}
