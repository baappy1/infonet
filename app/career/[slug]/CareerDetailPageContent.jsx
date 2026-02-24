import CareerBlockContent from "@/components/Career/CareerBlockContent";
import CareerDetailsSidebar from "@/components/Career/CareerDetailsSidebar";
import CareerHeader from "@/components/Career/CareerHeader";
import { notFound } from "next/navigation";

function parseBlocks(blocksJSON) {
  if (!blocksJSON) return [];
  try {
    const parsed = JSON.parse(blocksJSON);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default async function CareerDetailPageContent({
  slug,
  getCareerBySlug,
  getCareerById,
}) {
  const slugIsNumeric = /^\d+$/.test(slug);

  const [careerFromSlug, careerFromId] = await Promise.all([
    getCareerBySlug(slug),
    slugIsNumeric ? getCareerById(Number(slug)) : Promise.resolve(null),
  ]);

  const career = careerFromSlug || careerFromId;

  if (!career) notFound();

  const blocks = parseBlocks(career.blocksJSON);

  return (
    <div className="pt-[68px] pb-[80px] sm:pb-[150px] lg:pb-[350px] bg-[#F8F8F3]">
      <div className="container lg:px-0 px-5">
        <div className="flex flex-wrap lg:gap-0 gap-10">
          <div className="w-full lg:w-[60%]">
            <CareerHeader
              title={career.title}
              jobType={career.jobType}
              jobSalary={career.jobSalary}
              jobLocation={career.jobLocation}
              jobExperience={career.jobExperience}
              jobDesignation={career.jobDesignation}
            />
            <CareerBlockContent blocks={blocks} />
          </div>
          <div className="w-full lg:w-[40%]">
            <CareerDetailsSidebar position={career.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
