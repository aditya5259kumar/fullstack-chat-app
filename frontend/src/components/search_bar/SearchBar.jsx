import React, { useState } from "react";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  }

  function clearSearch() {
    setQuery("");
    if (onSearch) onSearch("");
  }

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-4xl px-3 py-2.5">
      <HiOutlineMagnifyingGlass className="text-gray-400 text-base shrink-0" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search chats..."
        className="bg-transparent text-sm w-full focus:outline-none text-gray-700 placeholder-gray-400"
      />
      {query && (
        <button onClick={clearSearch}>
          <HiXMark className="text-gray-400 text-base hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
