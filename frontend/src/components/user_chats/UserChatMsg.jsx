import React, { useState, useRef, useEffect } from "react";
import { BsFillPinAngleFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const UserChatMsg = ({ chat, isActive = false, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // console.log(chat);

  // const {
  //   name = "Khushi Singh",
  //   avatar: userAvatar = avatar2,
  //   lastMsg = "This is a very long message that should never break your UI no matter what happens",
  //   time = "09:55 PM",
  //   unreadCount = 0,
  //   pinned = false,
  //   online = false,
  //   seen = false,
  //   isSentByMe = false,
  // } = chat;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-between hover:pr-1 px-3 pr-1 md:px-4 py-3 cursor-pointer rounded-sm transition-all duration-150 relative ${
        isActive ? "bg-(--wa-hover)" : "hover:bg-gray-100"
      }`}
    >
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Avatar */}
        <div className="relative shrink-0">
          {chat?.users?.[0]?.avatar ? (
            <img
              src={chat.users[0].avatar}
              alt={chat?.users?.[0]?.username}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center font-semibold">
              {chat?.users?.[0]?.username?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
          {/* {online && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-(--wa-green-prim) border-2 border-white rounded-full"></span>
          )} */}
        </div>

        {/* Text */}
        <div className="flex flex-col min-w-0">
          <h5 className="font-semibold text-[15px] text-gray-800 truncate">
            {chat?.users[0]?.username}
          </h5>
          <p className="text-gray-500 text-sm truncate flex items-center gap-1">
            {/* {isSentByMe && (
              <span
                className={seen ? "text-(--wa-blue-accent)" : "text-gray-400"}
              >
                <IoCheckmarkDoneSharp className="text-base inline" />
              </span>
            )} */}
            {chat?.last_message}
          </p>
        </div>
      </div>

      {/* Right: Time + Badge */}
      <div className="flex items-center gap-2">
        <div className=" flex items-end flex-col gap-1.5 ml-2 shrink-0">
          <p className={`text-xs whitespace-nowrap font-medium text-gray-500`}>
            {new Date(chat?.last_message_time).toLocaleTimeString()}
          </p>

          <div className="flex items-center gap-1.5">
            {/* {pinned && <BsFillPinAngleFill className="text-red-600 text-sm" />} */}
            {/* {unreadCount > 0 && (
              <span className="text-white text-[11px] font-bold min-w-5 h-5 px-1.5 bg-(--wa-green-prim) rounded-full flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )} */}
          </div>
        </div>

        {/* 3-dot Menu */}
        <div
          ref={menuRef}
          className="right-2 top-3 hidden group-hover:block z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <BsThreeDotsVertical className="text-sm" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white shadow-xl rounded-xl py-1.5 z-50 border border-gray-100">
              {/* <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                {pinned ? "Unpin Chat" : "Pin Chat"}
              </button> */}
              {/* <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Mark as Read
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Mute
            </button> */}
              <button className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserChatMsg;
