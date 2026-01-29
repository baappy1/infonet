import BlogCard from "../Home/BlogCard"

export default function () {
  return (
    <>
        <section className="bg-[#f8f8f3] pt-12 lg:pt-28.5 pb-25 lg:pb-55">
          <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
            <h2 className="heading-h2 mb-15">Similar Insights</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              <BlogCard 
                  Title="Amid Macro Pressures, C‑Stores Have an Opportunity to Innovate"
                  FeatureImage="/assets/blog/01.png"
                  Date="July 15, 2023"
                  Category="News & Blog"
                  ReadMoreLink="/blog/amid-macro-pressures-c-stores-have-an-opportunity-to-innovate"
                />
                <BlogCard 
                  Title="Nawgati Partners with Seed Group to Modernise the UAE’s Fuel Retail"
                  FeatureImage="/assets/blog/02.png"
                  Date="December 1, 2022"
                  Category="event"
                  ReadMoreLink="/blog/amid-macro-pressures-c-stores-have-an-opportunity-to-innovate"
                />
                <BlogCard 
                  Title="Infonet Technology launches next-gen EMV Pay-at-the-Pump module"
                  FeatureImage="/assets/blog/03.png"
                  Date="Nov 03, 2025"
                  Category="News & Blog"
                  ReadMoreLink="/blog/amid-macro-pressures-c-stores-have-an-opportunity-to-innovate"
                />
            </div>
          </div>
        </section>
    </>
  )
}
