import React, { useEffect, useState } from "react";
import SearchBar from "../components/search_bar/SearchBar";
import { HiUserPlus } from "react-icons/hi2";
import ActiveUsers from "../components/active_floating_users/ActiveUsers";
import UserChatMsg from "../components/user_chats/UserChatMsg";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { userConversation } from "../redux/slices/userConvoSlice";
import Navbar from "../components/navbar/Navbar";

const AllChats = ({ activeChatId, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  // const filteredChats = FAKE_CHATS.filter((chat) => {
  //   const matchesSearch = chat.name
  //     .toLowerCase()
  //   if (activeFilter === "unread") return matchesSearch && chat.unreadCount > 0;
  //   if (activeFilter === "pinned") return matchesSearch && chat.pinned;
  //   return matchesSearch;
  // });

  // const pinnedChats = filteredChats.filter((c) => c.pinned);
  // const unpinnedChats = filteredChats.filter((c) => !c.pinned);

  function handleChatSelect(id) {
    // if (onSelectChat) onSelectChat(chat);
    navigate(`/chat/${id}`);
  }

  const dispatch = useDispatch();
  const { inboxData } = useSelector((state) => state.convo);

  // console.log("userConversation inboxData-----------------", inboxData);
  // console.log("inboxData type-------------------", typeof inboxData);
  // console.log("inboxData value-------------------", inboxData);

  useEffect(() => {
    dispatch(userConversation());
  }, [dispatch]);

  return (
    <div
      className={`h-screen bg-white  flex flex-col overflow-hidden
        w-full md:w-80 lg:w-110 shadow-xl`}
    >
      {/* Header */}
      <div className="px-3 md:px-4 pt-4 pb-3 flex justify-between items-center">
        <h4 className="text-xl font-bold text-gray-800">Messages</h4>
        <div className="flex items-center gap-1">
          {/* <button className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
            <HiOutlineAdjustmentsHorizontal className="text-lg" />
          </button> */}
          <Link
            to="/find"
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <HiUserPlus className="text-xl md:text-2xl" />
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 md:px-4 mb-3">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Filter Tabs */}
      {/* <div className="flex gap-2 px-3 md:px-4 mb-3">
        {["all", "unread", "pinned"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize transition-all duration-200 ${
              activeFilter === filter
                ? "bg-[#25D366] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div> */}

      {/* Active Users */}
      {/* <ActiveUsers /> */}

      {/* Chat list */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {/* {pinnedChats.length > 0 && (
          <>
            <p className="px-4 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              📌 Pinned
            </p>
            {pinnedChats.map((chat) => (
              <UserChatMsg
                key={chat.id}
                chat={chat}
                isActive={activeChatId === chat.id}
                onClick={() => handleChatSelect(chat)}
              />
            ))}
          </>
        )} */}

        {/* {unpinnedChats.length > 0 && ( */}
        {/* <> */}
        {/* {pinnedChats.length > 0 && (
              <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                All Chats
              </p>
            )} */}
        {Array.isArray(inboxData) &&
  inboxData.map((chat) => (
    <UserChatMsg
      key={chat?.conversation_id}
      chat={chat}
      isActive={activeChatId === chat?.conversation_id}
      onClick={() => handleChatSelect(chat?.conversation_id)}
    />
  ))}
        {/* </> */}
        {/* )} */}

        {/* {FAKE_CHATS.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center text-gray-400">
            <HiMiniChatBubbleLeftEllipsis className="text-5xl mb-3 text-gray-200" />
            <p className="text-sm text-center">No chats found</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AllChats;
