import React, { useState } from "react";
import { CalendarDays, User } from "lucide-react";
import { Link } from "react-router-dom";

import "../styles/CategorySec.css";

export const CategorySec = ({ articles = [], categories = [] }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id || null
  );

  const filteredArticles = articles.filter(
    (article) => article.categoryId === selectedCategoryId
  );

  return (
    <section className="category-section">
      {/* <p className="section-title">Categories</p> */}

      {categories.length > 0 ? (
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id}>
             <button
  type="button"
  className={`category-item ${selectedCategoryId === category.id ? "active" : ""}`}
  aria-current={selectedCategoryId === category.id ? "true" : undefined}
  onClick={() => setSelectedCategoryId(category.id)}
>
  {category.name}
</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-categories">No categories available.</p>
      )}

      <div className="category-articles">
        {filteredArticles.length === 0 ? (
          <p className="no-articles">No articles found for this category.</p>
        ) : (
          <ul className="article-list">
            {filteredArticles.map((article) => (
              <li key={article.id}>
                <Link
                  to={`/articles/${article.id}`}
                  className="category-article-card"
                  style={{
                    backgroundImage: `url(${
                      article.imageUrl || "/placeholder.jpg"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="category-article-overlay" />

                  <article className="category-article-content">
                    <p className="category-article-title">
                      {article.title.length > 100
                        ? `${article.title.slice(0, 100)}…`
                        : article.title}
                    </p>

                    <div className="category-article-meta">
                      <span className="meta-author">
                        <User size={14} /> {article.author?.name || "Unknown"}
                      </span>
                      <span className="meta-date">
                        <CalendarDays size={14} />{" "}
                        {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
