import React from "react";
import { Search } from "lucide-react";

export function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
}) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9f7b7c]"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#e3d4d4] bg-white py-3.5 pl-11 pr-4 text-sm text-[#3f2a2b] shadow-sm outline-none transition-all duration-300 placeholder:text-[#b9a4a4] hover:-translate-y-0.5 hover:border-[#c5aaaa] hover:shadow-[0_6px_18px_rgba(123,17,19,0.10)] focus:border-[#9f1d20] focus:shadow-[0_0_0_3px_rgba(159,29,32,0.08)]"
      />
    </div>
  );
}