import Image from "next/image"
import Link from "next/link"

export default function ServeCard({ FeatureImage, title, description, slug }) {
    const rawSlug = (() => {
        if (!slug) return ""
        if (typeof slug === "string") return slug
        if (typeof slug === "object") {
            return (
                slug.slug ||
                slug.uri ||
                slug.url ||
                slug.link ||
                slug.permalink ||
                ""
            )
        }
        return ""
    })()

    const normalizeSlug = (value) => {
        const s = (value || "").toString().trim()
        if (!s) return ""

        // Full URL -> pathname
        if (/^https?:\/\//i.test(s)) {
            try {
                const u = new URL(s)
                return normalizeSlug(u.pathname)
            } catch {
                // fall through
            }
        }

        // Remove query/hash and trim slashes
        const path = s.split("?")[0].split("#")[0].replace(/^\/+|\/+$/g, "")

        // If path contains industries, take the segment after it
        const parts = path.split("/").filter(Boolean)
        const idx = parts.findIndex((p) => p.toLowerCase() === "industries")
        if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]

        // Otherwise, take last segment
        return parts[parts.length - 1] || ""
    }

    const slugFromTitle = (title || "")
            .toLowerCase()
            .trim()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

    const resolvedSlug = normalizeSlug(rawSlug) || slugFromTitle
    const href = resolvedSlug ? `/industries/${resolvedSlug}` : "#";

    return (
        <>
            <div className="w-full">
                {FeatureImage &&
                    <Image
                        width={202}
                        height={202}
                        className="rounded-[999999px] h-[130px] w-[130px] md:h-[202px] md:w-[202px] mb-[20px] object-cover overflow-hidden relative"
                        src={FeatureImage}
                        alt={title} />}

                {title &&
                    <h3 className="mb-[10px] text-[20px] leading-[24px] md:text-[24px] md:leading-[30px] font-manrope">{title}</h3>}

                {description &&
                    <p className="font-manrope font-medium text-[14px] leading-[20px]">
                        {description}
                    </p>
                }
                <Link
                    href={href}
                    aria-disabled={!resolvedSlug}
                    tabIndex={resolvedSlug ? 0 : -1}
                    className="inline-flex font-medium box-border rounded-[4px] bg-[#EBFF3A] transition duration-150 hover:bg-white hover:border border-1 border-[#EBFF3A] hover:border-[#08090D] hover:text-[#08090D] uppercase gap-[10px] px-[15px] py-[11px] mt-[20px]"
                >
                    <span className="text-[14px] leading-[18px]">learn more</span>
                    <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_505_137)">
                            <path
                                d="M2.5 8H13.5"
                                stroke="#08090D"
                                strokeWidth="1.5"
                                strokeLinecap="square"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.79999 3.5L14.3 8L9.79999 12.5"
                                stroke="#08090D"
                                strokeWidth="1.5"
                                strokeLinecap="square"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_505_137">
                                <rect width={16} height={16} fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Link>
            </div>
        </>
    )
}