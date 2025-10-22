import React from "react";
import { useParams } from "react-router-dom";
import { useArticle } from "../../hooks/useArticleService";
import "../../styles/ArticleDetails.css";
export const ArticleDetails = () => {
  const { id } = useParams();
  const { data: article, isLoading, error } = useArticle(id);

  if (isLoading) return <p className="loading">Loading article...</p>;
  if (error) return <p className="error">Failed to load article.</p>;
  if (!article) return <p className="not-found">Article not found.</p>;

  const {
    title,
    subtitle,
    content,
    excerpt,
    imageUrl,
    category,
    county,
    author,
    createdAt,
    updatedAt,
    verificationStatus,
    isTrending,
    isFeatured,
  } = article;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <section className="article-details">
      {/* ─── HEADER ─────────────────────────────── */}
      <header className="article-header">
        <div className="article-title-section">
          <h1 className="article-title">{title}</h1>
          {subtitle && <p className="article-subtitle">{subtitle}</p>}
        </div>

        <div className="article-tags">
          {isTrending && <span className="tag tag-trending">Trending</span>}
          {isFeatured && <span className="tag tag-featured">Featured</span>}
          {verificationStatus && (
            <span className={`tag tag-${verificationStatus.toLowerCase()}`}>
              {verificationStatus}
            </span>
          )}
        </div>
      </header>

      {/* ─── IMAGE ─────────────────────────────── */}
      {imageUrl && (
        <div className="article-image">
          <img src={imageUrl} alt={title} />
        </div>
      )}

      {/* ─── META ─────────────────────────────── */}
      <div className="article-meta">
        <span>Author: {author?.name || "Unknown"}</span>
        {category && <span>Category: {category.name}</span>}
        {county && <span>County: {county.name}</span>}
        <span>Created: {formatDate(createdAt)}</span>
        <span>Updated: {formatDate(updatedAt)}</span>
      </div>

      {/* ─── EXCERPT ───────────────────────────── */}
      {excerpt && (
        <blockquote className="article-excerpt">{excerpt}</blockquote>
      )}

      {/* ─── BODY ─────────────────────────────── */}
      <article
        className="article-body"
        dangerouslySetInnerHTML={{ __html: content }}
      ></article>

      {/* ─── ACTIONS ───────────────────────────── */}
      <div className="article-actions">
        <button
          className="btn btn-edit"
          onClick={() =>
            (window.location.href = `/dashboard/articles/edit/${id}`)
          }
        >
          Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={() => console.log("Delete logic here")}
        >
          Delete
        </button>
      </div>
    </section>
  );
};
