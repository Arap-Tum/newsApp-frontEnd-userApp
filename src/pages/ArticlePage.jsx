import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { CalendarDays, Share2, Twitter, Facebook } from "lucide-react";
import { Loading } from "../components/Loading";

import "../styles/ArticlePage.css";

export const ArticlePage = ({ articles }) => {
  const { id } = useParams();
  const [showFull, setShowFull] = useState(false);

  // Find the article by id
  const article = articles.find((art) => art.id === id);

  if (!article) {
    return <Loading />;
  }

  // Helper: split long text into paragraphs
  const splitIntoParagraphs = (text) => {
    if (!text) return [];
    return text.split(/\n|\.(?=\s[A-Z])/).filter((p) => p.trim().length > 0);
  };

  return (
    <main className="article-layout">
      {/* === Article Section === */}
      <article className="article">
        {/* Category Badge */}
        <span className="article__category">{article.category}</span>

        {/* Title */}
        <h1 className="article__title">{article.title}</h1>

        {/* Metadata */}
        <div className="article__meta">
          <span className="article__date">
            <CalendarDays className="icon" />
            {new Date(article.date).toLocaleDateString()}
          </span>
          <span className="article__source">{article.source}</span>
        </div>

        {/* Main Image (medium, floated) */}
        {article.image && (
          <figure className="article__image-wrapper">
            <img
              src={article.image}
              alt={article.title}
              className="article__image"
            />
            <figcaption className="article__caption">
              Image credit: {article.source}
            </figcaption>
          </figure>
        )}

        {/* Content (split into paragraphs + read more toggle) */}
        <section className="article__content">
          {splitIntoParagraphs(article.description)
            .slice(0, showFull ? undefined : 3)
            .map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

          {!showFull && (
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
          {articles
            .filter(
              (rel) =>
                rel.id !== article.id && rel.category === article.category
            )
            .slice(0, 6)
            .map((rel) => (
              <Link
                key={rel.id}
                to={`/articles/${encodeURIComponent(rel.id)}`}
                className="related__card"
              >
                {rel.image && <img src={rel.image} alt={rel.title} />}
                <div className="related__content">
                  <h3>{rel.title}</h3>
                  <p>{rel.description?.slice(0, 80)}...</p>
                  <span className="related__date">
                    {new Date(rel.date).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </aside>
    </main>
  );
};
