import Image from "next/image";

export default function IncludeCard({ CardIcon, CardTitle, className }) {
    return (
        <>
            <div className={`flex flex-col gap-[20px] p-[10px] bg-white rounded-[8px] ${className}`}>
                <Image width={60} height={60} src={CardIcon} alt="" />
                <h3 className="font-jetbrains text-[16px] leading-5.5 uppercase">{CardTitle}</h3>
            </div>
        </>
    )
}