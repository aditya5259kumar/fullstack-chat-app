import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
const SearchBar = lazy(() => import("../components/search_bar/SearchBar"));
const UserChatMsg = lazy(() => import("../components/user_chats/UserChatMsg"));

import socket from "../socket/initSocket";
import { HiMiniChatBubbleLeftEllipsis, HiUserPlus } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  userConversation,
  updateConvoLastMessage,
  incrementUnreadCount,
} from "../redux/slices/userConvoSlice";

const AllChats = ({ activeChatId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();

  function handleChatSelect(id) {
    navigate(`/chat/${id}`);
  }

  const dispatch = useDispatch();
  const { inboxData, loading, error } = useSelector((state) => state.convo);

  // Keep a ref in sync so the socket listener always sees fresh inboxData
  // without needing to re-attach on every inbox change.
  const inboxDataRef = useRef(inboxData);
  useEffect(() => {
    inboxDataRef.current = inboxData;
  }, [inboxData]);

  useEffect(() => {
    dispatch(userConversation());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myId = token ? jwtDecode(token).id : null;

    const handleNewMessage = (newMessage) => {
      const convoExists = inboxDataRef.current.some(
        (c) => String(c.conversation_id) === String(newMessage.conversation_id),
      );

      if (!convoExists) {
        // First message of a brand-new conversation — fetch once to pull
        // in participant info that only the DB has right now.
        dispatch(userConversation());
        return;
      }

      dispatch(
        updateConvoLastMessage({
          conversation_id: newMessage.conversation_id,
          message: newMessage,
        }),
      );

      const isMine = String(newMessage.sender_id) === String(myId);
      const isOpen =
        String(activeChatId) === String(newMessage.conversation_id);

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
        <Suspense
          fallback={
            <div className="flex justify-center">
              <div className="w-5 h-5 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <SearchBar onSearch={setSearchQuery} />
        </Suspense>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-14">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex justify-center">
              <div className="w-5 h-5 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
            </div>
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
            <Suspense
              fallback={
                <div className="flex justify-center mt-8">
                  <div className="w-5 h-5 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <UserChatMsg
                key={chat?.conversation_id}
                chat={chat}
                isActive={activeChatId === chat?.conversation_id}
                onClick={() => handleChatSelect(chat?.conversation_id)}
              />
            </Suspense>
          ))
        )}
      </div>
    </div>
  );
};

export default AllChats;
