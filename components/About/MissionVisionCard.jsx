export default function MissionVisionCard({title,description,className}){
    return(
        <>
            <div className={`flex flex-col gap-[34px] ${className}`}>
                <h4 className="text-[16px] leading-[22px] text-[#08090D] uppercase font-jetbrains">{title}</h4>
                <p className="text-[16px] leading-[22px] text-[#08090D] font-medium font-manrope">{description}</p>
            </div>
        </>
    )
}