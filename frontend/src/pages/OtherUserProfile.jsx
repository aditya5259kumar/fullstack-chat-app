import React, { lazy, Suspense, useEffect } from "react";
import {
  HiPencil,
  HiCamera,
  HiUser,
  HiOutlineEnvelope,
  HiOutlineCalendar,
} from "react-icons/hi2";
const Navbar = lazy(() => import("../components/navbar/Navbar"));
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../redux/slices/userProfileSlice";
import { useParams } from "react-router";

const Profile = () => {
  const {
    data: profileData,
    loading,
    // error,
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

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-(--bg)">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-(--text-muted)">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-(--bg)">
      <Suspense
        fallback={
          <div className="flex items-center h-screen justify-center">
            <div className="w-5 h-5 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Navbar />
      </Suspense>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-(--text) mb-6">Profile</h2>

          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {profileData?.profile_photo ? (
                <img
                  src={`http://localhost:4000/uploads/${profileData.profile_photo}`}
                  alt="Profile"
                  loading="lazy"
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-(--primary)/20 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-(--primary) text-3xl font-semibold text-white ring-4 ring-(--primary)/20 shadow-md">
                  {profileData?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-(--text) mt-3">
              @{profileData?.username}
            </h3>
            <p className="text-sm text-(--text-muted)">{profileData?.name}</p>
          </div>

          <div className="bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) px-5 py-4 mb-4">
            <div className="mb-2.5 border-b border-(--border)">
              <p className="text-xs mb-0.5 text-(--text-muted) font-semibold uppercase tracking-wider">
                Username
              </p>
              <p className="text-sm text-(--text) pb-2.5">
                @{profileData?.username}
              </p>
            </div>
            <p className="text-xs mb-0.5 text-(--text-muted) font-semibold uppercase tracking-wider">
              About
            </p>
            <p className="text-sm text-(--text)">
              {profileData?.bio || "No bio yet"}
            </p>
          </div>

          <div className="bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) px-5 mb-4">
            <div className="flex items-start gap-4 py-4 border-b border-(--border) last:border-0">
              <div className="w-9 h-9 rounded-full bg-(--surface-2) flex items-center justify-center shrink-0">
                <HiUser className="text-(--primary) text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-(--text-muted) font-medium uppercase tracking-wider mb-0.5">
                  name
                </p>

                <p className="text-sm text-(--text) font-medium">
                  {profileData?.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4 border-b border-(--border) last:border-0">
              <div className="w-9 h-9 rounded-full bg-(--surface-2) flex items-center justify-center shrink-0">
                <HiOutlineCalendar className="text-(--primary) text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-(--text-muted) font-medium uppercase tracking-wider mb-0.5">
                  DATE OF JOINING
                </p>
                <p className="text-sm text-(--text) font-medium">
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
