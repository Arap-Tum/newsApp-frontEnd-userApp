import { useParams, Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { Loading } from "../components/Loading";

export const ArticlePage = ({ articles }) => {
  const { id } = useParams();

  // Find the article by id
  const article = articles.find((art) => art.id === id);

  if (!article) {
    return <Loading />;
  }

  return (
    <main className="article-page">
      {/* === Main Article === */}
      <article className="article">
        {article.image && (
          <div className="article__image-wrapper">
            <img
              src={article.image}
              alt={article.title}
              className="article__image"
            />
          </div>
        )}

        <header className="article__header">
          <h1 className="article__title">{article.title}</h1>

          <div className="article__meta">
            <span className="article__date">
              <CalendarDays className="article__icon" />
              {new Date(article.date).toLocaleDateString()}
            </span>
            <span className="article__source">{article.source}</span>
          </div>
        </header>

        <section className="article__content">
          <p>{article.description}</p>
        </section>
      </article>

      {/* === Related Articles Sidebar === */}
      <aside className="related">
        <h2 className="related__title">Related Articles</h2>
        <div className="related__list">
          {articles
            .filter((rel) => rel.id !== article.id) // exclude current one
            .slice(0, 5) // show only 5
            .map((rel) => (
              <Link
                key={rel.id}
                to={`/articles/${rel.id}`}
                className="related__card"
              >
                {rel.image && (
                  <div className="related__image-wrapper">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="related__image"
                    />
                  </div>
                )}
                <div className="related__content">
                  <h3 className="related__headline">{rel.title}</h3>
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
