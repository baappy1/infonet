"use client";

import { motion, useReducedMotion } from "motion/react";
import OurValuesCard from "./OurValuesCard";
import Image from "next/image";

const Items = [
  {
    id: 1,
    image: "assets/about/why-choose-icon.svg",
    title: "Innovation",
    description:
      "We push boundaries to create smarter, more efficient, and future-ready technologies for all operations.",
  },
  {
    id: 2,
    image: "assets/about/icon/01.svg",
    title: "Transparency",
    description:
      "We communicate openly, offer honest guidance, and ensure pricing and processes are always clear.",
  },
  {
    id: 3,
    image: "assets/about/icon/02.svg",
    title: "Trust",
    description:
      "Our systems and service inspire confidence delivering accuracy, uptime, and reliability when it matters most.",
  },
  {
    id: 4,
    image: "assets/about/icon/03.svg",
    title: "Growth",
    description:
      "Our solutions are built to scale, helping businesses expand seamlessly while we evolve with their needs.",
  }
];


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

export default function OurValues() {
  const shouldReduce = useReducedMotion();

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  return (
    <div className="2xl:pt-55 2xl:pb-55 lg:pt-30 lg:pb-30 pt-22.5 pb-22.5 bg-[#F8F8F3]">
      <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
        {/* Header Section */}
        <motion.div
          className="w-162.2"
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
            [ CORE VALUES ]
          </motion.div>

          <motion.div
            variants={shouldReduce ? {} : itemVariants}
            className="font-manrope lg:mb-0 text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 max-w-162.25"
          >
            The Principles That Drive Every Innovation, Every Solution.
          </motion.div>

          <motion.div
            variants={shouldReduce ? {} : itemVariants}
            className="mt-5 font-manrope font-medium text-[14px] leading-5 lg:text-[16px] lg:leading-5.5 opacity-80 max-w-162.25"
          >
            At Infonet, our values shape how we build technology, how we support
            clients, and how we grow alongside the industries we serve.
          </motion.div>
        </motion.div>

        {/* Animated Cards Grid */}
        <motion.div
          className="mt-10 lg:mt-25 flex flex-col lg:flex-row gap-2"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Left Column */}
          <div className="flex flex-wrap w-full lg:w-[calc(64.5%-8px)] gap-2">
            {Items.map((item) => (
            <motion.div
                variants={shouldReduce ? {} : itemVariants}
                className="w-full lg:w-[calc(50%-4px)]"
              >
                <OurValuesCard 
                  cardImage={item.image}
                  title={item.title}
                  description={item.description}
                  />
              </motion.div>
               ))}
          </div>

          <div
            className="relative p-7.5 bg-white h-127 w-full  lg:w-[34.5%] rounded-lg"
            style={{
              backgroundImage: `url('assets/about/about.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Image
              width={60}
              height={60}
              className="absolute rounded-[8px]"
              src="assets/about/icon-02.svg"
              alt="Support icon"
            />

            <div className="absolute w-full bottom-0 left-0 p-7.5">
              <h3 className="text-[24px] leading-7.5 text-white mb-2.5 font-manrope font-normal">
                Support
              </h3>
              <p className="font-manrope text-white text-[14px] leading-5 font-medium">
                With 24/7 expert assistance, we’re always there to keep your
                locations running without interruption.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
