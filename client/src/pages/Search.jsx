import { useState } from "react";

import SearchHeader from "../components/SearchHeader";
import SearchInput from "../components/UI/SearchInput";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchText(newValue);

    if (newValue.length) {
      setMessage(
        <p>
          All notes matching
          <strong>
            <q>{newValue}</q>
          </strong>
          are displayed below.
        </p>
      );
    } else {
      setMessage("");
    }
  };

  return (
    <>
      <SearchHeader />
      <SearchInput onChange={handleChange} message={message} />
    </>
  );
};

export default Search;
