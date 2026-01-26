'use client';
import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";
import MobileHeaderPopup from '../../layout/MobileHeaderPopup';

export default function CareerDetailsHeader(){
    const [activeMenu, setActive] = useState(false);

    const handleClick = () => {
        setActive(!activeMenu); 
    };

    return(
        <>
            <header className='w-full bg-[#F8F8F3] sticky top-0 z-[100]'>
                <div className="container mx-auto py-[14px] lg:py-[22px] pl-[25px] pr-[25px] 2xl:pl-[0] 2xl:pr-[0]">
                    <div className="flex flex-wrap justify-between items-center">
                        
                        <div className="w-[94px] lg:w-[133px]">
                            <Link href="/">
                                <Image src="/assets/logo-general.svg" alt="Infonet Logo" width={133} height={42} loading="eager" />
                            </Link>
                        </div>

                        <div className='flex gap-[20px] tablet-hidden'>

                            <div className="relative group">
                                <Link
                                    href="/"
                                    className="text-[#08090D] uppercase relative transition-colors duration-200"
                                >
                                    Home
                                    <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </div>
                            
                            <div className="relative group">
                                <button className="relative cursor-pointer flex text-[#08090D] items-center gap-[4px] uppercase border-transparent group transition-colors duration-200">
                                    <span>Industries</span>
                                    <svg
                                        className="transition-transform duration-300 group-hover:rotate-180"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M8 3.33333V12.6667" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.6667 8L8.00004 12.6667L3.33337 8" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                                </button>

                                <div className='absolute w-[265px] z-[91] hidden group-hover:block top-[20px] left-[-76px]'>
                                    <div className='w-full mt-[42px] rounded-[8px] bg-white shadow-lg border border-[#08090D33] p-[20px] flex flex-col gap-2'>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Retail Gas Stations</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Convenience Stores</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Unattended Fuel Sites</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Fleet Fueling</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">First Nations Retail</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <button className="relative cursor-pointer flex text-[#08090D] items-center gap-[4px] uppercase border-transparent group transition-colors duration-200">
                                    <span>Solutions</span>
                                    <svg
                                        className="transition-transform duration-300 group-hover:rotate-180"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M8 3.33333V12.6667" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.6667 8L8.00004 12.6667L3.33337 8" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                                </button>

                                <div className='absolute z-[91] w-[265px] hidden group-hover:block top-[20px] left-[-76px]'>
                                    <div className='w-full mt-[42px] rounded-[8px] bg-white shadow-lg border border-[#08090D33] p-[20px] flex flex-col gap-2'>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Retail Gas Stations</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Convenience Stores</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Unattended Fuel Sites</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Fleet Fueling</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">First Nations Retail</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <button className="relative cursor-pointer flex text-[#08090D] items-center gap-[4px] uppercase border-transparent group transition-colors duration-200">
                                    <span>Services</span>
                                    <svg
                                        className="transition-transform duration-300 group-hover:rotate-180"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M8 3.33333V12.6667" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.6667 8L8.00004 12.6667L3.33337 8" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                                </button>

                                <div className='absolute z-[91] w-[265px] hidden group-hover:block top-[20px] left-[-76px]'>
                                    <div className='w-full mt-[42px] rounded-[8px] bg-white shadow-lg border border-[#08090D33] p-[20px] flex flex-col gap-2'>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Retail Gas Stations</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Convenience Stores</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Unattended Fuel Sites</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">Fleet Fueling</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-[8px] mb-[4px] w-full block transition-colors duration-200 p-[10px]' href="/industries">First Nations Retail</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <button className="relative cursor-pointer flex text-[#08090D] items-center gap-[4px] uppercase border-transparent group transition-colors duration-200">
                                    <span>Company</span>
                                    <svg
                                        className="transition-transform duration-300 group-hover:rotate-180"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M8 3.33333V12.6667" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.6667 8L8.00004 12.6667L3.33337 8" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                                </button>

                                <div className='absolute z-91 w-66.25 hidden group-hover:block top-5 -left-19'>
                                    <div className='w-full mt-10.5 rounded-lg bg-white shadow-lg border border-[#08090D33] p-5 flex flex-col gap-2'>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-lg mb-1 w-full block transition-colors duration-200 p-2.5' href="/who-we-are">Who We Are</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-lg mb-1 w-full block transition-colors duration-200 p-2.5' href="/affiliations-partners">Affiliations & Partners</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-lg mb-1 w-full block transition-colors duration-200 p-2.5' href="/career">Career</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-lg mb-1 w-full block transition-colors duration-200 p-2.5' href="/industries">Fleet Fueling</Link>
                                        <Link className='text-[#08090D] uppercase hover:bg-[#EBFF3A] rounded-lg mb-1 w-full block transition-colors duration-200 p-2.5' href="/industries">First Nations Retail</Link>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <Link
                            className='primary-button tablet-hidden' 
                            href="/contact">
                            <span className='font-medium'>get in touch</span>
                            <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <g clipPath="url(#clip0_433_8)">
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
                                    <clipPath id="clip0_433_8">
                                    <rect width={20} height={20} fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>

                        <div 
                            className='mobile-menu-expand tablet-show'
                            onClick = { () =>  handleClick() }
                            >
                            <svg width={40} height={32} viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect width={40} height={32} rx={4} fill="#EBFF3A" /> <g clipPath="url(#clip0_407_15754)"> <path d="M11 8H29V10H11V8ZM11 15H29V17H11V15ZM11 22H29V24H11V22Z" fill="#020617" /> </g> <defs> <clipPath id="clip0_407_15754"> <rect width={24} height={24} fill="white" transform="translate(8 4)" /> </clipPath> </defs> </svg>
                        </div>

                    </div>
                </div>
            </header>
            <MobileHeaderPopup setActive={setActive} activeMenu={activeMenu} />
        </>
    )
}
