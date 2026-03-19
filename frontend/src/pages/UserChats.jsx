import { useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import {
  HiOutlineExclamationCircle,
  HiOutlineFaceSmile,
  HiMiniArrowLeft,
} from "react-icons/hi2";
import { IoMdSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import lightChatBg from "../assets/chat-bg-light.png";
// import darkChatBg from "../assets/chat-bg-dark.png";

import avatar from "../assets/avatar.webp";

const UserChats = () => {
  const [textMsg, setTextMsg] = useState("");

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex justify-between items-center p-2 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-3">
            <span className="md:hidden block text-3xl cursor-pointer">
              <HiMiniArrowLeft />
            </span>
            <img
              src={avatar}
              alt=""
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
            />
            <span className="absolute right-0 bottom-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
          </div>
          <div>
            <h5 className="text-base font-semibold">Khushi Singh</h5>
            <p className="text-gray-500 text-xs">online</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-2xl p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <HiMiniEllipsisVertical />
          </span>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto px-2 md:px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${lightChatBg})` }}
      >
        <p className="">chats</p>
      </div>

      <div className="flex items-center py-2 pr-2 md:pr-4 pl-0 md:pl-2 shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
        <button className="text-2xl p-1 cursor-pointer mr-1 md:mr-2">
          <HiOutlineFaceSmile />
        </button>

        <input
          type="text"
          value={textMsg}
          onChange={(e) => setTextMsg(e.target.value)}
          placeholder="Type your message"
          className="focus:outline-none w-full bg-gray-100 rounded-full py-2.5 px-4"
        />

        <div className="flex gap-2 md:gap-3 ml-2 md:ml-3">
          <button className="text-2xl p-1 rotate-45 cursor-pointer">
            <MdAttachFile />
          </button>
          <button className="cursor-pointer text-xl p-2 bg-(--wa-green-dark) text-white rounded-full">
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChats;
