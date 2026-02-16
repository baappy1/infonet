import FeatureListCard from "./FeatureListCard";

const DEFAULT_COMPANIES = [
  {
    FeatureTitle: "NACS",
    backgroundColor: "#FFFFFF",
    FeatureDescription: (
      <>
        <p>NACS, the Association for Convenience and Petroleum Retailing, was founded August 14, 1961, as the National Association of Convenience Stores.</p>
        <p>NACS is an international trade association representing more than 2,200 retail and 1,800 supplier company members.</p>
        <p>The U.S. convenience store industry, with 140,655 stores across the U.S., posted $495.3 billion in total sales for 2005, with $344.2 billion in motor fuels sales.</p>
      </>
    ),
    FeatureImage: "/assets/affiliate/feature.png",
  },
  {
    FeatureTitle: "CONEXXUS",
    backgroundColor: "#E0E5DF",
    FeatureDescription: (
      <>
        <p>Conexxus is a non-profit, member-driven technology organization dedicated to the development and implementation of standards, technologies innovation and advocacy for the convenience store and petroleum market.</p>
        <p>Conexxus membership collaborates on key present and future industry challenges and innovations. Our work efforts improve profitability by reducing the cost of IT ownership and improving the competitiveness of our members.</p>
      </>
    ),
    FeatureImage: "/assets/affiliate/feature.png",
  },
];

export default function FeatureList({ companies = DEFAULT_COMPANIES }) {
  const list = Array.isArray(companies) && companies.length > 0 ? companies : DEFAULT_COMPANIES;

  return (
    <div className="relative">
      {list.map((company, i) => (
        <FeatureListCard
          key={i}
          className={`z-${100 + i}`}
          FeatureTitle={company.FeatureTitle}
          backgroundColor={company.backgroundColor}
          FeatureDescription={
            typeof company.FeatureDescription === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: company.FeatureDescription }} />
            ) : (
              company.FeatureDescription
            )
          }
          FeatureImage={company.FeatureImage}
        />
      ))}
    </div>
  );
}
