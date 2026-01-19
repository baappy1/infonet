import Image from "next/image";
import Banner from "../components/Banner"
import InfiniteSlider from "@/components/Home/LogoSlider";
import About from "@/components/Home/About";
import HomeSolution from "@/components/Home/HomeSolution";
import IndustryServe from "@/components/Home/IndustryServe"
import WhyChoose from "@/components/Home/WhyChoose";
import Sustainability from "@/components/Home/Sustainability"
import Testimonial from "@/components/Home/Testimonial"
import Blog from "@/components/Home/Blog"



export default function Home() {
  return (
    <>
      <Banner 
          bannerTopTitle="[ infonet solution ]"
          bannerImage="/assets/banner.webp" 
          bannerTitle="Powering the Future of Fuel & Retail Technology"
          bannerDescription="From gas stations to convenience stores, InfoNet delivers integrated POS and fuel management systems that keep your business running smarter, faster, and more profitably."
          bannerButtonTitle="book a demo"
          bannerButtonURL="#"
      />
      <InfiniteSlider/>
      <About/>
      <HomeSolution/>
      <IndustryServe />
      <WhyChoose/>
      <Sustainability />
      <Testimonial/>
      <Blog/>
    </>
  );
}
