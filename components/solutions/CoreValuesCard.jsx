import Image from "next/image";
import React from "react";

const CoreValuesCard = ({ item }) => {
  return (
    <div className="bg-white p-5 lg:p-7.5 rounded-lg">
      <div className="bg-[#EBFF3A] p-3.25 w-15 rounded-lg">
        <Image alt="icon" width={34} height={34} src={item.icon} />
      </div>

      <h4 className="font-manrope text-2xl leading-7.5 text-[#08090D] mt-7.5">
        {item.title}
      </h4>

      <p className="font-manrope font-medium text-sm leading-5 text-[#08090D]/80 mt-2.5">
        {item.description}
      </p>
    </div>
  );
};

export default CoreValuesCard;
