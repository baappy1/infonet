import React from "react";
import SolutionsCard from "./SolutionsCard";

const solutionsData = [
  {
    id: 1,
    title: "Fuel Commander",
    description:
      "Fully integrated EMV Pay-at-the-Pump solution for self-serve fueling. Monitor, authorize, and manage all pumps remotely while maintaining compliance and speed.",
    image: "/assets/solutions/fuel.png", // replace with actual path
  },
  {
    id: 2,
    title: "Custom Software",
    description:
      "Tailored software solutions for reporting, site management, e-commerce, RFID, and more. Build the tools that fit your unique operational needs.",
    image: "/assets/solutions/custom.png", // replace with actual path
  },
];

const MoreSolutions = () => {
  return (
    <section className="bg-[#F8F8F3]">
      <div className="container mx-auto pb-62.5 px-5">
        <div className="top-title mb-5 text-[#08090D]">[ More solutions ]</div>
        <h2 className="font-manrope text-[28px] mb-5 leading-7.5 lg:text-[40px] lg:leading-12.5 max-w-162.25 text-[#08090D]">
          Power Your Operations with Our Complete Suite
        </h2>
        <p className="font-manrope text-base leading-5.5 font-medium text-[#08090D]/80 tracking-[0px] max-w-162.25">
          Whether you need point-of-sale systems, pay-at-the-pump solutions, or
          custom software integrations, InfoNet provides a complete suite of
          tools to optimize your fuel.
        </p>

        {/* image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-2 mt-20">
          {solutionsData.map((item) => (
            <SolutionsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreSolutions;
