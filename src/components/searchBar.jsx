import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [tempSearch, setTempSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (tempSearch.trim()) {
      navigate(`/search?query=${tempSearch}`);
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search articles..."
        value={tempSearch}
        onChange={(e) => setTempSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
