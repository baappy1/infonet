import Image from "next/image";

export default function LifeInfoNetCard({ image, title }) {
    return (
        <>
            <div className="w-full">
                {image && <Image className="rounded-[8px] h-[400px] object-cover w-full mb-[20px]" src={image} width={324} height={400} alt="" />}
                {title && <p className="text-[20px] leading-[28px] font-manrope text-[#08090D] pl-[10px]">{title}</p>}
            </div>
        </>
    );
}