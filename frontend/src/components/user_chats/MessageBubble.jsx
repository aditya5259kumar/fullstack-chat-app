// import React from "react";
// import { IoCheckmarkDoneSharp } from "react-icons/io5";
// import { jwtDecode } from "jwt-decode";

// // Single message bubble
// const MessageBubble = ({ message }) => {
//   const token = localStorage.getItem("token");
//   const decode = jwtDecode(token);
//   const userId = decode.id;

//   // console.log("userId=============", userId);
//   console.log("message=============", message);

//   const formatDateTime = (dateString) => {
//     if (!dateString) return "";

//     const date = new Date(dateString);
//     const time = date.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });
//     const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;

//     return `${time.toLowerCase()}, ${dateStr}`;
//   };

//   const isMyMessage = (message?.sender_id || message?.sender?.id) === userId;

//   return (
//     <div
//       className={`flex ${(message?.sender_id || message?.sender?.id) === userId ? "justify-end" : "justify-start"} mb-1.5`}
//     >
//       <div
//         className={`relative max-w-[75%] md:max-w-[60%] px-3 py-2 rounded-2xl shadow-sm ${
//           (message?.sender_id || message?.sender?.id) === userId
//             ? "bg-(--wa-msg-out) rounded-br-sm"
//             : "bg-white rounded-bl-sm"
//         }`}
//       >
//         <p className="text-sm text-gray-800 leading-relaxed wrap-break-words">
//           {message?.content}
//         </p>
//         <div
//           className={`flex items-center gap-1 mt-0.5 ${
//             message?.id === userId ? "justify-end" : "justify-start"
//           }`}
//         >
//           <div className="flex items-center space-x-2">
//             <span className="text-[12px] text-gray-400">
//               {formatDateTime(message?.created_at)}
//             </span>

//             {isMyMessage && (
//               <span className="text-gray-500 text-xs">{message?.status}</span>
//             )}
//           </div>
//           {/* {message?.id === userId && (
//             <span
//               className={`${message.seen ? "text-(--wa-blue-accent)" : "text-gray-400"}`}
//             >
//               <IoCheckmarkDoneSharp className="inline text-base" />
//             </span>
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;

import React from "react";
import { BsCheckAll ,BsCheck } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";

// Decode once at module level, not on every render
const token = localStorage.getItem("token");
const userId = token ? jwtDecode(token).id : null;

// Single message bubble
const MessageBubble = ({ message }) => {
  // console.log("userId=============", userId);
  console.log("message=============", message);

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
        <p className="text-sm text-gray-800 leading-relaxed wrap-break-words">
          {message?.content}
        </p>
        <div
          // className={`flex w-full items-center gap-1 mt-0.5 ${
          //   message?.id === userId ? "justify-end" : "justify-start"
          // }`}
          className="flex items-center gap-1 mt-0.5 justify-end"
        >
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
                {message?.status === "seen" ? (
                  <BsCheckAll  />
                ) : (
                  <BsCheck />
                )}
              </span>
            )}
          </div>
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
