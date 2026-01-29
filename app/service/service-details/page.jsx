import Banner from "@/components/Banner";
import ProcessDefault from "@/components/service-details/process";
import Include from "@/components/service-details/Include";
import InfiniteSlider from "@/components/Home/LogoSlider";
import OurImpactSolutions from "@/components/solutions/OurImpactSolutions";
import LifeInfoNet from "@/components/service-details/LifeInfoNet";
import Testimonial from "@/components/About/Testimonial";
import MoreServices from "@/components/service-details/MoreServices"
import Benefits from "@/components/service-details/Benefits";

export default function ServiceDetails() {
    return (
        <>
            <Banner
                bannerTopTitle="[ Services ]"
                bannerImage="/assets/solutions/Car_Refuel.png"
                bannerTitle="Installation & Training Made Simple"
                bannerDescription="We partner with our customers to provide in depth training and resources to ensure the new point-of-sale or fuel management system roll out is a success. "
                bannerButtonTitle="Request a Demo"
                bannerButtonURL="#"
            />
            <Include />
            <InfiniteSlider />
            <Benefits/>
            <ProcessDefault />
            <LifeInfoNet />
            <OurImpactSolutions />
            <Testimonial />
            <MoreServices/>
        </>
    )
}