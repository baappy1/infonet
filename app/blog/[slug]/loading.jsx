export default function BlogPostLoading() {
  return (
    <section className="pt-15 lg:pt-17.5 pb-8.5 bg-[#f8f8f3]">
      <div className="max-w-247.5 mx-auto px-2.5">
        <div className="h-10 w-24 bg-[#E4E4E7] rounded-full animate-pulse" />
        <div className="mt-7.5 flex flex-col gap-5 md:flex-row md:gap-8 w-full border-b border-[#08090d]/20 border-dashed pb-[34px]">
          <div className="max-w-119.75 w-full space-y-4">
            <div className="h-8 w-32 bg-[#E4E4E7] rounded-full animate-pulse" />
            <div className="h-12 w-full max-w-[400px] bg-[#E4E4E7] rounded animate-pulse" />
            <div className="h-10 w-48 mt-8 bg-[#E4E4E7] rounded animate-pulse" />
          </div>
          <div className="relative w-full h-95 bg-[#E4E4E7] rounded-2xl animate-pulse" />
        </div>
      </div>
      <div className="bg-[#f8f8f3] mt-10">
        <div className="max-w-247.5 mx-auto px-2.5 space-y-4">
          <div className="h-4 w-full bg-[#E4E4E7] rounded animate-pulse" />
          <div className="h-4 w-full bg-[#E4E4E7] rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-[#E4E4E7] rounded animate-pulse" />
        </div>
      </div>
      <section className="bg-[#f8f8f3] pt-12 lg:pt-28.5 pb-25 lg:pb-55">
        <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
          <div className="h-10 w-48 bg-[#E4E4E7] rounded mb-15 animate-pulse" />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 bg-[#E4E4E7] rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
