export default function OurImpactCard({ className,cardTitle,cardDescription }){
    return(
        <>
            <div className={`bg-white p-4 rounded-[8px] ${className}`}>
                { cardTitle &&
                <h2 className="text-[30px] sm:text-[50px] leading-10 sm:leading-15 mb-4 font-manrope">{cardTitle}</h2> }
                { cardDescription &&
                <p className="text-[16px] leading-5.5 mb-0 font-medium font-manrope">
                    {cardDescription}
                </p> }
            </div>
        </>
    )
}