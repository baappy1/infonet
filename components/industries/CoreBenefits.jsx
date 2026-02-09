import BenefitCard from "./BenefitCard";

export const coreBenefits = [
  {
    id: 1,
    title: "Fast & Accurate Transactions",
    description: "Speed up in-store and frequent operations",
    icon: "/assets/industries/transactions.png",
  },
  {
    id: 2,
    title: "Inventory & Wet-Stock Management",
    description: "Track fuel and product accurately to reduce shrink",
    icon: "/assets/industries/inventory.png",
  },
  {
    id: 3,
    title: "Multi-Site Management",
    description:
      "Control pricing, reporting, and inventory across all locations",
    icon: "/assets/industries/multi-site.png",
  },
  {
    id: 4,
    title: "Advanced Reporting & Analytics",
    description: "Gain actionable insights to make smarter business decisions",
    icon: "/assets/industries/analytics.png",
  },
];

const DEFAULT_TITLE = "Core Benefits We Provide to This Industry";

const CoreBenefits = ({ title = DEFAULT_TITLE, milestones }) => {
  const items =
    Array.isArray(milestones) && milestones.length > 0
      ? milestones.map((m, i) => ({
          id: m._id ?? m.id ?? i + 1,
          title: m.milestone_title || m.title || "",
          description: m.short_description || m.description || "",
          icon: m.feature_image || m.icon || "/assets/industries/transactions.png",
        }))
      : coreBenefits;

  return (
    <section className="px-2.5">
      <div className="bg-[#083630] rounded-lg">
        <div className=" py-25 lg:py-38.5">
          <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 mb-25 text-center text-white">
            {title}
          </h2>
          {/* cards */}

          <div className="max-w-330 mx-auto px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5.5  lg:grid-cols-4 auto-rows-fr">
              {items.map((item) => (
                <BenefitCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreBenefits;
