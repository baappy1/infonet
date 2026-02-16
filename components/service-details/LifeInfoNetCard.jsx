import Image from "next/image";

export default function LifeInfoNetCard({ image, title }) {
  return (
    <>
      <div className=" cursor-pointer">
        {image && (
          <Image
            className="h-100 object-contain mb-5"
            src={image}
            width={324}
            height={400}
            alt=""
          />
        )}
        {title && (
          <p className="text-[20px] leading-7 font-manrope text-[#08090D] pl-2.5">
            {title}
          </p>
        )}
      </div>
    </>
  );
}
