import Image from "next/image"
import Link from "next/link"

export default function ServeCard( { FeatureImage,title,description } ){
    return(
        <>
            <div className="w-full">
                    { FeatureImage &&
                    <Image
                        width={202}
                        height={202}
                        className="rounded-[999999px] h-[130px] w-[130px] md:h-[202px] md:w-[202px] mb-[20px] overflow-hidden relative" 
                        src={FeatureImage}
                        alt={title} /> }

                        { title &&
                        <h3 className="mb-[10px] text-[20px] leading-[24px] md:text-[24px] md:leading-[30px] font-manrope">{title}</h3> }

                        { description &&
                            <p className="font-manrope font-medium text-[14px] leading-[20px]">
                                {description}
                            </p>
                        }
                        <Link
                            href="/service/service-details"
                            className="inline-flex font-medium box-border rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white hover:border border-1 border-[#EBFF3A] hover:border-[#08090D] hover:text-[#08090D] uppercase gap-[10px] px-[15px] py-[11px] mt-[20px]"
                            >
                            <span className="text-[14px] leading-[18px]">learn more</span>
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
            </div>
        </>
    )
}