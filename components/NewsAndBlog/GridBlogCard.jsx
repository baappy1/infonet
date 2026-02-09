import Image from "next/image";
import Link from "next/link";

const GridBlogCard = ({ item }) => {
  if (!item) return null;
  const category = item.category || "NEWS & BLOG";
  const date = item.date || "";
  const title = item.title || "";
  const image = item.image || "/assets/newsandblog/blog1.png";
  const slug = item.slug ? `/blog/${item.slug}` : "/blog";

  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="relative h-67.5">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        <span className="text-xs leading-[100%] uppercase font-jetbrains text-[#08090D] tracking-[0px]">
          {category}
        </span>
        <div className="w-1 h-1 bg-[#EBFF3A] rounded-full"></div>
        <span className="text-xs leading-[100%] uppercase font-jetbrains text-[#08090D] tracking-[0px]">
          {date}
        </span>
      </div>

      <p className="font-manrope mt-5 font-medium text-xl leading-7 tracking-[0px] text-[#08090D] max-w-98.25">
        {title}
      </p>

      <Link
        href={slug}
        className="flex justify-between bg-[#F8F8F3] hover:bg-[#EBFF3A] transition duration-150 mt-5 items-center uppercase font-jetbrains rounded-sm px-4 py-3 font-medium text-sm leading-4.5 text-[#08090D] w-full"
      >
        <span>read more</span>
        <Image
          src="/assets/newsandblog/right-arrow.svg"
          width={16}
          height={16}
          alt="right-nav"
        />
      </Link>
    </div>
  );
};

export default GridBlogCard;
