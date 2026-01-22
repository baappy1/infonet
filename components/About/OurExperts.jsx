import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import ExpertsCard from "./ExpertsCard";

export const teamMembers = [
  {
    id: 1,
    name: "Emma L.",
    role: "Head of IT Operations",
    image: "/assets/about/emma-2.png",
    department: "IT Operations",
  },
  {
    id: 2,
    name: "Oliver K.",
    role: "Director of Infrastructure",
    image: "/assets/about/oliver-2.png",
    department: "Infrastructure",
  },
  {
    id: 3,
    name: "Sophia M.",
    role: "Vice President of Technology",
    image: "/assets/about/sophia-2.png",
    department: "Technology",
  },
  {
    id: 4,
    name: "Liam J.",
    role: "Chief Technology Officer",
    image: "/assets/about/liam-2.png",
    department: "Leadership",
  },
  {
    id: 5,
    name: "Noah R.",
    role: "Lead Software Architect",
    image: "/assets/about/emma-2.png",
    department: "Engineering",
  },
];

const OurExperts = () => {
  return (
    <section className="bg-[#F8F8F3]">
      <div className="container mx-auto pt-20 md:pt-55  px-5">
        <div className="top-title mb-5">[ Meet Our Experts ]</div>
        <h2 className="font-manrope text-[28px] max-w-195.75 leading-7.5 lg:text-[40px] lg:leading-12.5 mb-25">
          Our Diverse Team Works Across Departments.
        </h2>

        {/* carousel */}
        <div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full pb-10"
          >
            <CarouselContent className="-ml-1">
              {teamMembers.map((member, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <ExpertsCard member={member} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-1 mt-25">
              <CarouselPrevious className="static w-12 h-10 translate-y-0 rounded-sm border-none px-3 py-4 bg-white " />
              <CarouselNext className="static w-12 h-10 translate-y-0 rounded-sm border-none px-3 py-4 bg-[#EBFF3A] hover:bg-[#EBFF3A] text-black" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default OurExperts;
