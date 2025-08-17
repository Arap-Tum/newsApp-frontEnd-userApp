import { useState, useEffect } from "react";

import { CalendarDays, User } from "lucide-react";
import { Link } from "react-router-dom"; //

export const NewsList = ({ articles }) => {
  const [otherArticles, setOtherArticles] = useState([]);



  useEffect(() => {
    if (articles && articles.length > 0) {
      //sort articles by createdAt date in descending order
      const sortedArticles = [...articles].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      // Take the top 5 articles
      setOtherArticles(sortedArticles.slice(1, 5));
    }
  }, [articles]);

  return (
    <section className="other-news-wrapper">
      <h2 className="section-title">Other News</h2>
      <div className="articles-list">
        {/* Map through other articles and display them */}
        {otherArticles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="article-content">
              <h3 className="article-title">{article.title}</h3>

              <div className="article-meta">
                <span className="meta-author">
                  <User className="icon-author" />
                  {article.author?.name || "Unknown Author"}
                </span>
                <span className="meta-date">
                  <CalendarDays className="icon-date" />
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="article-snippet">
                {article.content.split(" ").slice(0, 25).join(" ")}...
              </p>

              <Link to={`/article/${article.id}`} className="read-more-link">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
