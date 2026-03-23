import { useState, useRef, useEffect } from "react";
import {
  HiMiniEllipsisVertical,
  HiOutlineFaceSmile,
  HiMiniArrowLeft,
  HiOutlinePhone,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import { IoMdSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import lightChatBg from "../assets/chat-bg-light.png";
import avatar2 from "../assets/avatar2.jpg";
import NoChatSelected from "../components/user_chats/NoChatSelected";
import MessageBubble from "../components/user_chats/MessageBubble";

// Fake messages data
const FAKE_MESSAGES = [
  {
    id: 1,
    text: "Hey! How are you doing? 😊",
    time: "09:30 AM",
    isMine: false,
  },
  {
    id: 2,
    text: "I'm doing great, thanks for asking! Just finished a project.",
    time: "09:31 AM",
    isMine: true,
    seen: true,
  },
  {
    id: 3,
    text: "Oh wow, that's amazing! Which project was it?",
    time: "09:32 AM",
    isMine: false,
  },
  {
    id: 4,
    text: "It was the LinkUp chat app. Built with React, Node.js and WebSockets!",
    time: "09:33 AM",
    isMine: true,
    seen: true,
  },
  {
    id: 5,
    text: "That sounds so cool! Can I see it sometime? 👀",
    time: "09:35 AM",
    isMine: false,
  },
  {
    id: 6,
    text: "Of course! I'll share the link once it's deployed.",
    time: "09:36 AM",
    isMine: true,
    seen: true,
  },
  {
    id: 7,
    text: "Are you free tonight? We could catch up over a call 📞",
    time: "09:50 AM",
    isMine: false,
  },
  {
    id: 8,
    text: "Yeah sure! After 8 PM works for me.",
    time: "09:51 AM",
    isMine: true,
    seen: false,
  },
  {
    id: 9,
    text: "Perfect! Talk to you then 😄",
    time: "09:52 AM",
    isMine: false,
  },
];

// Date divider label component
const DateLabel = ({ label }) => (
  <div className="flex items-center justify-center my-4">
    <span className="bg-white/80 backdrop-blur-sm text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm border border-gray-100">
      {label}
    </span>
  </div>
);

const UserChats = ({ chat, onBack }) => {
  const [textMsg, setTextMsg] = useState("");
  const [messages, setMessages] = useState(FAKE_MESSAGES);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!textMsg.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: textMsg.trim(),
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMine: true,
      seen: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setTextMsg("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (!chat) {
    return (
      <div className="flex justify-between items-center px-3 md:px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <div className="h-screen w-full hidden md:flex flex-col">
            <NoChatSelected />
          </div>
        </div>
      </div>
    );
  }

  const { name, avatar: userAvatar = avatar2, online = false } = chat;

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-3 md:px-4 py-3 bg-white shadow-sm z-10 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="md:hidden text-gray-500 p-1 hover:bg-gray-100 rounded-full"
          >
            <HiMiniArrowLeft className="text-2xl" />
          </button>

          <div className="relative">
            <img
              src={userAvatar}
              alt={name}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
            />
            {online && (
              <span className="absolute right-0 bottom-0 w-3.5 h-3.5 rounded-full bg-(--wa-green-prim) border-2 border-white"></span>
            )}
          </div>

          <div>
            <h5 className="font-semibold text-gray-800 leading-tight">
              {name}
            </h5>
            <p
              className={`text-xs ${online ? "text-[#25D366] font-medium" : "text-gray-400"}`}
            >
              {online ? "online" : "last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <HiOutlinePhone className="text-xl" />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <HiOutlineVideoCamera className="text-xl" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <HiMiniEllipsisVertical className="text-xl" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-1 w-40 bg-white shadow-xl rounded-xl py-1.5 z-50 border border-gray-100">
                {[
                  "View Profile",
                  "Mute",
                  "Clear Chat",
                  "Block",
                  "Delete Chat",
                ].map((item) => (
                  <button
                    key={item}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      item === "Block" || item === "Delete Chat"
                        ? "text-red-500"
                        : "text-gray-700"
                    }`}
                    onClick={() => setShowMenu(false)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-3 md:px-6 py-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${lightChatBg})` }}
      >
        <DateLabel label="Today" />
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 px-2 md:px-3 py-2.5 bg-white border-t border-gray-100 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
        <button className="text-2xl p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0">
          <HiOutlineFaceSmile />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={textMsg}
          onChange={(e) => setTextMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 rounded-full py-2.5 px-4 text-sm focus:outline-none text-gray-800 placeholder-gray-400"
        />

        <button className="text-xl p-2 text-gray-400 hover:text-gray-600 transition-colors rotate-45 shrink-0">
          <MdAttachFile />
        </button>

        <button
          onClick={sendMessage}
          disabled={!textMsg.trim()}
          className={`shrink-0 text-lg p-2.5 text-white rounded-full transition-all duration-200 ${
            textMsg.trim()
              ? "bg-[#25D366] hover:bg-[#1DAA54] shadow-md scale-100"
              : "bg-gray-300 cursor-not-allowed scale-95"
          }`}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default UserChats;
