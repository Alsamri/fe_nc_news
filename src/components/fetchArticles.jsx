import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../utils/api";

export const FetchArticles = () => {
  const [articles, setarticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getArticles()
      .then((data) => {
        setarticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <p>Loading articles...</p>;
  }
  return (
    <>
      <h2>Articles</h2>
      <ul className="container">
        {articles.map((article) => (
          <li key={article.article_id}>
            <img src={article.article_img_url} alt={article.title} />
            <div className="article-content">
              <h3>
                <Link
                  to={`/articles/${article.article_id}`}
                  className="article-link"
                >
                  {article.title}
                </Link>
              </h3>
              <p>
                By <strong>{article.author}</strong>
              </p>
              <p>
                Topic: <strong>{article.topic}</strong>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
