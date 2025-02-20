import { useSearchParams } from "react-router-dom";

export const SortByArticles = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const handleSortChange = (e) => {
    searchParams.set("sort_by", e.target.value);
    setSearchParams(searchParams);
  };

  const handleOrder = () => {
    searchParams.set("order", order === "asc" ? "desc" : "asc");
    setSearchParams(searchParams);
  };

  return (
    <div className="sort-container">
      <label htmlFor="sort-by">Sort by: </label>
      <select id="sort-by" value={sortBy} onChange={handleSortChange}>
        <option value="created_at">Date</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comments</option>
      </select>
      <button onClick={handleOrder} className="sort-button">
        {order === "asc" ? "⬆ Ascending" : "⬇ Descending"}
      </button>
    </div>
  );
};
