import BlogContent from "@/components/NewsAndBlog/BlogContent";
import BlogDetails from "@/components/NewsAndBlog/BlogDetails";
import SimilarInsights from "@/components/NewsAndBlog/SimilarInsights";
import React from "react";

const BlogDetailsPage = () => {
  return (
    <>
      <BlogDetails />
      <BlogContent />
      <SimilarInsights />
    </>
  );
};

export default BlogDetailsPage;
