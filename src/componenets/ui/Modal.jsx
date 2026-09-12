import React from "react";
import { X } from "lucide-react";

export function Modal({
  isOpen = false,
  onClose,
  title,
  children,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-[#eadede] bg-white shadow-[0_20px_60px_rgba(123,17,19,0.18)]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eee2e2] px-6 py-4">
          <h2 className="text-xl font-bold text-[#7b1113]">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#8f7778] transition-all duration-300 hover:bg-[#f8eeee] hover:text-[#7b1113] active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}