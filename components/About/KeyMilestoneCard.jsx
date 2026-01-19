import Image from "next/image"

export default function KeyMilestoneCard( {className,ImageURL,title,description} ){
    return(
        <>
            <div className={`bg-white p-[30px] rounded-[8px] relative z-50 ${className}`}>
                { ImageURL && 
                <Image className="mb-10 lg:mb-21.5" width={256} height={256} src={ImageURL} alt={title || "Milestone icon"} /> }

                { title && 
                <h3 className="text-[24px] leading-[30px] mb-[10px] font-regular font-manrope text-[#08090D]">{title}</h3> }

                { description && 
                <p className="text-[#08090D] text-[14px] leading-[20px] font-medium font-manrope">{description}</p> }
            </div>
        </>
    )
}