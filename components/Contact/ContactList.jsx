import ContactListCard from "./ContactListCard";

export default function ConnectList(){
    return(
        <>
            <div className="pt-15 sm:pt-25 pb-15 sm:pb-20.5 bg-[#F8F8F3]">
                <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
                    <div className="flex flex-col">
                        <ContactListCard title="Sales Inquiries">
                            <li className="flex flex-col gap-4">
                                <strong className="block text-[16px] leading-5.5 font-bold uppercase">Telephone</strong>
                                <a href="tel:1-888-925-8125" className="text-[#08090D] text-[16px] leading-5.5 font-medium font-manrope">1-888-925-8125</a>
                            </li>
                            <li className="flex flex-col gap-4">
                                <strong className="block text-[16px] leading-5.5 font-bold uppercase">e-mail</strong>
                                <a href="mailto:sales@infonet-tech.com" className="text-[#08090D] text-[16px] leading-5.5 font-medium font-manrope">sales@infonet-tech.com</a>
                            </li>
                        </ContactListCard>
                        <ContactListCard title="24/7 Technical Support">
                            <li className="flex flex-col gap-4">
                                <strong className="block text-[16px] leading-5.5 font-bold uppercase">Telephone</strong>
                                <a href="tel:1-888-431-7944" className="text-[#08090D] text-[16px] leading-5.5 font-medium font-manrope">1-888-431-7944</a>
                            </li>
                            <li className="flex flex-col gap-4">
                                <strong className="block text-[16px] leading-5.5 font-bold uppercase">e-mail</strong>
                                <a href="mailto:support@infonet-tech.com" className="text-[#08090D] text-[16px] leading-5.5 font-medium font-manrope">cstoresupport@infonet-tech.com</a>
                            </li>
                        </ContactListCard>   

                        <ContactListCard title="Head Office (Canada)">
                            <li className="flex flex-col gap-4">
                                <strong className="block text-[16px] leading-5.5 font-bold uppercase">Telephone</strong>
                                <a href="tel:1-604-689-7589" className="text-[#08090D] text-[16px] leading-5.5 font-medium font-manrope">1-604-689-7589</a>
                            </li>
                            <li className="flex flex-col gap-4">
                                <strong className="block text-[16px] leading-5.5 font-bold uppercase">fax</strong>
                                <a href="tel:1-604-689-7599" className="text-[#08090D] text-[16px] leading-5.5 font-medium font-manrope">1-604-689-7599</a>
                            </li>
                            <li className="flex flex-col gap-4">
                                <strong className="block text-[16px] leading-5.5 font-bold uppercase">e-mail</strong>
                                <a href="mailto:info@infonet-tech.com" className="text-[#08090D] text-[16px] leading-5.5 font-medium font-manrope">info@infonet-tech.com</a>
                            </li>
                        </ContactListCard>       
                    </div>
                </div>
            </div>
        </>
    )
}