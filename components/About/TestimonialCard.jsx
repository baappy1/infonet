import Image from "next/image"

export default function TestimonialCard(){
    return(
        <>
            <div className="border-l-[#08090D33] border-l-[1px] pl-[20px]">
                <p className="font-medium text-[16px] leading-[22px] font-manrope">“The integration between our POS and fuel systems is seamless now. InfoNet helped us eliminate downtime and keep our customers happy even during high-traffic hours.”</p>
                    <div className="flex gap-[16px] items-center mt-[40px]">
                        <Image className="rounded-[30px]" src="/assets/about/testimonial.png" width={60} height={80} alt="Testimonial author" />
                        <div>
                            <h3 className="font-bold text-[16px] leading-[22px] uppercase mb-[8px]">Lisa R.</h3>
                            <p className="uppercase text-[12px] leading-[100%]">Operations Manager</p>
                        </div>
                    </div>
            </div>
        </>
    )
}