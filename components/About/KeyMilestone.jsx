import KeyMilestoneCard from "./KeyMilestoneCard";

const FALLBACK_MILESTONES = [
  { image: "/assets/about/01.png", title: "Early 2000s", description: "Launched first-generation POS and back-office solutions" },
  { image: "/assets/about/milestone/01.png", title: "2005–2015", description: "Expanded to pump control, pricing management, and multi-site integration" },
  { image: "/assets/about/milestone/02.png", title: "2016", description: "Introduced Fleet and First Nations exempt-sales modules" },
  { image: "/assets/about/milestone/03.png", title: "2020–Present", description: "Full evolution into EMV, unattended retail, cloud reporting, and custom enterprise integrations" },
];

export default function KeyMilestone({ title = "Key Milestones", milestones = [] }) {
  const displayMilestones = milestones?.length > 0 ? milestones : FALLBACK_MILESTONES;

  return (
    <>
      <div className="px-2.5">
        <div className="pt-22.5 lg:pt-38.5 pb-22.5 lg:pb-38.5 bg-[#083630] rounded-lg relative">
          <div
            style={{
              backgroundImage: `url('/assets/key.webp')`,
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
            className="absolute top-0 left-0 w-full h-full"
          />
          <div className="container px-5 lg:px-0">
            {title && (
              <h2 className="mb-15 lg:mb-25 text-center text-[40px] text-white leading-[50px] font-manrope">
                {title}
              </h2>
            )}
            <div className="flex flex-wrap gap-[22px]">
              {displayMilestones.map((m, i) => (
                <KeyMilestoneCard
                  key={i}
                  className="lg:w-[calc(25%-16.5px)] sm:w-[calc(50%-11px)] w-full"
                  ImageURL={m.image}
                  title={m.title}
                  description={m.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
