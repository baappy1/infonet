import BenefitsCard from "./BenefitsCard";

const DEFAULT_BENEFITS = [
  {
    id: 1,
    icon: "/assets/service-details/benefit/01.svg",
    title: "Reduce downtime and installation errors",
  },
  {
    id: 2,
    icon: "/assets/service-details/benefit/02.svg",
    title: "Ensure proper system calibration and compliance",
  },
  {
    id: 3,
    icon: "/assets/service-details/benefit/03.svg",
    title: "Improve staff confidence and operational efficiency",
  },
  {
    id: 4,
    icon: "/assets/service-details/benefit/04.svg",
    title: "Set up for scalable multi-site expansion",
  },
  {
    id: 5,
    icon: "/assets/service-details/benefit/05.svg",
    title: "Gain long-term reliability and smoother site operations",
  },
];

export default function Benefits({
  topTitle = "[ Key Benefits ]",
  title = "Why This Service Is Critical for Your Operations",
  shortDescription = "Fuel and retail environments rely on precision. Our service ensures your systems are fast, reliable, and optimized for real-world performance.",
  benefits,
}) {
  const items =
    Array.isArray(benefits) && benefits.length > 0
      ? benefits.map((b, i) => ({
          id: b._id ?? i,
          icon:
            b.feature_image ||
            `/assets/service-details/benefit/0${(i % 5) + 1}.svg`,
          title: b.benefit_title || "",
        }))
      : DEFAULT_BENEFITS;

  return (
    <>
      <div className="pt-20 lg:pt-25 pb-25 lg:pb-55 bg-[#F8F8F3]">
        <div className="container lg:px-0 xl:px-5 px-5">
          <div className="w-full">
            <div className="w-full lg:w-[49.7%]">
              <div className="top-title mb-5">{topTitle}</div>
              <h2 className="heading-h2 mb-5">{title}</h2>
              <p className="paragraph-text mb-10 lg:mb-20">
                {shortDescription}
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-wrap gap-2">
              {items.map((benefit, index) => (
                <BenefitsCard
                  key={benefit.id}
                  CardIcon={benefit.icon}
                  CardTitle={benefit.title}
                  className="w-full sm:w-[calc(33.33%-8px)] lg:w-[calc(20%-8px)]"
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
