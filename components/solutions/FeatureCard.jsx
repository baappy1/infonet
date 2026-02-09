"use client";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
const FeatureCard = ({ item, i }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: i * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="flex flex-col p-5 sm:p-7.5 bg-white rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
    >
      <Image src={item.icon} width={32} height={32} alt={item.title} />

      <p className="font-manrope font-medium text-base  md:text-lg leading-6.5 text-[#08090D] mt-2.5">
        {item.title}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
