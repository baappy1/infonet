"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ButtonNext from "../Global/ButtonNext";
import ButtonPrev from "../Global/ButtonPrev";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import BlogCard from "./BlogCard";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const NewsBanner = ({
  topTitle = "[ Insights ]",
  title = "Innovation That Fuels the Future",
  items = [],
}) => {
  const [api, setApi] = useState(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cards = Array.isArray(items) && items.length > 0
    ? items
    : [...Array(5)].map(() => null);

  return (
    <section className="">
      <div className="h-full lg:h-235 pb-5 bg-linear-to-b from-[#F8F8F3] to-[#EBFF3A] rounded-lg">
        <div className="container mx-auto px-2.5">
          <p className="font-jetbrains text-[#08090D] uppercase text-xs leading-[100%] pt-34">
            {topTitle}
          </p>

          <h1 className="font-manrope text-[28px] leading-7.5 lg:text-[50px] lg:leading-15 mb-18 max-w-134.25">
            {title}
          </h1>

          <div className="relative mt-10 lg:mt-25">
            <Carousel opts={{}} setApi={setApi} className="w-full">
              <CarouselContent className="w-full flex gap-4">
                {cards.map((post, index) => (
                  <CarouselItem key={post?.id ?? index} className="w-full">
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                    >
                      <BlogCard
                        item={
                          post
                            ? {
                                category: post.category || "News & Blog",
                                date: formatDate(post.date),
                                title: post.title,
                                description: post.excerpt,
                                image: post.image || "/assets/newsandblog/pump.png",
                                slug: post.slug,
                              }
                            : undefined
                        }
                      />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <button
              onClick={() => api?.scrollPrev()}
              className="absolute bottom-5 md:bottom-7.5 left-44 sm:left-114 md:left-148 lg:left-156.5 z-10 p-2 bg-[#F8F8F3] hover:bg-[#EBFF3A] cursor-pointer rounded-sm w-12 h-10 flex justify-center items-center"
            >
              <ButtonPrev />
            </button>

            <button
              onClick={() => api?.scrollNext()}
              className="absolute bottom-5 md:bottom-7.5 right-5 lg:left-170.5 z-10 p-2 bg-[#F8F8F3] hover:bg-[#EBFF3A] cursor-pointer rounded-sm w-12 h-10 flex justify-center items-center"
            >
              <ButtonNext />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsBanner;
