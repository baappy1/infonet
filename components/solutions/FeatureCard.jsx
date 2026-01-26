import Image from "next/image";
import React from "react";

const FeatureCard = ({ item }) => {
  return (
    <div className="flex flex-col p-5 sm:p-7.5 bg-white rounded-lg">
      <Image src={item.icon} width={32} height={32} alt={item.title} />

      <p className="font-manrope font-medium text-base  md:text-lg leading-6.5 text-[#08090D] mt-2.5">
        {item.title}
      </p>
    </div>
  );
};

export default FeatureCard;
