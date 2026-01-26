import Banner from "@/components/Banner";
import About from "@/components/Home/About";
import InfiniteSlider from "@/components/Home/LogoSlider";
import MoreIndustries from "@/components/industries/MoreIndustries";
import Reason from "@/components/industries/Reason";
import RetailAbout from "@/components/industries/RetailAbout";
import UseCases from "@/components/solutions/UseCases";
import React from "react";

const IndustryWeServe = () => {
  return (
    <>
      <Banner
        bannerTopTitle="[  Retail Gas Stations  ]"
        bannerImage="/assets/solutions/Car_Refuel.png"
        bannerTitle="Fueling Success for Retail Gas Stations"
        bannerDescription="From the forecourt to the front counter, InfoNet provides gas station operators with the technology to streamline operations, reduce errors, and maximize profitability."
        bannerButtonTitle="Request a Demo"
        bannerButtonURL="#"
      />
      <About />
      <InfiniteSlider />
      <Reason />
      <MoreIndustries />
    </>
  );
};

export default IndustryWeServe;
