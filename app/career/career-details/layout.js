import CareerDetailsHeader from "./CareerDetailsHeader";
import Footer from "../../layout/Footer";

export default function CareerDetailsLayout({ children }) {
  return (
    <>
      <CareerDetailsHeader />
      {children}
      <Footer/>
    </>
  );
}
