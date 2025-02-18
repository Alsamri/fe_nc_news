import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getArticleCommentsById } from "../utils/api";

export const ArticleDetails = () => {
  const [articledetail, setarticledetail] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [Comments, setComments] = useState([]);
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
    getArticleCommentsById(id)
      .then((data) => setComments(data))
      .catch((error) => console.error(error));
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
      <p className="article-main">By: {articledetail.author}</p>
      <p className="article-main">Topic: {articledetail.topic}</p>
      <p className="article-main">
        Published on: {new Date(articledetail.created_at).toLocaleDateString()}
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
      <h3>Comments</h3>
      {Comments.length > 0 ? (
        <ul className="comments-list">
          {Comments.map((comment) => (
            <li key={comment.comment_id} className="comment">
              <p className="comment-author">
                {comment.author}{" "}
                <span className="comment-date">
                  ({new Date(comment.created_at).toLocaleDateString()})
                </span>
              </p>
              <p className="comment-body">{comment.body}</p>
              <p className="comment-votes">Votes: {comment.votes}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};
