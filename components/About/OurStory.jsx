import Link from "next/link"
import Image from "next/image"

export default function OurStory(){
    return(
        <>
            <div className="bg-[#F8F8F3] pt-[90px] lg:pt-[100px]  pb-[60px]  lg:pb-[120px]">
                <div className="container mx-auto 2xl:px-[0] px-[20px]">
                    <div className="flex flex-col lg:flex-row  gap-[40px] lg:gap-[8.45%]">
                        <div className="w-full lg:w-[40.7%]">
                            <div className="top-title mb-[20px]">[ OUR STORY ]</div>
                            <h2 className="font-manrope text-[28px] leading-[30px] lg:text-[40px] lg:leading-[50px] mb-[20px]">A Journey of Innovation and Trusted Partnerships</h2>
                            <p className="font-manrope text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] mb-[56px] font-medium">From our early days as a small development team in Canada to becoming a preferred technology provider for operators across:</p>
                            
                            <ul>
                                <li className="flex uppercase font-jetbrains flex-wrap items-center gap-[24px] border-b-[1px] border-[#08090D33] pb-[20px] border-dashed mb-[20px]">
                                    <svg
                                    width={40}
                                    height={40}
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    {" "}
                                    <g clipPath="url(#clip0_174_4734)">
                                        {" "}
                                        <path
                                        d="M17.5 26.25L20 20H15L17.5 13.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M8.75 33.75V8.75C8.75 8.08696 9.01339 7.45107 9.48223 6.98223C9.95107 6.51339 10.587 6.25 11.25 6.25H23.75C24.413 6.25 25.0489 6.51339 25.5178 6.98223C25.9866 7.45107 26.25 8.08696 26.25 8.75V33.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M5 33.75H30"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M26.25 17.5H30C30.663 17.5 31.2989 17.7634 31.7678 18.2322C32.2366 18.7011 32.5 19.337 32.5 20V26.25C32.5 26.913 32.7634 27.5489 33.2322 28.0178C33.7011 28.4866 34.337 28.75 35 28.75C35.663 28.75 36.2989 28.4866 36.7678 28.0178C37.2366 27.5489 37.5 26.913 37.5 26.25V13.5359C37.5001 13.2074 37.4354 12.8821 37.3096 12.5786C37.1839 12.2751 36.9996 11.9994 36.7672 11.7672L33.75 8.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                    </g>{" "}
                                    <defs>
                                        {" "}
                                        <clipPath id="clip0_174_4734">
                                        {" "}
                                        <rect width={40} height={40} fill="white" />{" "}
                                        </clipPath>{" "}
                                    </defs>{" "}
                                    </svg>
                                    <span>Deep industry understanding</span>
                                </li>
                                <li className="flex uppercase font-jetbrains flex-wrap items-center gap-[24px] border-b-[1px] border-[#08090D33] pb-[20px] border-dashed mb-[20px]">
                                    <svg
                                    width={40}
                                    height={40}
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    {" "}
                                    <g clipPath="url(#clip0_174_4734)">
                                        {" "}
                                        <path
                                        d="M17.5 26.25L20 20H15L17.5 13.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M8.75 33.75V8.75C8.75 8.08696 9.01339 7.45107 9.48223 6.98223C9.95107 6.51339 10.587 6.25 11.25 6.25H23.75C24.413 6.25 25.0489 6.51339 25.5178 6.98223C25.9866 7.45107 26.25 8.08696 26.25 8.75V33.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M5 33.75H30"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M26.25 17.5H30C30.663 17.5 31.2989 17.7634 31.7678 18.2322C32.2366 18.7011 32.5 19.337 32.5 20V26.25C32.5 26.913 32.7634 27.5489 33.2322 28.0178C33.7011 28.4866 34.337 28.75 35 28.75C35.663 28.75 36.2989 28.4866 36.7678 28.0178C37.2366 27.5489 37.5 26.913 37.5 26.25V13.5359C37.5001 13.2074 37.4354 12.8821 37.3096 12.5786C37.1839 12.2751 36.9996 11.9994 36.7672 11.7672L33.75 8.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                    </g>{" "}
                                    <defs>
                                        {" "}
                                        <clipPath id="clip0_174_4734">
                                        {" "}
                                        <rect width={40} height={40} fill="white" />{" "}
                                        </clipPath>{" "}
                                    </defs>{" "}
                                    </svg>
                                    <span>Real-world customer feedback</span>
                                </li>
                                <li className="flex uppercase font-jetbrains flex-wrap items-center gap-[24px] border-b-[1px] border-[#08090D33] pb-[20px] border-dashed mb-[20px]">
                                    <svg
                                    width={40}
                                    height={40}
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    {" "}
                                    <g clipPath="url(#clip0_174_4734)">
                                        {" "}
                                        <path
                                        d="M17.5 26.25L20 20H15L17.5 13.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M8.75 33.75V8.75C8.75 8.08696 9.01339 7.45107 9.48223 6.98223C9.95107 6.51339 10.587 6.25 11.25 6.25H23.75C24.413 6.25 25.0489 6.51339 25.5178 6.98223C25.9866 7.45107 26.25 8.08696 26.25 8.75V33.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M5 33.75H30"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M26.25 17.5H30C30.663 17.5 31.2989 17.7634 31.7678 18.2322C32.2366 18.7011 32.5 19.337 32.5 20V26.25C32.5 26.913 32.7634 27.5489 33.2322 28.0178C33.7011 28.4866 34.337 28.75 35 28.75C35.663 28.75 36.2989 28.4866 36.7678 28.0178C37.2366 27.5489 37.5 26.913 37.5 26.25V13.5359C37.5001 13.2074 37.4354 12.8821 37.3096 12.5786C37.1839 12.2751 36.9996 11.9994 36.7672 11.7672L33.75 8.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                    </g>{" "}
                                    <defs>
                                        {" "}
                                        <clipPath id="clip0_174_4734">
                                        {" "}
                                        <rect width={40} height={40} fill="white" />{" "}
                                        </clipPath>{" "}
                                    </defs>{" "}
                                    </svg>
                                    <span>Purpose-built engineering</span>
                                </li>
                                <li className="flex uppercase font-jetbrains flex-wrap items-center gap-[24px] border-b-[1px] border-[#08090D33] pb-[20px] border-dashed mb-[20px]">
                                    <svg
                                    width={40}
                                    height={40}
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    {" "}
                                    <g clipPath="url(#clip0_174_4734)">
                                        {" "}
                                        <path
                                        d="M17.5 26.25L20 20H15L17.5 13.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M8.75 33.75V8.75C8.75 8.08696 9.01339 7.45107 9.48223 6.98223C9.95107 6.51339 10.587 6.25 11.25 6.25H23.75C24.413 6.25 25.0489 6.51339 25.5178 6.98223C25.9866 7.45107 26.25 8.08696 26.25 8.75V33.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M5 33.75H30"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                        <path
                                        d="M26.25 17.5H30C30.663 17.5 31.2989 17.7634 31.7678 18.2322C32.2366 18.7011 32.5 19.337 32.5 20V26.25C32.5 26.913 32.7634 27.5489 33.2322 28.0178C33.7011 28.4866 34.337 28.75 35 28.75C35.663 28.75 36.2989 28.4866 36.7678 28.0178C37.2366 27.5489 37.5 26.913 37.5 26.25V13.5359C37.5001 13.2074 37.4354 12.8821 37.3096 12.5786C37.1839 12.2751 36.9996 11.9994 36.7672 11.7672L33.75 8.75"
                                        stroke="#08090D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />{" "}
                                    </g>{" "}
                                    <defs>
                                        {" "}
                                        <clipPath id="clip0_174_4734">
                                        {" "}
                                        <rect width={40} height={40} fill="white" />{" "}
                                        </clipPath>{" "}
                                    </defs>{" "}
                                    </svg>
                                    <span>Long-term relationships</span>
                                </li>
                                </ul>


                        </div>
                        <div className="w-full lg:w-[50.85%]">
                            <Image 
                                width={671}
                                height={536}
                                className="w-full object-cover rounded-[8px]"
                                src="https://staging.hellonotionhive.com/wordpress/infonet/wp-content/uploads/2026/01/about.png"
                                alt="Our Story" 
                                style={{ width: "auto", height: "auto" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}