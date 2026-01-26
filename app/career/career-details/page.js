import CareerDetailsContent from "@/components/Career/CareerDetails";
import CareerDetailsSidebar from "@/components/Career/CareerDetailsSidebar";
import CareerHeader from "@/components/Career/CareerHeader";

export default function CareerDetails() {
    return (
        <>
            <div className="pt-[68px] pb-[80px] sm:pb-[150px] lg:pb-[350px] bg-[#F8F8F3]">
                <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
                    <div className="flex flex-wrap lg:gap-0 gap-10">
                        <div className="w-full lg:w-[60%]">
                            <CareerHeader />
                            <CareerDetailsContent />
                        </div>
                        <div className="w-full lg:w-[40%]">
                            <CareerDetailsSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}