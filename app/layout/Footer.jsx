import Image from "next/image";
import Link from "next/link";
import MenuLink from "./MenuList";

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

const FOOTER_FALLBACKS = {
  industries: [
    { label: "Retail Gas Stations", url: "#" },
    { label: "Convenience Stores", url: "#" },
    { label: "Unattended Fuel Sites", url: "#" },
    { label: "Fleet Fueling", url: "#" },
    { label: "First Nations Retail", url: "#" },
  ],
  solutions: [
    { label: "C-Store Commander", url: "#" },
    { label: "Fuel Commander", url: "#" },
    { label: "Custom Software", url: "#" },
  ],
  services: [
    { label: "Installation & Training", url: "#" },
    { label: "Hardware Sourcing", url: "#" },
  ],
  insights: [
    { label: "News & Blog", url: "#" },
    { label: "Events", url: "#" },
    { label: "Resources", url: "#" },
  ],
  company: [
    { label: "About Us", url: "#" },
    { label: "Leadership Team", url: "#" },
    { label: "Affiliations & Partners", url: "#" },
    { label: "Careers", url: "#" },
  ],
  contact: [
    { label: "Contact", url: "#" },
    { label: "Book a Demo", url: "#" },
    { label: "Faq", url: "#" },
  ],
  social: [
    { label: "X (Twitter)", url: "#" },
    { label: "LinkedIn", url: "#" },
    { label: "Facebook", url: "#" },
    { label: "Instagram", url: "#" },
    { label: "YouTube", url: "#" },
  ],
};

function useItems(items, key) {
  return items?.length > 0 ? items : FOOTER_FALLBACKS[key] || [];
}

export default function Footer({ footerMenus = {}, themeOptions = {} }) {
  const footerLogo = themeOptions?.footerLogo || "/assets/infonetLogo.svg";
  const copyrightText = themeOptions?.copyrightText || "InfoNet Technology Corporation. All rights reserved.";
  const footerTitle = themeOptions?.footerTitle || "Ready to Transform Your Business?";
  const footerShortDescription = themeOptions?.footerShortDescription || "Whether you're managing fuel stations, convenience stores, or fleet operations, InfoNet provides the technology solutions that simplify operations";
  const footerButtonTitle = themeOptions?.footerButtonTitle || "Request a Demo";
  const footerButtonUrl = themeOptions?.footerButtonUrl || "/contact";
  const footerButtonTitleTwo = themeOptions?.footerButtonTitleTwo || "get in touch";
  const footerButtonUrlTwo = themeOptions?.footerButtonUrlTwo || "/contact";

  const industriesItems = useItems(footerMenus.industries, "industries");
  const solutionsItems = useItems(footerMenus.solutions, "solutions");
  const servicesItems = useItems(footerMenus.services, "services");
  const insightsItems = useItems(footerMenus.insights, "insights");
  const companyItems = useItems(footerMenus.company, "company");
  const contactItems = useItems(footerMenus.contact, "contact");
  const socialItems = useItems(footerMenus.social, "social");

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
              {footerTitle}
            </div>
            <div className="mx-auto pb-[30px] text-center max-w-[649px] font-manrope font-medium text-[14px] leading-[20px] lg:text-[16px] lg:leading-[22px] opacity-80">
              {footerShortDescription}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-[8px]">
              <Link className="primary-button justify-center" href={footerButtonUrl}>
                <span className="font-medium leading-[22px]">
                  {footerButtonTitle}
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
                href={footerButtonUrlTwo}
              >
                <span className="font-medium leading-[22px]">{footerButtonTitleTwo}</span>
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
                  {industriesItems.map((item, i) => (
                    <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                  ))}
                </div>

                <div className="flex flex-col hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Solutions
                  </h4>
                  {solutionsItems.map((item, i) => (
                    <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                  ))}
                </div>

                <div className="flex flex-col hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Services
                  </h4>
                  {servicesItems.map((item, i) => (
                    <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                  ))}
                </div>

                <div className="flex flex-col  hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Insights
                  </h4>
                  {insightsItems.map((item, i) => (
                    <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                  ))}
                </div>

                <div className="flex flex-col  hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Company
                  </h4>
                  {companyItems.map((item, i) => (
                    <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                  ))}
                </div>

                <div className="flex flex-col  hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    contact us
                  </h4>
                  {contactItems.map((item, i) => (
                    <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                  ))}
                </div>

                <div className="flex flex-col  hidden sm:flex">
                  <h4 className="mb-[30px] leading-[22px] uppercase">
                    Socials
                  </h4>
                  {socialItems.map((item, i) => (
                    <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                  ))}
                </div>

                <Accordion
                  type="multiple"
                  className="w-full sm:hidden py-[20px] border-b-[1px] border-dashed border-[#08090D33]"
                >
                  <AccordionItem value="industries">
                    <AccordionTrigger className="flex hide-default-arrow justify-between uppercase p-[0]">
                      <span>Industries</span>
                      <AccordionArrow />
                    </AccordionTrigger>

                    <AccordionContent className="pb-[0]">
                      <div className="flex flex-col pt-[20px] pb-[0]">
                        {industriesItems.map((item, i) => (
                          <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion
                  type="multiple"
                  className="w-full sm:hidden py-[20px] border-b-[1px] border-dashed border-[#08090D33]"
                >
                  <AccordionItem value="Solutions">
                    <AccordionTrigger className="flex hide-default-arrow justify-between uppercase p-[0]">
                      <span>Solutions</span>
                      <AccordionArrow />
                    </AccordionTrigger>

                    <AccordionContent className="pb-[0]">
                      <div className="flex flex-col pt-[20px] pb-[0]">
                        {solutionsItems.map((item, i) => (
                          <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                        ))}
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
                        {servicesItems.map((item, i) => (
                          <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                        ))}
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
                        {insightsItems.map((item, i) => (
                          <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                        ))}
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
                        {companyItems.map((item, i) => (
                          <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                        ))}
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
                        {contactItems.map((item, i) => (
                          <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                        ))}
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
                        {socialItems.map((item, i) => (
                          <MenuLink key={i} MenuLink={item.url} MenuTitle={item.label} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="pt-[30px] mb-[20px]">
                <Link href="/">
                  <Image
                    width={158}
                    height={50}
                    src={footerLogo}
                    className="w-[127px] sm:max-w-[158px]"
                    alt="Infonet Logo"
                    style={{ width: "auto", height: "auto" }}
                  />
                </Link>
              </div>

              <div className="flex-col md:flex-row  flex-wrap 2xl:flex-no-wrap gap-[10px] flex justify-between">
                <div className="text-[14px] leading-[20px] opacity-[40%] font-medium font-manrope">
                  &copy;{new Date().getFullYear()} {copyrightText}
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
