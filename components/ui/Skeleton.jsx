"use client";

export default function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`rounded-[4px] ${className}`}
      style={{
        background:
          "linear-gradient(90deg, #E4E4E7 25%, #F4F4F5 50%, #E4E4E7 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
      {...props}
    />
  );
}
