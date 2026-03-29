// // import { useState, useRef, useEffect } from "react";
// // import {
// //   HiMiniEllipsisVertical,
// //   HiOutlineFaceSmile,
// //   HiMiniArrowLeft,
// //   HiOutlinePhone,
// //   HiOutlineVideoCamera,
// // } from "react-icons/hi2";
// // import { IoMdSend } from "react-icons/io";
// // import { MdAttachFile } from "react-icons/md";
// // import lightChatBg from "../assets/chat-bg-light.png";
// // import NoChatSelected from "../components/user_chats/NoChatSelected";
// // import MessageBubble from "../components/user_chats/MessageBubble";
// // import { useDispatch, useSelector } from "react-redux";

// // import { getMessages } from "../redux/slices/loadMsgSlice";
// // // import { sendMsg } from "../redux/slices/sendMessageSlice";
// // import socket from "../socket/socket";
// // import { addMessage } from "../redux/slices/loadMsgSlice";
// // import socket, { connectSocket } from "../socket/initSocket";

// // // Date divider label component
// // const DateLabel = ({ label }) => (
// //   <div className="flex items-center justify-center my-4">
// //     <span className="bg-white/80 backdrop-blur-sm text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm border border-gray-100">
// //       {label}
// //     </span>
// //   </div>
// // );

// // const UserChats = ({ chat, onBack }) => {
// //   const [textMsg, setTextMsg] = useState("");
// //   const [showMenu, setShowMenu] = useState(false);
// //   const messagesEndRef = useRef(null);
// //   const inputRef = useRef(null);

// //   // const token = localStorage.getItem("token");
// //   // const decode = jwtDecode(token);
// //   // const userId = decode.id;

// //   // console.log("userId=============", userId);

// //   // const { convo_id } = useParams();
// //   const dispatch = useDispatch();
// //   const { msg, other_user } = useSelector((state) => state.getMsg);

// //   console.log("userConversation msg-----------------", msg);
// //   console.log("userConversation other_user-----------------", other_user);

// //   // useEffect(() => {
// //   //   if (chat?.conversation_id) {
// //   //     dispatch(getMessages(chat.conversation_id));
// //   //   }
// //   // }, [dispatch, chat]);

// //   useEffect(() => {
// //   if (!chat?.conversation_id) return;

// //   connectSocket();

// //   const handleConnect = () => {
// //     console.log("Socket connected:", socket.id);

// //     // ✅ NOW join room (correct timing)
// //     socket.emit("join_conversation", chat.conversation_id);
// //   };

// //   socket.on("connect", handleConnect);

// //   // fetch messages (this can stay)
// //   dispatch(getMessages(chat.conversation_id));

// //   return () => {
// //     socket.off("connect", handleConnect);
// //     socket.emit("leave_conversation", chat.conversation_id);
// //   };
// // }, [chat]);

// //   useEffect(() => {
// //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // }, [msg]);

// // useEffect(() => {
// //   connectSocket();

// //   socket.on("connect", () => {
// //     console.log("Socket connected:", socket.id);
// //   });

// //   return () => {
// //     socket.off("connect");
// //   };
// // }, []);

// //   // function sendMessage() {
// //   //   if (!textMsg.trim()) return;

// //     // dispatch(
// //     //   sendMsg({
// //     //     conversation_id: chat.conversation_id,
// //     //     content: textMsg.trim(),
// //     //   }),
// //     // );

// //   //   setTextMsg("");
// //   //   inputRef.current?.focus();
// //   // }

// //   function sendMessage() {
// //   if (!textMsg.trim()) return;

// //   const token = localStorage.getItem("token");
// //   const userId = JSON.parse(atob(token.split(".")[1])).id;

// //   socket.emit("send_message", {
// //     conversation_id: chat.conversation_id,
// //     sender_id: userId,
// //     content: textMsg.trim(),
// //   });

// //   setTextMsg("");
// //   inputRef.current?.focus();
// // }

