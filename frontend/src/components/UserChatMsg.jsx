import React, { useState } from "react";
import avatar2 from "../assets/avatar2.jpg";
import { BsFillPinAngleFill, BsThreeDotsVertical } from "react-icons/bs";

const UserChatMsg = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer rounded-sm relative">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative">
          <img
            src={avatar2}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="flex flex-col min-w-0 max-w-[70%]">
          <h5 className="font-medium text-base truncate">
            Khushi Singh with very very very long name
          </h5>
          <p className="text-gray-500 text-sm truncate">
            This is a very long message that should never break your UI no
            matter what happens
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-2 shrink-0">
        <div className="flex flex-col gap-1 items-end">
          <p className="text-xs md:text-sm text-gray-400 whitespace-nowrap">
            09:55 PM
          </p>

          <div className="flex items-center gap-2">
            <BsFillPinAngleFill className="text-gray-500 text-base" />
            <span className="text-white text-xs px-2 py-0.5 bg-(--wa-green-prim) rounded-full">
              12
            </span>
          </div>
        </div>

        <div className="relative hidden group-hover:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="opacity-100 transition text-gray-500"
          >
            <BsThreeDotsVertical />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md py-2 z-50">
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Pin Chat
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
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
