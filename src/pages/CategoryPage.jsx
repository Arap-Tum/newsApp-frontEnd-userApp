import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

export const CategoryPage = ({ articles = [] }) => {
  const { categorySlug } = useParams();
  const [page, setPage] = useState(1);
  const articlesPerPage = 15;

  // ✅ Format category name safely
  const categoryName = useMemo(() => {
    if (!categorySlug) return "";
    return categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
  }, [categorySlug]);

  // ✅ Filter articles that belong to this category
  const filteredArticles = useMemo(() => {
    return (articles || []).filter(
      (article) =>
        article.category?.name?.toLowerCase() === categoryName.toLowerCase()
    );
  }, [articles, categoryName]);

  // ✅ Sort newest first
  const sortedArticles = useMemo(() => {
    return [...filteredArticles].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [filteredArticles]);

  // ✅ Paginate
  const startIndex = (page - 1) * articlesPerPage;
  const paginatedResults = sortedArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

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
    return (
      <main className="news-page">
        <section className="news">
          <h2 className="news__title">No articles found for {categoryName}</h2>
        </section>
      </main>
    );
  }

  return (
    <main className="news-page">
      <section className="news">
        <div className="news__header">
          <h2 className="news__title">{categoryName} News</h2>
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
