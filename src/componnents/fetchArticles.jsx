import { useEffect, useState } from "react";
import axios from "axios";
export const FetchArticles = () => {
  const [articles, setarticles] = useState([]);
  useEffect(() => {
    axios
      .get("https://nc-project-news.onrender.com/api/articles")
      .then((response) => {
        setarticles(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center", color: "white" }}>Articles</h2>
      <ul className="container">
        {articles.map((article) => (
          <li key={article.article_id}>
            <img src={article.article_img_url} alt={article.title} />
            <div className="article-content">
              <h3>{article.title}</h3>
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