// // useEffect(() => {
// //   const handleMessage = (newMessage) => {
// //     // 🔥 append message to Redux state
// //     dispatch(addMessage(newMessage));
// //   };

// //   socket.on("receive_message", handleMessage);

// //   return () => {
// //     socket.off("receive_message", handleMessage);
// //   };
// // }, [dispatch]);

// //   function handleKeyDown(e) {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       sendMessage();
// //     }
// //   }

// //   if (!chat) {
// //     return (
// //       <div className="flex justify-between items-center px-3 md:px-4 py-3 z-10">
// //         <div className="flex items-center gap-3">
// //           <div className="h-screen w-full hidden md:flex flex-col">
// //             <NoChatSelected />
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="h-screen w-full flex flex-col">
// //       {/* Header */}
// //       <div className="flex justify-between items-center px-3 md:px-4 py-3 bg-white shadow-sm z-10 border-b border-gray-100">
// //         <div className="flex items-center gap-3">
// //           <button
// //             onClick={onBack}
// //             className="md:hidden text-gray-500 p-1 hover:bg-gray-100 rounded-full"
// //           >
// //             <HiMiniArrowLeft className="text-2xl" />
// //           </button>

// //           <div className="relative">
// //             {other_user?.profile_photo ? (
// //               <img
// //                 src={other_user.profile_photo}
// //                 className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
// //               />
// //             ) : (
// //               <div className="w-10 h-10 md:w-11 md:h-11 bg-purple-700 text-gray-100 flex items-center justify-center rounded-full">
// //                 {other_user?.name?.charAt(0)?.toUpperCase() || "?"}
// //               </div>
// //             )}
// //             {/* {online && (
// //               <span className="absolute right-0 bottom-0 w-3.5 h-3.5 rounded-full bg-(--wa-green-prim) border-2 border-white"></span>
// //             )} */}
// //           </div>

// //           <div>
// //             <h5 className="font-semibold text-gray-800 leading-tight">
// //               {other_user?.name}
// //             </h5>
// //             {/* <p
// //               className={`text-xs ${online ? "text-[#25D366] font-medium" : "text-gray-400"}`}
// //             >
// //               {online ? "online" : "last seen recently"}
// //             </p> */}
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-1">
// //           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
// //             <HiOutlinePhone className="text-xl" />
// //           </button>
// //           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
// //             <HiOutlineVideoCamera className="text-xl" />
// //           </button>
// //           <div className="relative">
// //             <button
// //               onClick={() => setShowMenu(!showMenu)}
// //               className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
// //             >
// //               <HiMiniEllipsisVertical className="text-xl" />
// //             </button>
// //             {showMenu && (
// //               <div className="absolute right-0 mt-1 w-40 bg-white shadow-xl rounded-xl py-1.5 z-50 border border-gray-100">
// //                 {[
// //                   "View Profile",
// //                   "Mute",
// //                   "Clear Chat",
// //                   "Block",
// //                   "Delete Chat",
// //                 ].map((item) => (
// //                   <button
// //                     key={item}
// //                     className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
// //                       item === "Block" || item === "Delete Chat"
// //                         ? "text-red-500"
// //                         : "text-gray-700"
// //                     }`}
// //                     onClick={() => setShowMenu(false)}
// //                   >
// //                     {item}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Messages */}
// //       <div
// //         className="flex-1 overflow-y-auto px-3 md:px-6 py-4 bg-cover bg-center bg-no-repeat"
// //         style={{ backgroundImage: `url(${lightChatBg})` }}
// //       >
// //         <DateLabel label="Today" />
// //         {msg?.map((msg) => (
// //           <MessageBubble key={msg?.id} message={msg} />
// //         ))}
// //         <div ref={messagesEndRef} />
// //       </div>

// //       {/* Input Bar -----------------------------------------------*/}
// //       <div className="flex items-center gap-2 px-2 md:px-3 py-2.5 bg-white border-t border-gray-100 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
// //         <button className="text-2xl p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0">
// //           <HiOutlineFaceSmile />
// //         </button>

