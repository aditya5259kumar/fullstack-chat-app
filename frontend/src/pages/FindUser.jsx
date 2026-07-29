import React, { useEffect, useState, lazy, Suspense } from "react";

const Navbar = lazy(() => import("../components/navbar/Navbar"));
const FindUserCard = lazy(
  () => import("../components/create_convo/FindUserCard"),
);

import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  searchUsers,
  resetSearch,
} from "../redux/slices/searchUserSlice";

const FindUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const {
    allUsers: users,
    searchedUsers,
    loadingUsers,
    searchLoading,
  } = useSelector((state) => state.searchUser);

  const dispatch = useDispatch();

  // console.log("all users---------------------", users);

  // Load all users initially
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();

    const timer = setTimeout(() => {
      if (trimmedQuery === "") {
        setIsSearchActive(false);
        dispatch(resetSearch());
        return;
      }

      dispatch(searchUsers(trimmedQuery));
      setIsSearchActive(true);
    }, 600); // wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchQuery, dispatch]);

  // ✅ Clear search button
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
    dispatch(resetSearch());
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // ✅ Final display logic
  const displayUsers = isSearchActive ? searchedUsers : users;

  return (
    <div className="flex h-screen bg-(--bg)">
      <Suspense
        fallback={
          <div className="flex justify-center">
            <div className="w-5 h-5 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Navbar />
      </Suspense>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-(--text)">New Chat</h2>

          {/* 🔍 Search */}
          <form
            // onSubmit={searchHandler}
            className="flex items-center bg-(--surface) shadow-(--shadow) rounded-full overflow-hidden"
          >
            <div className="flex items-center w-full px-3 py-2">
              <HiOutlineMagnifyingGlass className="text-(--text-muted)" />

              <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search users..."
                className="w-full px-2 outline-none bg-transparent text-(--text) placeholder-(--placeholder)"
              />

              {searchLoading ? (
                <div className="w-4 h-4 border-2 border-(--border) border-t-(--primary) rounded-full animate-spin" />
              ) : (
                searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-(--text-muted) hover:text-(--text)"
                  >
                    <HiXMark />
                  </button>
                )
              )}
            </div>
          </form>

          {/* 👥 Users */}
          <div className="mt-6 mb-10">
            {loadingUsers ? (
              <div className="flex justify-center mt-20">
                <div className="w-5 h-5 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
              </div>
            ) : displayUsers?.length > 0 ? (
              displayUsers?.map((user) => (
                <Suspense
                  key={user?.id}
                  fallback={
                    <div className="flex justify-center mb-12">
                      <div className="w-5 h-5 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <FindUserCard user={user} />
                </Suspense>
              ))
            ) : (
              <p className="text-(--text-muted) mt-20 text-center text-sm">
                No users found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUser;
