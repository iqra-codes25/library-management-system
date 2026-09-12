import React from "react";

export function IconButton({
  children,
  onClick,
  variant = "default",
  type = "button",
  disabled = false,
  title,
    className = "",
}) {
  const buttonStyles = {
    default:
      "text-[#6f4a4b] hover:bg-[#f8eeee] hover:text-[#7b1113]",

    primary:
      "bg-[#f8eeee] text-[#7b1113] hover:bg-[#f1dede] hover:text-[#9f1d20]",

    danger:
      "text-[#a64b4b] hover:bg-[#f9e9e9] hover:text-[#8f3030]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${buttonStyles[variant]} inline-flex items-center justify-center rounded-lg p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}