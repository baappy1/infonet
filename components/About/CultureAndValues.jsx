import Image from "next/image";
import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";

const accordionData = [
  {
    id: "integrity",
    title: "INTEGRITY",
    content:
      "An all-in-one touch-screen Point-of-Sale system built for convenience stores and fuel retail. C-Store Commander seamlessly connects your front counter to your back office, ensuring fast transactions, accurate inventory control, and real-time reporting.",
  },
  {
    id: "collaboration",
    title: "COLLABORATION",
    content:
      "We believe in the power of teamwork and open communication. Our collaborative approach brings together diverse perspectives and expertise to solve complex challenges. By fostering a culture of shared knowledge and mutual support, we create innovative solutions that drive success for our clients and partners.",
  },
  {
    id: "customer-focus",
    title: "CUSTOMER FOCUS",
    content:
      "Our customers are at the heart of everything we do. We are committed to understanding their unique needs and delivering tailored solutions that exceed expectations. Through continuous feedback, responsive support, and a dedication to quality, we build lasting relationships and ensure our clients achieve their business goals.",
  },
];

// Custom Accordion Trigger with custom icon
const CustomAccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "w-full flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>img]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      {/* Change this icon to any lucide-react icon you want */}
      <Image
        src="/assets/about/arrow-down.svg"
        alt="down-arrow"
        width={16}
        height={16}
      />
    </AccordionPrimitive.Trigger>
  ),
);
CustomAccordionTrigger.displayName = "CustomAccordionTrigger";

const CultureAndValues = () => {
  return (
    <section className="bg-[#FFFFFF] ">
      <div className="container mx-auto py-22.5 lg:py-55 px-5">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12.5">
          <div className="relative w-full  lg:max-w-167.75  h-100 md:h-134 ">
            <Image
              src="/assets/about/culture-2.jpg"
              alt="image"
              fill
              className="w-full h-full object-cover rounded-sm"
            />
          </div>

          <div className="flex flex-col w-full lg:max-w-134.25">
            <div className="top-title mb-5">[ Culture & Values ]</div>
            <h2 className="font-manrope text-[28px]  leading-7.5 lg:text-[40px] lg:leading-12.5 ">
              Driven by Collaboration and Innovation
            </h2>
            {/* accordion */}
            <div className="mt-7.5 ">
              <Accordion type="single" collapsible className="w-full">
                {accordionData.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border-b border-[#08090D]/20 border-dashed first:border-t! last:border-b! "
                  >
                    <CustomAccordionTrigger className="text-left font-mono text-base leading-5.5 uppercase text-[#08090D] py-5">
                      {item.title}
                    </CustomAccordionTrigger>
                    <AccordionContent className="text-sm font-manrope text-[#08090D]/80">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <button className="self-start px-4 py-3 bg-[#EBFF3A] flex items-center gap-2.5 mt-10 rounded-sm">
              <p className="font-mono font-medium text-sm leading-4.5 uppercase text-[#08090D]">
                Explore Careers
              </p>{" "}
              <Image
                src="/assets/about/arrow-right.svg"
                width={16}
                height={16}
                alt="right-arrow"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureAndValues;
