import Image from "next/image";
import React from "react";

const SolutionsCard = ({ item }) => {
  return (
    <div className="relative">
      <div className="relative h-100 md:h-117 ">
        <Image
          src={item.image}
          fill
          className="w-full h-full object-cover rounded-lg"
          alt={item.title}
        />
      </div>

      <div className="absolute bottom-5 left-5 lg:bottom-7.5 lg:left-7.5">
        <h4 className="font-manrope text-2xl leading-7.5 text-white tracking-[0px]">
          {item.title}
        </h4>

        <p className="font-manrope font-medium text-sm mt-2.5 leading-5 tracking-[0px] max-w-149 text-white/80">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default SolutionsCard;
