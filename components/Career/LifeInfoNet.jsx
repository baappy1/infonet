import Image from "next/image"

export default function LifeInfoNet() {
    return(
        <>
            <div className="pb-20 lg:pb-55 bg-[#F8F8F3]">
                <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
                    <div className="w-full sm:w-164.75 sm:mb-0 mb-10">
                        <div className="top-title mb-5">
                            [ Life at InfoNet ]                        
                        </div>
                        <h2 className="heading-h2 mb-5">
                            Where Great People Build Great Technology
                        </h2>
                        <p className="paragraph-text mb-8 sm:mb-22.5">At Infonet, our values shape how we build technology, how we support clients, and how we grow alongside the industries we serve.</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-[8px] sm:-mr-[8px] pl-2.5 pr-2.5">
                    <div className="w-full sm:w-[calc(33.33%-8px)] lg:w-[calc(20%-8px)] flex flex-col">
                        <Image className="w-full lg:h-auto h-full object-cover rounded-lg" src="/assets/career/work-station.png" width={374} height={498} alt="Life at InfoNet" />
                    </div>
                    <div className="w-full sm:w-[calc(33.33%-8px)] lg:w-[calc(20%-8px)] flex flex-col">
                        <Image className="w-full lg:h-auto h-full object-cover rounded-lg" src="/assets/career/smile.png" width={374} height={498} alt="Life at InfoNet" />
                    </div>
                    <div className="w-full sm:w-[calc(33.33%-8px)] lg:w-[calc(20%-8px)] flex flex-col">
                        <Image className="w-full lg:h-auto h-full object-cover rounded-lg" src="/assets/career/work-station.png" width={374} height={498} alt="Life at InfoNet" />
                    </div>
                    <div className="w-full sm:w-[calc(33.33%-8px)] lg:w-[calc(20%-8px)] flex flex-col justify-end">
                        <Image className="w-full lg:h-auto h-full object-cover rounded-lg" src="/assets/career/smile.png" width={374} height={498} alt="Life at InfoNet" />
                    </div>
                    <div className="w-full sm:w-[calc(33.33%-8px)] lg:w-[calc(20%-8px)] flex flex-col">
                        <Image className="w-full lg:h-auto h-full object-cover rounded-lg" src="/assets/career/work-station.png" width={374} height={498} alt="Life at InfoNet" />
                    </div>
                </div>
            </div>
        </>
    )
}