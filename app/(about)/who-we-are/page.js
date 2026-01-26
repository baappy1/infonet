import Banner from "@/components/Banner";
import MissionVision from "@/components/About/MissionVission";
import OurStory from "@/components/About/OurStory";
import KeyMilestone from "@/components/About/KeyMilestone";
import OurValues from "@/components/About/OurValues";
import OurImpact from "@/components/About/OurImpact";
import Testimonial from "@/components/About/Testimonial";

export default function About() {
  return (
    <>
      <Banner
        bannerTopTitle="[ Who We Are ]"
        bannerImage="/assets/about-banner.webp"
        bannerTitle="Fueling the Future of Retail & Forecourt Technology"
        bannerDescription="Infonet Technology creates intelligent, dependable, and secure solutions that empower fuel stations, convenience stores, and unattended fueling throughout North America."
        bannerButtonTitle="explore our services"
        bannerButtonURL="#"
      />
      <MissionVision />
      <OurStory />
      <KeyMilestone />
      <OurValues />
      <OurImpact />
      <Testimonial />
    </>
  );
}
