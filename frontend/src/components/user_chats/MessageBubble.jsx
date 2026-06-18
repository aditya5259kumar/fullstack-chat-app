import React from "react";
import { BsCheckAll, BsCheck, BsFileEarmarkText } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";

// Single message bubble
const MessageBubble = ({ message }) => {
  // console.log("userId=============", userId);
  // console.log("message=============", message);

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

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

  const isMyMessage =
    String(message?.sender_id || message?.sender?.id) === String(userId);

  // console.log("sender_id:", message?.sender_id, typeof message?.sender_id);
  // console.log("userId:", userId, typeof userId);
  // console.log({
  //   id: message.id,
  //   sender_id: message.sender_id,
  //   sender: message.sender,
  //   calculatedSender: message?.sender_id || message?.sender?.id,
  //   userId,
  //   isMyMessage,
  // });

  return (
    <div
      className={`flex ${(message?.sender_id || message?.sender?.id) === userId ? "justify-end" : "justify-start"} mb-1.5`}
    >
      <div
        className={`relative max-w-[75%] md:max-w-[60%] px-3 py-2 rounded-2xl shadow-(--shadow) 
          ${isMyMessage ? "bg-(--chat-user) rounded-br-sm" : "bg-(--surface-2) rounded-bl-sm"}
          `}
      >
        {fileUrl && isImage && (
          <img
            src={fileUrl}
            alt={message?.file_name || "attachment"}
            className="max-w-full h-auto rounded-lg mb-1 object-cover cursor-pointer block"
            onClick={() => window.open(fileUrl, "_blank")}
          />
        )}

        {fileUrl && !isImage && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={message?.file_name}
            className="flex items-center gap-2 bg-(--surface-2) border border-(--border) rounded-lg p-2 mb-1 hover:bg-(--surface) max-w-55"
          >
            <BsFileEarmarkText className="text-xl text-(--text-muted) shrink-0" />
            <span className="text-sm text-(--text) truncate">
              {message?.file_name}
            </span>
          </a>
        )}

        {message?.content && (
          <p
            className={`text-base leading-relaxed wrap-break-words ${
              (message?.sender_id || message?.sender?.id) === userId
                ? "text-(--chat-user-text)"
                : "text-(--chat-ai-text)"
            }`}
          >
            {message.content}
          </p>
        )}

        <div className="flex items-center gap-1 mt-0.5 justify-end">
          <div className="flex items-center justify-between space-x-2">
            <span
              className={`text-[10px] ${
                (message?.sender_id || message?.sender?.id) === userId
                  ? "text-(--chat-user-text)"
                  : "text-(--text-muted)"
              } opacity-80`}
            >
              {formatDateTime(message?.created_at)}
            </span>

            {isMyMessage && (
              // <span
              //   className={`text font-medium ${
              //     message?.status === "seen"
              //       ? "text-(--primary)"
              //       : "text-(--text-muted)"
              //   }`}
              // <span
              //   className={`text font-medium ${
              //     message?.status === "seen"
              //       ? "text-pink-400"
              //       : "text-gray-300"
              //   }`}
              <span
                className={`text font-medium ${
                  message?.status === "seen"
                    ? "text-(--success)"
                    : "text-gray-300"
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