// //         <input
// //           ref={inputRef}
// //           type="text"
// //           value={textMsg}
// //           onChange={(e) => setTextMsg(e.target.value)}
// //           onKeyDown={handleKeyDown}
// //           placeholder="Type a message..."
// //           className="flex-1 bg-gray-100 rounded-full py-2.5 px-4 text-sm focus:outline-none text-gray-800 placeholder-gray-400"
// //         />

// //         <button className="text-xl p-2 text-gray-400 hover:text-gray-600 transition-colors rotate-45 shrink-0">
// //           <MdAttachFile />
// //         </button>

// //         <button
// //           onClick={sendMessage}
// //           disabled={!textMsg.trim()}
// //           className={`shrink-0 text-lg p-2.5 text-white rounded-full transition-all duration-200 ${
// //             textMsg.trim()
// //               ? "bg-(--wa-green-prim) hover:bg-(--wa-green-secondary) shadow-md scale-100"
// //               : "bg-gray-300 cursor-not-allowed scale-95"
// //           }`}
// //         >
// //           <IoMdSend />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserChats;

// import { useState, useRef, useEffect } from "react";
// import {
//   HiMiniEllipsisVertical,
//   HiOutlineFaceSmile,
//   HiMiniArrowLeft,
//   HiOutlinePhone,
//   HiOutlineVideoCamera,
// } from "react-icons/hi2";
// import { IoMdSend } from "react-icons/io";
// import { MdAttachFile } from "react-icons/md";

// import lightChatBg from "../assets/chat-bg-light.png";
// import NoChatSelected from "../components/user_chats/NoChatSelected";
// import MessageBubble from "../components/user_chats/MessageBubble";
// import { useDispatch, useSelector } from "react-redux";

// import { getMessages, addMessage } from "../redux/slices/loadMsgSlice";
// import socket, { connectSocket } from "../socket/initSocket";

// // Date divider label component
// const DateLabel = ({ label }) => (
//   <div className="flex items-center justify-center my-4">
//     <span className="bg-white/80 backdrop-blur-sm text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm border border-gray-100">
//       {label}
//     </span>
//   </div>
// );

// const UserChats = ({ chat, onBack }) => {
//   const [textMsg, setTextMsg] = useState("");
//   const [showMenu, setShowMenu] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const dispatch = useDispatch();
//   const { msg, other_user } = useSelector((state) => state.getMsg);

//   // ✅ MAIN SOCKET FLOW
//   useEffect(() => {
//     if (!chat?.conversation_id) return;

//     connectSocket();

//     const handleConnect = () => {
//       console.log("✅ Connected:", socket.id);

//       socket.emit("join_conversation", chat.conversation_id);
//     };

//     const handleMessage = (newMessage) => {
//       console.log("📩 RECEIVED:", newMessage);
//       dispatch(addMessage(newMessage));
//     };

//     socket.on("connect", handleConnect);
//     socket.on("receive_message", handleMessage);

//     dispatch(getMessages(chat.conversation_id));

//     return () => {
//       socket.off("connect", handleConnect);
//       socket.off("receive_message", handleMessage);

//       socket.emit("leave_conversation", chat.conversation_id);
//     };
//   }, [chat, dispatch]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [msg]);

//   function sendMessage() {
//     if (!textMsg.trim()) return;

//     if (!socket.connected) {
//       console.log("❌ Socket not connected");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     const userId = JSON.parse(atob(token.split(".")[1])).id;

//     const messageData = {
//       conversation_id: chat.conversation_id,
//       sender_id: userId,
//       content: textMsg.trim(),
//     };

//     socket.emit("send_message", messageData);

//     setTextMsg("");
//     inputRef.current?.focus();
//   }

//   function handleKeyDown(e) {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   }

