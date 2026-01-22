import Image from "next/image";

export default function WhyWorkCard( {className} ) {
    return(
        <>
            <div className={`p-7.5 ${className}`}>
                <div className="mb-7.5">
                    <Image width={190} height={127} className="rounded-4xl w-47.5 h-31.75" src="/assets/career/feature-image.png" alt="Why Work Card" />
                </div>
            </div>
        </>
    )
}