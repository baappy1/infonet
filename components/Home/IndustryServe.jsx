"use client";

import { motion, useReducedMotion } from "motion/react";
import ServeCard from "./ServeCard";

const Services = [
  {
    id: 1,
    image: "/assets/service/01.png",
    title: "Retail Gas Stations",
    description:
      "Optimize every pump and every transaction with InfoNet’s integrated solutions. Reduce transaction times, increase pricing accuracy, and simplify inventory tracking.",
  },
  {
    id: 2,
    image: "/assets/service/02.png",
    title: "Convenience Stores",
    description:
      "Take control of your store operations from inventory to checkout. Enhance sales, reduce shrink, streamline staff workflows, and deliver a faster, smoother experience.",
  },
  {
    id: 3,
    image: "/assets/service/03.png",
    title: "Unattended Retail Fuel Sites",
    description:
      "Manage self-serve fueling operations reliably and securely 24/7. Monitor transactions in real-time, ensure EMV compliance, and handle unattended sites with ease.",
  },
  {
    id: 4,
    image: "/assets/service/04.png",
    title: "Fleet Fueling",
    description:
      "Seamlessly manage fleet card transactions for your company or customers. Accept all major fleet cards, track fuel usage, control spending, and generate accurate reporting.",
  },
  {
    id: 5,
    image: "/assets/service/05.png",
    title: "Private Fleet",
    description:
      "Seamlessly manage fleet card transactions for your company or customers. Accept all major fleet cards, track fuel usage, control spending, and generate accurate reporting.",
  },
  {
    id: 6,
    image: "/assets/service/06.png",
    title: "First Nations Retail",
    description:
      "Simplify the management of First Nation tax-exempt sales for fuel and tobacco. Track exemptions accurately, ensure compliance, and generate reports effortlessly.",
  },
];

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

const TARGET_COUNT = 6;

export default function IndustryServe({ header, items }) {
  const shouldReduce = useReducedMotion();
  // Use items from WP when available; fallback to static Services when empty
  const fromWp = items && items.length ? items : [];
  // Pad to 6 when we have fewer than 6 (avoid duplicates by title)
  const existingTitles = new Set(fromWp.map((i) => (i?.title || "").toLowerCase()));
  const toAdd = Services.filter((s) => !existingTitles.has((s?.title || "").toLowerCase())).slice(
    0,
    Math.max(0, TARGET_COUNT - fromWp.length)
  );
  const services = fromWp.length > 0 ? [...fromWp, ...toAdd] : Services;

  return (
    <div className="2xl:pt-[24.15vh] 2xl:pb-[24vh] lg:pt-[120px] lg:pb-[120px] pt-[90px] pb-[90px] bg-white">
      <div className="container lg:pr-[0] lg:pl-[0] pr-[20px] pl-[20px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end">
          <div className="w-full lg:w-[41.7%]">
            <div className="top-title mb-[20px]">
              {header?.topTitle || "[ industries we serve ]"}
            </div>
            <div className="font-manrope mb-[20px] lg:mb-[0px] text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px]">
              {header?.title || "Industry-Specific Solutions You Can Trust"}
            </div>
          </div>
          <div className="w-full lg:w-[41.7%] font-manrope font-medium text-[14px] leading-[20px] lg:text-[16px] lg:leading-[22px] opacity-80">
            {header?.shortDescription ||
              "Custom software and systems built to meet the unique needs of fuel, retail, and fleet businesses across North America."}
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
          {services.map((item) => (
            <motion.div
              key={item.id}
              variants={shouldReduce ? {} : itemVariants}
              className="w-[calc((100%-132px)/3)] flex flex-col"
            >
              <ServeCard
                FeatureImage={item.image}
                title={item.title}
                description={item.description}
                slug={item.slug}
              />
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
          {services.map((item) => (
            <motion.div
              key={item.id}
              variants={shouldReduce ? {} : itemVariants}
              className="w-full sm:w-[calc((100%-88px)/2)] flex flex-col"
            >
              <ServeCard
                FeatureImage={item.image}
                title={item.title}
                description={item.description}
                slug={item.slug}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}