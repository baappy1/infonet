import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8F8F3] to-[#EBFF3A] px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold text-[#08090D] mb-4 font-jetbrains-mono">
          404
        </h1>
        <h2 className="text-4xl font-bold text-[#08090D] mb-4 font-manrope uppercase">
          Page Not Found
        </h2>
        <p className="text-lg text-[#08090D]/80 mb-8 font-manrope">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="primary-button inline-flex items-center gap-2"
        >
          <span className="font-medium">Go Back Home</span>
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
        </Link>
      </div>
    </div>
  );
}
