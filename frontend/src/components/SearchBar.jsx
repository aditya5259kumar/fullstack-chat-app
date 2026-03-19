import React, { useState } from "react";
import { HiMiniMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  function clearSearch() {
    setSearchText("");
  }

  //   console.log("searchText-----------", searchText);

  return (
    <div className="w-full my-1 md:my-2 px-2 md:px-4">
      <div className="flex items-center px-1 bg-gray-100 w-full rounded-4xl">
        <span className="text-xl p-2.5 text-gray-500">
          <HiMiniMagnifyingGlass />
        </span>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="focus:outline-none w-full py-2.5"
        />
        {searchText.length !== 0 && (
          <span onClick={clearSearch} className="text-xl p-2.5 cursor-pointer">
            <HiMiniXMark />
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
