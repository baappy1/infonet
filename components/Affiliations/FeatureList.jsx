import FeatureListCard from "./FeatureListCard";

export default function FeatureList() {
  return (
    <div className="relative">
      <FeatureListCard
        className="z-10"
        FeatureTitle="NACS"
        backgroundColor="#FFFFFF"
        FeatureDescription={
          <>
            <p>
              NACS, the Association for Convenience and Petroleum Retailing, was
              founded August 14, 1961, as the National Association of
              Convenience Stores.
            </p>
            <p>
              NACS is an international trade association representing more than
              2,200 retail and 1,800 supplier company members.
            </p>
            <p>
              The U.S. convenience store industry, with 140,655 stores across
              the U.S., posted $495.3 billion in total sales for 2005, with
              $344.2 billion in motor fuels sales.
            </p>
          </>
        }
        FeatureImage="/assets/affiliate/feature.png"
      />
      <FeatureListCard
        className="z-11"
        backgroundColor="#E0E5DF"
        FeatureTitle="CONEXXUS"
        FeatureDescription={
          <>
            <p>
              Conexxus is a non-profit, member-driven technology organization
              dedicated to the development and implementation of standards,
              technologies innovation and advocacy for the convenience store and
              petroleum market.
            </p>
            <p>
              Conexxus membership collaborates on key present and future
              industry challenges and innovations. Our work efforts improve
              profitability by reducing the cost of IT ownership and improving
              the competitiveness of our members.
            </p>
          </>
        }
        FeatureImage="/assets/affiliate/feature.png"
      />
      <FeatureListCard
        className="z-12"
        backgroundColor="#F0F2F3"
        FeatureTitle="THE PETROLEUM EQUIPMENT"
        FeatureDescription={
          <>
            <p>
              Conexxus is a non-profit, member-driven technology organization
              dedicated to the development and implementation of standards,
              technologies innovation and advocacy for the convenience store and
              petroleum market.
            </p>
            <p>
              Conexxus membership collaborates on key present and future
              industry challenges and innovations. Our work efforts improve
              profitability by reducing the cost of IT ownership and improving
              the competitiveness of our members.
            </p>
          </>
        }
        FeatureImage="/assets/affiliate/feature.png"
      />

      <FeatureListCard
        className="z-13"
        backgroundColor="#FFF0F0"
        FeatureTitle="THE PETROLEUM EQUIPMENT"
        FeatureDescription={
          <>
            <p>
              Conexxus is a non-profit, member-driven technology organization
              dedicated to the development and implementation of standards,
              technologies innovation and advocacy for the convenience store and
              petroleum market.
            </p>
            <p>
              Conexxus membership collaborates on key present and future
              industry challenges and innovations. Our work efforts improve
              profitability by reducing the cost of IT ownership and improving
              the competitiveness of our members.
            </p>
          </>
        }
        FeatureImage="/assets/affiliate/feature.png"
      />
    </div>
  );
}
