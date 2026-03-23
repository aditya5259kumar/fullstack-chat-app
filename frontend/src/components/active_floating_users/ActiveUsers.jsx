import React from "react";
import avatar from "../../assets/avatar.webp";
import avatar2 from "../../assets/avatar2.jpg";

// Fake active users data
const ACTIVE_USERS = [
  { id: 1, name: "Anjali", avatar: avatar, online: true },
  { id: 2, name: "Rahul", avatar: avatar2, online: true },
  { id: 3, name: "Priya", avatar: avatar, online: true },
  { id: 4, name: "Vikram", avatar: avatar2, online: true },
  { id: 5, name: "Simran", avatar: avatar, online: true },
  { id: 6, name: "Dev", avatar: avatar2, online: true },
];

const ActiveUserItem = ({ user }) => {
  return (
    <div className="flex flex-col items-center shrink-0 cursor-pointer group">
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 min-w-12 min-h-12 rounded-full object-cover ring-2 ring-[#25D366] ring-offset-1 group-hover:ring-offset-2 transition-all duration-200"
        />
        <span className="absolute right-0 bottom-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white"></span>
      </div>
      <p className="text-xs mt-1.5 text-gray-500 font-medium truncate max-w-12 text-center">
        {user.name}
      </p>
    </div>
  );
};

const ActiveUsers = () => {
  return (
    <div className="px-3 md:px-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Active Now
        </p>
        <span className="text-xs text-[#25D366] font-medium">
          {ACTIVE_USERS.length} online
        </span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {ACTIVE_USERS.map((user) => (
          <ActiveUserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default ActiveUsers;
