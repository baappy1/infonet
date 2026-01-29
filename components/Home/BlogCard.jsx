import Image from "next/image"
import Link from "next/link"

export default function BlogCard({FeatureImage, Category, Date, Title, ReadMoreLink}) {
    return(
        <>
        { FeatureImage || Category || Date || Title || ReadMoreLink  ?  
            <div className="w-full bg-white p-4 rounded-xl">

                { FeatureImage &&
                <Image
                    width={393}
                    height={270}
                    className="mb-5 overflow-hidden relative rounded-lg w-full" 
                    src={FeatureImage}
                    alt="Blog post image" /> }
                    
                    <div className="flex items-center gap-2.5 mb-5">
                       {Category && <span className="text-[12px] leading-3 uppercase">{Category}</span>}
                         <span className="flex bg-[#EBFF3A] w-1 h-1"></span>
                       {Date && <span className="text-[12px] leading-3 uppercase">{Date}</span>}
                    </div>

                    {Title && <h3 className="mb-5 text-[16px] leading-5.5 md:text-[20px] md:leading-7 font-medium font-manrope">{Title}</h3>}

                    {ReadMoreLink && 
                        <Link
                            href={ReadMoreLink}
                            className="flex font-medium justify-between box-border rounded-sm bg-[#F8F8F3] transition duration-150 hover:bg-[#EBFF3A] uppercase gap-2.5 px-4 py-3"
                            >
                            <span className="text-[14px] leading-4.5">read more</span>
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
                    }
            </div>

            : null }
        </>
    )
}