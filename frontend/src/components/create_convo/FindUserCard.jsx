import { useDispatch, useSelector } from "react-redux";
import { createConvo } from "../../redux/slices/createConvoSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const FindUserCard = ({ user }) => {
  const [clickedUserId, setClickedUserId] = useState(null);
  const { data, loading } = useSelector((state) => state.createOrFindConvo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("createOrFindConvo data===================", data);

  function findConvo() {
    setClickedUserId(user.id);
    dispatch(createConvo(user.id));
  }

  useEffect(() => {
    if (data?.conversation_id) {
      navigate(`/chat/${data.conversation_id}`);
    }
  }, [data, navigate]);

  function viewProfileHandler() {
    navigate(`/user/${user?.id}`);
  }

  // console.log("users===================", user);

  return (
    <div className="flex items-center justify-between bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) py-3 px-5 mb-4 group">
      <div className="flex md:flex-row flex-col items-center gap-2 md:gap-4">
        {/* Avatar with status indicator */}
        <div className="relative">
          {user.profile_photo ? (
            <img
              src={`https://fullstack-chat-app-h4rd.onrender.com/uploads/${user?.profile_photo}`}
              alt={user?.name}
              loading="lazy"
              className="h-14 w-14 rounded-full object-cover ring-2 ring-(--surface) shadow-sm"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-(--primary) text-white flex items-center justify-center text-xl font-semibold shadow-sm">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          )}
          {user?.isOnline && (
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-(--success) border-2 border-(--surface) rounded-full"></div>
          )}
        </div>

        <div className="flex-1 text-center min-w-0">
          <p className="font-semibold text-(--text) text-base truncate">
            @{user.username}
          </p>
          <div className="flex justify-center items-center gap-2 mt-0.5">
            <p className="text-sm text-(--text-muted) truncate">{user.name}</p>
            {user?.isVerified && (
              <HiBadgeCheck className="text-(--primary) text-sm shrink-0" />
            )}
          </div>
          {user?.bio && (
            <p className="text-xs text-(--text-muted) mt-1 truncate max-w-50">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      <div className="flex md:flex-row flex-col items-center gap-2 md:gap-3 mt-3 md:mt-0">
        <button
          onClick={viewProfileHandler}
          className="w-21 h-9 md:w-22 md:h-10 rounded-lg text-sm font-medium text-(--text) border border-(--border) hover:bg-(--surface-2) hover:border-(--text-muted) transition-all duration-200"
        >
          Profile
        </button>

        <button
          onClick={findConvo}
          className="w-21 h-9 md:w-22 md:h-10 rounded-lg text-sm font-medium text-white bg-(--primary)"
        >
          {loading && clickedUserId === user.id ? (
            <div className="flex justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            "Message"
          )}
        </button>
      </div>
    </div>
  );
};

export default FindUserCard;
