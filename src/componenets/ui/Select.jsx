import React from "react";

export function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-semibold text-[#5f3b3c]"
        >
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full cursor-pointer rounded-xl border border-[#e3d4d4] bg-white px-4 py-4 text-sm text-[#3f2a2b] shadow-sm outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c5aaaa] hover:shadow-[0_6px_18px_rgba(123,17,19,0.10)] focus:border-[#9f1d20] focus:shadow-[0_0_0_3px_rgba(159,29,32,0.08)] disabled:cursor-not-allowed disabled:bg-[#f7f3f3] disabled:opacity-60"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}