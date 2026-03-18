import React from "react";
import avatar from "../assets/avatar.webp";
import {
  HiMiniChatBubbleLeftEllipsis,
  HiMiniCog6Tooth,
  HiMoon,
} from "react-icons/hi2";
import { MdSunny } from "react-icons/md";




const Navbar = () => {
  return (
    <div className="sticky left-0 top-0 shadow-lg w-fit py-6 px-2.5 h-screen flex flex-col items-center justify-between">
      <div>
        <span className=" text-4xl text-(--wa-green-secondary) flex items-center justify-center">
          <HiMiniChatBubbleLeftEllipsis className="" />
        </span>

        <div className=" mt-8 flex flex-col gap-4">
          <span className=" text-xl hover:bg-(--wa-bg-chat) hover:white text-(--wa-green-dark) p-3 rounded-lg">
            <HiMiniCog6Tooth />
          </span>
          <span className="text-xl hover:bg-(--wa-bg-chat) hover:text-(--wa-green-secondary) text-(--wa-green-dark) p-3 rounded-lg">
            <HiMiniCog6Tooth />
          </span>
          <span className="text-xl hover:bg-(--wa-bg-chat) hover:text-(--wa-green-secondary) text-(--wa-green-dark) p-3 rounded-lg">
            <HiMiniCog6Tooth />
          </span>
          <span className="text-xl hover:bg-(--wa-bg-chat) hover:text-(--wa-green-secondary) text-(--wa-green-dark) p-3 rounded-lg">
            <HiMiniCog6Tooth />
          </span>
          <span className="text-xl hover:bg-(--wa-bg-chat) hover:text-(--wa-green-secondary) text-(--wa-green-dark) p-3 rounded-lg">
            <HiMiniCog6Tooth />
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <span className="text-xl hover:bg-(--wa-bg-chat) hover:text-(--wa-green-secondary) text-(--wa-green-dark) p-3 rounded-lg">
          {/* <MdSunny /> */}
          <HiMoon />
        </span>

        <img
          src={avatar}
          alt=""
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
