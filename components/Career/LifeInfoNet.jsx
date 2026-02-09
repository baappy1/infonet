import Image from "next/image";

const DEFAULT_IMAGES = [
  "/assets/career/work-station.png",
  "/assets/career/smile.png",
  "/assets/career/work-station.png",
  "/assets/career/smile.png",
  "/assets/career/work-station.png",
];

export default function LifeInfoNet({
  topTitle = "[ Life at InfoNet ]",
  title = "Where Great People Build Great Technology",
  shortDescription = "At Infonet, our values shape how we build technology, how we support clients, and how we grow alongside the industries we serve.",
  galleryImages = DEFAULT_IMAGES,
}) {
  const images = Array.isArray(galleryImages) && galleryImages.length > 0 ? galleryImages : DEFAULT_IMAGES;

  return (
    <div className="pb-20 lg:pb-55 bg-[#F8F8F3]">
      <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
        <div className="w-full sm:w-164.75 sm:mb-0 mb-10">
          <div className="top-title mb-5">{topTitle}</div>
          <h2 className="heading-h2 mb-5">{title}</h2>
          <p className="paragraph-text mb-8 sm:mb-22.5">{shortDescription}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-[8px] sm:-mr-[8px] pl-2.5 pr-2.5">
        {images.map((src, i) => (
          <div key={i} className={`w-full sm:w-[calc(33.33%-8px)] lg:w-[calc(20%-8px)] flex flex-col ${i === 3 ? "justify-end" : ""}`}>
            <Image
              className="w-full lg:h-auto h-full object-cover rounded-lg"
              src={src}
              width={374}
              height={498}
              alt="Life at InfoNet"
              unoptimized={src.startsWith("http")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
