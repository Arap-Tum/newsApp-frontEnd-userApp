import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { CalendarDays, Share2, Twitter, Facebook } from "lucide-react";
import { Loading } from "../components/Loading";
import "../styles/ArticlePage.css";

export const ArticlePage = ({ articles }) => {
  const { slug } = useParams();
  const [showFull, setShowFull] = useState(false);

  // Ensure safe array
  const safeArticles = Array.isArray(articles) ? articles : [];

  // Find the article by slug
  const article = useMemo(() => {
    return safeArticles.find((art) => art.slug === slug);
  }, [safeArticles, slug]);

  if (!articles || safeArticles.length === 0) {
    return <Loading message="Loading article..." />;
  }

  if (!article) {
    return (
      <main className="article-layout not-found">
        <h1>Article Not Found</h1>
        <p>The article you’re looking for doesn’t exist or is still loading.</p>
        <Link to="/" className="btn-back">
          ← Back to Home
        </Link>
      </main>
    );
  }

  // Helpers
  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return "Unknown date";
    }
  };

  const splitIntoParagraphs = (text) => {
    if (!text) return [];
    return text.split(/\n|\.(?=\s[A-Z])/).filter((p) => p.trim().length > 0);
  };

  // Safe field fallbacks
  const categoryName =
    typeof article.category === "string"
      ? article.category
      : article.category?.name || "General";

  const sourceName = article.sourceName || "Unknown Source";
  const imageUrl = article.imageUrl || article.image || null;
  const content = article.content || article.excerpt || "No content available.";

  return (
    <main className="article-layout">
      {/* === Article Section === */}
      <article className="article">
        {/* Category Badge */}
        <span className="article__category">{categoryName}</span>

        {/* Title */}
        <h1 className="article__title">{article.title}</h1>

        {/* Metadata */}
        <div className="article__meta">
          <span className="article__date">
            <CalendarDays className="icon" />
            {formatDate(article.createdAt || article.publishedAt)}
          </span>
          <span className="article__source">{sourceName}</span>
        </div>

        {/* Image */}
        {imageUrl && (
          <figure className="article__image-wrapper">
            <img
              src={imageUrl}
              alt={article.title}
              className="article__image"
            />
            {sourceName && (
              <figcaption className="article__caption">
                Image source: {sourceName}
              </figcaption>
            )}
          </figure>
        )}

        {/* Content */}
        <section className="article__content">
          {splitIntoParagraphs(content)
            .slice(0, showFull ? undefined : 3)
            .map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

          {!showFull && splitIntoParagraphs(content).length > 3 && (
            <button onClick={() => setShowFull(true)} className="btn-readmore">
              Read More
            </button>
          )}
        </section>

        {/* Social Share */}
        <div className="article__share">
          <button className="share-btn">
            <Share2 size={18} /> Share
          </button>
          <button className="share-btn">
            <Twitter size={18} /> Tweet
          </button>
          <button className="share-btn">
            <Facebook size={18} /> Facebook
          </button>
        </div>
      </article>

      {/* === Related Articles === */}
      <aside className="related">
        <h2 className="related__title">Related Articles</h2>
        <div className="related__grid">
          {safeArticles
            .filter(
              (rel) =>
                rel.id !== article.id &&
                (rel.category?.name === article.category?.name ||
                  rel.category === article.category)
            )
            .slice(0, 6)
            .map((rel) => (
              <Link
                key={rel.id}
                to={`/articles/${encodeURIComponent(rel.slug)}`}
                className="related__card"
              >
                {rel.imageUrl && (
                  <img
                    src={rel.imageUrl}
                    alt={rel.title}
                    className="related__image"
                  />
                )}
                <div className="related__content">
                  <h3 className="related__headline">{rel.title}</h3>
                  <p className="related__excerpt">
                    {(rel.excerpt || rel.content)?.slice(0, 80)}...
                  </p>
                  <span className="related__date">
                    {formatDate(rel.createdAt || rel.publishedAt)}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </aside>
    </main>
  );
};
