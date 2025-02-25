import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { FetchArticles } from "./components/fetchArticles";
import { ArticleDetails } from "./components/articleDetails";
import { FetchTopics } from "./components/fetchTopics";
import { ArticlesByTopic } from "./components/articlesByTopic";
import { SearchResults } from "./components/searchResult";
import { HeaderMenu } from "./components/headerMenu";
import { AllUsers } from "./components/userdetails";
import { UserProvider } from "./components/loggedUserContext";
import { AddNewArticle } from "./components/postNewArticle";

function HomePage() {
  return (
    <>
      <FetchTopics />
      <Link to="/post-article">
        <button>Add New Article</button>
      </Link>
      <FetchArticles />
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <HeaderMenu />
        <Routes>
          <Route path="/post-article" element={<AddNewArticle />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/topics/:topic" element={<ArticlesByTopic />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/users" element={<AllUsers />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
