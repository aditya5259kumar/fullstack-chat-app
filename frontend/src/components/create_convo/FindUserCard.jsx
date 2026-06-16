import { useDispatch, useSelector } from "react-redux";
import { createConvo } from "../../redux/slices/createConvoSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const FindUserCard = ({ user }) => {
  const { data } = useSelector((state) => state.createOrFindConvo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("createOrFindConvo data===================", data);

  function findConvo() {
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

  return (
  <div className="md:flex items-center justify-between bg-(--surface) rounded-2xl shadow-(--shadow) px-5 py-3 mb-4">
      <div className="flex items-center">
        {user.profile_photo ? (
          <img
            src={`http://localhost:4000/uploads/${user?.profile_photo}`}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-(--primary) text-white flex items-center justify-center">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
        )}

        <div className="ml-4">
          <p className="font-semibold text-(--text)">{user.name}</p>
          <p className="text-sm text-(--text-muted)">@{user.username}</p>
        </div>
      </div>

      <div className="flex space-x-3 mt-2.5">
        <button
          onClick={viewProfileHandler}
          className="border border-(--border) px-4 py-2 rounded-lg text-(--text) hover:bg-(--surface-2) transition-colors"
        >
          View Profile
        </button>

        <button
          onClick={findConvo}
          className="bg-(--primary) text-white px-4 py-2 rounded-lg hover:bg-(--primary-hover) transition-colors"
        >
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default FindUserCard;
