import Image from "next/image"

export default function OurStoryCard({ icon,title }){
    return(
        <>
                <li className="flex uppercase font-jetbrains  items-center gap-6 border-b border-[#08090D33] pb-5 border-dashed mb-5 ">
                  <Image src={icon} alt={title} width={40} height={40} />
                  <span>{title}</span>
            </li>
        </>
    )
}