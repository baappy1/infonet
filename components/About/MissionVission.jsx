import MissionVisionCard from "./MissionVisionCard";

const FALLBACK_ITEMS = [
  {
    title: "[ Our Mission ]",
    description:
      "To deliver innovative, reliable, and future-ready technology that simplifies operations and strengthens profitability for every client we serve.",
  },
  {
    title: "[ Our Vision ]",
    description:
      "To become the most trusted technology partner in the fuel and retail industry — shaping the future of POS, fuel management, and integrated retail systems across North America.",
  },
];

export default function MissionVision({ items = [] }) {
  const displayItems = items?.length > 0 ? items : FALLBACK_ITEMS;

  return (
    <>
      <div className="bg-[#F8F8F3]">
        <div className="container lg:px-[0]  px-5 mx-auto">
          <div className="flex flex-col sm:flex-row gap-12.5 sm:gap-0 justify-between pt-[100px] pb-[100px] border-b-[1px] border-dashed border-[#08090D33]">
            {displayItems.map((item, i) => (
              <MissionVisionCard
                key={i}
                className="w-full sm:w-[42.4%]"
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
