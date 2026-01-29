import Image from "next/image"

export default function MoreServices(){
    return(
        <>
            <div className="bg-[#F8F8F3] pb-30 lg:pb-62.5">
                <div className="container lg:pr-[0] lg:pl-[0] pr-[20px] pl-[20px]">

                    {/* Header */}
                    <div className="flex flex-col">
                            <div className="w-full lg:w-[41.7%] mb-20">
                                <div className="top-title mb-[20px]">[ More services ]</div>
                                <div className="heading-h2">
                                    Additional Services to Support Your Business
                                </div>
                                <p className="paragraph-text mt-5">From hardware sourcing to hands-on training, our services are designed to help your operations run efficiently and reliably.</p>
                            </div>

                            <div className="w-full relative">
                                <Image className="rounded-lg h-117 object-cover" src="/assets/service-details/service-details.webp" width={1320} height={468} />
                                <div className="rounded-lg z-10 absolute top-0 left-0 h-full w-full" style={{ background:
                                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)"
                                    }}></div>
                                <div className="absolute z-11 bottom-0 left-0 w-full p-[30px] text-white">
                                    <h3 className="font-manrope text-[24px] leading-7.5 mb-[10px]">Hardware Sourcing</h3>
                                    <p className="text-[14px] leading-5 font-manrope">We provide certified, fully compatible hardware for POS, pumps, scanners, and more, ensuring your systems run smoothly from day one.</p>
                                </div>
                            </div>
                        </div>
                 </div>
            </div>
        </>
    )
}