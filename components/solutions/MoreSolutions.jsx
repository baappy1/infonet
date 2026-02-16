import SolutionsCard from "./SolutionsCard";

const DEFAULT_MORE_FEATURES = [
  { id: 1, title: "Fuel Commander", description: "Fully integrated EMV Pay-at-the-Pump solution for self-serve fueling. Monitor, authorize, and manage all pumps remotely while maintaining compliance and speed.", image: "/assets/solutions/fuel.png" },
  { id: 2, title: "Custom Software", description: "Tailored software solutions for reporting, site management, e-commerce, RFID, and more. Build the tools that fit your unique operational needs.", image: "/assets/solutions/custom.png" },
];

const MoreSolutions = ({
  topTitle = "[ More solutions ]",
  title = "Power Your Operations with Our Complete Suite",
  shortDescription = "Whether you need point-of-sale systems, pay-at-the-pump solutions, or custom software integrations, InfoNet provides a complete suite of tools to optimize your fuel.",
  moreFeatures = DEFAULT_MORE_FEATURES,
}) => {
  const list = Array.isArray(moreFeatures) && moreFeatures.length > 0 ? moreFeatures : DEFAULT_MORE_FEATURES;

  return (
    <section className="bg-[#F8F8F3]">
      <div className="container mx-auto pb-62.5 px-5">
        <div className="top-title mb-5 text-[#08090D]">{topTitle}</div>
        <h2 className="font-manrope text-[28px] mb-5 leading-7.5 lg:text-[40px] lg:leading-12.5 max-w-162.25 text-[#08090D]">
          {title}
        </h2>
        <p className="font-manrope text-base leading-5.5 font-medium text-[#08090D]/80 tracking-[0px] max-w-162.25">
          {shortDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-20">
          {list.map((item, i) => (
            <SolutionsCard key={item.id ?? item._id ?? i} item={{ ...item, image: item.image || item.feature_image }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreSolutions;
