import'../styles/TrendingNews.css';


import { useEffect, useState } from "react";


import { CalendarDays, User } from "lucide-react";
import { Link } from "react-router-dom"; // or 'next/link' if using Next.js


export const TrendingNews = ({ articles }) => {
const [trendingArticles, setTrendingArticles] = useState([]);
useEffect(() => {
    if (articles && articles.length > 0) {
      // Sort articles by createdAt date in descending order
      const sortedArticles = [...articles].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // Take the top 5 articles
      setTrendingArticles(sortedArticles.slice(0, 1));
    }
  }, [articles]);


  return (
     <section className="trending-news-wrapper">
      <h2 className="section-title">Latest Analysis</h2>

      <div className="articles-list">
        {trendingArticles.map((article) => (
          
          <div key={article.id} className="article-card">
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="article-image"
              />
            )}

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

              {/* <p className="article-snippet">
                {article.content}
              </p> */}

              <Link to={`/article/${article.id}`} className="read-more-link">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
