import Image from "next/image";
import React from "react";

const CaseCard = ({ item }) => {
  return (
    <div className="flex flex-col border-r border-[#08090d]/20 border-dashed last:border-none">
      <Image src={item.icon} width={40} height={40} alt={item.title} />

      <h4 className="text-base uppercase leading-5.5 font-mono mt-5 text-[#08090D] max-w-67.5">
        {item.title}
      </h4>

      <p className="mt-5 font-manrope text-sm leading-5 text-[#08090D]/80 max-w-67.5">
        {item.description}
      </p>
    </div>
  );
};

export default CaseCard;
