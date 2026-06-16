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
import Navbar from "../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";

const Toggle = ({ enabled, onToggle }) => (
 <button
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
      enabled ? "bg-(--primary)" : "bg-(--border)"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-(--shadow) transition-transform duration-300 ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const SettingRow = ({
  icon: Icon,
  label,
  description,
  children,
  danger,
  onClick,
}) => (
 <div
    onClick={onClick}
    className={`flex items-center gap-4 py-3.5 border-b border-(--border) last:border-0 ${
      onClick
        ? "cursor-pointer hover:bg-(--surface-2) px-5 -mx-5 rounded-xl transition-colors"
        : ""
    }`}
  >
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
        danger ? "bg-(--error)/10" : "bg-(--surface-2)"
      }`}
    >
      <Icon
        className={`text-lg ${danger ? "text-(--error)" : "text-(--primary)"}`}
      />
    </div>
    <div className="flex-1">
      <p
        className={`text-sm font-medium ${danger ? "text-(--error)" : "text-(--text)"}`}
      >
        {label}
      </p>
      {description && (
        <p className="text-xs text-(--text-muted) mt-0.5">{description}</p>
      )}
    </div>
    {children ||
      (onClick && <HiChevronRight className="text-(--text-muted) text-lg" />)}
  </div>
);

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    messagePreview: true,
    readReceipts: true,
    darkMode: false,
    archiveOnDelete: false,
    twoFactor: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toggle(key) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleLogout() {
    dispatch(userLogout());
    navigate("/login");
  }

  return (
  <div className="flex h-screen overflow-hidden bg-(--bg)">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-(--text) mb-6">Settings</h2>

          {/* Notifications */}
          <div className="bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) px-5 mb-4">
            <p className="text-xs text-(--text-muted) font-semibold uppercase tracking-wider pt-4 pb-2">
              Notifications
            </p>
            <SettingRow
              icon={HiOutlineBell}
              label="Push Notifications"
              description="Get notified about new messages"
            >
              <Toggle
                enabled={settings.notifications}
                onToggle={() => toggle("notifications")}
              />
            </SettingRow>
            <SettingRow
              icon={HiOutlineBell}
              label="Message Preview"
              description="Show message content in notifications"
            >
              <Toggle
                enabled={settings.messagePreview}
                onToggle={() => toggle("messagePreview")}
              />
            </SettingRow>
          </div>

          {/* Privacy */}
          <div className="bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) px-5 mb-4">
            <p className="text-xs text-(--text-muted) font-semibold uppercase tracking-wider pt-4 pb-2">
              Privacy
            </p>
            <SettingRow
              icon={HiOutlineShieldCheck}
              label="Read Receipts"
              description="Let others see when you've read their messages"
            >
              <Toggle
                enabled={settings.readReceipts}
                onToggle={() => toggle("readReceipts")}
              />
            </SettingRow>
            <SettingRow
              icon={HiOutlineLockClosed}
              label="Two-Factor Authentication"
              description="Add extra security to your account"
            >
              <Toggle
                enabled={settings.twoFactor}
                onToggle={() => toggle("twoFactor")}
              />
            </SettingRow>
            <SettingRow
              icon={HiOutlineLockClosed}
              label="Change Password"
              onClick={() => {}}
            />
            <SettingRow
              icon={HiOutlineGlobeAlt}
              label="Blocked Users"
              description="Manage your blocked contacts"
              onClick={() => {}}
            />
          </div>

          {/* Appearance */}
          <div className="bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) px-5 mb-4">
            <p className="text-xs text-(--text-muted) font-semibold uppercase tracking-wider pt-4 pb-2">
              Appearance
            </p>
            <SettingRow
              icon={HiOutlineMoon}
              label="Dark Mode"
              description="Switch to dark theme"
            >
              <Toggle
                enabled={settings.darkMode}
                onToggle={() => toggle("darkMode")}
              />
            </SettingRow>
          </div>

          {/* About */}
          <div className="bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) px-5 mb-4">
            <p className="text-xs text-(--text-muted) font-semibold uppercase tracking-wider pt-4 pb-2">
              About
            </p>
            <SettingRow
              icon={HiOutlineInformationCircle}
              label="App Version"
              description="LinkUp v1.0.0"
            />
            <SettingRow
              icon={HiOutlineInformationCircle}
              label="Privacy Policy"
              onClick={() => {}}
            />
            <SettingRow
              icon={HiOutlineInformationCircle}
              label="Terms of Service"
              onClick={() => {}}
            />
          </div>

          {/* Danger Zone */}
          <div className="bg-(--surface) rounded-2xl shadow-(--shadow) border border-(--border) px-5 mb-8">
            <p className="text-xs text-(--text-muted) font-semibold uppercase tracking-wider pt-4 pb-2">
              Danger Zone
            </p>
            <SettingRow
              icon={HiOutlineArrowRightOnRectangle}
              label="Log Out"
              danger
              onClick={handleLogout}
            />
            <SettingRow
              icon={HiOutlineTrash}
              label="Delete Account"
              description="Permanently delete your account and all data"
              danger
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
