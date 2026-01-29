import React from "react";
import TeamCard from "./TeamCard";

const teamMembers = [
  {
    id: 1,
    name: "Wilson Chalissery",
    title: "President",
    image: "/assets/about/vilson.png",
  },
  {
    id: 2,
    name: "Lee Barter",
    title: "Senior Vice President, Sales & Marketing",
    image: "/assets/about/lee.png",
  },
  {
    id: 3,
    name: "Jaison Chalissery",
    title: "Vice President, Development & Support",
    image: "/assets/about/jaison.png",
  },
  {
    id: 4,
    name: "James T.",
    title: "Chief Financial Officer",
    image: "/assets/about/james.png",
  },
];

const LeadershipTeam = () => {
  return (
    <section className="bg-[#F8F8F3]">
      <div className="container mx-auto pt-20 lg:pt-55  px-5">
        <div className="top-title mb-5">[ Our Leadership Team ]</div>
        <h2 className="font-manrope text-[28px] md:max-w-100 lg:max-w-134.25 leading-7.5 lg:text-[40px] lg:leading-12.5 mb-25">
          Meet the Leaders Driving Infonet’s Vision Forward
        </h2>

        {/* image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 md:gap-1 md:gap-y-6">
          {teamMembers.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
