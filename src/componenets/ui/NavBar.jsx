import React from "react";

export function Navbar({ title = "", children }) {
  return (
    <nav className="flex w-full items-center justify-between border-b border-[#eadede] bg-white px-6 py-4 shadow-sm">
      
      {/* Left Side */}
      <div>
        <h1 className="text-xl font-bold text-[#7b1113]">
          {title}
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {children}
      </div>

    </nav>
  );
}