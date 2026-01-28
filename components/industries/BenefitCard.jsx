import Image from "next/image";

const BenefitCard = ({ item }) => {
  return (
    <div className="bg-white p-5 lg:p-7.5 rounded-lg">
      <div className="relative max-h-64  aspect-square">
        <Image
          src={item.icon}
          className="rounded-lg object-cover h-full w-full"
          alt={item.title}
          fill
        />
      </div>

      <h4 className="font-manrope max-w-[253.5px] text-2xl leading-7.5 text-[#08090D] mt-14 tracking-[0px]">
        {item.title}
      </h4>

      <p className="font-manrope font-medium text-sm leading-5 text-[#08090D]/80 mt-2.5">
        {item.description}
      </p>
    </div>
  );
};

export default BenefitCard;
