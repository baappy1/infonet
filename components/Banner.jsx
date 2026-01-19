import Link from 'next/link';

export default function Banner( {bannerTopTitle,bannerImage,bannerTitle,bannerDescription,bannerButtonTitle,bannerButtonURL} ){
    return(
        <>
            <div className="banner pt-[10px] pl-[10px] pr-[10px] h-screen">
                <div className='h-full rounded-[8px]'  style={{backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container h-full mx-auto pb-[10px] lg:pb-[120px] pl-[10px] pr-[10px] 2xl:pl-[0] 2xl:pr-[0]">
                        <div className="flex flex-wrap items-end h-full">
                            <div className="w-full flex flex-col">
                                <div className='p-[20px] lg:p-[30px] rounded-[8px] bg-[#08090D]/10 backdrop-blur-[30px] w-full xl:w-[620px]'>
                                    { bannerTopTitle &&
                                        <div className='top-title text-white mb-[20px]'>{bannerTopTitle}</div>
                                    }
                                    {bannerTitle &&
                                        <div className='heading-h1 text-white mb-[20px] text-[36px] leading-[40px] xl:text-[50px] xl:leading-[60px] font-manrope'>
                                            { bannerTitle }
                                        </div>
                                    }

                                    { bannerDescription &&
                                    <p  
                                        className='text-white font-manrope mb-[20px] text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] font-medium'>
                                        {bannerDescription}
                                    </p>
                                    }

                                    { bannerButtonURL &&
                                    <Link href={bannerButtonURL} className='primary-button text-[14px] lg:text-[16px] leading-[18px] font-medium lg:leading-[22px]'>
                                        <span>{bannerButtonTitle}</span>
                                        <svg
                                            className='w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]'
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <g clipPath="url(#clip0_456_280)">
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
                                                <clipPath id="clip0_456_280">
                                                <rect width={20} height={20} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </Link>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}