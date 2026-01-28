import { children } from "react";

export default function ContactListCard({title,children}) {
    return(
        <>
            <div className="flex items-start flex-col sm:flex-row justify-between border-b border-dashed border-[#08090D33] pb-9.5 mb-12.5 last:mb-0 last:border-0 last:pb-0">

                <h3 className="w-full lg:w-1/2 text-[16px] leading-5.5 font-bold uppercase">{title}</h3>

                <ul className="w-full lg:w-1/2 flex flex-col gap-7 sm:gap-10">
                    {children}
                </ul>
            </div>
        </>
    )
}