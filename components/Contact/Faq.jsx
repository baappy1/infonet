"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import FaqCard from "./FaqCard";
import { Accordion } from "@/components/ui/accordion";

/* Plus Icon */
const AccordionArrowPlus = () => (
  <svg className="plus-arrow-accordion" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11 5H13V11H19V13H13V19H11V13H5V11H11V5Z" fill="#08090D" />
  </svg>
);

/* Minus Icon */
const AccordionArrowMinus = () => (
  <svg className="minus-arrow-accordion" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M5 11H19V13H5V11Z" fill="#08090D" />
  </svg>
);

export default function Faq() {
  const shouldReduce = useReducedMotion();
  const [openAccordion, setOpenAccordion] = useState(null); // ✅ no default open

  return (
    <div className="bg-[#F8F8F3] pt-25 lg:pt-55 pb-17 lg:pb-30">
      <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">

        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="top-title mb-5">[ faq ]</div>
          <h2 className="font-manrope text-[28px] lg:text-[40px]">
            Have questions before getting in touch?
          </h2>
          <p className="mt-5 font-manrope opacity-80 max-w-162.5 mx-auto">
            We’ve gathered answers to the most common inquiries about our products,
            integrations, and support to help you find what you need fast.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="mt-20 max-w-227.5 mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion
            type="single"
            collapsible
            value={openAccordion}
            onValueChange={(value) => setOpenAccordion(value)}
            className="border-b rounded-[9px] border-[#3B3B331A]"
          >
            <FaqCard
              itemIndex={1}
              openAccordion={openAccordion}
              AccordionArrowPlus={AccordionArrowPlus}
              AccordionArrowMinus={AccordionArrowMinus}
              title="What industries does InfoNet serve?"
              content="InfoNet provides software and automation solutions for retail fuel stations, convenience stores, unattended fueling sites, fleet fueling operations, and First Nations retail sites across North America."
            />

            <FaqCard
              itemIndex={2}
              openAccordion={openAccordion}
              AccordionArrowPlus={AccordionArrowPlus}
              AccordionArrowMinus={AccordionArrowMinus}
              title="How can I request a product demo?"
              content="You can request a demo by filling out the contact form on our website. Our team will reach out shortly."
            />

            <FaqCard
              itemIndex={3}
              openAccordion={openAccordion}
              AccordionArrowPlus={AccordionArrowPlus}
              AccordionArrowMinus={AccordionArrowMinus}
              title="Is technical support available 24/7?"
              content="Yes, InfoNet offers 24/7 technical support to ensure your operations run smoothly."
            />
            <FaqCard
              itemIndex={4}
              openAccordion={openAccordion}
              AccordionArrowPlus={AccordionArrowPlus}
              AccordionArrowMinus={AccordionArrowMinus}
              title="Can InfoNet integrate with my existing POS or fuel management system?"
              content="Yes, InfoNet offers 24/7 technical support to ensure your operations run smoothly."
            />
            <FaqCard
              itemIndex={5}
              openAccordion={openAccordion}
              AccordionArrowPlus={AccordionArrowPlus}
              AccordionArrowMinus={AccordionArrowMinus}
              title="Where is InfoNet located?"
              content="Yes, InfoNet offers 24/7 technical support to ensure your operations run smoothly."
            />
            <FaqCard
              itemIndex={6}
              openAccordion={openAccordion}
              AccordionArrowPlus={AccordionArrowPlus}
              AccordionArrowMinus={AccordionArrowMinus}
              title="How soon will I get a response after submitting a contact form?"
              content="Yes, InfoNet offers 24/7 technical support to ensure your operations run smoothly."
            />
          </Accordion>
        </motion.div>

      </div>
    </div>
  );
}
