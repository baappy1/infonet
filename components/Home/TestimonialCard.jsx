import Image from "next/image"
import TestimonialCardIcon from "./TestimonialCardIcon"

export default function ServiceCard(){
    return(
        <>
            <div className="flex flex-col lg:flex-row gap-[8px] mr-[0] md:mr-[-8px] w-full ">
                <Image 
                    src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/testimoinal-image-01.webp"
                    width={536}
                    height={536}
                    className="object-cover md:h-[536px] lg:w-[40.5%] h-auto w-full rounded-[8px]"
                    alt="Testimonial"    
                />
                <div 
                    className="relative rounded-[8px] w-[100%] lg:w-[59.5%] bg-white flex items-center md:p-[70px] p-[10px] pb-[90px]">
                    <div>
                        <Image
                            src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/anfet-logo.svg"
                            width={190}
                            height={24}
                            className="absolute top-[30px] right-[30px] rounded-[8px] hidden md:flex"
                            alt="Company logo"
                        />
                        <TestimonialCardIcon/>
                        <p className="font-manrope text-[16px] md:text-[20px] md:leading-[28px] leading-[22px] max-w-[537px] mb-[30px] md:mb-[40px] font-regular">
                            “The integration between our POS and fuel systems is seamless now. InfoNet helped us eliminate downtime and keep our customers happy even during high-traffic hours.”
                        </p>
                        <h4 className="md:leading-[22px] leading-[18px] text-[14px] md:text-[16px] mb-[8px] uppercase font-bold">Lisa R.</h4>
                        <h5 className="font-normal text-[12px] leading-[12px] uppercase">Operations Manager</h5>
                    </div>
                </div>
            </div>
        </>
    )
}