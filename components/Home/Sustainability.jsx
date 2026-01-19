"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export default function Sustainability() {
  const shouldReduce = useReducedMotion();

  // Variants for parent container (stagger children)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // each child animates 0.15s after previous
      },
    },
  };

  // Variants for each element
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <div className="banner bg-[#F8F8F3] pt-[10px] pl-[10px] pr-[10px] h-screen">
      <div
        className="h-full rounded-[8px]"
        style={{
          backgroundImage: `url('https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/2224526_Car_Refuel_3840x2160-2.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container h-full mx-auto pt-[10px] lg:pt-[120px] pb-[10px] lg:pb-[120px] pl-[10px] pr-[10px] lg:pl-[0] lg:pr-[0]">
          <div className="flex flex-wrap justify-end">
            <div className="w-full flex flex-row justify-end">
              <div className='p-[20px] lg:p-[30px] rounded-[8px] bg-[#08090D]/10 backdrop-blur-[30px] w-full xl:w-[536px]'>
                
                {/* Parent Motion container for stagger */}
                <motion.div
                  initial="hidden"
                  whileInView={shouldReduce ? {} : "visible"}
                  variants={shouldReduce ? {} : containerVariants}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Title */}
                  <motion.div 
                    variants={shouldReduce ? {} : itemVariants} 
                    className="top-title text-white mb-[20px]"
                  >
                    [ Sustainability ]
                  </motion.div>

                  {/* Heading */}
                  <motion.div 
                    variants={shouldReduce ? {} : itemVariants} 
                    className="heading-h1 text-white font-normal mb-[20px] text-[36px] leading-[40px] xl:text-[50px] xl:leading-[60px] font-manrope"
                  >
                    Smarter Systems for a Greener Future
                  </motion.div>

                  {/* Paragraph */}
                  <motion.p 
                    variants={shouldReduce ? {} : itemVariants} 
                    className="text-white font-medium font-manrope mb-[20px] text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px]"
                  >
                    From energy-efficient fuel management to reduced paper and resource use, our solutions make sustainability simple for your business.
                  </motion.p>

                  {/* Button */}
                  <motion.div variants={shouldReduce ? {} : itemVariants}>
                    <Link
                      href=""
                      className="inline-flex lg:px-[24px] px-[16px] py-[12px] text-[14px] leading-[18px] lg:text-[16px] lg:leading-[22px] lg:py-[14px] font-medium box-border rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white hover:text-[#08090D] uppercase gap-[10px]"
                    >
                      <span>read more</span>
                      <svg
                        className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_456_280)">
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
                          <clipPath id="clip0_456_280">
                            <rect width={20} height={20} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
