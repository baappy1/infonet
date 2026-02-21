import Image from "next/image";
import CoreValuesCard from "./CoreValuesCard";

const DEFAULT_FEATURES = [
  {
    id: 1,
    icon: "/assets/solutions/card.svg",
    title: "Payment Gateways",
    description: "Supports major acquirers for EMV, fleet, and gift cards.",
    hasImage: false,
  },
  {
    id: 2,
    icon: "/assets/solutions/gift.svg",
    title: "Loyalty & Gift Systems",
    description:
      "Connect to third-party loyalty programs or use our built-in loyalty engine.",
    hasImage: true,
    image: "/assets/solutions/loyality.png",
  },
  {
    id: 3,
    icon: "/assets/solutions/arrows.svg",
    title: "Hardware & Peripherals",
    description:
      "Compatible with scanners, receipt printers, POS terminals, and more.",
    hasImage: false,
  },
  {
    id: 4,
    icon: "/assets/solutions/monitor.svg",
    title: "Custom Systems",
    description:
      "Through our custom software service, we can build additional integrations such as ERP, RFID, e-commerce, and more.",
    hasImage: false,
  },
  {
    id: 5,
    icon: "/assets/solutions/pump.svg",
    title: "Pump Manufacturers",
    description:
      "Drive and monitor forecourt operations directly from the POS.",
    hasImage: false,
  },
];

const CoreValues = ({
  topTitle = "[ CORE VALUES ]",
  title = "Seamless Integrations & Ecosystem",
  shortDescription = "At Infonet, our values shape how we build technology, how we support clients, and how we grow alongside the industries we serve.",
  features: featuresProp,
}) => {
  const features = featuresProp ?? DEFAULT_FEATURES;
  const oddCards = features.filter((_, i) => i % 2 === 0 && !features[i].hasImage);
  const evenCards = features.filter((_, i) => i % 2 === 1 && !features[i].hasImage);
  const centerItem = features.find((f) => f.hasImage);

  return (
    <section className="bg-[#f8f8f3] py-22.5 lg:pt-0 lg:pb-55">
      <div className="container mx-auto px-5 lg:px-0">
        <p className="top-title mb-5 text-[#08090D] text-center">
          {topTitle}
        </p>
        <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 text-[#08090D] text-center mb-5">
          {title}
        </h2>

        <p className="font-manrope font-medium text-sm lg:text-base max-w-162.25 mx-auto text-center">
          {shortDescription}
        </p>

        <div className="flex flex-col lg:flex-row gap-2 mt-25">
          {/* Left: odd cards */}
          <div className="flex flex-col w-full lg:w-[calc(33.33%-5.33px)] gap-2">
            {oddCards.map((item) => (
              <CoreValuesCard key={item.id} item={item} />
            ))}
          </div>

          {/* Middle: image + title + short description */}
          {centerItem?.image && (
            <div className="relative w-full lg:w-[calc(33.34%-5.33px)] min-h-[200px] lg:min-h-[400px] rounded-2xl overflow-hidden order-first lg:order-0">
              <Image
                src={centerItem.image}
                alt={centerItem.title}
                fill
                className="object-cover"
              />
              <div className="bg-[#EBFF3A] p-3.25 w-15 absolute top-7.5 left-7.5 rounded-lg z-10">
                <Image
                  alt="icon"
                  width={34}
                  height={34}
                  src={centerItem.icon}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-7.5 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-2xl font-manrope leading-7.5">
                  {centerItem.title}
                </h3>
                <p className="text-sm text-white/90 mt-2.5 leading-5 font-manrope max-w-[395px]">
                  {centerItem.description}
                </p>
              </div>
            </div>
          )}

          {/* Right: even cards */}
          <div className="flex flex-col w-full lg:w-[calc(33.33%-5.33px)] gap-2">
            {evenCards.map((item) => (
              <CoreValuesCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
