import Image from "next/image";
import Link from "next/link";

const LogoList = [
    { id: 1, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 2, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 3, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 4, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 5, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 6, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 7, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 8, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 9, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 10, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 11, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 12, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 13, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 14, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 15, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 16, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 17, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 18, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 19, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 20, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 21, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 22, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 23, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 24, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
    { id: 25, src: "/assets/brand/toshiba-logo.svg", width: 186, height: 60, alt: "Toshiba" },
];

export default function IntegrationList() {
    return (
        <>
            <div className="pt-27 lg:pt-54 pb-31 lg:pb-62.5 bg-[#F8F8F3]">
                <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
                    <div className="w-full sm:w-164.75">
                        <div className="top-title mb-5">
                            [ Integrations ]                           
                        </div>
                        <h2 className="heading-h2 mb-5">
                            Fully integrated solutions that connect your systems
                        </h2>
                        <p className="paragraph-text">At InfoNet, we integrate with a broad range of partners spanning hardware providers, payment gateways, loyalty programs, and more to create a unified, end-to-end experience for our clients.</p>
                    </div>

                    <div className="flex flex-wrap mt-10 gap-x-1.5 gap-y-2 -mr-1.5">
                        {LogoList.map((logo) => (
                            <div key={logo.id} className="w-[calc(50%-6px)] p-[20] border-box sm:w-[calc(33%-6px)] lg:w-[calc(20%-6px)] h-42.5 flex items-center justify-center bg-white rounded-lg">
                                <Image className="object-contain max-w-full mx-auto" src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} />
                            </div>
                        ))}
                    </div>


                <div className="flex justify-center mt-12 sm:mt-17.5">
                    <Link
                        className='inline-flex lg:px-[16px] px-[16px] py-[12px] lg:py-[12px] text-[14px] leading-[18px] font-medium box-border rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white hover:text-[#08090D] uppercase gap-[10px]' 
                        href="/contact">
                        <span className='font-medium  sm:leading-[18px] text-[14px]'>Let's Collaborate</span>
                        <svg
                            width={16}
                            height={16}
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
            </div>
        </>
    )
}