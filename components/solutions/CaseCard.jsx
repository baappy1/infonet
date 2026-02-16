import Image from "next/image";
import React from "react";

const CaseCard = ({ item }) => {
  return (
    <div className="flex flex-col border-b md:border-b-0  md:border-r border-[#08090d]/20 border-dashed  xl:last:border-none pb-10 md:pb-0">
      <Image src={item.icon} width={60} height={60} alt={item.title} />

      <h4 className="text-base uppercase leading-5.5 font-mono mt-5 text-[#08090D] max-w-67.5">
        {item.title}
      </h4>

      <p className="mt-5 font-manrope font-medium text-sm leading-5 text-[#08090D]/80 max-w-67.5">
        {item.description}
      </p>
    </div>
  );
};

export default CaseCard;
