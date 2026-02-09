import Image from "next/image";

const IndustryCard = ({ item }) => {
  return (
    <div className="relative">
      <div className="h-100 lg:h-117 relative">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="w-full object-cover rounded-lg"
        />
      </div>
      <div className="absolute bottom-5 left-5 lg:bottom-7.5 lg:left-7.5">
        <h4 className="font-manrope text-xl lg:text-2xl leading-7.5 tracking-[0px] text-white mb-2.5">
          {item.title}
        </h4>
        <p className="font-manrope text-sm font-medium text-white/80 leading-5 max-w-66">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default IndustryCard;
