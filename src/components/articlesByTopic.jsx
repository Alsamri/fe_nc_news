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

  useEffect(() => {
    setLoading(true);
    getArticlesByTopic(topic, { sort_by: sortBy, order })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles.");
        setLoading(false);
      });
  }, [topic, sortBy, order]);

  const handleSortChange = (event) => {
    setSearchParams({
      sort_by: event.target.value,
      order,
    });
  };

  const handleOrderChange = (event) => {
    setSearchParams({
      sort_by: sortBy,
      order: event.target.value,
    });
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Articles about "{topic}"</h2>

      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>

        <label> Order: </label>
        <select value={order} onChange={handleOrderChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <Link to="/post-article">
        <button className="add-article-btn">➕ Add New Article</button>
      </Link>
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
    </div>
  );
};
