import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";

export const FetchTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <></>;
  }
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
