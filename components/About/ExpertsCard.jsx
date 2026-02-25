import Image from "next/image";
import React from "react";

const ExpertsCard = ({ member }) => {
  return (
    <div className="flex flex-col cursor-pointer">
      <div className="relative   w-full   aspect-square mb-8">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top  rounded-lg"
        />
      </div>
      <div className="w-full">
        <h3 className="font-mono text-base font-bold uppercase leading-5.5 text-[#08090D]">
          {member.name}
        </h3>
        <p className="font-mono text-xs text-[#08090D] leading-[100%] mt-2">
          {member.role}
        </p>
      </div>
    </div>
  );
};

export default ExpertsCard;
