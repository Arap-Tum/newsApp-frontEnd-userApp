import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import "../styles/newsPge.css";
import "../styles/local.css";

export const Local = ({ articles, scrapedArticles }) => {
  const [page, setPage] = useState(1);
  const articlesPerPage = 20;

  useEffect(() => {
    console.log(scrapedArticles);
  });

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
      {/* <articles className="articles-grid">
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
      </articles> */}

      <div className="news__grid">
        {paginatedResults.map((article, index) => (
          <article key={index} className="news-card">
            <div className="news-card__image-wrapper">
              <img
                src={article.image || article.urlToImg}
                alt={article.title}
                className="news-card__image"
              />
            </div>

            <div className="news-card__body">
              <h3 className="news-card__title">
                {article.title.split(" ").slice(0, 10).join(" ")}
              </h3>

              <div className="news-card__meta">
                <span className="news-card__date">
                  <CalendarDays className="news-card__icon" />
                  {new Date(article.date).toLocaleDateString()}
                </span>

                <span className="news-card__source">{article.source}</span>

                {article.author && (
                  <span className="news-card__author">By {article.author}</span>
                )}
              </div>

              <Link
                to={`/articles/${encodeURIComponent(article.id)}`}
                className="news-card__link"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>

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
