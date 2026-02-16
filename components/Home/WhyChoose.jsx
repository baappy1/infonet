 "use client";
 
import WhyChooseCard from "@/components/Home/WhyChooseCard";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const Items = [
  {
    id: 1,
    image: "assets/about/why-choose-icon.svg",
    title: "25+ Years",
    description:
      "Delivering reliable, industry-focused solutions to fuel retailers and convenience stores across North America.",
  },
  {
    id: 2,
    image: "assets/about/icon/01.svg",
    title: "1500+ Sites Optimized",
    description:
      "Trusted to manage and streamline operations for hundreds of retail and fleet fueling locations.",
  },
  {
    id: 3,
    image: "assets/about/icon/02.svg",
    title: "1,000,000",
    description:
      "Daily Transactions Processed – Powering fast, accurate sales every day.",
  },
  {
    id: 4,
    image: "assets/about/icon/03.svg",
    title: "99.9% Uptime",
    description:
      "Ensuring your business runs smoothly around the clock with secure technology.",
  },
  {
    id: 5,
    image: "assets/about/icon/04.svg",
    title: "100% System Integration",
    description:
      "Connecting POS, pumps, loyalty, inventory, and reporting into one platform.",
  },
];

const containerVariants = {
  hidden: {},
  visible: (isMobile) => ({
    transition: {
      staggerChildren: isMobile ? 0.1 : 0.15,
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

export default function WhyChoose({
  topTitle,
  title,
  shortDescription,
  cards,
}) {
  const shouldReduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const resolvedTopTitle = topTitle || "[ Why Choose Us ]";
  const resolvedTitle = title || "Why Industry Leaders Trust InfoNet";
  const resolvedShortDescription =
    shortDescription ||
    "From seamless transactions to fully integrated management systems, InfoNet delivers technology solutions that help retailers operate efficiently.";

  const dynamicItems =
    cards && cards.length
      ? cards.map((card, idx) => ({
          id: card._id || idx + 1,
          image: card.icon,
          title: card.card_title,
          description: card.card_short_description,
        }))
      : Items;

  const leftItems = dynamicItems.slice(0, 2);
  const middleItem = dynamicItems[2] || dynamicItems[0];
  const rightItems = dynamicItems.slice(3, 5);

  return (
    <div className="2xl:pt-[24vh] 2xl:pb-[24vh] lg:pt-[120px] lg:pb-[120px] pt-[90px] pb-[90px] bg-[#F8F8F3]">
      <div className="container px-[20px] lg:px-0">

        {/* Header */}
        <motion.div
          className="text-center"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants} className="top-title mb-[20px]">
            {resolvedTopTitle}
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-manrope text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px]"
          >
            {resolvedTitle}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-[20px] font-manrope font-medium text-[14px] lg:text-[16px] max-w-[649px] mx-auto opacity-80"
          >
            {resolvedShortDescription}
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid gap-2 mt-[40px] lg:mt-[100px] grid-cols-1 md:grid-cols-3"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView={shouldReduce ? {} : "visible"}
          custom={isMobile}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Left */}
          <div className="flex flex-col gap-2">
            {leftItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <WhyChooseCard
                  cardImage={item.image}
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-[8px]">
            <motion.div
              className="h-full"
              variants={shouldReduce ? {} : itemVariants}
            >
              <WhyChooseCard
                cardImage={middleItem.image}
                title={middleItem.title}
                description={middleItem.description}
              />
            </motion.div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-2">
            {rightItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <WhyChooseCard
                  cardImage={item.image}
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
