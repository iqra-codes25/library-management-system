import React from "react";

export function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  disabled = false,
}) {
  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="peer w-full rounded-xl border border-[#e3d4d4] bg-white px-4 py-4 text-sm text-[#3f2a2b] outline-none transition-all duration-300 placeholder:text-[#b9a4a4] hover:-translate-y-0.5 hover:border-[#c5aaaa] hover:shadow-[0_6px_18px_rgba(123,17,19,0.10)] focus:border-[#9f1d20] focus:shadow-[0_0_0_3px_rgba(159,29,32,0.08)] disabled:cursor-not-allowed disabled:bg-[#f7f3f3] disabled:opacity-60"
      />

      {label && (
        <label
          htmlFor={name}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-sm text-[#9f1d20] transition-all duration-200 peer-placeholder-shown:opacity-0 peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:opacity-100 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:opacity-100"
        >
          {label}
        </label>
      )}
    </div>
  );
}