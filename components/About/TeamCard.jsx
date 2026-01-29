import Image from "next/image";
import React from "react";

const TeamCard = ({ team }) => {
  const { name, title, image } = team;

  return (
    <div className="flex flex-col">
      {/* <Image src={imageSrc} alt={title} fill /> */}
      <div className="relative w-full  aspect-3/4 ">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover   rounded-lg"
        />
      </div>
      <p className="mt-8 font-bold text-base uppercase font-jetbrains-mono leading-snug text-[#08090D] ">
        {name}
      </p>

      <p className="font-jetbrains-mono top-title text-[#08090D] mt-2">
        {title}
      </p>
    </div>
  );
};

export default TeamCard;
