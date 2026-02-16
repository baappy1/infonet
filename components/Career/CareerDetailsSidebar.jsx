import Link from "next/link";

export default function CareerDetailsSidebar() {
  return (
    <>
      <div className="career-sidebar lg:pl-[30px] h-full">
        <div className="lg:pl-[30px] lg:border-l border-dashed border-[#08090D33] h-full">
          <h3 className="text-[20px] leading-7 mb-[50px] font-medium font-manrope text-[#08090D]">
            Personal information
          </h3>
          <div className="flex flex-col mb-[20px] gap-[10px]">
            <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]"
            />
          </div>
          <div className="flex flex-col mb-[20px] gap-[10px]">
            <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]"
            />
          </div>
          <div className="flex flex-col mb-[20px] gap-[10px]">
            <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
              Contact Number
            </label>
            <input
              type="text"
              className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]"
            />
          </div>
          <div className="flex flex-col mb-[20px] gap-[10px]">
            <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
              Years Of Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]"
            />
          </div>
          <div className="flex flex-col mb-[20px] gap-[10px]">
            <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
              Previous Employer
            </label>
            <input
              type="text"
              className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]"
            />
          </div>
          <div className="flex flex-col mb-[20px] gap-[10px]">
            <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
              Attach Your CV <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D] cursor-pointer"
            />
          </div>
          <div className="flex flex-col mb-[20px] gap-[10px]">
            <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
              Short Bio (Optional)
            </label>
            <textarea className="w-full rounded-[16px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D] resize-none h-[140px]"></textarea>
          </div>
          <p className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
            Your details will be kept secure and only used for recruitment
            purposes. We respect your privacy.
          </p>

          <button className="rounded-sm uppercase submit-button cursor-pointer mt-4 inline-flex w-full items-center justify-between px-6 py-3.5 text-white bg-[#08090D] hover:bg-white hover:text-[#08090D] gap-2.5">
            <span className="font-medium leading-5.5">Apply Now</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_821_290)">
                <path
                  d="M3.125 10H16.875"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.25 4.375L17.875 10L12.25 15.625"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </g>
            </svg>
          </button>

          <h3 className="mt-12.5 mb-7.5 text-[20px] leading-7 text-[#08090D] font-medium font-manrope">
            Not the role for you?
          </h3>
          <p className="font-manrope leading-5.5">
            <span className="text-[#08090d]/60">
              If this opportunity isn’t the perfect fit, we’d still love for you
              to explore other ways to grow with us. Check out more roles on our
            </span>{" "}
            <Link
              href="/career"
              className="text-[#08090d] font-medium hover:underline"
            >
              Current Job Openings
            </Link>{" "}
            <span className="text-[#08090d]/60">
              page — your next career move might be waiting there.
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
