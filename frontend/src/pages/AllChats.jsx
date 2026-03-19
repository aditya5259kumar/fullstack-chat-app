// import React from "react";
import SearchBar from "../components/SearchBar";
import {
  HiMiniChatBubbleLeftEllipsis,
  // HiOutlineMagnifyingGlassPlus,
  // HiPlusCircle,
  HiUserPlus,
} from "react-icons/hi2";
// import ActiveUsers from "../components/ActiveUsers";
import UserChatMsg from "../components/UserChatMsg";

const AllChats = () => {
  return (
    <div className="h-screen min-w-90 w-180 border-x border-gray-300 flex flex-col overflow-y-auto scroll-smooth">
      
      <div className="px-2 md:px-4 flex justify-between items-center my-3 md:my-4">
        <div className="flex items-center gap-2 justify-center">
          <span className="text-3xl md:text-4xl text-(--wa-green-secondary)">
            <HiMiniChatBubbleLeftEllipsis />
          </span>
          <h4 className="text-2xl md:text-3xl font-semibold md:font-bold">
            LinkUp
          </h4>
        </div>
        <span className="text-2xl">
          <HiUserPlus />
        </span>
      </div>

      <SearchBar />

      {/* <div className="px-2 md:px-4 my-4 flex gap-6 flex-nowrap items-center overflow-x-auto scroll-smooth [scrollbar-width:none]">
        <ActiveUsers />
        <ActiveUsers />
        <ActiveUsers />
        <ActiveUsers />
      </div> */}

      <h4 className="text-lg px-2 md:px-4 font-semibold my-1 md:my-2">
        All Chats
      </h4>

      {/* REMOVE flex-1 overflow-y-auto */}
      <div>
        <UserChatMsg />
        <UserChatMsg />
        <UserChatMsg />
        <UserChatMsg />
        <UserChatMsg />
        <UserChatMsg />
        <UserChatMsg />
        <UserChatMsg />
        <UserChatMsg />
        <UserChatMsg />
        <UserChatMsg />
      </div>

    </div>
  );
};

export default AllChats;
