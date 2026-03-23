import React, { useState } from "react";
import SearchBar from "../components/search_bar/SearchBar";
import { HiUserPlus } from "react-icons/hi2";
import ActiveUsers from "../components/active_floating_users/ActiveUsers";
import UserChatMsg from "../components/user_chats/UserChatMsg";
import { useNavigate, useParams } from "react-router";
import avatar from "../assets/avatar.webp";
import avatar2 from "../assets/avatar2.jpg";

// Fake chats data
export const FAKE_CHATS = [
  {
    id: 1,
    name: "Khushi Singh",
    avatar: avatar2,
    lastMsg: "Hey! Are you free tonight? 😊",
    time: "09:55 PM",
    unreadCount: 3,
    pinned: true,
    online: true,
    seen: false,
    isSentByMe: false,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    avatar: avatar,
    lastMsg: "Sure, let's catch up tomorrow morning!",
    time: "08:30 PM",
    unreadCount: 0,
    pinned: false,
    online: false,
    seen: true,
    isSentByMe: true,
  },
  {
    id: 3,
    name: "Anjali Verma",
    avatar: avatar,
    lastMsg: "Did you check the assignment? 📚",
    time: "07:12 PM",
    unreadCount: 12,
    pinned: false,
    online: true,
    seen: false,
    isSentByMe: false,
  },
  {
    id: 4,
    name: "Vikram Patel",
    avatar: avatar2,
    lastMsg: "The meeting is rescheduled to 4 PM.",
    time: "05:45 PM",
    unreadCount: 0,
    pinned: true,
    online: false,
    seen: true,
    isSentByMe: false,
  },
  {
    id: 5,
    name: "Priya Mehta",
    avatar: avatar,
    lastMsg: "Lol 😂 that was so funny!",
    time: "03:20 PM",
    unreadCount: 1,
    pinned: false,
    online: true,
    seen: false,
    isSentByMe: false,
  },
  {
    id: 6,
    name: "Dev Kumar",
    avatar: avatar2,
    lastMsg: "Can you send me the project files?",
    time: "Yesterday",
    unreadCount: 0,
    pinned: false,
    online: false,
    seen: true,
    isSentByMe: true,
  },
  {
    id: 7,
    name: "Simran Kaur",
    avatar: avatar,
    lastMsg: "Thanks for the help! Really appreciate it 🙏",
    time: "Yesterday",
    unreadCount: 0,
    pinned: false,
    online: false,
    seen: true,
    isSentByMe: false,
  },
  {
    id: 8,
    name: "Arjun Nair",
    avatar: avatar2,
    lastMsg: "Are we still on for the trip next week?",
    time: "Mon",
    unreadCount: 0,
    pinned: false,
    online: false,
    seen: false,
    isSentByMe: false,
  },
  {
    id: 9,
    name: "Neha Gupta",
    avatar: avatar,
    lastMsg: "I sent the docs over email.",
    time: "Sun",
    unreadCount: 0,
    pinned: false,
    online: false,
    seen: true,
    isSentByMe: true,
  },
  {
    id: 10,
    name: "Kabir Singh",
    avatar: avatar2,
    lastMsg: "Okay, talk later!",
    time: "Sat",
    unreadCount: 0,
    pinned: false,
    online: false,
    seen: true,
    isSentByMe: false,
  },
];

const AllChats = ({ activeChatId, onSelectChat, isMobileView }) => {
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

  function handleChatSelect(chat) {
    if (onSelectChat) onSelectChat(chat);
    navigate(`/chat/${chat.id}`);
  }

  return (
    <div
      className={`h-screen bg-white  flex flex-col overflow-hidden
        w-full md:w-80 lg:w-110`}
    >
      {/* Header */}
      <div className="px-3 md:px-4 pt-4 pb-3 flex justify-between items-center">
        <h4 className="text-xl font-bold text-gray-800">Messages</h4>
        <div className="flex items-center gap-1">
          {/* <button className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
            <HiOutlineAdjustmentsHorizontal className="text-lg" />
          </button> */}
          <button className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
            <HiUserPlus className="text-xl md:text-2xl" />
          </button>
        </div>
      </div>

      {/* Search */}
      <SearchBar onSearch={setSearchQuery} />

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
        {FAKE_CHATS.map((chat) => (
          <UserChatMsg
            key={chat.id}
            chat={chat}
            isActive={activeChatId === chat.id}
            onClick={() => handleChatSelect(chat)}
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
