import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByTopic } from "../utils/api";

export const ArticlesByTopic = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getArticlesByTopic(topic)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles.");
        setLoading(false);
      });
  }, [topic]);
  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Articles about "{topic}"</h2>
      {articles.length === 0 ? (
        <p>No articles found for this topic.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.article_id}>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
