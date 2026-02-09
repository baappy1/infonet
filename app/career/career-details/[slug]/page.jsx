import CareerBlockContent from "@/components/Career/CareerBlockContent";
import CareerDetailsSidebar from "@/components/Career/CareerDetailsSidebar";
import CareerHeader from "@/components/Career/CareerHeader";
import { client } from "@/lib/graphql/client";
import { GET_CAREER_BY_ID, GET_CAREER_BY_SLUG } from "@/lib/graphql/queries";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getCareerBySlug(slug) {
  try {
    const { data } = await client.query({
      query: GET_CAREER_BY_SLUG,
      variables: { slug },
      fetchPolicy: "no-cache",
    });
    return data?.careers?.nodes?.[0] || null;
  } catch (error) {
    console.error("Error fetching career by slug:", error);
    return null;
  }
}

async function getCareerById(careerId) {
  try {
    const { data } = await client.query({
      query: GET_CAREER_BY_ID,
      variables: { careerId },
      fetchPolicy: "no-cache",
    });
    return data?.careerBy || null;
  } catch (error) {
    console.error("Error fetching career by id:", error);
    return null;
  }
}

function parseBlocks(blocksJSON) {
  if (!blocksJSON) return [];
  try {
    const parsed = JSON.parse(blocksJSON);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);
  if (!career) return { title: "Career | InfoNet" };
  return {
    title: `${career.title} | InfoNet Careers`,
  };
}

export default async function CareerDetailPage({ params }) {
  const { slug } = await params;

  // Try slug first (URL path)
  let career = await getCareerBySlug(slug);
  if (!career && /^\d+$/.test(slug)) {
    career = await getCareerById(Number(slug));
  }
  if (!career) notFound();

  const blocks = parseBlocks(career.blocksJSON);

  return (
    <div className="pt-[68px] pb-[80px] sm:pb-[150px] lg:pb-[350px] bg-[#F8F8F3]">
      <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
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
            <CareerDetailsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
