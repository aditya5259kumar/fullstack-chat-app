import { useDispatch, useSelector } from "react-redux";
import { createConvo } from "../../redux/slices/createConvoSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const FindUserCard = ({ user }) => {
  const {data} = useSelector((state) => state.createOrFindConvo);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // console.log("createOrFindConvo data===================", data);

  function findConvo() {
    dispatch(createConvo(user.id));
  }

  useEffect(() => {
    if (data?.conversation_id) {
      navigate(`/chat/${data.conversation_id}`);
    }
  }, [data, navigate]);

  return (
    <div className="md:flex items-center justify-between bg-white rounded-2xl shadow-md px-5 py-3 mb-4">
      <div className="flex items-center">
        {user.profile_photo ? (
          <img
            src={user.profile_photo}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-purple-600 text-white flex items-center justify-center">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
        )}

        <div className="ml-4">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>

      <button
        onClick={findConvo}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Start Chat
      </button>
    </div>
  );
};

export default FindUserCard