import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { FetchArticles } from "./components/fetchArticles";
import { ArticleDetails } from "./components/articleDetails";
function App() {
  return (
    <Router>
      <h1>NC News</h1>
      <Routes>
        <Route path="/" element={<FetchArticles />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
