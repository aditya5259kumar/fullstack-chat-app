import React from "react";
import { HiPencil } from "react-icons/hi2";

const InfoRow = ({ icon: Icon, label, value, editable, onEdit }) => (
  <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
    <div className="w-9 h-9 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
      <Icon className="text-[#25D366] text-lg" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-sm text-gray-800 font-medium">{value}</p>
    </div>
    {editable && (
      <button
        onClick={onEdit}
        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <HiPencil className="text-base" />
      </button>
    )}
  </div>
);

export default InfoRow;
