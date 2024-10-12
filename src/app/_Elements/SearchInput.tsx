import React from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchInput() {
  return (
    <form
      action=""
      className="relative bg-white bg-opacity-5 backdrop-blur-lg rounded-lg outline-none text-white px-4 py-2 flex items-center gap-2"
    >
      <label htmlFor="search" className="cursor-pointer">
        <BiSearch />
      </label>
      <input
        title="search"
        type="search"
        name="Search"
        placeholder="Type Searching"
        id="search"
        className="outline-none bg-transparent"
      />
    </form>
  );
}
