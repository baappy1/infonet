import SolutionDetailsPage from "@/app/solutions/[slug]/page";
import { getSolutionSeoMetadata } from "@/lib/seo";

// Render same content at /solution/[slug] (singular) and /solutions/[slug] (plural)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return {};
  return getSolutionSeoMetadata(slug);
}

export default SolutionDetailsPage;
