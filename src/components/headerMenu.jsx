import { Link } from "react-router-dom";
import { UserContext } from "./loggedUserContext";
import { useContext } from "react";
export const HeaderMenu = () => {
  const { loggedInUser, logout } = useContext(UserContext);

  return (
    <header>
      <h1>NC News</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">🏠 Home</Link>
        </li>
        <li>
          <Link to="/about">📰 About</Link>
        </li>
        <li>
          <Link to="/users">👥 Users</Link>
        </li>
      </ul>
      {loggedInUser ? (
        <div className="user-info">
          <img
            src={loggedInUser.avatar_url}
            alt={loggedInUser.name}
            className="avatar"
          />
          <span>{loggedInUser.username}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to="/users" className="login-btn">
          Log In
        </Link>
      )}
    </header>
  );
};
