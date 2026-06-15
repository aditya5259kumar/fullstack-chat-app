import React, { useEffect } from "react";
import {
  HiPencil,
  HiCamera,
  HiUser,
  HiOutlineEnvelope,
  HiOutlineCalendar,
} from "react-icons/hi2";
import Navbar from "../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../redux/slices/userProfileSlice";
import { useParams } from "react-router";

const Profile = () => {
  const {
    data: profileData,
    loading,
    error,
  } = useSelector((state) => state.otherUserProfile);

  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile(userId));
  }, [dispatch, userId]);

  // console.log("profileData---------------------", profileData);

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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {profileData?.profile_photo ? (
                <img
                  src={`http://localhost:4000/uploads/${profileData.profile_photo}`}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-[#25D366]/20 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-purple-700 text-3xl font-semibold text-gray-100 ring-4 ring-[#25D366]/20 shadow-md">
                  {profileData?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-3">
              @{profileData?.username}
            </h3>
            <p className="text-sm text-gray-400">{profileData?.name}</p>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 mb-4">
            <div className="mb-2.5 border-b border-gray-100">
              <p className="text-xs mb-0.5 text-gray-400 font-semibold uppercase tracking-wider">
                Username
              </p>
              <p className="text-sm text-gray-700 pb-2.5">
                @{profileData?.username}
              </p>
            </div>
            <p className="text-xs mb-0.5 text-gray-400 font-semibold uppercase tracking-wider">
              About
            </p>
            <p className="text-sm text-gray-700">
              {profileData?.bio || "No bio yet"}
            </p>
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
                  {profileData?.name}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
