export default function IndustriesPage() {
  return (
    <div className="min-h-screen pt-[100px] pb-[100px] px-4 sm:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="top-title mb-4">[ Industries We Serve ]</div>
        <h1 className="heading-h1 mb-6">Powering Businesses Across Industries</h1>
        <p className="font-manrope text-lg mb-12 opacity-80">
          From gas stations to convenience stores, InfoNet delivers integrated POS and 
          fuel management systems that keep your business running smarter, faster, and more profitably.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-[8px] border border-[#08090D]/10">
            <h2 className="text-2xl font-bold mb-4 font-manrope uppercase">Retail Gas Stations</h2>
            <p className="font-manrope opacity-80">
              Comprehensive solutions for retail fuel operations.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-[8px] border border-[#08090D]/10">
            <h2 className="text-2xl font-bold mb-4 font-manrope uppercase">Convenience Stores</h2>
            <p className="font-manrope opacity-80">
              Integrated POS and fuel management for convenience retail.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-[8px] border border-[#08090D]/10">
            <h2 className="text-2xl font-bold mb-4 font-manrope uppercase">Unattended Fuel Sites</h2>
            <p className="font-manrope opacity-80">
              Automated solutions for unattended fuel locations.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-[8px] border border-[#08090D]/10">
            <h2 className="text-2xl font-bold mb-4 font-manrope uppercase">Fleet Fueling</h2>
            <p className="font-manrope opacity-80">
              Efficient fleet management and fueling solutions.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-[8px] border border-[#08090D]/10">
            <h2 className="text-2xl font-bold mb-4 font-manrope uppercase">First Nations Retail</h2>
            <p className="font-manrope opacity-80">
              Specialized solutions for First Nations retail operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
