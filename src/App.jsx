import { useState } from "react";

import "./App.css";
import { FetchArticles } from "./componnents/fetchArticles";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div></div>
      <h1>NC News</h1>
      <FetchArticles />
    </>
  );
}

export default App;
