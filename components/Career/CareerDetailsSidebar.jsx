"use client";

import Link from "next/link";
import { useState } from "react";

const APPLY_API_URL =
  (process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/graphql\/?$/, "") ||
    "https://staging.hellonotionhive.com/wordpress/infonet") +
  "/wp-json/nh/v1/apply-now";

const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];

export default function CareerDetailsSidebar({ position = "" }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contactNumber: "",
    yearsExperience: "",
    previousEmployer: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus({ type: null, message: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setStatus({ type: "error", message: "Please upload PDF, DOC, or DOCX only." });
        setResumeFile(null);
        e.target.value = "";
        return;
      }
      setResumeFile(file);
      setStatus({ type: null, message: "" });
    } else {
      setResumeFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!position?.trim()) {
      setStatus({ type: "error", message: "Position is missing. Please refresh the page." });
      return;
    }
    if (!formData.fullname?.trim()) {
      setStatus({ type: "error", message: "Full Name is required." });
      return;
    }
    if (!formData.email?.trim()) {
      setStatus({ type: "error", message: "Email Address is required." });
      return;
    }
    if (!formData.contactNumber?.trim()) {
      setStatus({ type: "error", message: "Contact Number is required." });
      return;
    }
    if (!formData.yearsExperience?.trim()) {
      setStatus({ type: "error", message: "Years Of Experience is required." });
      return;
    }
    if (!formData.message?.trim()) {
      setStatus({ type: "error", message: "Short Bio is required." });
      return;
    }
    if (!resumeFile) {
      setStatus({ type: "error", message: "Please attach your CV." });
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("position", position);
      form.append("fullname", formData.fullname.trim());
      form.append("email", formData.email.trim());
      form.append("contactNumber", formData.contactNumber.trim());
      form.append("yearsExperience", formData.yearsExperience.trim());
      form.append("previousEmployer", formData.previousEmployer.trim());
      form.append("message", formData.message.trim());
      form.append("resume", resumeFile);

      const res = await fetch(APPLY_API_URL, {
        method: "POST",
        body: form,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg = data?.message || `Request failed (${res.status})`;
        setStatus({ type: "error", message: errMsg });
        return;
      }

      if (data?.success) {
        setStatus({ type: "success", message: data.message || "Your application has been submitted successfully!" });
        setFormData({ fullname: "", email: "", contactNumber: "", yearsExperience: "", previousEmployer: "", message: "" });
        setResumeFile(null);
        const fileInput = document.querySelector('input[name="resume"]');
        if (fileInput) fileInput.value = "";
      } else {
        setStatus({ type: "error", message: data?.message || "Something went wrong. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", message: err?.message || "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="career-sidebar lg:pl-[30px] h-full">
        <div className="lg:pl-[30px] lg:border-l border-dashed border-[#08090D33] h-full">
          <h3 className="text-[20px] leading-7 mb-[50px] font-medium font-manrope text-[#08090D]">
            Personal information
          </h3>
          <form onSubmit={handleSubmit} className="space-y-0">
            <div className="flex flex-col mb-[20px] gap-[10px]">
              <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]"
                required
              />
            </div>
            <div className="flex flex-col mb-[20px] gap-[10px]">
              <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]"
                required
              />
            </div>
            <div className="flex flex-col mb-[20px] gap-[10px]">
              <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
                Contact Number<span className="text-red-500">*</span>
              </label>
              <input
                name="contactNumber"
                type="text"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]"
                required
              />
            </div>
            <div className="flex flex-col mb-[20px] gap-[10px]">
              <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
                Years Of Experience <span className="text-red-500">*</span>
              </label>
              <input
                name="yearsExperience"
                type="text"
                value={formData.yearsExperience}
                onChange={handleChange}
                className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]"
                required
              />
            </div>
            <div className="flex flex-col mb-[20px] gap-[10px]">
              <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
                Previous Employer
              </label>
              <input
                name="previousEmployer"
                type="text"
                value={formData.previousEmployer}
                onChange={handleChange}
                className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D]"
              />
            </div>
            <div className="flex flex-col mb-[20px] gap-[10px]">
              <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
                Attach Your CV <span className="text-red-500">*</span>
              </label>
              <input
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D] cursor-pointer"
                required
              />
            </div>
            <div className="flex flex-col mb-[20px] gap-[10px]">
              <label className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
                Short Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-[16px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] not-outline text-[#08090D] resize-none h-[140px]"
                required
              />
            </div>

            {status.message && (
              <div
                className={`mb-4 px-4 py-3 rounded-sm text-[14px] font-manrope ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.message}
              </div>
            )}

            <p className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]">
              Your details will be kept secure and only used for recruitment
              purposes. We respect your privacy.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-sm uppercase submit-button cursor-pointer mt-4 inline-flex w-full items-center justify-between px-6 py-3.5 text-white bg-[#08090D] hover:bg-white hover:text-[#08090D] gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="font-medium leading-5.5">
                {isSubmitting ? "Submitting…" : "Apply Now"}
              </span>
              {!isSubmitting && (
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
              )}
            </button>
          </form>

          <h3 className="mt-12.5 mb-7.5 text-[20px] leading-7 text-[#08090D] font-medium font-manrope">
            Not the role for you?
          </h3>
          <p className="font-manrope leading-5.5">
            <span className="text-[#08090d]/60">
              If this opportunity isn&apos;t the perfect fit, we&apos;d still love for you
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
