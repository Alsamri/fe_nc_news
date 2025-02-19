import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";

export const FetchTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((data) => setTopics(data))
      .catch((error) => console.error("Error fetching topics:", error));
  }, []);
  return (
    <div className="topics-container">
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
