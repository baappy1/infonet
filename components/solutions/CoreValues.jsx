import React from "react";
import CoreValuesCard from "./CoreValuesCard";
import Image from "next/image";

const features = [
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

const CoreValues = () => {
  return (
    <section className="bg-[#f8f8f3] py-22.5 lg:pt-0 lg:pb-55">
      <div className="container mx-auto px-5 lg:px-0">
        <p className="top-title mb-5 text-[#08090D] text-center">
          [ CORE VALUES ]
        </p>
        <h2 className="font-manrope text-[28px] leading-7.5  lg:text-[40px] lg:leading-12.5 text-[#08090D] text-center mb-5">
          Seamless Integrations & Ecosystem
        </h2>

        <p className="font-manrope font-medium text-sm lg:text-base max-w-162.25 mx-auto text-center">
          At Infonet, our values shape how we build technology, how we support
          clients, and how we grow alongside the industries we serve.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-25">
          {features.map((item) => {
            if (item.hasImage) {
              return (
                <>
                  <div
                    key={item.id}
                    className="hidden md:block relative row-span-2 rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    {/* Dark overlay */}
                    {/* <div className="absolute inset-0 bg-black/30" /> */}

                    <div className="bg-[#EBFF3A] p-3.25 w-15 absolute top-7.5 left-7.5 rounded-lg">
                      <Image
                        alt="icon"
                        width={34}
                        height={34}
                        src={item.icon}
                      />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-7.5 left-7.5 text-white">
                      <h3 className="text-2xl fon-manrope leading-7.5 font-manrope">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/80 mt-2.5 leading-5 max-w-[395px] font-manrope">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* regular card for mb */}
                  <div className="bg-white p-5 lg:p-7.5 rounded-lg md:hidden">
                    <div className="bg-[#EBFF3A] p-3.25 w-15 rounded-lg">
                      <Image
                        alt="icon"
                        width={34}
                        height={34}
                        src={item.icon}
                      />
                    </div>

                    <h4 className="font-manrope text-2xl leading-7.5 text-[#08090D] mt-7.5">
                      {item.title}
                    </h4>

                    <p className="font-manrope font-medium text-sm leading-5 text-[#08090D]/80 mt-2.5">
                      {item.description}
                    </p>
                  </div>
                </>
              );
            }

            return <CoreValuesCard key={item.id} item={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
