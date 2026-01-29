import Image from "next/image";

export default function WhyChooseCard({
  cardImage = "assets/about/why-choose-icon.svg", title,description
}) {
  return (
    <>
      <div className="why-choose-card bg-white p-[20px] lg:p-[30px] h-full flex flex-col justify-between rounded-[8px]">
        
        { cardImage &&
          <div className="card-icon">
            
            <Image
              src={cardImage}
              width={60}
              height={60}
              className="object-contain mb-[20px] lg:mb-[30px]"
              alt="Feature icon"
            /> 
          </div>
        }
        <div className="card-content">
          
          { description &&
          <h3 className="mb-[10px] text-[20px] leading-[24px] md:text-[24px] md:leading-[30px] font-manrope">
            {title}
          </h3> }

          { description &&
          <p className="font-manrope font-medium text-[14px] leading-[20px]">
            {description}
          </p>}
        </div>
      </div>
    </>
  );
}
