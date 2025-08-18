import '../styles/newsList.css';
import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export const NewsList = ({ articles }) => {
  const [sortedArticles, setSortedArticles] = useState([]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      // Sort by publishedAt (newest first)
      const sorted = [...articles].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      setSortedArticles(sorted);

      console.log("Sorted Articles:", sorted);
    }
  }, [articles]);

  return (
    <section className="news">
     
      <div className="news__header">
        <h2 className="news__title">Latest News</h2>
        {/* <span className="news__count">{sortedArticles.length} Articles</span> */}
      </div>

      <div className="news__grid">
        {sortedArticles.map((article, index) => (
          <article key={index} className="news-card">
            {article.urlToImage && (
              <div className="news-card__image-wrapper">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="news-card__image"
                />
              </div>
            )}

            <div className="news-card__body">
              <h3 className="news-card__title">{article.title}</h3>

              <div className="news-card__meta">
                <span className="news-card__date">
                  <CalendarDays className="news-card__icon" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                {article.source?.name && (
                  <span className="news-card__source">{article.source.name}</span>
                )}
                {article.author && (
                  <span className="news-card__author">By {article.author}</span>
                )}
              </div>

              <p className="news-card__snippet">
                {article.description?.split(" ").slice(0, 10).join(" ") ||
                  article.content?.split(" ").slice(0, 30).join(" ")}
                ...
              </p>

              <Link to={`/article/${index}`} className="news-card__link">
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
