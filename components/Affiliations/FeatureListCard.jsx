import Image from "next/image";

export default function FeatureListCard({FeatureTitle = "", FeatureDescription = "", FeatureImage = "", backgroundColor = "", className=""}) {
    return(
        <>
            <div className={`sticky top-0 w-full pl-2.5 pr-2.5 bg-[#F8F8F3] pb-2.5 ${className}`}>
                <div style={{backgroundColor: backgroundColor}} className="rounded-lg min-h-155 pt-18 lg:pt-27.5 pb-20 lg:pb-27.5">
                    <div className="container pl-5 pr-5 lg:pr-0 lg:pl-0">
                        <div className="flex items-center justify-between flex-col lg:flex-row gap-10">

                            <div className="flex flex-col w-full lg:w-[40.7%]">
                                { FeatureTitle &&
                                <h3 className="text-[32px] mb-8 leading-11 font-medium font-manrope">{FeatureTitle}</h3> }
                                { FeatureDescription &&
                                <div className="text-4 leading-7.5 font-normal font-manrope text-[#08090D] flex flex-col gap-6">
                                    {FeatureDescription}
                                </div>  }
                            </div>

                            <div className="w-full lg:w-[49.2%]">
                                { FeatureImage &&
                                <Image className="rounded-[16px]" width={649} height={400} src={FeatureImage} alt="NACS Logo" /> }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}