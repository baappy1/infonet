import Image  from "next/image"

export default function WhyChooseCard(
    {
        cardImage="assets/about/why-choose-icon.svg"
    }
){
    return(
        <>
            <div className="why-choose-card bg-white p-[20px] lg:p-[30px] h-full flex flex-col justify-between rounded-[8px]">
                <div 
                    className="card-icon">
                    <Image 
                        src={cardImage}
                        width={60}
                        height={60}
                        className="lg:w-[60px] w-[50px] lg:h-[60px] h-[50px] object-contain mb-[20px] lg:mb-[30px]"
                        alt="Feature icon"
                    />
                </div>
                <div className="card-content">
                     <h3 className="mb-[10px] text-[20px] leading-[24px] md:text-[24px] md:leading-[30px] font-manrope">25+ Years</h3>
                     <p className="font-manrope font-medium text-[14px] leading-[20px]">Delivering reliable, industry-focused solutions to fuel retailers and convenience stores across North America.</p>
                </div>
            </div>  
        </>
    )
}