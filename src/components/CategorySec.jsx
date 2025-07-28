import React, { useState } from 'react';

import '../styles/CategorySec.css'; 

export const CategorySec = ({ articles, categories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories?.[0]?.id || null
  );

  const filteredArticles = articles.filter(
    (article) => article.categoryId === selectedCategoryId
  );

  return (
    <section className="category-section">
      <h2 className="section-title">Categories</h2>

      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`category-item ${
              selectedCategoryId === category.id ? 'active' : ''
            }`}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>

      <div className="category-articles">
        {filteredArticles.length === 0 ? (
          <p className="no-articles">No articles found for this category.</p>
        ) : (
          <ul className="article-list">
            {filteredArticles.map((article) => (
              <li key={article.id} className="article-card">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="article-image"
                  />
                )}
                <div className="article-content">
                  <h4 className="article-title">{article.title}</h4>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
