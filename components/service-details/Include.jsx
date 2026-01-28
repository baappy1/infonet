import IncludeCard from "./IncludeCard";

export default function Include() {
    return (
        <>
            <div className="pt-20 lg:pt-25 pb-20 lg:pb-30 bg-[#F8F8F3]">
                <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">

                    <div className="flex flex-wrap lg:flex-row flex-col justify-between">
                        <div className="w-full lg:w-[40.7%] sm:mb-0 mb-10">
                            <div className="top-title mb-5">
                                [ what includes ]
                            </div>
                            <h2 className="heading-h2 mb-5">
                                What We Set Up for Your Success
                            </h2>
                            <p className="paragraph-text mb-5">Get a complete, end-to-end service that ensures your systems are installed, configured, and running flawlessly from day one.We handle the technical work so you can focus on running your business with confidence and clarity.</p>
                            <a className=" inline-flex lg:px-4 px-4 py-3 lg:py-4 text-[14px] leading-4.5 font-medium box-border rounded-sm bg-[#EBFF3A] transition duration-150 hover:bg-white hover:text-[#08090D] uppercase gap-[10px] sm:mb-10" href="/contact"><span className="font-medium  sm:leading-[18px] text-[14px]">more about us</span><svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_433_8)"><path d="M3.125 10H16.875" stroke="#08090D" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path><path d="M12.25 4.375L17.875 10L12.25 15.625" stroke="#08090D" stroke-width="1.5" stroke-linecap="square"></path></g><defs><clipPath id="clip0_433_8"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg></a>
                        </div>

                        <div className="w-full lg:w-[41%]">
                            <ul className="w-full">
                                <IncludeCard
                                    CardIcon="/assets/service-details/includes/01.svg"
                                    CardTitle="Site System Setup"
                                    CardDescription="POS, pump controllers, EMV modules, forecourt devices."
                                />
                                <IncludeCard
                                    CardIcon="/assets/service-details/includes/02.svg"
                                    CardTitle="Software Configuration"
                                    CardDescription="Pricing, inventory, user roles, taxes, loyalty integrations."
                                />
                                <IncludeCard
                                    CardIcon="/assets/service-details/includes/03.svg"
                                    CardTitle="Staff Training"
                                    CardDescription="Cashiers, managers, forecourt staff, and site owners."
                                />
                                <IncludeCard
                                    CardIcon="/assets/service-details/includes/04.svg"
                                    CardTitle="System Testing & Verification"
                                    CardDescription="Pump authorization, POS operations, reporting, network tests."
                                />
                                <IncludeCard
                                    CardIcon="/assets/service-details/includes/05.svg"
                                    CardTitle="Go-Live Support"
                                    CardDescription="Hands-on assistance during launch day."
                                />
                                <IncludeCard
                                    CardIcon="/assets/service-details/includes/05.svg"
                                    CardTitle="Post-Installation Follow-Up"
                                    CardDescription="Ensure everything runs smoothly after deployment."
                                />
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}