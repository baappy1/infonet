import IndustryBannerSkeleton from "@/components/industries/IndustryBannerSkeleton";
import IndustryContentSkeleton from "@/components/industries/IndustryContentSkeleton";

export default function CareerLoading() {
  return (
    <div className="bg-[#f8f8f3]">
      <IndustryBannerSkeleton />
      <IndustryContentSkeleton />
    </div>
  );
}
