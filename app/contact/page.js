export default function ContactPage() {
  return (
    <div className="min-h-screen pt-[100px] pb-[100px] px-4 sm:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="top-title mb-4">[ Contact Us ]</div>
        <h1 className="heading-h1 mb-6">Get in Touch</h1>
        <p className="font-manrope text-lg mb-8 opacity-80">
          Whether you're managing fuel stations, convenience stores, or fleet operations, 
          InfoNet provides the technology solutions that simplify operations. 
          Contact us to learn more about how we can help transform your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a className="primary-button" href="#">
            <span>Request a Demo</span>
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_433_8)">
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
              <defs>
                <clipPath id="clip0_433_8">
                  <rect width={20} height={20} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
