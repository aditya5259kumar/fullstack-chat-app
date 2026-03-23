import React, { useState } from "react";
import avatar from "../assets/avatar.webp";
import {
  HiPencil,
  HiCamera,
  HiUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiCheck,
  HiXMark,
} from "react-icons/hi2";
import Navbar from "../components/navbar/Navbar";
import InfoRow from "../components/profile/InfoRow";

const fakeUser = {
  name: "Your Name",
  username: "yourname",
  email: "you@example.com",
  phone: "+91 98765 43210",
  bio: "Hey there! I'm using LinkUp 💬",
  joinedDate: "March 2025",
};


const Profile = () => {
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState(fakeUser.bio);
  const [tempBio, setTempBio] = useState(bio);

  function saveBio() {
    setBio(tempBio);
    setEditingBio(false);
  }

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
              <img
                src={avatar}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover ring-4 ring-[#25D366]/20 shadow-md"
              />
              <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shadow-md hover:bg-[#1DAA54] transition-colors">
                <HiCamera className="text-white text-sm" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-3">
              {fakeUser.name}
            </h3>
            <p className="text-sm text-gray-400">@{fakeUser.username}</p>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                About
              </p>
              {!editingBio && (
                <button
                  onClick={() => {
                    setTempBio(bio);
                    setEditingBio(true);
                  }}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HiPencil className="text-base" />
                </button>
              )}
            </div>

            {editingBio ? (
              <div>
                <textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  maxLength={100}
                  rows={3}
                  className="w-full text-sm text-gray-800 focus:outline-none resize-none border border-[#25D366]/40 rounded-xl p-2"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">{tempBio.length}/100</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingBio(false)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-400"
                    >
                      <HiXMark className="text-base" />
                    </button>
                    <button
                      onClick={saveBio}
                      className="p-2 rounded-full bg-[#25D366] text-white hover:bg-[#1DAA54]"
                    >
                      <HiCheck className="text-base" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700">{bio}</p>
            )}
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 mb-4">
            <InfoRow
              icon={HiUser}
              label="Full Name"
              value={fakeUser.name}
              editable
              onEdit={() => {}}
            />
            <InfoRow
              icon={HiOutlineEnvelope}
              label="Email"
              value={fakeUser.email}
              editable={false}
            />
            <InfoRow
              icon={HiOutlinePhone}
              label="Phone"
              value={fakeUser.phone}
              editable
              onEdit={() => {}}
            />
            <InfoRow
              icon={HiOutlineCalendar}
              label="Joined"
              value={fakeUser.joinedDate}
              editable={false}
            />
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
              Account
            </p>
            <button className="w-full text-left text-sm text-red-500 py-2 hover:text-red-600 font-medium">
              Delete Account
            </button>
            <button className="w-full text-left text-sm text-red-500 py-2 hover:text-red-600 font-medium">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
