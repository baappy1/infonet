import WhyWorkCard from "./WhyWorkCard"

export default function WhyWork() {
    return(
        <>
            <div className="pt-22 lg:pt-35 pb-22 lg:pb-35 bg-[#F8F8F3]">
                <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
                    <div className="w-full sm:w-164.75">
                        <div className="top-title mb-5">
                            [ Why Work Here ]                         
                        </div>
                        <h2 className="heading-h2 mb-5">
                            A Place Where Innovation Meets Real-World Influence
                        </h2>
                        <p className="paragraph-text">At InfoNet, you’re not just building software — you’re shaping the technology that powers fuel stations, retail stores, and critical infrastructure across North America. Your ideas, your code, and your decisions make a measurable impact every single day.</p>
                    </div>
                    <div className="flex flex-wrap">
                       <WhyWorkCard />
                    </div>
                </div>
            </div>
        </>
    )
}