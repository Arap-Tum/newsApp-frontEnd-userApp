import React from "react";
import { Link } from "react-router-dom";
import "../../styles/ArticlesSection.css";

export const ArticlesSection = ({ articles = [] }) => {
  // Helper function to format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-KE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="articles-section">
      {/* ─── Header ───────────────────────────── */}
      <div className="section-header">
        <h2 className="section-title">Articles</h2>
        <Link to="/admin/articles/new" className="add-article-link">
          <button className="add-article-btn">+ New Article</button>
        </Link>
      </div>

      {/* ─── Articles Table ────────────────────── */}
      <div className="table-container">
        <table className="articles-table">
          <thead>
            <tr>
              <th className="table-header">Title</th>
              <th className="table-header">Category</th>
              <th className="table-header">County</th>
              <th className="table-header">Author</th>
              <th className="table-header">Verified</th>
              <th className="table-header">Status</th>
              <th className="table-header">Created</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>

          <tbody>
            {articles && articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article.id} className="table-row">
                  <td className="table-cell title-cell">
                    <Link
                      to={`/admin/articles/${article.id}`}
                      className="article-title-link"
                    >
                      {article.title}
                    </Link>

                    <div className="article-badges">
                      {article.isFeatured && (
                        <span className="badge badge-featured">Featured</span>
                      )}
                      {article.isTrending && (
                        <span className="badge badge-trending">Trending</span>
                      )}
                    </div>
                  </td>

                  <td className="table-cell">
                    {article.category?.name || "Uncategorized"}
                  </td>

                  <td className="table-cell">{article.county?.name || "—"}</td>

                  <td className="table-cell">{article.author?.name || "—"}</td>

                  <td className="table-cell">
                    {article.verificationStatus === "VERIFIED"
                      ? formatDate(article.verifiedAt)
                      : "Pending"}
                  </td>

                  <td className="table-cell">
                    <span
                      className={`status-tag ${
                        article.verificationStatus?.toLowerCase() || "pending"
                      }`}
                    >
                      {article.verificationStatus || "PENDING"}
                    </span>
                  </td>

                  <td className="table-cell">
                    {formatDate(article.createdAt)}
                  </td>

                  <td className="table-cell actions-cell">
                    <div className="actions">
                      <Link
                        to={`/admin/articles/${article.id}`}
                        className="action-btn view-btn"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/articles/${article.id}/edit`}
                        className="action-btn edit-btn"
                      >
                        Edit
                      </Link>
                      <button
                        className="action-btn delete-btn"
                        onClick={() =>
                          console.log("Delete article", article.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan="8" className="empty-message">
                  No articles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
