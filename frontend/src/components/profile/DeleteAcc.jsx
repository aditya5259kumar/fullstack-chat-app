import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disconnectSocket } from "../../socket/initSocket";
import { deleteAccount } from "../../redux/slices/deleteAccount";
import { userLogout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { HiMiniLockClosed } from "react-icons/hi2";

const DeleteAcc = ({ setDeletebox }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: deleteAccLoading } = useSelector((state) => state.deleteAcc);

  console.log("deleteAccLoading===================", deleteAccLoading);

  function closehandler() {
    setDeletebox((prev) => !prev);
  }

  const deleteHandler = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setError("");

    try {
      await dispatch(deleteAccount(password)).unwrap();

      dispatch(userLogout());
      disconnectSocket();
      localStorage.removeItem("token");

      alert("Account Permanently deleted.");
      navigate("/login");
    } catch (error) {
      setError(error?.message || error?.message || "Failed to delete account");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={closehandler}
    >
      <div
        className="w-full max-w-md bg-(--surface) p-6 border border-(--border) rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-(--text) mb-2">
          Delete Account
        </h2>

        <p className="mb-6 text-sm text-(--text-muted)">
          Are you sure you want to permanently delete your account? This action
          cannot be undone and you will lose access to all your data.
        </p>

        <form onSubmit={deleteHandler}>
          <div className="mb-4">
            <p className="text-start text-sm mb-1 text-(--text)">
              Current Password
            </p>
            <div className="flex w-full items-center border border-(--border) rounded-md">
              <span className="bg-(--surface-2) px-3.5 p-3 text-base border-r border-(--border) text-(--text-muted)">
                <HiMiniLockClosed />
              </span>
              <div className="flex items-center w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="text-sm w-full pl-2 py-2.5 focus:outline-none bg-transparent text-(--input-text) placeholder-(--placeholder)"
                />
                <span
                  className="text-md text-(--text-muted) py-2.5 px-3 cursor-pointer hover:text-(--text)"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <HiOutlineEye className="text-(--text)" />
                  ) : (
                    <HiOutlineEyeOff />
                  )}
                </span>
              </div>
            </div>
            {error && (
              <p className="mt-1 ml-1 text-xs text-(--error) text-start">
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closehandler}
              className="px-5 py-2 text-sm font-medium text-(--text) border border-(--border) rounded-md hover:bg-(--surface-2) transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-(--error) rounded-md hover:bg-(--error)/80 transition-colors"
            >
              {deleteAccLoading ? "Deleting Account..." : "Delete Permanently"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAcc;
