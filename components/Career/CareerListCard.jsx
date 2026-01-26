import Link from "next/link";

export default function CareerListCard() {
  return (
    <>
        <div className="flex justify-between flex-col sm:gap-0 gap-6 sm:flex-row sm:items-center items-start p-5 sm:p-7.5 lg:p-10 bg-[#F8F8F3] border-[#08090D33] border-dashed border-b-1 relative last:border-0 duration-200 hover:bg-[#EBFF3A]">
            <Link href="/career/career-details" className="absolute top-0 left-0 w-full h-full z-11"></Link>
             <div className="flex gap-6 w-full sm:w-[calc(100%-169px)] flex-col">
                <h3 className="sm:text-[24px] text-[18px] sm:leading-7.5 leading-6 font-manrope text-[#08090D]">Senior Technical Support Engineer (Fuel Automation Systems)</h3>
                <ul className="flex flex-wrap gap-2 opacity-60 uppercase text-[12px] sm:text-[16px] leading-5.5">
                    <li>North America</li>
                    <li> · Full Time</li>
                    <li> · Associate</li>
                </ul>
             </div>
             <div>
                <Link className="z-12 w-[169px] relative inline-flex w-auto justify-center items-center gap-2.5 px-3 sm:px-4 py-3 uppercase rounded-sm transition-colors duration-200 hover:bg-white border-1 border-[#08090D] hover:border-white" href="/contact"><span className="font-medium text-[14px] leading-[18px]">apply now</span>
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <g clipPath="url(#clip0_433_8)">
                            <path
                            d="M3.125 10H16.875"
                            stroke="#08090D"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                            />
                            <path
                            d="M12.25 4.375L17.875 10L12.25 15.625"
                            stroke="#08090D"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_433_8">
                            <rect width={20} height={20} fill="white" />
                            </clipPath>
                        </defs>
                        </svg>

                </Link>
             </div>
        </div>
    </>
  );
}