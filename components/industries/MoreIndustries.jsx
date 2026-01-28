import React from "react";
import IndustryCard from "./IndustryCard";

const industriesData = [
  {
    id: 1,
    title: "Convenience Stores",
    description:
      "With 24/7 expert assistance, we’re always there to keep your locations running without interruption.",
    image: "/assets/industries/convenience.png", // replace with real path
  },
  {
    id: 2,
    title: "Unattended Fuel Sites",
    description:
      "With 24/7 expert assistance, we’re always there to keep your locations running without interruption.",
    image: "/assets/industries/unattended.png",
  },
  {
    id: 3,
    title: "Fleet Fueling",
    description:
      "With 24/7 expert assistance, we’re always there to keep your locations running without interruption.",
    image: "/assets/industries/fleet.png",
  },
  {
    id: 4,
    title: "First Nations Retail",
    description:
      "With 24/7 expert assistance, we’re always there to keep your locations running without interruption.",
    image: "/assets/industries/first.png",
  },
];

const MoreIndustries = () => {
  return (
    <section className="bg-[#f8f8f3]">
      <div className="container mx-auto py-25 lg:pb-55 px-5">
        <div className="top-title mb-5">[ More industries ]</div>
        <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 mb-5 max-w-162.25">
          Driving Success Across Every Industry We Serve
        </h2>
        <p className="font-manrope text-[14px] lg:text-base leading-5 lg:leading-5.5  font-medium text-[#08090D]/80 max-w-162.25">
          From retail and fuel to convenience stores and fleet operations, our
          solutions help businesses run smarter, faster, and more efficiently.
        </p>

        {/*  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-10 lg:mt-20">
          {industriesData.map((item) => (
            <IndustryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreIndustries;
