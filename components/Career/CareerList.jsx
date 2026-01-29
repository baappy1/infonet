import CareerListCard from "./CareerListCard"

export default function CareerList(){
    return(
        <>
            <div className="pt-20 sm:pt-27.5 lg:pt-55 pb-20 sm:pb-27.5 lg:pb-55 bg-white">
                <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
                    <div className="w-full sm:w-164.75 sm:mb-0 mb-10">
                        <h2 className="heading-h2 mb-5">
                           Explore Open Roles
                        </h2>
                        <p className="paragraph-text mb-6 sm:mb-11">Whether you’re just starting out or bringing years of experience, explore our current openings.</p>
                    </div>
                    <div className="flex flex-col">
                        <CareerListCard />
                        <CareerListCard/>
                        <CareerListCard/>
                        <CareerListCard/>
                        <CareerListCard/>
                        <CareerListCard/>
                        <CareerListCard/>
                        <CareerListCard/>

                        <div class="mt-10 mx-auto">
                            <button type="button" className="mx-auto inline-flex lg:px-4 px-4 py-3 lg:py-4 text-[14px] leading-4.5 font-medium box-border rounded-sm bg-[#EBFF3A] transition duration-150 hover:bg-white hover:text-[#08090D] uppercase gap-[10px]" id="load-more-roles">
                                <span class="font-medium  sm:leading-[18px] text-[14px]">Load more roles</span><svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_433_8)"><path d="M3.125 10H16.875" stroke="#08090D" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path><path d="M12.25 4.375L17.875 10L12.25 15.625" stroke="#08090D" stroke-width="1.5" stroke-linecap="square"></path></g><defs><clipPath id="clip0_433_8"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-[50px] lg:h-[220px] bg-[#F8F8F3]"></div>
        </>
    )
}