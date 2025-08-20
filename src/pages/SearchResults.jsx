import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import "../styles/SearchResults.css";

export default function SearchResults({ allArticles }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search)
    .get("query")
    ?.toLowerCase();

  // Pagination state
  const [page, setPage] = useState(1);
  const resultsPerPage = 6;

  // Filter results
  const results = allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.content?.toLowerCase().includes(query) ||
      article.author?.name?.toLowerCase().includes(query)
  );

  // Paginate results
  const startIndex = (page - 1) * resultsPerPage;
  const paginatedResults = results.slice(
    startIndex,
    startIndex + resultsPerPage
  );
  const totalPages = Math.ceil(results.length / resultsPerPage);

  // Highlight matching text
  const highlightMatch = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === query ? <mark key={i}>{part}</mark> : part
      );
  };

  return (
    <div className="search-results">
      <h2>
        Search Results for <span className="query-text">"{query}"</span>
      </h2>

      {results.length === 0 ? (
        <p>No articles found. Try searching for different keywords.</p>
      ) : (
        <div className="results-grid">
          {paginatedResults.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${encodeURIComponent(article.url)}`}
              className="result-card"
            >
              <img
                src={article.image || article.urlToImg}
                alt={article.title}
                className="result-img"
              />
              <div className="result-content">
                <h3>{highlightMatch(article.title)}</h3>
                <p>{highlightMatch(article.content?.slice(0, 150) || "")}...</p>
                {article.author?.name && (
                  <span className="author">By {article.author.name}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {results.length > resultsPerPage && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
