import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";
import { Suspense } from "react";
import { getIndustryBySlug, getPageBySlug } from "./data";
import IndustryPageContent from "./IndustryPageContent";
import { fetchGraphQL } from "@/lib/graphql";
import {
  GET_INDUSTRIE_SEO_BY_ID,
  GET_PAGE_SEO_BY_ID,
} from "@/lib/graphql/queries";
import {
  extractYoastSchemaRaw,
  getIndustrieSeoMetadataById,
  getPageSeoMetadataById,
} from "@/lib/seo";
import { print } from "graphql";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = params;
  const [industryFromSlug, page] = await Promise.all([
    getIndustryBySlug(slug),
    getPageBySlug(slug),
  ]);
  if (industryFromSlug?.databaseId) {
    return getIndustrieSeoMetadataById(
      industryFromSlug.databaseId,
      `/industries/${slug}`,
    );
  }
  if (page?.databaseId) {
    return getPageSeoMetadataById(page.databaseId, `/industries/${slug}`);
  }
  return { title: "Industry | InfoNet" };
}

export default async function IndustryDetailPage({ params }) {
  const { slug } = params;
  const [industryFromSlug, page] = await Promise.all([
    getIndustryBySlug(slug),
    getPageBySlug(slug),
  ]);

  const industrieId = industryFromSlug?.databaseId ?? null;
  const pageId = page?.databaseId ?? null;
  const seoData = industrieId
    ? await fetchGraphQL(print(GET_INDUSTRIE_SEO_BY_ID), {
        industrieId: Number(industrieId),
      }).catch(() => null)
    : pageId
      ? await fetchGraphQL(print(GET_PAGE_SEO_BY_ID), {
          pageId: Number(pageId),
        }).catch(() => null)
      : null;
  const schemaRaw = extractYoastSchemaRaw(
    seoData?.industrieBy?.seo ?? seoData?.pageBy?.seo,
  );

  return (
    <>
      {schemaRaw ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaRaw }}
        />
      ) : null}
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
    </>
  );
}
