import React, { useState, useRef, useEffect } from "react";
import { BsFillPinAngleFill, BsThreeDotsVertical } from "react-icons/bs";
import { BsCheckAll, BsCheck } from "react-icons/bs";
import { LuUserRoundX } from "react-icons/lu";
import { deleteConvo } from "../../redux/slices/deleteConvo";
import { userConversation } from "../../redux/slices/userConvoSlice";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";

const token = localStorage.getItem("token");
const userId = token ? jwtDecode(token).id : null;

const UserChatMsg = ({ chat, isActive = false, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const { loading: deleteConvoLoading } = useSelector(
    (state) => state.deleteConvo,
  );

  const navigate = useNavigate();

  // console.log("chat======================", chat);

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

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dispatch = useDispatch();

  function viewProfileHandler() {
    navigate(`/user/${chat?.users?.[0]?.id}`);
  }

  async function deleteHandler() {
    try {
      await dispatch(deleteConvo(chat.conversation_id)).unwrap();
      await dispatch(userConversation());

      setShowMenu(false);
    navigate("/");

      // console.log("Conversation deleted");
    } catch (error) {
      console.error(error);
    }
  }

  const isSentByMe = chat?.last_message_sender_id === userId;
  const unreadCount = chat?.unread_count || 0;

  const renderPreview = () => {
    if (chat?.last_message_file_type) {
      if (chat.last_message_file_type.startsWith("image/")) {
        return chat?.last_message_content?.trim()
          ? `📷 ${chat.last_message_content}`
          : "📷 Photo";
      }
      return chat?.last_message_content?.trim()
        ? `📁 ${chat.last_message_content}`
        : `📁 ${chat?.last_message_file_name || "File"}`;
    }
    return chat?.last_message_preview;
  };

  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-between hover:pr-1 px-3 pr-1 md:px-4 py-3 cursor-pointer rounded-sm transition-all duration-150 relative ${
        isActive ? "bg-(--surface-2)" : "hover:bg-(--surface-2)"
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative shrink-0">
          {chat?.users?.[0]?.profile_photo ? (
            <img
              src={`https://fullstack-chat-app-h4rd.onrender.com/uploads/${chat?.users?.[0]?.profile_photo}`}
              alt={chat?.users?.[0]?.username}
              loading="lazy"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div
              className={`w-12 h-12 rounded-full text-white ${chat?.users?.length === 0 ? "bg-(--text-muted)" : "bg-(--primary)"} flex items-center justify-center font-semibold `}
            >
              {chat?.users?.[0]?.username?.charAt(0)?.toUpperCase() || (
                <LuUserRoundX className="text-xl font-bold" />
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <h5 className="font-semibold text-[15px] text-(--text) truncate">
            {chat?.users?.length === 0
              ? "Account deleted"
              : chat?.users[0]?.name}
          </h5>
          <p className="text-(--text-muted) text-sm truncate min-w-0">
            {isSentByMe && unreadCount === 0 && (
              <span
                // className={`shrink-0 ${chat?.last_message_status === "seen" ? "text-(--primary)" : "text-(--text-muted)"}`}
                className={`shrink-0 ${chat?.last_message_status === "seen" ? "text-(--primary)" : "text-(--text-muted)"}`}
              >
                {/* <IoCheckmarkDoneSharp className="text-base inline" /> */}
                {chat?.last_message_status === "seen" ? (
                  <BsCheckAll className="text-base inline" />
                ) : (
                  <BsCheck className="text-base inline" />
                )}
              </span>
            )}
            {renderPreview()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className=" flex items-end flex-col gap-1.5 ml-2 shrink-0">
          <p
            className={`text-xs whitespace-nowrap font-medium ${unreadCount > 0 ? "text-(--primary)" : "text-(--text-muted)"}`}
          >
            {formatDateTime(chat?.last_message_time)}
          </p>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <span className="text-white text-[11px] font-bold min-w-5 h-5 px-1.5 bg-(--primary) rounded-full flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>
        </div>

        <div
          ref={menuRef}
          className="right-2 top-3 hidden group-hover:block z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-full hover:bg-(--surface-2) text-(--text-muted) transition-colors"
          >
            <BsThreeDotsVertical className="text-sm" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-(--surface) shadow-(--shadow-lg) rounded-xl py-1.5 z-50 border border-(--border)">
              <button
                onClick={viewProfileHandler}
                className="block w-full text-left px-4 py-2 text-sm text-(--text) hover:bg-(--surface-2)"
              >
                View Profile
              </button>
              <button
                onClick={deleteHandler}
                className="block w-full text-left px-4 py-2 text-sm text-(--error) hover:bg-(--surface-2)"
              >
                {deleteConvoLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserChatMsg;
