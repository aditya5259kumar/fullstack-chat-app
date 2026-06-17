import React, { useState } from "react";
import {
  HiOutlineBell,
  HiOutlineLockClosed,
  HiOutlineMoon,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineInformationCircle,
  HiChevronRight,
  HiOutlineTrash,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { FiGithub, FiLinkedin, FiGlobe } from "react-icons/fi";

import Navbar from "../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";
import { disconnectSocket } from "../socket/initSocket";
import DeleteAcc from "../components/profile/DeleteAcc";
import { toggleTheme } from "../redux/slices/themeSlice";

const Settings = () => {
  const [deletebox, setDeletebox] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((store) => store.theme.theme);

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

  function handleAccDelete() {
    setDeletebox(true);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-(--bg)">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-(--text) mb-6">Settings</h2>

          {/* Appearance */}
          <div className="bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) px-5 mb-4">
            <p className="text-xs text-(--text-muted) font-semibold uppercase tracking-wider pt-4 pb-2">
              Appearance
            </p>

            {/* Dark Mode */}
            <div className="flex items-center gap-4 py-3.5 border-b border-(--border) last:border-0">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-(--surface-2)">
                <HiOutlineMoon className="text-lg text-(--primary)" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-(--text)">Dark Mode</p>
                <p className="text-xs text-(--text-muted) mt-0.5">
                  Switch to dark theme
                </p>
              </div>
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  theme === "dark" ? "bg-(--primary)" : "bg-(--border)"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    theme === "dark" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* About */}
          <div className="bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) px-5 mb-4">
            <p className="text-xs text-(--text-muted) font-semibold uppercase tracking-wider pt-4 pb-2">
              About
            </p>

            <a
              target="_blank"
              href="https://github.com/aditya5259kumar"
              className="flex items-center gap-4 py-3.5 border-b border-(--border) last:border-0"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-(--surface-2)">
                <FiGithub className="text-lg text-(--primary)" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-(--text)">GitHub</p>
                <p className="text-xs text-(--text-muted) mt-0.5">
                  github.com/aditya5259kumar
                </p>
              </div>
            </a>

            <a
              target="_blank"
              href="https://www.linkedin.com/in/aditya5259kumar/"
              className="flex items-center gap-4 py-3.5 border-b border-(--border) last:border-0"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-(--surface-2)">
                <FiLinkedin className="text-lg text-(--primary)" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-(--text)">LinkedIn</p>
                <p className="text-xs text-(--text-muted) mt-0.5">
                  linkedin.com/in/aditya5259kumar/
                </p>
              </div>
            </a>

            <a
              target="_blank"
              href="https://aditya-devportfolio.netlify.app/"
              className="flex items-center gap-4 py-3.5 border-b border-(--border) last:border-0"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-(--surface-2)">
                <FiGlobe className="text-lg text-(--primary)" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-(--text)">Portfolio</p>
                <p className="text-xs text-(--text-muted) mt-0.5">
                  aditya-devportfolio.netlify.app/
                </p>
              </div>
            </a>
          </div>

          {/* Account */}
          {deletebox && <DeleteAcc setDeletebox={setDeletebox} />}
          <div className="bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) px-5 py-4">
            <p className="text-xs text-(--text-muted) font-semibold uppercase tracking-wider mb-3">
              Account
            </p>

            {/* Log Out */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left text-sm text-(--error) py-2 hover:text-(--error) font-medium hover:bg-(--surface-2) px-2 rounded transition-colors"
            >
              Log Out
            </button>

            {/* Delete Account */}
            <button
              type="button"
              onClick={handleAccDelete}
              className="w-full text-left text-sm text-(--error) py-2 hover:text-(--error) font-medium hover:bg-(--surface-2) px-2 rounded transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
