import React, { useEffect, useState } from "react";
import SearchBar from "../components/search_bar/SearchBar";
import { HiMiniChatBubbleLeftEllipsis, HiUserPlus } from "react-icons/hi2";
import UserChatMsg from "../components/user_chats/UserChatMsg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import socket from "../socket/initSocket";

import {
  userConversation,
  updateConvoLastMessage,
  incrementUnreadCount,
} from "../redux/slices/userConvoSlice";
import Navbar from "../components/navbar/Navbar";

const AllChats = ({ activeChatId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();

  function handleChatSelect(id) {
    navigate(`/chat/${id}`);
  }

  const dispatch = useDispatch();
  const { inboxData, loading, error } = useSelector((state) => state.convo);

  useEffect(() => {
    dispatch(userConversation());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myId = token ? jwtDecode(token).id : null;

    const handleNewMessage = (newMessage) => {
      dispatch(
        updateConvoLastMessage({
          conversation_id: newMessage.conversation_id,
          message: newMessage,
        }),
      );

      const isMine = String(newMessage.sender_id) === String(myId);
      const isOpen = String(activeChatId) === String(newMessage.conversation_id);

      if (!isMine && !isOpen) {
        dispatch(incrementUnreadCount(newMessage.conversation_id));
      }
    };

    const handleMessagesSeen = ({ conversationId }) => {
      dispatch(
        updateConvoLastMessage({
          conversation_id: conversationId,
          message: { status: "seen" },
        }),
      );
    };

    socket.on("receive_message", handleNewMessage);
    socket.on("new_conversation_message", handleNewMessage);
    socket.on("messages_seen", handleMessagesSeen);

    return () => {
      socket.off("receive_message", handleNewMessage);
      socket.off("new_conversation_message", handleNewMessage);
      socket.off("messages_seen", handleMessagesSeen);
    };
  }, [dispatch, activeChatId]);

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

  return (
    <div
      className={`h-screen bg-(--surface) flex flex-col overflow-hidden
        w-full md:w-80 lg:w-110 shadow-(--shadow-lg)`}
    >
      <div className="px-3 space-x-1.5 md:px-4 py-4 md:py-6 flex items-center">
        <HiMiniChatBubbleLeftEllipsis className="text-(--primary) text-2xl block md:hidden" />
        <h4 className="text-xl font-bold text-(--text)">Messages</h4>
      </div>

      <div className="px-3 md:px-4 mb-2 md:mb-4">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-(--text) text-center">
              Loading conversations...
            </p>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center px-4 text-center">
            <p className="text-(--error) text-center">
              {error.message || "Failed to load conversations"}
            </p>
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-(--text-muted)">
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