import Link from "next/link";

export default function MenuLink({ MenuLink = null, MenuTitle,MenuClass }) {
  if (!MenuLink) return null;

  return (
    <Link 
      href={MenuLink} 
      className= {`mb-[6px] inline-block font-manrope font-medium hover:underline text-[14px] leading-[20px] ${MenuClass ?? ""} `}
    >
      {MenuTitle}
    </Link>
  );
}
