import Image from "next/image";

const DEFAULT_CONTENT =
  '"The integration between our POS and fuel systems is seamless now. InfoNet helped us eliminate downtime and keep our customers happy even during high-traffic hours."';
const DEFAULT_IMAGE = "/assets/about/testimonial.png";
const DEFAULT_NAME = "Lisa R.";
const DEFAULT_DESIGNATION = "Operations Manager";

export default function TestimonialCard({
  content = DEFAULT_CONTENT,
  image = DEFAULT_IMAGE,
  name = DEFAULT_NAME,
  designation = DEFAULT_DESIGNATION,
  item,
}) {
  const resolvedContent = item?.testimonialDescription ?? item?.content ?? content;
  const resolvedImage = item?.testimonialImage ?? item?.image ?? image;
  const resolvedName = item?.title ?? item?.name ?? name;
  const resolvedDesignation = item?.testimonialDesignation ?? item?.designation ?? designation;

  return (
    <>
      <div className="border-l-[#08090D33] border-l border-dashed pl-[20px]">
        <p className="font-medium text-[16px] leading-[22px] font-manrope">
          {typeof resolvedContent === "string"
            ? resolvedContent.replace(/<[^>]+>/g, "").trim()
            : resolvedContent}
        </p>
        <div className="flex gap-4 items-center mt-10">
          <Image
            className="rounded-[30px]"
            src={resolvedImage}
            width={60}
            height={80}
            alt="Testimonial author"
          />
          <div>
            <h3 className="font-bold text-[16px] leading-[22px] uppercase mb-[8px]">
              {resolvedName}
            </h3>
            <p className="uppercase text-[12px] leading-[100%]">
              {resolvedDesignation}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
