import { useState, useRef, useEffect } from "react";
import {
  HiMiniEllipsisVertical,
  HiOutlineFaceSmile,
  HiMiniArrowLeft,
  HiOutlinePhone,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import { IoMdSend } from "react-icons/io";
import { LuUserRoundX } from "react-icons/lu";
import { MdAttachFile } from "react-icons/md";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteConvo } from "../redux/slices/deleteConvo";

// Redux & Socket Imports
import {
  getMessages,
  addMessage,
  markAllSeen,
} from "../redux/slices/loadMsgSlice";
import { sendMsg } from "../redux/slices/sendMessageSlice";
import { userConversation } from "../redux/slices/userConvoSlice";
import { msgStatus } from "../redux/slices/msgStatusSlice";
import socket from "../socket/initSocket";

// Components
// import lightChatBg from "../assets/chat-bg-light.png";
// import chatBg from "../assets/chat-bg.png";
import MessageBubble from "../components/user_chats/MessageBubble";
import NoChatSelected from "../components/user_chats/NoChatSelected";

const UserChats = ({ chat }) => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [textMsg, setTextMsg] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { msg, other_user, loading } = useSelector((state) => state.getMsg);

  const { onlineUsers } = useSelector((state) => state.profile); // Get online users
  const isOnline = onlineUsers?.some(
    (id) => String(id) === String(other_user?.id),
  );

  const [isTyping, setIsTyping] = useState(false); // Am I seeing the OTHER person typing?
  const typingTimeoutRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 1. Auto-scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  // 2. Room Management & Initial Load
  useEffect(() => {
    if (!chatId) return;

    const initChat = async () => {
      await dispatch(getMessages(chatId));
      await dispatch(msgStatus(chatId));
      await dispatch(userConversation()); //
    };

    initChat();

    socket.emit("join_conversation", chatId);

    return () => {
      socket.emit("leave_conversation", chatId);
    };
  }, [chatId, dispatch]);

  useEffect(() => {
    socket.on("display_typing", ({ conversationId }) => {
      if (String(conversationId) === String(chatId)) {
        setIsTyping(true);
      }
    });

    socket.on("hide_typing", ({ conversationId }) => {
      if (String(conversationId) === String(chatId)) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("display_typing");
      socket.off("hide_typing");
    };
  }, [chatId]);

  // 3. Real-time Listener
  useEffect(() => {
    if (!chatId) return;

    const handleNewMessage = async (newMessage) => {
      if (String(newMessage.conversation_id) === String(chatId)) {
        dispatch(addMessage(newMessage));

        await dispatch(msgStatus(chatId));
        await dispatch(userConversation());
      }
    };

    const handleMessagesSeen = ({ conversationId }) => {
      if (String(conversationId) === String(chatId)) {
        // Update Redux store directly without a full refetch
        dispatch(markAllSeen());
      }
    };

    socket.on("receive_message", handleNewMessage);
    socket.on("messages_seen", handleMessagesSeen);

    return () => {
      socket.off("receive_message", handleNewMessage);
      socket.off("messages_seen", handleMessagesSeen);
    };
  }, [chatId, dispatch]);

  const handleInputChange = (e) => {
    setTextMsg(e.target.value);

    // Emit typing_start
    socket.emit("typing_start", { conversationId: chatId });

    // Stop typing logic: Clear existing timeout and set a new one
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing_stop", { conversationId: chatId });
    }, 2000); // Stop showing "typing" after 2 seconds of inactivity
  };

  const handleSendMessage = async () => {
    if (!textMsg.trim() && !selectedFile) return;

    const content = textMsg.trim();
    const fileToSend = selectedFile;

    setTextMsg("");
    removeSelectedFile();

    try {
      await dispatch(
        sendMsg({
          conversation_id: chatId,
          content,
          file: fileToSend,
        }),
      ).unwrap();

      dispatch(userConversation());
      inputRef.current?.focus();
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  function viewProfileHandler() {
    navigate(`/user/${chat?.users?.[0]?.id}`);
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

  async function deleteHandler() {
    try {
      await dispatch(deleteConvo(chat.conversation_id)).unwrap();
      await dispatch(userConversation());

      setShowMenu(false);

      // console.log("Conversation deleted");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col h-screen w-full bg-(--bg) relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-(--surface) border-b border-(--border) shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="md:hidden text-(--text-muted) p-1 hover:bg-(--surface-2) rounded-full"
          >
            <HiMiniArrowLeft size={24} />
          </button>

          <div className="relative">
            {other_user?.profile_photo ? (
              <img
                src={`http://localhost:4000/uploads/${chat?.users?.[0]?.profile_photo}`}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
              />
            ) : (
              <div
                className={`w-10 h-10 md:w-11 md:h-11 ${chat?.users?.length === 0 ? "bg-(--text-muted)" : "bg-(--primary)"} text-white flex items-center justify-center rounded-full`}
              >
                {chat?.users?.[0]?.username?.charAt(0)?.toUpperCase() || (
                  <LuUserRoundX className="text-xl font-bold" />
                )}
              </div>
            )}
            {isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-(--success) border-2 border-(--surface) rounded-full"></div>
            )}
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-(--text) leading-tight">
              {chat?.users?.length === 0 ? "Account deleted" : other_user?.name}
            </h2>

            {/* If typing, show typing. If not, show online/offline status */}
            {isTyping ? (
              <p className="text-[12px] text-(--primary) font-medium animate-pulse">
                typing...
              </p>
            ) : (
              <p
                className={`text-[12px] font-medium ${isOnline ? "text-(--success)" : "text-(--text-muted)"}`}
              >
                {/* {isOnline ? "online" : "offline"} */}
                {chat?.users?.length === 0
                  ? ""
                  : isOnline
                    ? "online"
                    : "offline"}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-4 text-(--text-muted)">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-(--text-muted) hover:bg-(--surface-2) rounded-full transition-colors"
          >
            <HiMiniEllipsisVertical className="text-xl" />
          </button>
          {showMenu && (
            <div className="absolute top-12 right-5 mt-1 w-40 bg-(--surface) shadow-(--shadow-lg) rounded-xl py-1.5 z-50 border border-(--border)">
              <button
                className="text-(--text) block w-full text-left px-4 py-2 text-sm hover:bg-(--surface-2)"
                onClick={viewProfileHandler}
              >
                View Profile
              </button>
              <button
                className="block w-full text-(--error) text-left px-4 py-2 text-sm hover:bg-(--surface-2)"
                onClick={deleteHandler}
              >
                Delete Chat
              </button>
            </div>
          )}
        </div>
      </header>

      <div
        className="flex-1 overflow-y-auto px-3 md:px-6 py-4 bg-cover bg-center bg-no-repeat"
        // style={{ backgroundImage: `url(${chatBg})` }}
      >
        {" "}
        {loading && msg.length === 0 ? (
          <div className="flex justify-center items-center h-full text-(--text-muted)">
            Loading messages...
          </div>
        ) : (
          msg.map((m, index) => (
            <MessageBubble key={m.id || index} message={m} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preview strip - shows above input when a file is selected */}
      {selectedFile && (
        <div className="px-4 pb-2 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 bg-(--surface) border border-(--border) rounded-lg p-2 relative">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="preview"
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-(--surface-2) rounded text-(--text-muted) text-[10px] text-center px-1 font-medium">
                {selectedFile.name.split(".").pop().toUpperCase()}
              </div>
            )}
            <div className="flex-1 truncate text-sm text-(--text)">
              {selectedFile.name}
            </div>
            <button
              onClick={removeSelectedFile}
              className="text-(--text-muted) hover:text-(--error) px-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 bg-(--bg) shrink-0">
        <div className="flex items-center gap-2 max-w-5xl mx-auto bg-(--surface) rounded-full px-4 py-1.5 shadow-(--shadow) border border-(--border)">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-(--text-muted) hover:text-(--text) p-1"
          >
            <MdAttachFile size={22} className="rotate-45" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={textMsg}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 py-2 px-2 text-[15px] focus:outline-none bg-transparent text-(--text) placeholder-(--placeholder)"
          />

          <button
            onClick={handleSendMessage}
            disabled={!textMsg.trim() && !selectedFile}
            className={`p-2 rounded-full transition-all ${
              textMsg.trim() || selectedFile
                ? "bg-(--primary) inline-block text-white shadow-md hover:bg-(--primary-hover)"
                : "hidden"
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
