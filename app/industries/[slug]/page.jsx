import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";
import { Suspense } from "react";
import { getIndustryBySlug, getPageBySlug } from "./data";
import IndustryPageContent from "./IndustryPageContent";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [industryFromSlug, page] = await Promise.all([
    getIndustryBySlug(slug),
    getPageBySlug(slug),
  ]);
  const industry =
    industryFromSlug ||
    (page ? { title: page.title, excerpt: page.excerpt } : null);
  if (!industry) return { title: "Industry | InfoNet" };
  const rawDesc = industry.excerpt || "";
  const description = (
    typeof rawDesc === "string"
      ? rawDesc.replace(/<[^>]+>/g, "").trim()
      : ""
  ).slice(0, 160);
  return {
    title: `${industry.title} | InfoNet`,
    description,
  };
}

export default async function IndustryDetailPage({ params }) {
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
      <IndustryPageContent slug={slug} />
    </Suspense>
  );
}
