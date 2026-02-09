export default function CareerHeader({
  title = "Senior Software Engineer (Retail & Fuel Systems)",
  jobType = "Full-time",
  jobSalary = "Negotiable",
  jobLocation = "Vancouver, Canada (Hybrid)",
  jobExperience = "Minimum 5 years",
  jobDesignation,
}) {
  const items = [
    jobType && { label: "Type", value: jobType },
    jobExperience && { label: "Experience", value: jobExperience },
    jobSalary && { label: "Salary", value: jobSalary },
    jobLocation && { label: "Location", value: jobLocation },
    jobDesignation && { label: "Designation", value: jobDesignation },
  ].filter(Boolean);

  return (
    <div className="w-full border-b border-dashed border-[#08090D33] pb-[56px] mb-[50px]">
      <div className="top-title mb-5">[ Career ]</div>
      <h2 className="heading-h2 mb-5">{title}</h2>

      {items.length > 0 && (
        <ul className="flex flex-wrap gap-[10px]">
          {items.map((item) => (
            <li
              key={item.label}
              className="font-manrope px-[14px] py-[6px] capitalize bg-[#08090D0F] text-[14px] leading-[20px] text-[#08090D] rounded-[9999px] font-medium"
            >
              {item.label}: {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
