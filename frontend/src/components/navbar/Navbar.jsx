import React from "react";
import avatar from "../../assets/avatar.webp";
import {
  HiMiniChatBubbleLeftEllipsis,
  HiMiniCog6Tooth,
  HiMoon,
  HiUser,
  HiMiniChatBubbleBottomCenterText,
} from "react-icons/hi2";

import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(userLogout());
    navigate("/login");
  }

  return (
    <div className="sticky left-0 top-0 z-50 w-15 md:w-18 bg-white border-r border-gray-100 shadow-lg h-screen flex flex-col items-center justify-between py-4">
      {/* Logo */}
      <div className="flex flex-col items-center gap-8 w-full px-2">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-(--wa-green-secondary) rounded-full shadow-md">
          <HiMiniChatBubbleLeftEllipsis className="text-white text-xl md:text-2xl" />
        </div>

        <div className="flex w-full flex-col gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center justify-center w-full py-3 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? "bg-(--wa-hover) text-(--wa-green-secondary)"
                  : "hover:bg-gray-100 text-(--wa-green-dark)"
              }`
            }
            title="Chats"
          >
            <HiMiniChatBubbleBottomCenterText className="text-xl" />
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center justify-center  w-full py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#E8F5E9] text-(--wa-green-secondary)"
                  : "hover:bg-gray-100 text-(--wa-green-dark)"
              }`
            }
            title="Profile"
          >
            <HiUser className="text-xl" />
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center justify-center w-full py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#E8F5E9] text-(--wa-green-secondary)"
                  : "hover:bg-gray-100 text-(--wa-green-dark)"
              }`
            }
            title="Settings"
          >
            <HiMiniCog6Tooth className="text-xl" />
          </NavLink>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        <button
          className="flex items-center justify-center w-full py-3 rounded-xl text-(--wa-green-dark) hover:bg-gray-100 hover:text-gray-600 transition-all duration-200"
          title="Dark mode"
        >
          <HiMoon className="text-xl" />
        </button>

        <button onClick={handleLogout} title="Profile / Logout">
          <img
            src={avatar}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
