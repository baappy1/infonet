import Image from "next/image";

export default function IncludeCard({ CardIcon, CardTitle, CardDescription }) {
    return (
        <>
            <div className="flex justify-between flex-wrap items-center gap-[24px] border-b-[1px] border-[#08090D33] pb-[20px] border-dashed mb-[20px] last:mb-0">
                <Image width={40} height={40} src={CardIcon} alt="" />
                <span className="w-[calc(100%-64px)]">
                    <h3 className="font-jetbrains text-[16px] leading-5.2 uppercase">{CardTitle}</h3>
                    <p className="font-manrope text-[14px] leading-5 text-[#08090D] font-medium">{CardDescription}</p>
                </span>
            </div>
        </>
    )
}