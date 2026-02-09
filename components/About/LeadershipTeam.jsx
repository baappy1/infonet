import TeamCard from "./TeamCard";

const DEFAULT_TEAM = [
  { id: 1, name: "Wilson Chalissery", title: "President", image: "/assets/about/vilson.png" },
  { id: 2, name: "Lee Barter", title: "Senior Vice President, Sales & Marketing", image: "/assets/about/lee.png" },
  { id: 3, name: "Jaison Chalissery", title: "Vice President, Development & Support", image: "/assets/about/jaison.png" },
  { id: 4, name: "James T.", title: "Chief Financial Officer", image: "/assets/about/james.png" },
];

const LeadershipTeam = ({
  topTitle = "[ Our Leadership Team ]",
  title = "Meet the Leaders Driving Infonet's Vision Forward",
  teamMembers = DEFAULT_TEAM,
}) => {
  const members = Array.isArray(teamMembers) && teamMembers.length > 0 ? teamMembers : DEFAULT_TEAM;

  return (
    <section className="bg-[#F8F8F3]">
      <div className="container mx-auto pt-20 lg:pt-55  px-5">
        <div className="top-title mb-5">{topTitle}</div>
        <h2 className="font-manrope text-[28px] md:max-w-100 lg:max-w-134.25 leading-7.5 lg:text-[40px] lg:leading-12.5 mb-25">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 md:gap-1 md:gap-y-6">
          {members.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
