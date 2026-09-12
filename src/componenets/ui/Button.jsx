import React from "react";

export function Button({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  const buttonStyles = {
    primary:
      "bg-gradient-to-r from-[#7b1113] to-[#9f1d20] text-white shadow-lg shadow-[#7b1113]/25 hover:from-[#8f171a] hover:to-[#b3262a] hover:shadow-xl hover:shadow-[#7b1113]/30",

    secondary:
      "bg-[#f8eeee] text-[#7b1113] border border-[#ead2d2] shadow-md hover:bg-[#f1dede] hover:shadow-lg",
  };

  const sizeStyles = {
    small: "px-4 py-2 text-xs",
    medium: "px-7 py-3 text-sm",
    large: "px-8 py-4 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${buttonStyles[variant]}
        ${sizeStyles[size]}
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        font-semibold
        tracking-wide
        transition-all
        duration-300
        ease-out
         cursor-pointer
        hover:-translate-y-1
        active:translate-y-0
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-[#7b1113]/30
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
}