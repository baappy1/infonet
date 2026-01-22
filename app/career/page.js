import Banner from "@/components/Banner";
import WhyWork from "@/components/Career/WhyWork";

export default function Career() {
    return (
        <div>
            <Banner
                bannerTopTitle="[ career ]"
                bannerImage="/assets/banner.webp"
                bannerTitle="Build the Future of Retail & Fuel Technology with Us"
                bannerDescription="Join a passionate, forward-thinking team at InfoNet, where we design and deliver powerful, integrated software systems that drive innovation across the fuel, convenience store, and unattended retail sectors."
                bannerButtonTitle="view open positions"
                bannerButtonURL="#"
            />
            <WhyWork />
        </div>
    )
}