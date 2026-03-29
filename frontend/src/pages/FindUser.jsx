import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  searchUsers,
  resetSearch,
} from "../redux/slices/searchUserSlice";
import FindUserCard from "../components/create_convo/FindUserCard";

const FindUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const {
    allUsers: users,
    searchedUsers,
    loading,
  } = useSelector((state) => state.searchUser);

  const dispatch = useDispatch();

  // console.log("all users---------------------", users);

  // ✅ Load all users initially
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  // ✅ Search handler (ONLY when button clicked)
  const searchHandler = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setIsSearchActive(false);
      dispatch(resetSearch());
      return;
    }

    dispatch(searchUsers(searchQuery));
    setIsSearchActive(true);
  };

  // ✅ Clear search button
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
    dispatch(resetSearch());
  };

  // ✅ Handle typing (important fix)
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // If user deletes everything manually → reset
    if (value.trim() === "") {
      setIsSearchActive(false);
      dispatch(resetSearch());
    }
  };

  // ✅ Final display logic
  const displayUsers = isSearchActive ? searchedUsers : users;

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">New Chat</h2>

          {/* 🔍 Search */}
          <form
            onSubmit={searchHandler}
            className="flex items-center bg-white shadow rounded-full overflow-hidden"
          >
            <div className="flex items-center w-full px-3 py-2">
              <HiOutlineMagnifyingGlass className="text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search users..."
                className="w-full px-2 outline-none"
              />

              {searchQuery && (
                <button type="button" onClick={clearSearch}>
                  <HiXMark />
                </button>
              )}
            </div>

            <button className="bg-green-600 text-white px-4 py-2">
              Search
            </button>
          </form>

          {/* 👥 Users */}
          <div className="mt-6">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : displayUsers?.length > 0 ? (
              displayUsers?.map((user) => (
                <FindUserCard key={user?.id} user={user} />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No users found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUser;
