import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  deleteComment,
  getArticleById,
  getArticleCommentsById,
  patchArticleVotes,
  postComments,
  deleteArticle,
} from "../utils/api";
import { UserContext } from "./loggedUserContext";
import { Comment } from "./voteonComments";
import { useNavigate } from "react-router-dom";
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
  const [isVoting, setIsVoting] = useState(false);
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);
  const userName = loggedInUser?.username || null;

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
    if (isVoting) return;
    const newVote = voteCount + addition;
    setVoteCount(newVote);
    setIsVoting(true);
    patchArticleVotes(id, addition)
      .then((updatedArticle) => {
        setarticledetail(
          () => (
            setIsVoting(false),
            {
              ...updatedArticle,
              votes: updatedArticle.votes,
            }
          )
        );
      })
      .catch((error) => {
        console.error(error);
        setVoteCount(voteCount - addition);
        setIsVoting(false);
      });
  };

  const operateCommentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!userName || !newComment.trim()) {
      setError("Username and comment cannot be empty.");
      setIsSubmitting(false);
      return;
    }

    postComments(id, userName, newComment)
      .then((newCommentDetails) => {
        setComments((priorComments) => [newCommentDetails, ...priorComments]);
        setNewComment("");
        setCommentCount((priorCount) => parseInt(priorCount) + 1);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Failed to post comment", error);
        setError("Failed to post comment. Please try again.");
        setIsSubmitting(false);
      });
  };

  const operateDeleteComment = (comment_id, username) => {
    if (!userName || userName !== username) {
      setError("You can only delete your own comments.");
      return;
    }
    deleteComment(comment_id, userName)
      .then(() => {
        setComments((priorComments) =>
          priorComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setCommentCount((priorCount) => parseInt(priorCount) - 1);
      })
      .catch((error) => {
        setError("Failed to delete comment. Please try again.");
      });
  };

  const ArticlesDelete = () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticle(id)
        .then(() => {
          alert("Article deleted successfully.");
          navigate("/");
        })
        .catch(() => {
          setError("Failed to delete article.");
        });
    }
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
      {userName === articledetail?.author && (
        <button className="delete-button" onClick={ArticlesDelete}>
          Delete Article
        </button>
      )}
      <div className="article-info">
        <p>Votes: {voteCount}</p>
        <button onClick={() => VotingSystem(1)} disabled={isVoting}>
          ⬆ Upvote
        </button>
        <button onClick={() => VotingSystem(-1)} disabled={isVoting}>
          ⬇ Downvote
        </button>
        <p>
          <strong>Comments:</strong> {commentCount}
        </p>
      </div>

      {loggedInUser ? (
        <>
          <h3>Add a Comment</h3>
          <form onSubmit={operateCommentSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              required
              className="comment-textarea"
            />
            <br />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </>
      ) : (
        <p>Please log in to post a comment.</p>
      )}

      <h3>Comments</h3>
      {Comments.length > 0 ? (
        <ul className="comments-list">
          {Comments.map((comment) => (
            <li key={comment.comment_id} className="comment">
              <Comment comment={comment} />
              {userName === comment.author && (
                <button
                  onClick={() =>
                    operateDeleteComment(comment.comment_id, comment.author)
                  }
                  className="delete-comment-button"
                >
                  Delete Comment
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};
