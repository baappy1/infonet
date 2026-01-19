import Image from "next/image"
import Link from "next/link"

export default function BlogCard(){
    return(
        <>
            <div className="w-full bg-white p-[16px] rounded-[12px]">
                <Image
                    width={393}
                    height={270}
                    className="mb-[20px] overflow-hidden relative rounded-[8px]" 
                    src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/image-15.png"
                    alt="Blog post image" />
                    
                    <div className="flex items-center gap-[10px] mb-[20px]">
                        <span className="text-[12px] leading-[12px] uppercase">News & Blog</span>
                        <span className="flex bg-[#EBFF3A] w-[4px] h-[4px]"></span>
                        <span className="text-[12px] leading-[12px] uppercase">October 27, 2024</span>
                    </div>
                    
                    <h3 className="mb-[20px] text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] font-medium font-manrope">How Mid‑Market Fuel Retailers Can Lean into Tech to Scale Faster</h3>
                    <Link
                        href=""
                        className="flex font-medium justify-between box-border rounded-[4px] bg-[#F8F8F3] transition duration-150 hover:bg-[#EBFF3A] uppercase gap-[10px] px-[16px] py-[12px]"
                        >
                        <span className="text-[14px] leading-[18px]">read more</span>
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