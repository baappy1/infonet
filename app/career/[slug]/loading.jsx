import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";

export default function CareerDetailLoading() {
  return (
    <div className="bg-[#F8F8F3]">
      <IndustryBannerSkeleton />
      <IndustryContentSkeleton />
    </div>
  );
}
