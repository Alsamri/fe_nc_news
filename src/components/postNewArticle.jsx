import { UserContext } from "./loggedUserContext";
import { postArticle } from "../utils/api";
import { useState, useContext } from "react";

export const AddNewArticle = () => {
  const { loggedInUser } = useContext(UserContext);
  const userName = loggedInUser ? loggedInUser.username : "";
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState([]);
  const [ImgUrl, setImgUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

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
      topics.join(", "),
      ImgUrl || "http://DefaultURL-IMG.jpg"
    )
      .then((data) => {
        console.log(data);

        setSuccessMessage(`Article posted successfully!: ${data.article_id}`);
        setTitle("");
        setBody("");
        setTopic([]);
        setImgUrl("");
      })
      .catch(() => {
        setError("Failed to post article. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  const handleTopicChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedTopics = selectedOptions.map((option) => option.value);
    setTopics(selectedTopics);
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
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

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
