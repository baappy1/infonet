import { fetchGraphQL } from "@/lib/graphql";
import {
    GET_INDUSTRY_BY_SLUG,
    GET_PAGE_BY_SLUG,
} from "@/lib/graphql/queries";
import { print } from "graphql";
import { cache } from "react";

export const getIndustryBySlug = cache(async (slug) => {
  try {
    const data = await fetchGraphQL(print(GET_INDUSTRY_BY_SLUG), { slug });
    return data?.industries?.nodes?.[0] || null;
  } catch {
    return null;
  }
});

export const getPageBySlug = cache(async (slug) => {
  try {
    const data = await fetchGraphQL(print(GET_PAGE_BY_SLUG), { slug });
    return data?.pages?.nodes?.[0] || null;
  } catch {
    return null;
  }
});
