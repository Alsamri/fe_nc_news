import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getArticles } from "../utils/api";
import { SortByArticles } from "./sortarticleBy";
export const FetchArticles = () => {
  const [articles, setarticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    getArticles({ sortBy, order })
      .then((data) => {
        setarticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [searchParams]);
  if (loading) {
    return <p>Loading articles...</p>;
  }
  return (
    <>
      <h2>Articles</h2>
      <SortByArticles />

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