//   if (!chat) {
//     return (
//       <div className="flex justify-between items-center px-3 md:px-4 py-3 z-10">
//         <div className="flex items-center gap-3">
//           <div className="h-screen w-full hidden md:flex flex-col">
//             <NoChatSelected />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen w-full flex flex-col">
//       {/* Header */}
//       <div className="flex justify-between items-center px-3 md:px-4 py-3 bg-white shadow-sm z-10 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={onBack}
//             className="md:hidden text-gray-500 p-1 hover:bg-gray-100 rounded-full"
//           >
//             <HiMiniArrowLeft className="text-2xl" />
//           </button>

//           <div className="relative">
//             {other_user?.profile_photo ? (
//               <img
//                 src={other_user.profile_photo}
//                 className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
//               />
//             ) : (
//               <div className="w-10 h-10 md:w-11 md:h-11 bg-purple-700 text-gray-100 flex items-center justify-center rounded-full">
//                 {other_user?.name?.charAt(0)?.toUpperCase() || "?"}
//               </div>
//             )}
//             {/* {online && (
//               <span className="absolute right-0 bottom-0 w-3.5 h-3.5 rounded-full bg-(--wa-green-prim) border-2 border-white"></span>
//             )} */}
//           </div>

//           <div>
//             <h5 className="font-semibold text-gray-800 leading-tight">
//               {other_user?.name}
//             </h5>
//             {/* <p
//               className={`text-xs ${online ? "text-[#25D366] font-medium" : "text-gray-400"}`}
//             >
//               {online ? "online" : "last seen recently"}
//             </p> */}
//           </div>
//         </div>

//         <div className="flex items-center gap-1">
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
//             <HiOutlinePhone className="text-xl" />
//           </button>
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
//             <HiOutlineVideoCamera className="text-xl" />
//           </button>
//           <div className="relative">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <HiMiniEllipsisVertical className="text-xl" />
//             </button>
//             {showMenu && (
//               <div className="absolute right-0 mt-1 w-40 bg-white shadow-xl rounded-xl py-1.5 z-50 border border-gray-100">
//                 {[
//                   "View Profile",
//                   "Mute",
//                   "Clear Chat",
//                   "Block",
//                   "Delete Chat",
//                 ].map((item) => (
//                   <button
//                     key={item}
//                     className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
//                       item === "Block" || item === "Delete Chat"
//                         ? "text-red-500"
//                         : "text-gray-700"
//                     }`}
//                     onClick={() => setShowMenu(false)}
//                   >
//                     {item}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       <div
//         className="flex-1 overflow-y-auto px-3 md:px-6 py-4 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${lightChatBg})` }}
//       >
//         <DateLabel label="Today" />
//         {msg?.map((msg) => (
//           <MessageBubble key={msg?.id} message={msg} />
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Bar -----------------------------------------------*/}
//       <div className="flex items-center gap-2 px-2 md:px-3 py-2.5 bg-white border-t border-gray-100 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
//         <button className="text-2xl p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0">
//           <HiOutlineFaceSmile />
//         </button>

//         <input
//           ref={inputRef}
//           type="text"
//           value={textMsg}
//           onChange={(e) => setTextMsg(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Type a message..."
//           className="flex-1 bg-gray-100 rounded-full py-2.5 px-4 text-sm focus:outline-none text-gray-800 placeholder-gray-400"
//         />

//         <button className="text-xl p-2 text-gray-400 hover:text-gray-600 transition-colors rotate-45 shrink-0">
//           <MdAttachFile />
//         </button>

//         <button
//           onClick={sendMessage}
//           disabled={!textMsg.trim()}
//           className={`shrink-0 text-lg p-2.5 text-white rounded-full transition-all duration-200 ${
//             textMsg.trim()
//               ? "bg-(--wa-green-prim) hover:bg-(--wa-green-secondary) shadow-md scale-100"
//               : "bg-gray-300 cursor-not-allowed scale-95"
//           }`}
//         >
//           <IoMdSend />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserChats;

// -------------------------------------------------------------------------

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
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// Redux & Socket Imports
import { getMessages, addMessage } from "../redux/slices/loadMsgSlice";
import { sendMsg } from "../redux/slices/sendMessageSlice";
import socket from "../socket/initSocket";

