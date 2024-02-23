import { useState } from "react";
import { Input, Radio } from "antd";
import { SEARCH_KEY } from "../../constants";
import "./SearchBar.css";

const { Search } = Input;

const SearchBar = (props) => {
  const [searchType, setSearchType] = useState(SEARCH_KEY.all);
  const [error, setError] = useState("");
  const changeSearchType = (e) => {
    const searchType = e.target.value;
    setSearchType(searchType);
    setError("");
  };

  const handleSearch = (value) => {
    // case 1: the key to search is empty && the user doesn't intend to search all posts.
    if (value === "" && searchType !== SEARCH_KEY.all) {
      setError("Please input your search keyword!");
      return;
    }
    // case 2: do search based on keyword and type.
    // inform Home to fetch data
    props.handleSearch({ type: searchType, keyword: value });
  };

  return (
    <div className="search-bar">
      <Search
        placeholder={
          searchType === SEARCH_KEY.all
            ? "all posts has been shown as followings"
            : "input search text"
        } // part 2
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        // disabled={searchType === SEARCH_KEY.all}
      />
      <p className="error-msg">{error}</p>
      <Radio.Group
        onChange={changeSearchType}
        value={searchType}
        className="search-type-group"
      >
        <Radio value={SEARCH_KEY.all}>Show All</Radio>
        <Radio value={SEARCH_KEY.keyword}>By Keyword</Radio>
        <Radio value={SEARCH_KEY.user}>By User</Radio>
      </Radio.Group>
    </div>
  );
};

export default SearchBar;
