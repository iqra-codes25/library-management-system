import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-[#eadede]
         bg-white/90 p-6 shadow-[0_8px_30px_rgba(123,17,19,0.08)] backdrop-blur-sm 
         transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#d9baba]
          hover:shadow-[0_14px_35px_rgba(123,17,19,0.14)] ${className}`}
    >
      
      {children}
    </div>
  );
}