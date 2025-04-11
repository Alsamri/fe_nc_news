import { Link } from "react-router-dom";
import { UserContext } from "./loggedUserContext";
import { useContext } from "react";
export const HeaderMenu = () => {
  const { loggedInUser, logout } = useContext(UserContext);
  return (
    <header className="header">
      <h1 className="logo">🗞️ NC News</h1>
      <nav>
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
      </nav>
      {loggedInUser ? (
        <div className="user-info">
          <img
            src={loggedInUser.avatar_url}
            alt={loggedInUser.name}
            className="avatar"
          />
          <span className="username">@{loggedInUser.username}</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <Link to="/users" className="login-btn">
          Log In
        </Link>
      )}
    </header>
  );
};
