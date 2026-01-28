import Image from "next/image";
import React from "react";

const BlogCard = () => {
  return (
    <div className="flex flex-col h-full lg:flex-row gap-2  lg:h-134 items-start">
      <div className="bg-white h-full w-full p-5 xl:p-17.5  rounded-lg">
        <div className="flex items-center gap-2.5">
          <p>News & Blog</p>{" "}
          <Image
            src="/assets/newsandblog/eclipse.svg"
            width={4}
            height={4}
            alt="icon"
          />{" "}
          <p>Nov 03, 2025</p>{" "}
        </div>
        <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 text-[#020617] w-full max-w-158.5 mt-7.5">
          Infonet Technology launches next-gen EMV Pay-at-the-Pump module
        </h2>
        <p className="font-manrope font-medium text-sm leading-5 text-[#08090D]/80 mt-4 max-w-158.5">
          An all-in-one touch-screen Point-of-Sale system built for convenience
          stores and fuel retail. C-Store Commander seamlessly connects your
          front counter to your back office, ensuring fast transactions,
          accurate inventory control, and real-time reporting.
        </p>

        <button className="flex items-center gap-2.5 font-jetbrains font-medium text-sm leading-4.5 tracking-[0px] uppercase pt-7.5">
          read more{" "}
          <Image
            src="/assets/newsandblog/right-arrow.svg"
            width={16}
            height={16}
            alt="right-nav"
          />
        </button>
      </div>
      <div className="relative  w-full h-full sm:h-80 lg:h-full xl:w-134 aspect-square ">
        <Image
          src="/assets/newsandblog/pump.png"
          fill
          alt="image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default BlogCard;
