import OurImpact from "@/components/About/OurImpact";
import Testimonial from "@/components/About/Testimonial";
import Banner from "@/components/Banner";
import InfiniteSlider from "@/components/Home/LogoSlider";
import WhyChoose from "@/components/Home/WhyChoose";
import Features from "@/components/solutions/Features";
import MoreSolutions from "@/components/solutions/MoreSolutions";
import OurImpactSolutions from "@/components/solutions/OurImpactSolutions";
import UseCases from "@/components/solutions/UseCases";
import React from "react";

const SolutionDetails = () => {
  return (
    <>
      <Banner
        bannerTopTitle="[ C-Store Commander ]"
        bannerImage="/assets/solutions/Car_Refuel.png"
        bannerTitle="Your All-in-One POS & Retail Management System"
        bannerDescription="A customizable, full-featured point-of-sale and back-office platform built specifically for fuel and convenience retail. Streamline transactions, manage inventory, control pumps, and more — all from a single interface."
        bannerButtonTitle="Request a Demo"
        bannerButtonURL="#"
      />
      <InfiniteSlider />
      <UseCases />
      <Features />
      <OurImpactSolutions />
      <Testimonial />
      <MoreSolutions />
    </>
  );
};

export default SolutionDetails;
