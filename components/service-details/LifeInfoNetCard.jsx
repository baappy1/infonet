import Image from "next/image";

export default function LifeInfoNetCard({ image, title }) {
  return (
    <>
      <div className=" cursor-pointer">
        {image && (
          <Image
            className="rounded-lg h-100 object-cover mb-5"
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
