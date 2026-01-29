import MissionVisionCard from "./MissionVisionCard";

export default function MissionVision() {
  return (
    <>
      <div className="bg-[#F8F8F3]">
        <div className="container lg:px-[0] px-[20px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-12.5 sm:gap-0 justify-between pt-[100px] pb-[100px] border-b-[1px] border-dashed border-[#08090D33]">
            <MissionVisionCard
              className="w-full sm:w-[42.4%]"
              title="[ Our Mission ]"
              description="To deliver innovative, reliable, and future-ready technology that simplifies operations and strengthens profitability for every client we serve. We design the infrastructure, systems, and strategies that accelerate the transition to clean energy—without disrupting operations. From grid-edge logistics hubs to on-site generation and storage, our consulting work helps organizations integrate renewables intelligently and at scale."
            />
            <MissionVisionCard
              className="w-full sm:w-[42.4%]"
              title="[ Our Mission ]"
              description="To deliver innovative, reliable, and future-ready technology that simplifies operations and strengthens profitability for every client we serve. We design the infrastructure, systems, and strategies that accelerate the transition to clean energy—without disrupting operations. From grid-edge logistics hubs to on-site generation and storage, our consulting work helps organizations integrate renewables intelligently and at scale."
            />
          </div>
        </div>
      </div>
    </>
  );
}
