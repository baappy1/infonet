import Image from "next/image";
import FeatureCard from "./FeatureCard";

const DEFAULT_FEATURES = [
  {
    id: 1,
    title: "Easy, User-Friendly Interface",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 2,
    title: "Complete POS Functionality",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 3,
    title: "Seamless Pump & Dispenser Control",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 4,
    title: "Real-Time Data & Sync",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 5,
    title: "Flexible Pricing & Promotions",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 6,
    title: "Accounts Receivable & Customer Billing",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 7,
    title: "Advanced Reporting & Insights",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 8,
    title: "Built-In Loyalty & Rewards",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 9,
    title: "PCI-Certified Secure Payments",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 10,
    title: "Multi-Site Dashboard & Control",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 11,
    title: "Universal Fleet Card Support",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 12,
    title: "Fuel Inventory Monitoring",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 13,
    title: "Cardlock Automation & Controls",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 14,
    title: "Marina Fueling Support",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 15,
    title: "Aviation Self-Serve Fueling",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 16,
    title: "Unattended EMV Payment Support",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 17,
    title: "Age & Product Restriction Controls",
    icon: "/assets/solutions/window.svg",
  },
  {
    id: 18,
    title: "Vehicle-Level Usage Reporting",
    icon: "/assets/solutions/window.svg",
  },
];

const Features = ({
  topTitle = "[ Features ]",
  title = "Everything You Need to Run a Smarter Store",
  shortDescription = "C-Store Commander delivers the essential features retailers rely on every day: fast transactions, accurate reporting, secure payments, and complete control over forecourt and in-store operations.",
  features = DEFAULT_FEATURES,
}) => {
  const list =
    Array.isArray(features) && features.length > 0
      ? features
      : DEFAULT_FEATURES;

  return (
    <section className="px-2.5 ">
      <div className="w-full relative rounded-lg overflow-hidden ">
        <div className="w-full py-55 flex justify-center items-center px-2.5 ">
          <div className="mx-auto">
            <div className="top-title mb-5 text-center text-white">
              {topTitle}
            </div>
            <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 text-white text-center mx-auto max-w-162.25 ">
              {title}
            </h2>

            <p className="text-white mx-auto text-center max-w-162.25 font-manrope font-medium text-base leading-5.5 mt-5 px-5">
              {shortDescription}
            </p>

            <div className="container mx-auto px-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 mt-20 gap-2">
                {list.map((item, i) => (
                  <FeatureCard
                    key={item.id ?? item._id ?? i}
                    item={item}
                    i={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/assets/solutions/features-3.png"
          fill
          alt="background"
          className="h-full w-full -z-10 object-cover absolute inset-0"
        />
        <div className="absolute rounded-lg inset-0 bg-[#083630]/80 -z-10" />
      </div>
    </section>
  );
};

export default Features;
