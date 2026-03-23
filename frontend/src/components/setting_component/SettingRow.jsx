import React from "react";
import { HiChevronRight } from "react-icons/hi2";

const SettingRow = ({
  icon: Icon,
  label,
  description,
  children,
  danger,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 py-3.5 border-b border-gray-100 last:border-0 ${
      onClick
        ? "cursor-pointer hover:bg-gray-50 px-5 -mx-5 rounded-xl transition-colors"
        : ""
    }`}
  >
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
        danger ? "bg-red-50" : "bg-[#E8F5E9]"
      }`}
    >
      <Icon
        className={`text-lg ${danger ? "text-red-500" : "text-[#25D366]"}`}
      />
    </div>
    <div className="flex-1">
      <p
        className={`text-sm font-medium ${danger ? "text-red-500" : "text-gray-800"}`}
      >
        {label}
      </p>
      {description && (
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      )}
    </div>
    {children ||
      (onClick && <HiChevronRight className="text-gray-300 text-lg" />)}
  </div>
);

export default SettingRow;
