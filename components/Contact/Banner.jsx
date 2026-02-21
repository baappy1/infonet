"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

function getContactEndpoint() {
  const base =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/graphql\/?$/, "") ||
    "";
  return `${base}/wp-json/nh/v1/cform`;
}

export default function Banner({
  bannerTopTitle,
  bannerImage,
  bannerTitle,
  bannerDescription,
  bannerButtonTitle,
  bannerButtonURL,
}) {
  const topTitleRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contactNumber: "",
    enquiry: "",
    shortMessage: "",
  });
  const [status, setStatus] = useState({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setStatus({ type: null, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.fullname?.trim()) {
      setStatus({ type: "error", message: "Name is required." });
      return;
    }
    if (!formData.email?.trim()) {
      setStatus({ type: "error", message: "Email is required." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please provide a valid email address." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch(getContactEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.fullname.trim(),
          email: formData.email.trim(),
          contactNumber: formData.contactNumber.trim(),
          enquiry: formData.enquiry.trim(),
          shortMessage: formData.shortMessage.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data?.message ||
          data?.data?.message ||
          `Something went wrong. Please try again.`;
        setStatus({ type: "error", message: msg });
        return;
      }

      setStatus({
        type: "success",
        message: data?.message || "Your message has been sent successfully!",
      });
      setFormData({
        fullname: "",
        email: "",
        contactNumber: "",
        enquiry: "",
        shortMessage: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Unable to send. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();

    if (topTitleRef.current) {
      gsap.set(topTitleRef.current, { opacity: 0, y: 30 });
      tl.to(topTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      tl.to(
        titleRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );
    }

    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
      tl.to(
        descriptionRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );
    }

    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 0, y: 30 });
      tl.to(
        buttonRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );
    }
  }, []);

  return (
    <>
      <div className="banner pt-2.5 pl-2.5 pr-2.5 lg:h-screen lg:min-h-235">
        <div
          className="h-full rounded-lg"
          style={{
            backgroundImage: `url('/assets/contact/banner.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container h-full mx-auto pb-2.5 lg:pb-30 pl-2.5 pr-2.5 2xl:pl-0 2xl:pr-0">
            <div className="flex flex-wrap items-end h-full pt-30 xl:pt-0">
              <div className="w-full flex flex-col xl:flex-row items-end space-between gap-10 xl:gap-25">
                <div className="w-full xl:w-155">
                  <div className="p-5 lg:p-7.5 rounded-lg bg-[#08090D]/10 backdrop-blur-[30px] w-full">
                    <div
                      ref={topTitleRef}
                      className="top-title text-white mb-5"
                    >
                      [ Contact us ]
                    </div>

                    <div
                      ref={titleRef}
                      className="heading-h1 text-white mb-[20px] text-[36px] leading-[40px] xl:text-[50px] xl:leading-[60px] font-manrope"
                    >
                      Let’s Connect and Power Your Next Innovation
                    </div>

                    <p
                      ref={descriptionRef}
                      className="text-white font-manrope mb-[20px] text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] font-medium"
                    >
                      We’re here to help with software solutions, support
                      inquiries, and partnership opportunities. Whether you’re
                      running a retail fuel station, convenience store, or fleet
                      operation ,our team is ready to assist.
                    </p>
                  </div>
                </div>
                <div className="w-full xl:w-150">
                  <form
                    onSubmit={handleSubmit}
                    className="bg-[#F8F8F3] rounded-lg py-5 px-4"
                  >
                    {status.message && (
                      <div
                        className={`mb-5 rounded-lg px-4 py-3 text-sm font-manrope ${
                          status.type === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        role="alert"
                      >
                        {status.message}
                      </div>
                    )}
                    <div className="flex flex-col mb-5 gap-2.5">
                      <label
                        htmlFor="contact-name"
                        className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]"
                      >
                        Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.fullname}
                        onChange={(e) => updateField("fullname", e.target.value)}
                        className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] outline-none border border-transparent focus:border-[#08090D]/20 text-[#08090D]"
                      />
                    </div>
                    <div className="flex flex-col gap-[10px] sm:flex-row">
                      <div className="flex flex-col mb-[20px] gap-[10px] w-full sm:w-[50%]">
                        <label
                          htmlFor="contact-email"
                          className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]"
                        >
                          Email<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] outline-none border border-transparent focus:border-[#08090D]/20 text-[#08090D]"
                        />
                      </div>
                      <div className="flex flex-col mb-[20px] gap-[10px] w-full sm:w-[50%]">
                        <label
                          htmlFor="contact-phone"
                          className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]"
                        >
                          Contact Number
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={formData.contactNumber}
                          onChange={(e) =>
                            updateField("contactNumber", e.target.value)
                          }
                          className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] outline-none border border-transparent focus:border-[#08090D]/20 text-[#08090D]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-[20px] gap-[10px]">
                      <label
                        htmlFor="contact-enquiry"
                        className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]"
                      >
                        Enquiry
                      </label>
                      <input
                        id="contact-enquiry"
                        type="text"
                        value={formData.enquiry}
                        onChange={(e) => updateField("enquiry", e.target.value)}
                        className="w-full rounded-[9999px] bg-white px-[14px] py-[15px] font-manrope font-medium text-[16px] leading-[22px] outline-none border border-transparent focus:border-[#08090D]/20 text-[#08090D]"
                      />
                    </div>
                    <div className="flex flex-col mb-[20px] gap-[10px]">
                      <label
                        htmlFor="contact-message"
                        className="font-manrope font-medium text-[14px] leading-[20px] text-[#08090D]"
                      >
                        Short Message
                      </label>
                      <textarea
                        id="contact-message"
                        value={formData.shortMessage}
                        onChange={(e) =>
                          updateField("shortMessage", e.target.value)
                        }
                        className="w-full rounded-2xl bg-white px-3.5 py-3.75 font-manrope font-medium text-[16px] leading-5.5 outline-none border border-transparent focus:border-[#08090D]/20 text-[#08090D] resize-none h-[140px]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-sm uppercase submit-button cursor-pointer mt-4 inline-flex w-full justify-between px-6 py-3.5 leading-5.5 font-medium text-[#08090D] bg-[#EBFF3A] hover:bg-white hover:text-[#08090D] gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span>
                        {isSubmitting ? "Sending..." : "Submit Inquiry"}
                      </span>
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
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
