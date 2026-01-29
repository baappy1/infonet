"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Custom arrow component
const AccordionArrow = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="accordion-arrow transition-transform duration-300 data-[state=open]:rotate-180"
  >
    <g clipPath="url(#clip0_100_1245)">
      <path
        d="M8 2.5L8 13.5"
        stroke="#08090D"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 9.80005L8 14.3L3.5 9.80005"
        stroke="#08090D"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </g>
    <defs>
      <clipPath id="clip0_100_1245">
        <rect
          width={16}
          height={16}
          fill="white"
          transform="matrix(0 1 -1 0 16 0)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default function HomeSolution() {
  return (
    <div className="solutions bg-[#F8F8F3] pt-[30px] lg:pt-[100px] pb-[90px] lg:pb-[220px]">
      <div className="container mx-auto 2xl:px-[0] px-[20px]">
        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[50px] items-start">
          {/* Left Image */}
          <div className="hidden lg:block w-full lg:w-[50.85%]">
            <Image
              width={671}
              height={536}
              className="w-full object-cover rounded-[8px]"
              src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/home-solution.png"
              alt="Technology Tailored for Fuel & Retail Operations"
              style={{ width: "auto", height: "auto" }}
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[40.7%]">
            <div className="top-title mb-[20px]">[ Products & Solutions ]</div>
            <h2 className="font-manrope text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px] pb-[40px] lg:pb-[30px]">
              Technology Tailored for Fuel & Retail Operations
            </h2>

            <Accordion
              type="single"
              collapsible
              className="w-full native-accordion"
              defaultValue="item-1"
            >
              <AccordionItem
                value="item-1"
                className="border-t border-dashed border-b-0 border-[#08090D33]"
              >
                <AccordionTrigger className="pt-5 pb-6 flex justify-between items-center leading-4.5 lg:leading-5.5 uppercase text-[14px] lg:text-[16px]">
                  C-Store Commander
                  <AccordionArrow />
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-[#08090D] w-full font-manrope">
                  An all-in-one touch-screen Point-of-Sale system built for
                  convenience stores and fuel retail. C-Store Commander
                  seamlessly connects your front counter to your back office,
                  ensuring fast transactions, accurate inventory control, and
                  real-time reporting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border-t border-dashed border-b-0 border-[#08090D33]"
              >
                <AccordionTrigger className="pt-5 pb-6 flex justify-between items-center leading-4.5 lg:leading-5.5 uppercase text-[14px] lg:text-[16px]">
                  Unattended Fueling
                  <AccordionArrow />
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-[#08090D] w-full font-manrope">
                  An all-in-one touch-screen Point-of-Sale system built for
                  convenience stores and fuel retail. C-Store Commander
                  seamlessly connects your front counter to your back office,
                  ensuring fast transactions, accurate inventory control, and
                  real-time reporting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border-t border-dashed border-b-0 border-[#08090D33]"
              >
                <AccordionTrigger className="pt-5 pb-6 flex justify-between items-center leading-4.5 lg:leading-5.5 uppercase text-[14px] lg:text-[16px]">
                  Custom Software
                  <AccordionArrow />
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-[#08090D] w-full font-manrope">
                  An all-in-one touch-screen Point-of-Sale system built for
                  convenience stores and fuel retail. C-Store Commander
                  seamlessly connects your front counter to your back office,
                  ensuring fast transactions, accurate inventory control, and
                  real-time reporting.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Book Demo Button */}
            <Link
              href="/contact"
              className="inline-flex font-medium rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white uppercase gap-[10px] px-[16px] py-[12px] mt-[24px] lg:mt-[20px]"
            >
              <span className="text-[14px] leading-[18px]">book a demo</span>
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_505_137)">
                  <path
                    d="M2.5 8H13.5"
                    stroke="#08090D"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.79999 3.5L14.3 8L9.79999 12.5"
                    stroke="#08090D"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_505_137">
                    <rect width={16} height={16} fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>

          <div className="block lg:hidden w-full lg:w-[50.85%]">
            <Image
              width={671}
              height={536}
              className="w-full object-cover rounded-[8px]"
              src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/home-solution.png"
              alt="Technology Tailored for Fuel & Retail Operations"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
