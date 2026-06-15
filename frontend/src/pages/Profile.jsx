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
import { myProfile } from "../redux/slices/myProfileSlice";
import { userLogout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";
import { disconnectSocket } from "../socket/initSocket";
import DeleteAcc from "../components/profile/DeleteAcc";
import { updateProfile } from "../redux/slices/updateProfile";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deletebox, setDeletebox] = useState(false);

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const { profileData } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);

  // console.log("profileData---------------------", profileData);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
  });

  // console.log("formData---------------------", formData);

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        username: profileData.username || "",
        bio: profileData.bio || "",
      });
    }
  }, [profileData]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers and underscores";
    }

    // Bio validation
    if (formData.bio.length > 200) {
      newErrors.bio = "Bio cannot exceed 200 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Only JPG, PNG and WEBP images are allowed",
      }));
      return;
    }

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size cannot exceed 2MB",
      }));
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function editHandler(e) {
    e.preventDefault();

    if (!editMode) {
      setEditMode(true);
      return;
    }

    setGeneralError("");

    const isValid = validateForm();

    if (!isValid) return;

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append("name", formData.name.trim());
      payload.append("username", formData.username.trim());
      payload.append("bio", formData.bio.trim());

      if (selectedImage) {
        payload.append("profile_photo", selectedImage);
      }

      await dispatch(updateProfile(payload)).unwrap();

      dispatch(myProfile());

      setEditMode(false);

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setImagePreview(null);
      setSelectedImage(null);

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);

      const message =
        error?.message ||
        error?.payload ||
        error?.response?.data?.message ||
        "Failed to update profile";

      setGeneralError(message);
    } finally {
      setLoading(false);
    }
  }

  function cancelEditHandler(e) {
    e.preventDefault();

    setFormData({
      name: profileData?.name || "",
      username: profileData?.username || "",
      bio: profileData?.bio || "",
    });

    // Clear image preview and selected image
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview); // Clean up URL object
      setImagePreview(null);
    }
    setSelectedImage(null);
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

  // Helper function to get the image source (preview or actual profile photo)
  const getImageSource = () => {
    if (imagePreview) {
      return imagePreview; // Show preview if available
    }
    if (profileData?.profile_photo) {
      return `http://localhost:4000/uploads/${profileData.profile_photo}`;
    }
    return null;
  };

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
                {getImageSource() ? (
                  // <img
                  //   src={getImageSource()}
                  //   alt="Profile"
                  //   className="w-28 h-28 rounded-full object-cover ring-4 ring-[#25D366]/20 shadow-md"
                  // />
                  <img
                    src={getImageSource()}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover ring-4 ring-[#25D366]/20 shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center rounded-full bg-purple-700 text-3xl font-semibold text-gray-100 ring-4 ring-[#25D366]/20 shadow-md">
                    {profileData?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                {editMode && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="profileImage"
                    />

                    <label
                      htmlFor="profileImage"
                      className="absolute bottom-1 right-1 w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shadow-md hover:bg-[#1DAA54] transition-colors cursor-pointer"
                    >
                      <HiCamera className="text-white text-sm" />
                    </label>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="text-red-500 text-xs text-center mt-2">
                  {errors.image}
                </p>
              )}
              <h3 className="text-xl font-bold text-gray-800 mt-3">
                @{profileData?.username}
              </h3>
              <p className="text-sm text-gray-400">{profileData?.name}</p>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 mb-4">
              <div className="mb-2.5 border-b border-gray-100">
                <div>
                  <p className="text-xs mb-0.5 text-gray-400 font-semibold uppercase tracking-wider">
                    Username
                  </p>
                  {editMode ? (
                    // <input
                    //   type="text"
                    //   name="username"
                    //   value={formData.username}
                    //   onChange={handleChange}
                    //   className="w-full border rounded px-3 py-2 text-sm"
                    // />
                    <div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />

                      {errors.username && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.username}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700 pb-2.5">
                      @{formData.username}
                    </p>
                  )}
                </div>
              </div>
              <div className="">
                <p className="text-xs mb-0.5 text-gray-400 font-semibold uppercase tracking-wider">
                  About
                </p>
                {editMode ? (
                  // <textarea
                  //   name="bio"
                  //   value={formData.bio}
                  //   onChange={handleChange}
                  //   rows={3}
                  //   className="w-full border rounded px-3 py-2 text-sm"
                  // />
                  <div>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border rounded px-3 py-2 text-sm"
                    />

                    {errors.bio && (
                      <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">
                    {formData.bio || "No bio yet"}
                  </p>
                )}
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
                  {editMode ? (
                    // <input
                    //   type="text"
                    //   name="name"
                    //   value={formData.name}
                    //   onChange={handleChange}
                    //   className="w-full border rounded px-3 py-2 text-sm"
                    // />
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />

                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-800 font-medium">
                      {formData.name}
                    </p>
                  )}
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
            {generalError && (
              <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
                {generalError}
              </div>
            )}
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
                disabled={loading}
                className={`flex items-center gap-1 px-5 py-2 text-sm text-white rounded-lg ${
                  editMode ? "bg-green-600" : "bg-blue-500"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span>
                  {loading ? "Saving..." : editMode ? "Save Changes" : "Edit"}
                </span>

                {!loading && <HiPencil />}
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
