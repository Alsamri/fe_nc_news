import { useState } from "react";
import { voteOnComment } from "../utils/api";

export const Comment = ({ comment }) => {
  const [votes, setVotes] = useState(comment.votes);
  const [error, setError] = useState(null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = (voteChange) => {
    if (isVoting) return;

    setVotes((prevVotes) => prevVotes + voteChange);
    setIsVoting(true);

    voteOnComment(comment.comment_id, voteChange)
      .then((updatedComment) => {
        setVotes(updatedComment.votes);
        setIsVoting(false);
      })
      .catch(() => {
        setVotes((prevVotes) => prevVotes - voteChange);
        setError("Failed to update vote. Try again.");
        setIsVoting(false);
      });
  };

  return (
    <div className="comment">
      <p>
        <strong>{comment.author}</strong>: {comment.body}
      </p>
      <p> {new Date(comment.created_at).toLocaleDateString()}</p>
      <div className="votes">
        <button onClick={() => handleVote(1)} disabled={isVoting}>
          ⬆
        </button>
        <span>{votes}</span>
        <button onClick={() => handleVote(-1)} disabled={isVoting}>
          ⬇
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
