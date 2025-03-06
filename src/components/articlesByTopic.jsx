import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { getArticlesByTopic } from "../utils/api";

export const ArticlesByTopic = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    setLoading(true);
    getArticlesByTopic(topic, {
      sort_by: sortBy,
      order,
      page: currentPage,
      limit,
    })
      .then((data) => {
        setArticles(data.articles);
        setTotalCount(data.total_count);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles.");
        setLoading(false);
      });
  }, [topic, sortBy, order, currentPage, limit]);

  const handleSortChange = (event) => {
    setSearchParams({
      sort_by: event.target.value,
      order,
    });
  };

  const handleOrderChange = () => {
    searchParams.set("order", order === "asc" ? "desc" : "asc");
    setSearchParams(searchParams);
  };
  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Articles about "{topic}"</h2>

      <div className="sort-container">
        <label htmlFor="sort-by">Sort by: </label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>

        <button onClick={handleOrderChange} className="sort-button">
          {order === "asc" ? "⬆ Ascending" : "⬇ Descending"}
        </button>

        <Link to="/post-article">
          <button className="add-article-btn">➕ Add New Article</button>
        </Link>
      </div>
      {articles.length === 0 ? (
        <p>No articles found for this topic.</p>
      ) : (
        <ul className="article-detail">
          {articles.map((article) => (
            <li key={article.article_id} className="article-main">
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
              <p>
                By {article.author} | Votes: {article.votes}
              </p>
              <p className="article-main">
                Published on:{" "}
                {new Date(article.created_at).toLocaleDateString()}
              </p>
              <p>💬 {article.comment_count} Comments</p>
            </li>
          ))}
        </ul>
      )}
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
