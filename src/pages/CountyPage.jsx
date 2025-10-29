import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { formatDate } from "../utils/formatDate"; // make sure this exists

export const CountyPage = ({ articles }) => {
  const { countySlug } = useParams();
  const [page, setPage] = useState(1);
  const articlesPerPage = 15;

  // ✅ Format county name nicely (e.g. "nandi" → "Nandi")
  const countyName = countySlug.charAt(0).toUpperCase() + countySlug.slice(1);

  // ✅ Filter articles that belong to this county
  const filteredArticles = useMemo(() => {
    return articles.filter(
      (article) =>
        article.county?.name?.toLowerCase() === countyName.toLowerCase()
    );
  }, [articles, countyName]);

  // ✅ Sort newest first
  const sortedArticles = useMemo(() => {
    return [...filteredArticles].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [filteredArticles]);

  // ✅ Pagination
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const paginatedResults = sortedArticles.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  // ✅ If no articles found
  if (sortedArticles.length === 0) {
    return (
      <main className="news-page">
        <section className="news">
          <div className="news__header">
            <h2 className="news__title">{countyName} News</h2>
            <span className="news__count">0 Articles</span>
          </div>
          <p className="news__empty">No news available for this county yet.</p>
        </section>
      </main>
    );
  }

  // ✅ Render same structure as category
  return (
    <main className="news-page">
      <section className="news">
        <div className="news__header">
          <h2 className="news__title">{countyName} News</h2>
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
