import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/newsPge.css";

export const Ukraine = ({ articles }) => {
  const [page, setPage] = useState(1);
  const articlesPerPage = 8;

  // Paginate result
  const startIndex = (page - 1) * articlesPerPage;
  const paginatedResults = articles.slice(
    startIndex,
    startIndex + articlesPerPage
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  //
  if (articles.length === 0) {
    <p>Articles not found </p>;
  }
  return (
    <main className="news-page">
      <articles className="articles-grid">
        {paginatedResults.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${encodeURIComponent(article.id)}`}
            className="result-card"
          >
            <img
              src={article.image || article.urlToImg}
              alt={article.title}
              className="result-img"
            />
            <div className="result-content">
              <h3>{article.title}</h3>
              <p>{article.content?.slice(0, 150) || ""}...</p>
              {article.author?.name && (
                <span className="author">By {article.author.name}</span>
              )}
            </div>
          </Link>
        ))}
      </articles>

      {/* Pagination Controls */}
      {articles.length > articlesPerPage && (
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
    </main>
  );
};
