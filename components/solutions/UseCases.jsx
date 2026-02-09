import CaseCard from "./CaseCard";

const DEFAULT_USE_CASES = [
  { id: 1, title: "High-Volume Gas Station", description: "Streamlines fast transactions at peak hours while syncing pump data and sales for accurate reconciliation.", icon: "/assets/solutions/station.svg" },
  { id: 2, title: "Loyalty-Driven Store", description: "Runs promotions, loyalty campaigns, and gift card programs all within the same system.", icon: "/assets/solutions/store.svg" },
  { id: 3, title: "Multi-Location Chain", description: "Centralizes inventory, pricing, and reporting across multiple stores for consistency and control.", icon: "/assets/solutions/location.svg" },
  { id: 4, title: "First Nations Retail", description: "Provides tax-exempt fuel and tobacco transaction support through advanced POS and reporting tools.", icon: "/assets/solutions/retail.svg" },
];

const UseCases = ({
  topTitle = "[ Use Cases ]",
  title = "How Retailers Leverage C-Store Commander",
  useCases = DEFAULT_USE_CASES,
}) => {
  const list = Array.isArray(useCases) && useCases.length > 0 ? useCases : DEFAULT_USE_CASES;

  return (
    <section className="bg-[#F8F8F3]">
      <div className="container mx-auto py-25 lg:pt-5 lg:pb-55 px-5">
        <div className="top-title mb-5 text-center">{topTitle}</div>
        <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 text-[#08090D] text-center max-w-134.25 mx-auto">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-20 gap-10">
          {list.map((item) => (
            <CaseCard key={item.id ?? item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