// Components
import lightChatBg from "../assets/chat-bg-light.png";
import MessageBubble from "../components/user_chats/MessageBubble";
import NoChatSelected from "../components/user_chats/NoChatSelected";

// // Date divider label component
// const DateLabel = ({ label }) => (
//   <div className="flex items-center justify-center my-4">
//     <span className="bg-white/80 backdrop-blur-sm text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm border border-gray-100">
//       {label}
//     </span>
//   </div>
// );

const UserChats = ({ chat }) => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [textMsg, setTextMsg] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { msg, other_user, loading } = useSelector((state) => state.getMsg);

  // 1. Auto-scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  // 2. Room Management & Initial Load
  useEffect(() => {
    if (chatId) {
      // Fetch message history from MySQL via REST API
      dispatch(getMessages(chatId));

      // Join the socket room for this specific conversation
      socket.emit("join_conversation", chatId);
    }

    return () => {
      if (chatId) {
        socket.emit("leave_conversation", chatId);
      }
    };
  }, [chatId, dispatch]);

  // 3. Real-time Listener
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      // Only push to Redux if the message belongs to the currently open chat
      if (String(newMessage.conversation_id) === String(chatId)) {
        dispatch(addMessage(newMessage));
      }
    };

    socket.on("receive_message", handleNewMessage);

    // Clean up listener to prevent duplicate messages when navigating
    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [chatId, dispatch]);

  const handleSendMessage = async () => {
    if (!textMsg.trim()) return;

    const content = textMsg.trim();
    setTextMsg(""); // Clear input immediately for snappy UI

    // Send via REST API to save in MySQL
    // Your backend controller will handle the socket broadcast
    dispatch(sendMsg({ conversation_id: chatId, content }));

    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

  return (
    <div className="flex flex-col h-screen w-full bg-[#f0f2f5] relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="md:hidden text-gray-600 p-1 hover:bg-gray-100 rounded-full"
          >
            <HiMiniArrowLeft size={24} />
          </button>

          <div className="relative">
            {other_user?.profile_photo ? (
              <img
                src={other_user.profile_photo}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 md:w-11 md:h-11 bg-purple-700 text-gray-100 flex items-center justify-center rounded-full">
                {other_user?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
            {/* <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div> */}
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-gray-800 leading-tight">
              {other_user?.name || "Chat"}
            </h2>
            {/* <p className="text-[12px] text-green-600 font-medium">online</p> */}
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-4 text-gray-500">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <HiOutlineVideoCamera size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <HiOutlinePhone size={18} />
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiMiniEllipsisVertical className="text-xl" />
          </button>
          {showMenu && (
            <div className="absolute top-12 right-5 mt-1 w-40 bg-white shadow-xl rounded-xl py-1.5 z-50 border border-gray-100">
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
      </header>

      {/* Messages List */}
      <div
        className="flex-1 overflow-y-auto px-3 md:px-6 py-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${lightChatBg})` }}
      >
        {" "}
        {loading && msg.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-400">
            Loading messages...
          </div>
        ) : (
          msg.map((m, index) => (
            <MessageBubble key={m.id || index} message={m} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-[#f0f2f5] shrink-0">
        <div className="flex items-center gap-2 max-w-5xl mx-auto bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200">
          <button className="text-gray-500 hover:text-gray-700 p-1">
            <HiOutlineFaceSmile size={24} />
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-1">
            <MdAttachFile size={22} className="rotate-45" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={textMsg}
            onChange={(e) => setTextMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 py-2 px-2 text-[15px] focus:outline-none placeholder-gray-400"
          />

          <button
            onClick={handleSendMessage}
            disabled={!textMsg.trim()}
            className={`p-2 rounded-full transition-all ${
              textMsg.trim()
                ? "bg-emerald-500 text-white shadow-md hover:bg-emerald-600"
                : "text-gray-300"
            }`}
          >
            <IoMdSend size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChats;
