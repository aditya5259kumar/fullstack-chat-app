import React from "react";
import { BsCheckAll, BsCheck, BsFileEarmarkText } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const userId = token ? jwtDecode(token).id : null;

// Single message bubble
const MessageBubble = ({ message }) => {
  // console.log("userId=============", userId);
  // console.log("message=============", message);

  const isImage = message?.file_type?.startsWith("image/");
  const fileUrl = message?.file_url
    ? `http://localhost:4000${message.file_url}`
    : null;

  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;

    return `${time.toLowerCase()}, ${dateStr}`;
  };

  const isMyMessage = (message?.sender_id || message?.sender?.id) === userId;

  return (
    <div
      className={`flex ${(message?.sender_id || message?.sender?.id) === userId ? "justify-end" : "justify-start"} mb-1.5`}
    >
      <div
        className={`relative max-w-[75%] md:max-w-[60%] px-3 py-2 rounded-2xl shadow-sm ${
          (message?.sender_id || message?.sender?.id) === userId
            ? "bg-(--wa-msg-out) rounded-br-sm"
            : "bg-white rounded-bl-sm"
        }`}
      >
        {fileUrl && isImage && (
          <img
            src={fileUrl}
            alt={message?.file_name || "attachment"}
            className="max-w-60 max-h-60 rounded-lg mb-1 object-cover cursor-pointer"
            onClick={() => window.open(fileUrl, "_blank")}
          />
        )}

        {fileUrl && !isImage && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={message?.file_name}
            className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2 mb-1 hover:bg-gray-100 max-w-55"
          >
            <BsFileEarmarkText className="text-xl text-gray-500 shrink-0" />
            <span className="text-sm text-gray-700 truncate">
              {message?.file_name}
            </span>
          </a>
        )}

        {message?.content && (
          <p className="text-sm text-gray-800 leading-relaxed wrap-break-words">
            {message.content}
          </p>
        )}

        <p className="text-sm text-gray-800 leading-relaxed wrap-break-words">
          {message?.content}
        </p>
        <div className="flex items-center gap-1 mt-0.5 justify-end">
          <div className="flex items-center justify-between space-x-2">
            <span className="text-[12px] text-gray-400">
              {formatDateTime(message?.created_at)}
            </span>

            {isMyMessage && (
              <span
                className={`text font-medium ${
                  message?.status === "seen" ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {message?.status === "seen" ? <BsCheckAll /> : <BsCheck />}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
