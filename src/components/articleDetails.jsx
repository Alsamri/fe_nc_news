import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getArticleCommentsById,
  patchArticleVotes,
  postComments,
} from "../utils/api";

export const ArticleDetails = () => {
  const [articledetail, setarticledetail] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [Comments, setComments] = useState([]);
  const [voteCount, setVoteCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    getArticleById(id)
      .then((data) => {
        setarticledetail(data);
        setCommentCount(data.comment_count);
        setLoading(false);
        setVoteCount(data.votes);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    getArticleCommentsById(id)
      .then((data) => setComments(data))
      .catch((error) => console.error(error));
  }, [id]);

  const VotingSystem = (addition) => {
    const newVote = voteCount + addition;
    setVoteCount(newVote);
    patchArticleVotes(id, addition)
      .then((updatedArticle) => {
        setarticledetail(() => ({
          ...updatedArticle,
          votes: updatedArticle.votes,
        }));
      })
      .catch((error) => {
        console.error(error);
        setVoteCount(newVote);
      });
  };

  const operateCommentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const username = "weegembump";

    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      setIsSubmitting(false);
      return;
    }
    postComments(id, username, newComment)
      .then((newCommentDetails) => {
        setComments((priorComments) => [newCommentDetails, ...priorComments]);
        setNewComment("");
        setCommentCount((priorCount) => {
          parseInt(priorCount) + 1;
        });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Failed to post comment", error);
        setError("Failed to post comment. Please try again.");
        setIsSubmitting(false);
      });
  };
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
        <p>Votes: {voteCount}</p>
        <button onClick={() => VotingSystem(1)}>⬆ Upvote</button>
        <button onClick={() => VotingSystem(-1)}>⬇ Downvote</button>
        <p>
          <strong>Comments:</strong> {commentCount}
        </p>
      </div>
      <h3>Add a Comment</h3>
      <form onSubmit={operateCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="write your comment here..."
          required
          className="comment-textarea"
        />
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

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
