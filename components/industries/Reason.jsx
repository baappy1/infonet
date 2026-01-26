import React from "react";
import CaseCard from "../solutions/CaseCard";

const useCasesData = [
  {
    id: 1,
    title: "Complex Operations Simplified",
    description:
      "We unify forecourt, store, and back-office operations in one platform.",
    icon: "/assets/industries/complex.svg", // replace with your icon component or SVG
  },
  {
    id: 2,
    title: "Compliance & Security Expertise",
    description:
      "EMV-ready and PCI-compliant solutions reduce regulatory risk.",
    icon: "/assets/industries/complex.svg",
  },
  {
    id: 3,
    title: "High-Volume Reliability",
    description:
      "Systems designed to handle hundreds of transactions per hour without downtime.",
    icon: "/assets/industries/complex.svg",
  },
  {
    id: 4,
    title: "Data-Driven Insights",
    description:
      "Detailed reporting helps operators make smarter, profit-focused decisions.",
    icon: "/assets/industries/complex.svg",
  },
];

const Reason = () => {
  return (
    <section className="bg-[#f8f8f3]">
      <div className="container mx-auto py-10 lg:pb-55 pt-25 px-5">
        <div className="top-title mb-5">[ reason ]</div>
        <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 mb-5 max-w-162.25">
          Why Retail Gas Stations Are Our Priority
        </h2>
        <p className="font-manrope text-[14px] lg:text-[16px] leading-5 lg:leading-5.5 font-medium max-w-162.25">
          Retail gas stations are a critical part of the convenience and fuel
          ecosystem. With high transaction volumes, complex compliance
          requirements, and the need for reliable forecourt operations, this
          industry demands technology that is fast, accurate, and scalable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-20 gap-10">
          {/* use case cards */}
          {useCasesData.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reason;
