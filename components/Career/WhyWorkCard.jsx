import Image from "next/image";

export default function WhyWorkCard( {className} ) {
    return(
        <>
            <div className={`px-0 py-7.5 sm:p-7.5 ${className}`}>
                <div 
                    className="mb-7.5 bg-white rounded-[106px] w-52.5  p-2.5 border border-[#08090D1A]">
                    <Image width={190} height={127} className="rounded-[106px] w-47.5 h-31.75" src="/assets/career/feature-image.png" alt="Why Work Card" />
                </div>
                <h3 className="font-normal text-[24px] leading-7.5 font-manrope text-[#08090D] mb-5">Collaborate with Experts</h3>
                <p className="font-medium text-[16px] leading-5.5 font-manrope text-[#08090D]">At InfoNet, we don’t just write software — we build the backbone of modern fueling and retail operations.</p>
            </div>
        </>
    )
}