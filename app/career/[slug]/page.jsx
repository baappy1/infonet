import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";
import { fetchGraphQL } from "@/lib/graphql";
import {
    GET_CAREER_BY_ID,
    GET_CAREER_BY_SLUG,
    GET_CAREERS,
} from "@/lib/graphql/queries";
import { print } from "graphql";
import { unstable_cache } from "next/cache";
import { cache, Suspense } from "react";
import CareerDetailPageContent from "./CareerDetailPageContent";

export const revalidate = 60;

async function fetchCareerBySlug(slug) {
  try {
    const data = await fetchGraphQL(print(GET_CAREER_BY_SLUG), { slug });
    return data?.careers?.nodes?.[0] || null;
  } catch (error) {
    console.error("Error fetching career by slug:", error);
    return null;
  }
}

async function fetchCareerById(careerId) {
  try {
    const data = await fetchGraphQL(print(GET_CAREER_BY_ID), { careerId });
    return data?.careerBy || null;
  } catch (error) {
    console.error("Error fetching career by id:", error);
    return null;
  }
}

const getCareerBySlug = cache((slug) =>
  unstable_cache(
    () => fetchCareerBySlug(slug),
    ["career-by-slug", slug],
    { tags: ["career", `career-${slug}`], revalidate: 300 }
  )()
);

const getCareerById = cache((careerId) =>
  unstable_cache(
    () => fetchCareerById(careerId),
    ["career-by-id", String(careerId)],
    { tags: ["career", `career-id-${careerId}`], revalidate: 300 }
  )()
);

export async function generateStaticParams() {
  try {
    const data = await fetchGraphQL(print(GET_CAREERS));
    const careers = data?.careers?.nodes || [];
    return careers
      .filter((c) => c?.slug)
      .map((c) => ({ slug: c.slug }));
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

  return (
    <Suspense
      fallback={
        <>
          <IndustryBannerSkeleton />
          <IndustryContentSkeleton />
        </>
      }
    >
      <CareerDetailPageContent
        slug={slug}
        getCareerBySlug={getCareerBySlug}
        getCareerById={getCareerById}
      />
    </Suspense>
  );
}
