import React, { useMemo } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import "../styles/newsPge.css";
import "../styles/local.css";

export const Local = ({ articles = [] }) => {
  const [page, setPage] = useState(1);
  const articlesPerPage = 15;

  // ✅ 1. Sorting function
  const sortArticlesByDate = (data) => {
    if (!Array.isArray(data)) return [];
    return [...data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  // ✅ 2. Sort once using useMemo for performance
  const sortedArticles = useMemo(
    () => sortArticlesByDate(articles),
    [articles]
  );

  // ✅ 3. Paginate the sorted result
  const startIndex = (page - 1) * articlesPerPage;
  const paginatedResults = sortedArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

  // ✅ 4. Safe date formatting
  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  if (sortedArticles.length === 0) {
    return <p className="news__empty">Articles not found.</p>;
  }

  return (
    <main className="news-page">
      <section className="news">
        <div className="news__header">
          <h2 className="news__title">Latest News</h2>
          <span className="news__count">{sortedArticles.length} Articles</span>
        </div>

        <div className="news__grid">
          {paginatedResults.map((article, index) => (
            <article key={index} className="news-card">
              {article.imageUrl && (
                <div className="news-card__image-wrapper">
                  <img
                    src={article.imageUrl || "/placeholder.jpg"}
                    alt={article.title}
                    className="news-card__image"
                  />
                </div>
              )}

              <div className="news-card__body">
                <h3 className="news-card__title">
                  {article.title.split(" ").slice(0, 10).join(" ")}
                </h3>

                <div className="news-card__meta">
                  <span className="news-card__date">
                    <CalendarDays className="news-card__icon" />
                    {formatDate(article.createdAt)}
                  </span>

                  {article.sourceName && (
                    <span className="news-card__source">
                      {article.sourceName}
                    </span>
                  )}

                  {article.author?.name && (
                    <span className="news-card__author">
                      By {article.author.name}
                    </span>
                  )}
                </div>

                <Link
                  to={`/articles/${encodeURIComponent(
                    article.slug || article.id
                  )}`}
                  className="news-card__link"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* 🔹 Pagination Controls */}
        {totalPages > 1 && (
          <div className="news__pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="news__pagination-btn"
            >
              Prev
            </button>
            <span className="news__pagination-info">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="news__pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
