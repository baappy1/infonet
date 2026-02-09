import Image from "next/image";

const BenefitCard = ({ item }) => {
  return (
    <div className="bg-white p-5 xl:p-7.5 rounded-lg  w-full">
      <div className="relative w-full aspect-square">
        <Image
          src={item.icon}
          className="rounded-lg object-contain h-full w-full"
          alt={item.title}
          fill
        />
      </div>

      <h4 className="font-manrope  text-2xl leading-7.5 text-[#08090D] mt-14 tracking-[0px]">
        {item.title}
      </h4>

      <p className="font-manrope font-medium text-sm leading-5 text-[#08090D]/80 mt-2.5">
        {item.description}
      </p>
    </div>
  );
};

export default BenefitCard;
