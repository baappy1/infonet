"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FaqCard({
  itemIndex,
  openAccordion,
  AccordionArrowPlus,
  AccordionArrowMinus,
  title,
  content,
}) {
  const isOpen = openAccordion === `item-${itemIndex}`;

  return (
    <AccordionItem
      value={`item-${itemIndex}`}
      className={`accordion-arrow-remove relative rounded-[9px] border border-[#3B3B331A] last:mb-0 mb-4 p-6 transition
        ${isOpen ? "activated-accordion" : ""}`}
    >
      <AccordionTrigger className="flex justify-between items-center text-left">
        <span className="text-[20px] leading-7 font-manrope font-medium">
          {title}
        </span>

        {isOpen ? <AccordionArrowMinus /> : <AccordionArrowPlus />}
      </AccordionTrigger>

      <AccordionContent className="mt-4 p-0 text-[#08090D] font-manrope text-[16px] leading-5.2 font-medium">
        {content}
      </AccordionContent>
    </AccordionItem>
  );
}
