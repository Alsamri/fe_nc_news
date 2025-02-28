import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getArticles } from "../utils/api";
import { SortByArticles } from "./sortarticleBy";
import { SearchBar } from "./searchBar";
export const FetchArticles = () => {
  const [articles, setarticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(5);
  useEffect(() => {
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    getArticles({ sortBy, order, page: currentPage, limit })
      .then((data) => {
        console.log(data);

        setarticles(data || []);
        setTotalCount(data.total_count || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [searchParams, currentPage, limit]);
  const totalPages = Math.ceil(totalCount / limit);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  if (loading) {
    return <p>Loading articles...</p>;
  }
  return (
    <>
      <SearchBar />
      <h2>Articles</h2>
      <SortByArticles />

      <ul className="container">
        {articles.map((article) => (
          <li key={article.article_id}>
            <img src={article.article_img_url} alt={article.title} />
            <div className="article-content">
              <h3>
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </h3>
              <p>
                By <strong>{article.author}</strong>
              </p>
              <p>
                Topic: <strong>{article.topic}</strong>
              </p>
              <p> {new Date(article.created_at).toLocaleDateString()}</p>
              <p>💬 {article.comment_count} Comments</p>
              <p>👍 {article.votes} Votes</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)} // Go to previous page
          disabled={currentPage === 1} // Disable if already on the first page
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)} // Go to next page
          disabled={currentPage === totalPages} // Disable if already on the last page
        >
          Next
        </button>
      </div>
    </>
  );
};
