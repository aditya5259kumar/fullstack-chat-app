import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { disconnectSocket } from "../../socket/initSocket";
import { deleteAccount } from "../../redux/slices/deleteAccount";
import { userLogout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const DeleteAcc = ({ setDeletebox }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        className="w-full max-w-md rounded-2xl bg-(--surface) p-6 shadow-(--shadow-lg)"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-(--text)">Delete Account</h2>

        <p className="mt-3 text-sm text-(--text-muted)">
          Are you sure you want to permanently delete your account? This action
          cannot be undone and you will lose access to all your data.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-(--text)">
              Current Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={`w-full rounded-lg border px-4 py-3 pr-12 outline-none bg-(--input-bg) text-(--input-text) placeholder-(--placeholder) ${
                  error ? "border-(--error)" : "border-(--border)"
                } focus:ring-2 focus:ring-(--primary)`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text)"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

          </div>
          {error && <p className="mt-1 text-sm text-(--error)">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closehandler}
              className="rounded-lg border border-(--border) px-4 py-2 text-(--text) hover:bg-(--surface-2) transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={deleteHandler}
              className="rounded-lg bg-(--error) px-4 py-2 font-medium text-white hover:bg-(--error)/80 transition-colors"
            >
              Delete Permanently
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAcc;
