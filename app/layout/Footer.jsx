import Link from "next/link";
import MenuLink from "./MenuList";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionArrow = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="accordion-arrow transition-transform duration-300 data-[state=open]:rotate-180"
  >
    <g clipPath="url(#clip0_100_1245)">
      <path
        d="M8 2.5L8 13.5"
        stroke="#08090D"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 9.80005L8 14.3L3.5 9.80005"
        stroke="#08090D"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </g>
    <defs>
      <clipPath id="clip0_100_1245">
        <rect
          width={16}
          height={16}
          fill="white"
          transform="matrix(0 1 -1 0 16 0)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default function Footer() {
  return (
    <>
      <div className="p-[10px] pt-[0] sm:bg-white bg-[#F8F8F3]">
        <div
          className="w-full pt-[0] sm:pt-[50px] rounded-bl-[8px] rounded-br-[8px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #F8F8F3 23.14%, #EBFF3A 100%)",
          }}
        >
          <div className="pl-[10px] pr-[10px] sm:pl-[0] sm:pr-[0]">
            <div className="font-manrope text-center mb-[20px] text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px]">
              Ready to Transform Your Business?
            </div>
            <div className="mx-auto pb-[30px] text-center max-w-[649px] font-manrope font-medium text-[14px] leading-[20px] lg:text-[16px] lg:leading-[22px] opacity-80">
              Whether you’re managing fuel stations, convenience stores, or
              fleet operations, InfoNet provides the technology solutions that
              simplify operations
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-[8px]">
              <Link className="primary-button justify-center" href="/contact">
                <span className="font-medium leading-[22px]">
                  Request a Demo
                </span>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_433_8)">
                    <path
                      d="M3.125 10H16.875"
                      stroke="#08090D"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.25 4.375L17.875 10L12.25 15.625"
                      stroke="#08090D"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_433_8">
                      <rect width={20} height={20} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
              <Link
                className="inline-flex w-auto justify-center items-center gap-[10px] px-6 py-[15px] uppercase rounded-[4px] transition-colors duration-200 bg-white hover:bg-[#ebff3a]"
                href="/contact"
              >
                <span className="font-medium leading-[22px]">get in touch</span>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_433_8)">
                    <path
                      d="M3.125 10H16.875"
                      stroke="#08090D"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.25 4.375L17.875 10L12.25 15.625"
                      stroke="#08090D"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_433_8">
                      <rect width={20} height={20} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>

          <div className="px-[10px] sm:px-[40px] pb-2.5  lg:pb-12.5  pt-[90px] sm:pt-[150px]">
            <div className="bg-white p-[20px] sm:p-[70px] sm:pb-[48px] pb-[20px] rounded-[8px]">
              <div className="pb-[0] sm:pb-[30px] sm:pb-[78px] border-dashed sm:border-b-[1px] border-[#08090D]/10 flex flex-wrap 2xl:flex-nowrap gap-[0] sm:gap-[50px] 2xl:gap-[0] 2xl:justify-between">
                <div className="flex flex-col hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Industries
                  </h4>
                  <MenuLink MenuLink="#" MenuTitle="Retail Gas Stations" />
                  <MenuLink MenuLink="#" MenuTitle="Convenience Stores" />
                  <MenuLink MenuLink="#" MenuTitle="Unattended Fuel Sites" />
                  <MenuLink MenuLink="#" MenuTitle="Fleet Fueling" />
                  <MenuLink MenuLink="#" MenuTitle="First Nations Retail" />
                </div>

                <div className="flex flex-col hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Solutions
                  </h4>
                  <MenuLink MenuLink="#" MenuTitle="C-Store Commander" />
                  <MenuLink MenuLink="#" MenuTitle="Fuel Commander" />
                  <MenuLink MenuLink="#" MenuTitle="Custom Software" />
                </div>

                <div className="flex flex-col hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Services
                  </h4>
                  <MenuLink MenuLink="#" MenuTitle="Installation & Training" />
                  <MenuLink MenuLink="#" MenuTitle="Hardware Sourcing" />
                </div>

                <div className="flex flex-col  hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Insights
                  </h4>
                  <MenuLink MenuLink="#" MenuTitle="News & Blog" />
                  <MenuLink MenuLink="#" MenuTitle="Events" />
                  <MenuLink MenuLink="#" MenuTitle="Resources" />
                </div>

                <div className="flex flex-col  hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Company
                  </h4>
                  <MenuLink MenuLink="#" MenuTitle="About Us" />
                  <MenuLink MenuLink="#" MenuTitle="Leadership Team" />
                  <MenuLink MenuLink="#" MenuTitle="Affiliations & Partners" />
                  <MenuLink MenuLink="#" MenuTitle="Careers" />
                </div>

                <div className="flex flex-col  hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    contact us
                  </h4>
                  <MenuLink MenuLink="#" MenuTitle="Contact" />
                  <MenuLink MenuLink="#" MenuTitle="Book a Demo" />
                  <MenuLink MenuLink="#" MenuTitle="Faq" />
                </div>

                <div className="flex flex-col  hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Socials
                  </h4>
                  <MenuLink MenuLink="#" MenuTitle="X (Twitter)" />
                  <MenuLink MenuLink="#" MenuTitle="LinkedIn" />
                  <MenuLink MenuLink="#" MenuTitle="Facebook" />
                  <MenuLink MenuLink="#" MenuTitle="Instagram" />
                  <MenuLink MenuLink="#" MenuTitle="YouTube" />
                </div>

                <Accordion
                  type="multiple"
                  className="w-full sm:hidden py-[20px] border-b-[1px] border-dashed border-[#08090D33]"
                >
                  <AccordionItem value="industries">
                    <AccordionTrigger className="flex hide-default-arrow justify-between uppercase p-[0]">
                      <span>Solutions</span>
                      <AccordionArrow />
                    </AccordionTrigger>

                    <AccordionContent className="pb-[0]">
                      <div className="flex flex-col pt-[20px] pb-[0]">
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Retail Gas Stations"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Convenience Stores" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Unattended Fuel Sites"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Fleet Fueling" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="First Nations Retail"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion
                  type="multiple"
                  className="w-full sm:hidden py-[20px] border-b-[1px] border-dashed border-[#08090D33]"
                >
                  <AccordionItem value="Services">
                    <AccordionTrigger className="flex hide-default-arrow justify-between uppercase p-[0]">
                      <span>Services</span>
                      <AccordionArrow />
                    </AccordionTrigger>

                    <AccordionContent className="pb-[0]">
                      <div className="flex flex-col pt-[20px] pb-[0]">
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Retail Gas Stations"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Convenience Stores" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Unattended Fuel Sites"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Fleet Fueling" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="First Nations Retail"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion
                  type="multiple"
                  className="w-full sm:hidden py-[20px] border-b-[1px] border-dashed border-[#08090D33]"
                >
                  <AccordionItem value="Insights">
                    <AccordionTrigger className="flex hide-default-arrow justify-between uppercase p-[0]">
                      <span>Insights</span>
                      <AccordionArrow />
                    </AccordionTrigger>

                    <AccordionContent className="pb-[0]">
                      <div className="flex flex-col pt-[20px] pb-[0]">
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Retail Gas Stations"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Convenience Stores" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Unattended Fuel Sites"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Fleet Fueling" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="First Nations Retail"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion
                  type="multiple"
                  className="w-full sm:hidden py-[20px] border-b-[1px] border-dashed border-[#08090D33]"
                >
                  <AccordionItem value="Company">
                    <AccordionTrigger className="flex hide-default-arrow justify-between uppercase p-[0]">
                      <span>Company</span>
                      <AccordionArrow />
                    </AccordionTrigger>

                    <AccordionContent className="pb-[0]">
                      <div className="flex flex-col pt-[20px] pb-[0]">
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Retail Gas Stations"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Convenience Stores" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Unattended Fuel Sites"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Fleet Fueling" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="First Nations Retail"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion
                  type="multiple"
                  className="w-full sm:hidden py-[20px] border-b-[1px] border-dashed border-[#08090D33]"
                >
                  <AccordionItem value="contact us">
                    <AccordionTrigger className="flex hide-default-arrow justify-between uppercase p-[0]">
                      <span>contact us</span>
                      <AccordionArrow />
                    </AccordionTrigger>

                    <AccordionContent className="pb-[0]">
                      <div className="flex flex-col pt-[20px] pb-[0]">
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Retail Gas Stations"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Convenience Stores" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Unattended Fuel Sites"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Fleet Fueling" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="First Nations Retail"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion
                  type="multiple"
                  className="w-full sm:hidden py-[20px] border-b-[1px] border-dashed border-[#08090D33]"
                >
                  <AccordionItem value="Socials">
                    <AccordionTrigger className="flex hide-default-arrow justify-between uppercase p-[0]">
                      <span>Socials</span>
                      <AccordionArrow />
                    </AccordionTrigger>

                    <AccordionContent className="pb-[0]">
                      <div className="flex flex-col pt-[20px] pb-[0]">
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Retail Gas Stations"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Convenience Stores" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="Unattended Fuel Sites"
                        />
                        <MenuLink MenuLink="#" MenuTitle="Fleet Fueling" />
                        <MenuLink
                          MenuLink="#"
                          MenuTitle="First Nations Retail"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="pt-[30px] mb-[20px]">
                <Image
                  width={158}
                  height={50}
                  src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/infonetLogo.png"
                  className="w-[127px] sm:w-[158px]"
                  alt="Infonet Logo"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              <div className="flex-col md:flex-row  flex-wrap 2xl:flex-no-wrap gap-[10px] flex justify-between">
                <div className="text-[14px] leading-[20px] opacity-[40%] font-medium font-manrope">
                  &copy;{new Date().getFullYear()} InfoNet Technology
                  Corporation. All rights reserved.
                </div>
                <MenuLink
                  MenuLink="#"
                  MenuClass="opacity-[40%]"
                  MenuTitle="Privacy Policy"
                />
                <MenuLink
                  MenuLink="#"
                  MenuClass="opacity-[40%]"
                  MenuTitle="Terms & Conditions"
                />
                <MenuLink
                  MenuLink="#"
                  MenuClass="opacity-[40%]"
                  MenuTitle="Subscribe"
                />
                <div className="font-manrope text-[14px] leading-[20px] font-medium">
                  <span className="opacity-[40%]">Site by</span>{" "}
                  <Link href="#" className="hover:underline">
                    Notionhive
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
