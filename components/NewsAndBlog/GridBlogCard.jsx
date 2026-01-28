import Image from "next/image";
import React from "react";

const GridBlogCard = ({ item }) => {
  return (
    <div className="bg-white p-4">
      <div className="relative h-[270px] ">
        <Image
          src={item.image}
          alt="image"
          fill
          className="object-cover rounded-lg "
        />
      </div>

      <div className="mt-5 flex items-center gap-6">
        <span className="text-xs leading-[100%] uppercase font-jetbrains text-[#08090D] tracking-[0px]">
          {item.category}
        </span>

        <span className="text-xs leading-[100%] uppercase font-jetbrains text-[#08090D] tracking-[0px]">
          {item.date}
        </span>
      </div>

      <p className="font-manrope mt-5 font-medium text-xl leading-7 tracking-[0px] text-[#08090D] max-w-98.25">
        {item.title}
      </p>

      <button className="flex justify-between bg-[#F8F8F3] mt-5 items-center uppercase font-jetbrains rounded-sm px-4 py-3 font-medium text-sm leading-4.5 text-[#08090D] w-full">
        <span>read more</span>{" "}
        <Image
          src="/assets/newsandblog/right-arrow.svg"
          width={16}
          height={16}
          alt="right-nav"
        />
      </button>
    </div>
  );
};

export default GridBlogCard;
