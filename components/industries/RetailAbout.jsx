import Image from "next/image";
import Link from "next/link";
import React from "react";

const RetailAbout = () => {
  return (
    <div className="bg-[#F8F8F3] pt-22.5 lg:pt-25  pb-15  lg:pb-55">
      <div className="container mx-auto 2xl:px-0 px-5">
        <div className="flex flex-col lg:flex-row  gap-10 lg:gap-[8.45%]">
          <div className="w-full lg:w-[40.7%]">
            <div className="top-title mb-5">[ About InfoNet ]</div>
            <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 mb-5">
              Why Leading Gas Stations Trust Our Technology
            </h2>
            <p className="font-manrope text-[14px] lg:text-[16px] leading-5 lg:leading-5.5 mb-5 font-medium">
              Built for real-world complexity—trusted by operators across North
              America for reliability, compliance, and measurable ROI.
            </p>
            <Link
              href=""
              className="inline-flex font-medium  rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white uppercase gap-[10px] px-[16px] py-[12px]"
            >
              <span className="text-[14px] leading-[18px]">more about us</span>
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_505_137)">
                  <path
                    d="M2.5 8H13.5"
                    stroke="#08090D"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.79999 3.5L14.3 8L9.79999 12.5"
                    stroke="#08090D"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_505_137">
                    <rect width={16} height={16} fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>

            <div className="pl-[14px] lg:pl-[20px] border-l-1 border-dashed border-[#08090D33] mt-[40px] lg:mt-[66px]">
              <p className="font-medium font-manrope leading-[22px]">
                “The integration between our POS and fuel systems is seamless
                now. InfoNet helped us eliminate downtime and keep our customers
                happy even during high-traffic hours.”
              </p>
              <div className="flex mt-[30px] lg:mt-[40px] gap-[16px] items-center">
                <Image
                  width={60}
                  height={80}
                  className="h-[70px] lg:h-[80px] object-cover rounded-[30px]"
                  src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/6eb5238afae3694f2a7851f6cbbc1ed0566b53e0.jpg"
                  alt="Testimonial author"
                />
                <div>
                  <h3 className="mb-[8px] text-[14px] lg:text-[16px] font-bold leading-[18px] lg:leading-[22px] uppercase">
                    Lisa R.
                  </h3>
                  <p className="text-[12px] uppercase leading-[12px]">
                    Operations Manager
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50.85%]">
            <Image
              width={671}
              height={536}
              className="w-full object-cover rounded-[8px]"
              src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/about.png"
              alt="About InfoNet"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailAbout;
