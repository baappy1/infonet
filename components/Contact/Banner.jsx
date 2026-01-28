'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Banner( {bannerTopTitle,bannerImage,bannerTitle,bannerDescription,bannerButtonTitle,bannerButtonURL} ){
    const topTitleRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        
        if (topTitleRef.current) {
            gsap.set(topTitleRef.current, { opacity: 0, y: 30 });
            tl.to(topTitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        }
        
        if (titleRef.current) {
            gsap.set(titleRef.current, { opacity: 0, y: 30 });
            tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
        }
        
        if (descriptionRef.current) {
            gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
            tl.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
        }
        
        if (buttonRef.current) {
            gsap.set(buttonRef.current, { opacity: 0, y: 30 });
            tl.to(buttonRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
        }
    }, []);

    return(
        <>
            <div className="banner pt-2.5 pl-2.5 pr-2.5 xl:h-screen lg:min-h-180">
                <div className='h-full rounded-lg'  style={{backgroundImage: `url('/assets/contact/banner.png')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container h-full mx-auto pb-2.5 lg:pb-30 pl-2.5 pr-2.5 2xl:pl-0 2xl:pr-0">
                        <div className="flex flex-wrap items-end h-full pt-30 xl:pt-0">
                            <div className="w-full flex flex-col xl:flex-row items-end space-between gap-10 xl:gap-25">
                                <div className='w-full xl:w-155'>
                                    <div className='p-5 lg:p-7.5 rounded-lg bg-[#08090D]/10 backdrop-blur-[30px] w-full'>
                                        <div ref={topTitleRef} className='top-title text-white mb-5'>[ Contact us ]</div>
                                        
                                        <div ref={titleRef} className='heading-h1 text-white mb-[20px] text-[36px] leading-[40px] xl:text-[50px] xl:leading-[60px] font-manrope'>
                                            Let’s Connect and Power Your Next Innovation
                                        </div>

                                        <p  
                                            ref={descriptionRef}
                                            className='text-white font-manrope mb-[20px] text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] font-medium'>
                                            We’re here to help with software solutions, support inquiries, and partnership opportunities. Whether you’re running a retail fuel station, convenience store, or fleet operation ,our team is ready to assist.
                                        </p>

                                    </div>
                                </div>
                                <div className='w-full xl:w-150'>
                                    <div className='bg-[#F8F8F3] rounded-lg py-5 px-4'>
                                         <div className="flex flex-col mb-5 gap-2.5">
                                            <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">Name<span className="text-red-500">*</span></label>
                                            <input type="text" className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]" />
                                        </div>
                                        <div className='flex flex-col gap-[10px] sm:flex-row'>
                                            <div className="flex flex-col mb-[20px] gap-[10px] w-full sm:w-[50%]">
                                                <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">Email<span className="text-red-500">*</span></label>
                                                <input type="text" className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]" />
                                            </div>
                                            <div className="flex flex-col mb-[20px] gap-[10px] w-full sm:w-[50%]">
                                                <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">Contact Number</label>
                                                <input type="text" className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col mb-[20px] gap-[10px]">
                                            <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">Enquiry</label>
                                            <input type="text" className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]" />
                                        </div>
                                        <div className="flex flex-col mb-[20px] gap-[10px]">
                                            <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">Short Message</label>
                                            <textarea className="w-full rounded-2xl bg-white px-3.5 py-3.75 font-manrope font-medium text-[16px] leading-5.5 not-outline text-[#08090D] resize-none h-[140px]"></textarea>
                                        </div>
                                        <button className="rounded-sm uppercase submit-button cursor-pointer mt-4  inline-flex w-full justify-between px-6 py-3 text-[#08090D] bg-[#EBFF3A] hover:bg-white hover:text-[#08090D] gap-2.5">
                                            <span>Submit Inquiry</span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_821_290)">
                                                <path d="M3.125 10H16.875" stroke="#08090D" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                                                <path d="M12.25 4.375L17.875 10L12.25 15.625" stroke="#08090D" stroke-width="1.5" stroke-linecap="square"/>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}