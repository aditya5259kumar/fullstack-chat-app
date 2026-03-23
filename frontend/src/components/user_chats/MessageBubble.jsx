import React from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

// Single message bubble
const MessageBubble = ({ message }) => {
  return (
    <div
      className={`flex ${message.isMine ? "justify-end" : "justify-start"} mb-1.5`}
    >
      <div
        className={`relative max-w-[75%] md:max-w-[60%] px-3 py-2 rounded-2xl shadow-sm ${
          message.isMine
            ? "bg-(--wa-msg-out) rounded-br-sm"
            : "bg-white rounded-bl-sm"
        }`}
      >
        <p className="text-sm text-gray-800 leading-relaxed wrap-break-words">
          {message.text}
        </p>
        <div
          className={`flex items-center gap-1 mt-0.5 ${
            message.isMine ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-[12px] text-gray-400">{message.time}</span>
          {message.isMine && (
            <span
              className={`${message.seen ? "text-(--wa-blue-accent)" : "text-gray-400"}`}
            >
              <IoCheckmarkDoneSharp className="inline text-base" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
