import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";

export const ArticleDetails = () => {
  const [articledetail, setarticledetail] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(id)
      .then((data) => {
        setarticledetail(data);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading article details...</p>;
  }

  if (!articledetail) {
    return <p>No article found.</p>;
  }

  return (
    <div className="article-detail">
      <h2>{articledetail.title}</h2>
      <p>
        <strong>By:</strong> {articledetail.author}
      </p>
      <p>
        <strong>Topic:</strong> {articledetail.topic}
      </p>
      <p>
        <strong>Published on:</strong>{" "}
        {new Date(articledetail.created_at).toLocaleDateString()}
      </p>
      <img
        src={articledetail.article_img_url}
        alt={articledetail.title}
        className="article-img"
      />
      <p className="article-body">{articledetail.body}</p>
      <div className="article-info">
        <p>
          <strong>Votes:</strong> {articledetail.votes}
        </p>
        <p>
          <strong>Comments:</strong> {articledetail.comment_count}
        </p>
      </div>
    </div>
  );
};
