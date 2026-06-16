import { useEffect } from "react";
import {
  HiMiniChatBubbleLeftEllipsis,
  HiMiniCog6Tooth,
  HiMoon,
  HiSun,
  HiMiniChatBubbleBottomCenterText,
} from "react-icons/hi2";
import { FaRocketchat } from "react-icons/fa";
import { RiChatSmileAiFill } from "react-icons/ri";
import { BiCommentDetail } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { myProfile } from "../../redux/slices/myProfileSlice";
import { toggleTheme } from "../../redux/slices/themeSlice";

const Navbar = () => {
  const theme = useSelector((store) => store.theme.theme);
  const { profileData } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(myProfile());
    }
  }, [dispatch, token]);

  // console.log("profileData", profileData);

  return (
    <>
      <div className="sticky left-0 top-0 z-50 w-18 bg-(--surface) border-r border-(--border) shadow-(--shadow) h-screen hidden md:flex flex-col items-center justify-between py-4">
        <div className="flex flex-col items-center gap-8 w-full px-2">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-(--primary) rounded-full shadow-md">
            <RiChatSmileAiFill className="text-white text-xl md:text-2xl" />
          </div>

          <div className="flex w-full flex-col gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center justify-center w-full py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-(--surface-2) text-(--primary)"
                    : "hover:bg-(--surface-2) text-(--text-muted)"
                }`
              }
              title="Chats"
            >
              <HiMiniChatBubbleBottomCenterText className="text-xl" />
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center justify-center w-full py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-(--surface-2) text-(--primary)"
                    : "hover:bg-(--surface-2) text-(--text-muted)"
                }`
              }
              title="Settings"
            >
              <HiMiniCog6Tooth className="text-xl" />
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 w-full px-2">
          <button
          onClick={() => dispatch(toggleTheme())}
            className="flex items-center justify-center w-full py-3 rounded-xl text-(--text-muted) hover:bg-(--surface-2) hover:text-(--text) transition-all duration-200"
            title="Dark mode"
          >
            {theme === "light" ? (
              <HiMoon className="text-lg" />
            ) : (
              <HiSun className="text-xl" />
            )}
          </button>

          <NavLink to="/profile" title="Profile / Logout">
            {profileData?.profile_photo ? (
              <img
                src={`http://localhost:4000/uploads/${profileData?.profile_photo}`}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-(--primary) text-white flex items-center justify-center font-semibold">
                {profileData?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </NavLink>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar*/}
     <div className="fixed bottom-0 left-0 right-0 z-50 bg-(--surface) border-t border-(--border) shadow-(--shadow) flex items-center justify-around py-2 md:hidden">
        {/* <div className="flex items-center justify-center w-10 h-10 bg-(--primary) rounded-full shadow-md">
          <RiChatSmileAiFill className="text-white text-xl" />
        </div> */}

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center justify-center w-12 py-2 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-(--surface-2) text-(--primary)"
                : "hover:bg-(--surface-2) text-(--text-muted)"
            }`
          }
          title="Chats"
        >
          <HiMiniChatBubbleBottomCenterText className="text-2xl" />
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center justify-center w-12 py-2 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-(--surface-2) text-(--primary)"
                : "hover:bg-(--surface-2) text-(--text-muted)"
            }`
          }
          title="Settings"
        >
          <HiMiniCog6Tooth className="text-2xl" />
        </NavLink>

        <button
       onClick={() => dispatch(toggleTheme())}
          className="flex items-center justify-center w-12 py-2 rounded-xl text-(--text-muted) hover:bg-(--surface-2) hover:text-(--text) transition-all duration-200"
          title="Dark mode"
        >
           {theme === "light" ? (
              <HiMoon className="text-lg" />
            ) : (
              <HiSun className="text-xl" />
            )}
        </button>

        <NavLink to="/profile" title="Profile / Logout">
          {profileData?.profile_photo ? (
            <img
              src={`http://localhost:4000/uploads/${profileData?.profile_photo}`}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-(--primary) text-white flex items-center justify-center font-semibold text-sm">
              {profileData?.name?.[0]?.toUpperCase()}
            </div>
          )}
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
