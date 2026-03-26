import React from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";

// Single message bubble
const MessageBubble = ({ message }) => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.id;

  // console.log("userId=============", userId);
  // console.log("message=============", message);

  return (
    <div
      className={`flex ${message?.sender?.id === userId ? "justify-end" : "justify-start"} mb-1.5`}
    >
      <div
        className={`relative max-w-[75%] md:max-w-[60%] px-3 py-2 rounded-2xl shadow-sm ${
          message?.sender?.id === userId
            ? "bg-(--wa-msg-out) rounded-br-sm"
            : "bg-white rounded-bl-sm"
        }`}
      >
        <p className="text-sm text-gray-800 leading-relaxed wrap-break-words">
          {message?.content}
        </p>
        <div
          className={`flex items-center gap-1 mt-0.5 ${
            message?.id === userId ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-[12px] text-gray-400">
            {message?.created_at}
          </span>
          {/* {message?.id === userId && (
            <span
              className={`${message.seen ? "text-(--wa-blue-accent)" : "text-gray-400"}`}
            >
              <IoCheckmarkDoneSharp className="inline text-base" />
            </span>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
