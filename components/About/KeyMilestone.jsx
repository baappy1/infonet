import Image from "next/image"
import KeyMilestoneCard from "./KeyMilestoneCard"

export default function KeyMilestone(){
    return(
        <>
            <div className="pl-[10px] pr-[10px]">
                <div className="pt-22.5 lg:pt-38.5 pb-22.5 lg:pb-38.5 bg-[#083630] relative">
                    <div style={{backgroundImage: `url('/assets/key.webp')`, backgroundSize: 'contain', backgroundPosition: 'center'}} className="absolute top-0 left=0 w-full h-full"></div>
                    <div className="container px-5 lg:px-0">
                        <h2 className="mb-15 lg:mb-25 text-center text-[40px] text-white leading-[50px] font-manrope">Key Milestones</h2>
                        <div className="flex flex-wrap gap-[22px]">
                            <KeyMilestoneCard
                                className="lg:w-[calc(25%-16.5px)] sm:w-[calc(50%-11px)] w-full"
                                ImageURL = "/assets/about/01.png"
                                title = "Early 2000s"
                                description="Launched first-generation POS and back-office solutions"
                            />
                            <KeyMilestoneCard
                                className="lg:w-[calc(25%-16.5px)] sm:w-[calc(50%-11px)] w-full"
                                ImageURL = "/assets/about/01.png"
                                title = "Early 2001s"
                                description="Launched first-generation POS and back-office solutions"
                            />
                            <KeyMilestoneCard
                                className="lg:w-[calc(25%-16.5px)] sm:w-[calc(50%-11px)] w-full"
                                ImageURL = "/assets/about/01.png"
                                title = "Early 2000s"
                                description="Launched first-generation POS and back-office solutions"
                            />
                            <KeyMilestoneCard
                                className="lg:w-[calc(25%-16.5px)] sm:w-[calc(50%-11px)] w-full"
                                ImageURL = "/assets/about/01.png"
                                title = "Early 2000s"
                                description="Launched first-generation POS and back-office solutions"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


