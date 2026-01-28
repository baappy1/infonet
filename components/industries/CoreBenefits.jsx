import React from "react";
import BenefitCard from "./BenefitCard";

export const coreBenefits = [
  {
    id: 1,
    title: "Fast & Accurate Transactions",
    description: "Speed up in-store and frequent operations",
    icon: "/assets/industries/transactions.png",
  },
  {
    id: 2,
    title: "Inventory & Wet-Stock Management",
    description: "Track fuel and product accurately to reduce shrink",
    icon: "/assets/industries/inventory.png",
  },
  {
    id: 3,
    title: "Multi-Site Management",
    description:
      "Control pricing, reporting, and inventory across all locations",
    icon: "/assets/industries/multi-site.png",
  },
  {
    id: 4,
    title: "Advanced Reporting & Analytics",
    description: "Gain actionable insights to make smarter business decisions",
    icon: "/assets/industries/analytics.png",
  },
];

const CoreBenefits = () => {
  return (
    <section className="px-2.5">
      <div className="bg-[#083630] rounded-lg">
        <div className=" py-25 lg:py-38.5">
          <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 mb-25 text-center text-white">
            Core Benefits We Provide to This Industry
          </h2>
          {/* cards */}

          <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5.5 md:grid-cols-2 lg:grid-cols-4">
              {coreBenefits.map((item) => (
                <BenefitCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreBenefits;
