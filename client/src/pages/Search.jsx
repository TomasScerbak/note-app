import { useState } from "react";

import SearchHeader from "../components/SearchHeader";
import SearchInput from "../components/UI/SearchInput";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("test");

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <SearchHeader />
      <SearchInput onChange={handleChange} message={message} />
    </>
  );
};

export default Search;
