import React from "react";

export function Badge({ children, variant = "neutral" }) {
  const badgeStyles = {
    success:
      "bg-[#e8f7ef] text-[#218653] border border-[#ccebd9]",

    warning:
      "bg-[#fff4e5] text-[#c47716] border border-[#f5dfbd]",

    danger:
      "bg-[#f9e9e9] text-[#a64b4b] border border-[#edcccc]",

    neutral:
      "bg-[#f1f3f6] text-[#596579] border border-[#e1e5eb]",
  };

  return (
    <span
      className={`${badgeStyles[variant]} inline-flex items-center rounded-full px-5 py-1.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm`}
    >
      {children}
    </span>
  );
}