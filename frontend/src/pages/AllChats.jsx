import React from "react";
import SearchBar from "../components/SearchBar";
import {
  HiMiniChatBubbleLeftEllipsis,
  HiOutlineMagnifyingGlassPlus,
  HiPlusCircle,
  HiUserPlus,
} from "react-icons/hi2";
import ActiveUsers from "../components/ActiveUsers";
import UserChatMsg from "../components/UserChatMsg";

const AllChats = () => {
  return (
    <div className="px-6">
      <div className="flex justify-between items-center my-5">
        <h3 className="text-2xl font-semibold">Chats</h3>
        <span className="text-2xl">
          <HiUserPlus />
        </span>
      </div>

      <SearchBar />

      <div className="my-6 flex gap-6 flex-nowrap items-center overflow-x-auto scroll-smooth [scrollbar-width:none]">
        <ActiveUsers />
        <ActiveUsers />
        <ActiveUsers />
        <ActiveUsers />
        <ActiveUsers />
        <ActiveUsers />
        <ActiveUsers />
        <ActiveUsers />
      </div>

      <h4 className="text-lg font-semibold">Recents</h4>

      <div className="flex flex-col">
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
