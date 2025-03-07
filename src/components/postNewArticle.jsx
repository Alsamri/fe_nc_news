import { UserContext } from "./loggedUserContext";
import { postArticle } from "../utils/api";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
export const AddNewArticle = () => {
  const { loggedInUser } = useContext(UserContext);
  const userName = loggedInUser ? loggedInUser.username : "";
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [ImgUrl, setImgUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    if (!userName) {
      setError("You must be logged in to post an article.");
      setIsSubmitting(false);
      return;
    }
    postArticle(
      userName,
      title,
      body,
      topics,
      ImgUrl || "http://DefaultURL-IMG.jpg"
    )
      .then((data) => {
        setSuccessMessage(`Article posted successfully!: ${data.article_id}`);
        setTitle("");
        setBody("");
        setTopics([]);
        setImgUrl("");
        setTimeout(() => {
          navigate(`/articles/${data.article_id}`);
        }, 1000);
      })
      .catch(() => {
        setError("Failed to post article. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="add-new-article">
      <h2>Post a New Article</h2>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <label>Topic:</label>
        <select
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          required
        >
          <option value="">Select a topic</option>
          <option value="coding">Coding</option>
          <option value="football">Football</option>
          <option value="cooking">Cooking</option>
        </select>

        <label>Image URL (Optional):</label>
        <input
          type="text"
          value={ImgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Article"}
        </button>
      </form>
    </div>
  );
};
