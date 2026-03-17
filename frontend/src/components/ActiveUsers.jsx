import React from "react";
import avatar from "../assets/avatar.webp";

const ActiveUsers = ({ name = "Anjali" }) => {
  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="relative">
        <img
          src={avatar}
          alt=""
          className="w-14 h-14 min-w-14 min-h-14 rounded-full object-cover"
        />
        <span className="absolute right-0 bottom-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
      </div>
      <p className="text-sm mt-1">{name}</p>
    </div>
  );
};

export default ActiveUsers;
