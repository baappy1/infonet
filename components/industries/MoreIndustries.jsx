import Link from "next/link";
import IndustryCard from "./IndustryCard";

const industriesData = [
  {
    id: 1,
    title: "Convenience Stores 1",
    description:
      "With 24/7 expert assistance, we’re always there to keep your locations running without interruption.",
    image: "/assets/industries/convenience.png", // replace with real path
  },
  {
    id: 2,
    title: "Unattended Fuel Sites",
    description:
      "With 24/7 expert assistance, we’re always there to keep your locations running without interruption.",
    image: "/assets/industries/unattended.png",
  },
  {
    id: 3,
    title: "Fleet Fueling",
    description:
      "With 24/7 expert assistance, we’re always there to keep your locations running without interruption.",
    image: "/assets/industries/fleet.png",
  },
  {
    id: 4,
    title: "First Nations Retail",
    description:
      "With 24/7 expert assistance, we’re always there to keep your locations running without interruption.",
    image: "/assets/industries/first.png",
  },
];

const DEFAULT_TOP_TITLE = "[ More industries ] test";
const DEFAULT_TITLE = "Driving Success Across Every Industry We Serve";
const DEFAULT_DESCRIPTION =
  "From retail and fuel to convenience stores and fleet operations, our solutions help businesses run smarter, faster, and more efficiently.";

function slugFromTitle(title) {
  return (title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const MoreIndustries = ({
  topTitle = DEFAULT_TOP_TITLE,
  title = DEFAULT_TITLE,
  shortDescription = DEFAULT_DESCRIPTION,
  moreFeatures,
  industries,
}) => {
  const industryMap = new Map(
    (Array.isArray(industries) ? industries : []).map((i) => [i.title?.toLowerCase?.()?.trim?.() || "", i])
  );

  const fromBlock =
    Array.isArray(moreFeatures) && moreFeatures.length > 0
      ? moreFeatures.map((f, i) => {
          const title = f.feature_title ?? f.title ?? "";
          const matched = industryMap.get(title.toLowerCase().trim());
          return {
            id: f._id ?? f.id ?? i + 1,
            title,
            description: f.feature_description ?? f.description ?? "",
            image: f.feature_image ?? f.image ?? "/assets/industries/convenience.png",
            slug: f.slug ?? matched?.slug ?? slugFromTitle(title),
          };
        })
      : [];

  const list =
    fromBlock.length > 0
      ? fromBlock
      : Array.isArray(industries) && industries.length > 0
        ? industries
        : industriesData;

  return (
    <section className="bg-[#f8f8f3]">
      <div className="container mx-auto py-25 lg:pt-0 lg:pb-55 px-5">
        <div className="top-title mb-5">{topTitle}</div>
        <h2 className="font-manrope text-[28px] leading-7.5 lg:text-[40px] lg:leading-12.5 mb-5 max-w-162.25">
          {title}
        </h2>
        <p className="font-manrope text-[14px] lg:text-base leading-5 lg:leading-5.5  font-medium text-[#08090D]/80 max-w-162.25">
          {shortDescription}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-10 lg:mt-20">
          {list.map((item) =>
            item.slug ? (
              <Link key={item.id} href={`/Industries/${item.slug}`}>
                <IndustryCard item={item} />
              </Link>
            ) : (
              <IndustryCard key={item.id} item={item} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default MoreIndustries;
