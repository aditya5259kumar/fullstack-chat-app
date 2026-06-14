import React, { useEffect, useState } from "react";
import {
  HiPencil,
  HiCamera,
  HiUser,
  HiOutlineEnvelope,
  HiOutlineCalendar,
} from "react-icons/hi2";
import Navbar from "../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { myProfile } from "../redux/slices/userSlice";
import { userLogout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";
import { disconnectSocket } from "../socket/initSocket";
import DeleteAcc from "../components/profile/DeleteAcc";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [deletebox, setDeletebox] = useState(false);
  const { profileData } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);

  console.log("profileData---------------------", profileData);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
  });

  console.log("formData---------------------", formData);

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        username: profileData.username || "",
        bio: profileData.bio || "",
      });
    }
  }, [profileData]);

  // function handleChange(e) {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }

  async function editHandler(e) {
    e.preventDefault();

    if (!editMode) {
      setEditMode(true);
      return;
    }

    try {
      console.log(formData);

      // dispatch(updateProfile(formData));

      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  }

  function cancelEditHandler(e) {
    e.preventDefault();

    setFormData({
      name: profileData?.name || "",
      username: profileData?.username || "",
      bio: profileData?.bio || "",
    });

    setEditMode(false);
  }

  function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
      return;
    }
    dispatch(userLogout());
    disconnectSocket();
    localStorage.removeItem("token");
    navigate("/login");
  }
  function formatDate(dateString) {
    if (!dateString) return "Invalid date";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid date";

    const formattedDate =
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      " at " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

    return formattedDate;
  }

  const formatted_joinDate = formatDate(profileData?.created_at);
  const formatted_updateDate = formatDate(profileData?.updated_at);

  function handleAccDelete() {
    setDeletebox(true);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

          {/* Avatar */}
          <form>
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                {profileData?.profile_photo ? (
                  <img
                    src={`http://localhost:4000/uploads/${profileData?.profile_photo}`}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover ring-4 ring-[#25D366]/20 shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center rounded-full bg-purple-700 text-3xl font-semibold text-gray-100 ring-4 ring-[#25D366]/20 shadow-md">
                    {profileData?.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  type="button"
                  className="absolute bottom-1 right-1 w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shadow-md hover:bg-[#1DAA54] transition-colors"
                >
                  <HiCamera className="text-white text-sm" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-3">
                @{formData?.username}
              </h3>
              <p className="text-sm text-gray-400">{formData?.name}</p>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 mb-4">
              <div className="mb-2.5 border-b border-gray-100">
                <div>
                  <p className="text-xs mb-0.5 text-gray-400 font-semibold uppercase tracking-wider">
                    Username
                  </p>
                  <p className="text-sm text-gray-700 pb-2.5">
                    @{formData.username}
                  </p>
                </div>
              </div>
              <div className="">
                <p className="text-xs mb-0.5 text-gray-400 font-semibold uppercase tracking-wider">
                  About
                </p>
                <p className="text-sm text-gray-700">
                  {profileData?.bio === null
                    ? "no bio yet"
                    : formData.bio}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 mb-4">
              <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                <div className="w-9 h-9 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                  <HiUser className="text-[#25D366] text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                    name
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    {formData.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                <div className="w-9 h-9 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                  <HiOutlineEnvelope className="text-[#25D366] text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                    email
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    {profileData?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                <div className="w-9 h-9 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                  <HiOutlineCalendar className="text-[#25D366] text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                    DATE OF JOINING
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    {formatted_joinDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                <div className="w-9 h-9 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                  <HiOutlineCalendar className="text-[#25D366] text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                    updated at
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    {formatted_updateDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="justify-end flex space-x-2 mb-6">
              {editMode && (
                <button
                  type="button"
                  onClick={cancelEditHandler}
                  className="flex items-center gap-1 px-5 py-2 bg-gray-300 text-sm text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={editHandler}
                className={`flex items-center gap-1 px-5 py-2 bg-blue-500 text-sm text-white rounded-lg ${editMode ? "bg-green-600" : "bg-blue-500"}`}
              >
                <span>{editMode ? "Save Changes" : "Edit"}</span> <HiPencil />
              </button>
            </div>
          </form>

          {deletebox && <DeleteAcc setDeletebox={setDeletebox} />}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
              Account
            </p>
            <button
              type="button"
              onClick={handleAccDelete}
              className="w-full text-left text-sm text-red-500 py-2 hover:text-red-600 font-medium"
            >
              Delete Account
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left text-sm text-red-500 py-2 hover:text-red-600 font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
