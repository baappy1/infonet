export default function WhyMattersCard({ className,cardImage,cardDescription }){
    return(
        <>
            <div className={`${className}`}>
                { cardImage &&
                <div className="mb-6">
                    <img src={cardImage} alt="Card Image" className="w-15 h-15 mx-auto" width={60} height={60} />
                </div> }
                { cardDescription &&
                <p className="text-[14px] leading-5 font-medium font-manrope text-center">
                    {cardDescription}
                </p> }
            </div>
        </>
    )
}