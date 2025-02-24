import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/api";
import { UserContext } from "./loggedUserContext";
import { useContext } from "react";
export const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  const handleLogin = (user) => {
    setLoggedInUser(user);
    navigate("/");
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Select a User to Log In</h2>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.username} className="user-card">
            <img src={user.avatar_url} alt={user.name} className="avatar" />
            <p>{user.name}</p>
            <button onClick={() => handleLogin(user)}>Log In</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
