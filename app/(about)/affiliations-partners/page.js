import Banner from "@/components/Banner"
import WhyMatters from "@/components/Affiliations/WhyMatters";
import FeatureList from "@/components/Affiliations/FeatureList";
import IntegrationList from "@/components/Affiliations/IntegrationList";

export default function AffiliationsPartners() {
    return (
        <div>
            <Banner 
                bannerTopTitle="[ Affiliations & Partners ]"
                bannerImage="/assets/about-banner.webp" 
                bannerTitle="Connecting with Leaders to Shape the Future of Retail Fueling"
                bannerDescription="InfoNet partners with the top associations and organizations that drive standards, innovation, and best practices across the convenience, petroleum, and retail-technology sectors."
                bannerButtonTitle="explore our services"
                bannerButtonURL="#"
            />
            <WhyMatters />
            <FeatureList />
            <IntegrationList />
        </div>
    )
}