"use client";
import Image from "next/image";
import { motion } from "motion/react";
export default function IncludeCard({
  CardIcon,
  CardTitle,
  className,
  index = 0,
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: index * 0.05,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        className={`flex flex-col gap-5 p-2.5 bg-white rounded-lg ${className}`}
      >
        <Image width={60} height={60} src={CardIcon} alt="" />
        <h3 className="font-jetbrains text-[16px] leading-5.5 uppercase">
          {CardTitle}
        </h3>
      </motion.div>
    </>
  );
}
