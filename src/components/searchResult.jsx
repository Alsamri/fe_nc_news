import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getArticles } from "../utils/api";

export const SearchResults = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      getArticles({})
        .then((data) => {
          setArticles(
            data.filter((article) =>
              article.title.toLowerCase().includes(query.toLowerCase())
            )
          );
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (!articles.length) return <p>No results found for "{query}"</p>;

  return (
    <>
      <h2>Search Results for "{query}"</h2>
      <ul className="container">
        {articles.map((article) => (
          <li key={article.article_id}>
            <img src={article.article_img_url} alt={article.title} />
            <div className="article-content">
              <h3>
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </h3>
              <p>
                By <strong>{article.author}</strong>
              </p>
              <p>
                Topic: <strong>{article.topic}</strong>
              </p>
              <p> {new Date(article.created_at).toLocaleDateString()}</p>
              <p>💬 {article.comment_count} Comments</p>
              <p>👍 {article.votes} Votes</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
