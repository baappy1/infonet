import { client } from "@/lib/graphql/client";
import { GET_CAREER_BY_ID } from "@/lib/graphql/queries";
import { redirect } from "next/navigation";

export default async function CareerDetailsPage({ searchParams }) {
  const params = await searchParams;
  const id = params?.id;

  if (id) {
    try {
      const { data } = await client.query({
        query: GET_CAREER_BY_ID,
        variables: { careerId: Number(id) },
        fetchPolicy: "no-cache",
      });
      const career = data?.careerBy;
      if (career?.slug) {
        redirect(`/career/career-details/${career.slug}`);
      }
    } catch {
      // fall through to redirect
    }
  }

  redirect("/career");
}