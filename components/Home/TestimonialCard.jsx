import Image from "next/image";
import TestimonialCardIcon from "./TestimonialCardIcon";

const DEFAULT_IMAGE = "https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/testimoinal-image-01.webp";
const DEFAULT_LOGO = "https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/anfet-logo.svg";
const DEFAULT_CONTENT = "The integration between our POS and fuel systems is seamless now. InfoNet helped us eliminate downtime and keep our customers happy even during high-traffic hours.";
const DEFAULT_TITLE = "Lisa R.";
const DEFAULT_DESIGNATION = "Operations Manager";

export default function TestimonialCard({
  image = DEFAULT_IMAGE,
  logo = DEFAULT_LOGO,
  content = DEFAULT_CONTENT,
  title = DEFAULT_TITLE,
  designation = DEFAULT_DESIGNATION,
}) {
    return(
        <>
            <div className="flex flex-col lg:flex-row gap-[8px] mr-[0] md:mr-[-8px] w-full ">
                {image && (
                <Image 
                    src={image}
                    width={536}
                    height={536}
                    className="object-cover md:h-[536px] lg:w-[40.5%] h-auto w-full rounded-[8px]"
                    alt="Testimonial"    
                />
                )}
                <div 
                    className="relative rounded-[8px] w-[100%] lg:w-[59.5%] bg-white flex items-center md:p-[70px] p-[10px] pb-[90px]">
                    <div>
                        {logo && (
                        <Image
                            src={logo}
                            width={190}
                            height={24}
                            className="absolute top-[30px] right-[30px] rounded-[8px] hidden md:flex"
                            alt="Company logo"
                        />
                        )}
                        <TestimonialCardIcon/>
                        {content && (
                        <p className="font-manrope text-[16px] md:text-[20px] md:leading-[28px] leading-[22px] max-w-[537px] mb-[30px] md:mb-[40px] font-regular">
                            {content}
                        </p>
                        )}
                        {title && (
                        <h4 className="md:leading-[22px] leading-[18px] text-[14px] md:text-[16px] mb-[8px] uppercase font-bold">{title}</h4>
                        )}
                        {designation && (
                        <h5 className="font-normal text-[12px] leading-[12px] uppercase">{designation}</h5>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
