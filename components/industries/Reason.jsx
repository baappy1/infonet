import CaseCard from "../solutions/CaseCard";

// Fallback static content (used when no dynamic data is provided)
const DEFAULT_TOP_TITLE = "[ reason ]";
const DEFAULT_TITLE = "Why Retail Gas Stations Are Our Priority";
const DEFAULT_DESCRIPTION =
  "Retail gas stations are a critical part of the convenience and fuel ecosystem. With high transaction volumes, complex compliance requirements, and the need for reliable forecourt operations, this industry demands technology that is fast, accurate, and scalable.";

const DEFAULT_REASONS = [
  {
    id: 1,
    title: "Complex Operations Simplified",
    description:
      "We unify forecourt, store, and back-office operations in one platform.",
    icon: "/assets/industries/complex.svg",
  },
  {
    id: 2,
    title: "Compliance & Security Expertise",
    description:
      "EMV-ready and PCI-compliant solutions reduce regulatory risk.",
    icon: "/assets/industries/complex.svg",
  },
  {
    id: 3,
    title: "High-Volume Reliability",
    description:
      "Systems designed to handle hundreds of transactions per hour without downtime.",
    icon: "/assets/industries/complex.svg",
  },
  {
    id: 4,
    title: "Data-Driven Insights",
    description:
      "Detailed reporting helps operators make smarter, profit-focused decisions.",
    icon: "/assets/industries/complex.svg",
  },
];

const Reason = ({
  topTitle = DEFAULT_TOP_TITLE,
  title = DEFAULT_TITLE,
  shortDescription = DEFAULT_DESCRIPTION,
  reasons = DEFAULT_REASONS,
}) => {
  const items =
    Array.isArray(reasons) && reasons.length > 0 ? reasons : DEFAULT_REASONS;

  return (
    <section className="bg-[#f8f8f3]">
      <div className="container mx-auto py-10 lg:pb-55 pt-25 px-5">
        <div className="top-title mb-5">{topTitle}</div>
        <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 mb-5 max-w-162.25">
          {title}
        </h2>
        <p className="font-manrope text-[14px] lg:text-[16px] leading-5 lg:leading-5.5 font-medium max-w-162.25">
          {shortDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-20 gap-10">
          {items.map((item, index) => (
            <CaseCard
              key={item.id ?? item._id ?? index}
              item={{
                id: item.id ?? item._id ?? index,
                title: item.title || item.reason_title,
                description: item.description || item.reason_description,
                icon: item.icon || "/assets/industries/complex.svg",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reason;
