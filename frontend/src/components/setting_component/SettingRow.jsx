import React from "react";
import { HiChevronRight } from "react-icons/hi2";

const SettingRow = ({
  label,
  description,
  children,
  danger,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 py-3.5 border-b border-(--border) last:border-0 ${
      onClick
        ? "cursor-pointer hover:bg-(--surface-2) px-5 -mx-5 rounded-xl transition-colors"
        : ""
    }`}
  >
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
        danger ? "bg-(--error)/10" : "bg-(--surface-2)"
      }`}
    >
      <Icon
        className={`text-lg ${danger ? "text-(--error)" : "text-(--primary)"}`}
      />
    </div>
    <div className="flex-1">
      <p
        className={`text-sm font-medium ${danger ? "text-(--error)" : "text-(--text)"}`}
      >
        {label}
      </p>
      {description && (
        <p className="text-xs text-(--text-muted) mt-0.5">{description}</p>
      )}
    </div>
    {children ||
      (onClick && <HiChevronRight className="text-(--text-muted) text-lg" />)}
  </div>
);

export default SettingRow;
