import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { FetchArticles } from "./components/fetchArticles";
import { ArticleDetails } from "./components/articleDetails";
import { FetchTopics } from "./components/fetchTopics";
import { ArticlesByTopic } from "./components/articlesByTopic";
import { SearchResults } from "./components/searchResult";

function HomePage() {
  return (
    <div>
      <h1>NC News</h1>
      <FetchTopics />
      <FetchArticles />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
        <Route path="/topics/:topic" element={<ArticlesByTopic />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
