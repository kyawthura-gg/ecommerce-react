import React, { useState } from "react";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex mr-2">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search ...."
        className="border-gray-600 w-full rounded-md border-2 py-2 px-2 outline-none sm:ml-12 md:px-8 md:w-80 md:ml-32"
      />
      <button
        type="submit"
        className="text-white bg-black  ml-2 px-2 md:px-4 py-2.5 rounded-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
