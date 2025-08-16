import '../styles/TrendingNews.css';
import { CalendarDays, User } from 'lucide-react';
import { Link } from 'react-router-dom'; // or 'next/link' if Next.js
import { useMemo } from 'react';

export const TrendingNews = ({ articles }) => {
  // Only trending articles
const trendingArticles = useMemo(() => {
  return articles
    .filter(article => article.isTrending)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);
}, [articles]);

  return (
    <section className="trending-news-section">
      {/* Section Header */}
      <header className="trending-header">
        <h2 className="trending-title">Trending News</h2>
      </header>

      {/* Trending Articles */}
      <div className="trending-articles-container">
        {trendingArticles.length > 0 ? (
          trendingArticles.map(article => (
            <Link
              to={`/articles/${article.id}`}
              key={article.id}
              className="trending-article-card"
              style={{
                backgroundImage: `url(${article.imageUrl || "/placeholder.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay for readability */}
              <div className="trending-article-overlay" />

              {/* Article Details */}
              <div className="trending-article-content">
                {/* Category */}
                {article.category?.name && (
                  <span className="trending-category">
                    {article.category.name}
                  </span>
                )}

                {/* Title */}
                 <h3 className="trending-article-title">{article.title.slice(0, 100)}</h3>
              
                {/* Meta Info */}
                <div className="trending-article-meta">
                  <span className="meta-author">
                    <User size={14} /> {article.author?.name || "Unknown"}
                  </span>
                  <span className="meta-date">
                    <CalendarDays size={14} />{" "}
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-trending-articles">No trending news right now.</p>
        )}
      </div>
    </section>
  );
};
