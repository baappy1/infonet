import CultureAndValues from "@/components/About/CultureAndValues";
import LeadershipTeam from "@/components/About/LeadershipTeam";
import OurExperts from "@/components/About/OurExperts";
import Banner from "@/components/Banner";
import React from "react";

const Leadership = () => {
  return (
    <>
      <Banner
        bannerTopTitle="[ Team ]"
        bannerImage="/assets/leadership-banner.png"
        bannerTitle="Celebrating the People Behind Infonet"
        bannerDescription="At Infonet, our strength lies in our people. From visionary leaders to passionate innovators, every member of our team plays a vital role in shaping the future of technology and service excellence."
        bannerButtonTitle="Our Leadership Team"
        bannerButtonURL="#"
      />
      <LeadershipTeam />
      <OurExperts />
      <CultureAndValues />
    </>
  );
};

export default Leadership;
