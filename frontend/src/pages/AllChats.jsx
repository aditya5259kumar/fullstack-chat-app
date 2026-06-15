import React, { useEffect, useState } from "react";
import SearchBar from "../components/search_bar/SearchBar";
import { HiUserPlus } from "react-icons/hi2";
import UserChatMsg from "../components/user_chats/UserChatMsg";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket/initSocket";

import { userConversation } from "../redux/slices/userConvoSlice";
import Navbar from "../components/navbar/Navbar";

const AllChats = ({ activeChatId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();

  function handleChatSelect(id) {
    // if (onSelectChat) onSelectChat(chat);
    navigate(`/chat/${id}`);
  }

  const dispatch = useDispatch();
  const { inboxData, loading, error } = useSelector((state) => state.convo);

  console.log("userConversation inboxData-----------------", inboxData);
  // console.log("inboxData type-------------------", typeof inboxData);
  // console.log("inboxData value-------------------", inboxData);

  useEffect(() => {
    dispatch(userConversation());

    const handleNewConversation = () => {
      dispatch(userConversation());
    };

    const handleMessagesSeen = () => {
      dispatch(userConversation());
    };

    socket.on("new_conversation_message", handleNewConversation);
    socket.on("messages_seen", handleMessagesSeen);

    return () => {
      socket.off("new_conversation_message", handleNewConversation);
      socket.off("messages_seen", handleMessagesSeen);
    };
  }, [dispatch]);

  const filteredChats = (Array.isArray(inboxData) ? inboxData : []).filter(
    (chat) =>
      chat.users?.some(
        (user) =>
          user.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          user.username?.toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading conversations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">
          {error.message || "Failed to load conversations"}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`h-screen bg-white  flex flex-col overflow-hidden
        w-full md:w-80 lg:w-110 shadow-xl`}
    >
      <div className="px-3 md:px-4 pt-4 pb-3 flex justify-between items-center">
        <h4 className="text-xl font-bold text-gray-800">Messages</h4>
        <div className="flex items-center gap-1">
          <Link
            to="/find"
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <HiUserPlus className="text-xl md:text-2xl" />
          </Link>
        </div>
      </div>

      <div className="px-3 md:px-4 mb-3">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {filteredChats.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">
              {searchQuery
                ? "No matching conversations found"
                : "No conversations yet"}
            </p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <UserChatMsg
              key={chat?.conversation_id}
              chat={chat}
              isActive={activeChatId === chat?.conversation_id}
              onClick={() => handleChatSelect(chat?.conversation_id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllChats;
