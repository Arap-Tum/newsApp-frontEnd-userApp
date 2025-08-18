import { useLocation } from "react-router-dom";

export default function SearchResults({ allArticles }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query")?.toLowerCase();

  const results = allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.content?.toLowerCase().includes(query) ||
      article.author?.name?.toLowerCase().includes(query)
  );

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul className="article-list">
          {results.map((article) => (
            <li key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.content?.slice(0, 150)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
