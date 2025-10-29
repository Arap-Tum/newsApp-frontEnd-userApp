import React from "react";
import { useAuth } from "../../context/AuthConttext";
import { useMyArticles } from "../../hooks/useArticleService";
import { ArticlesSection } from "../../components/author/ArticleSection";

export const AuthorDashboard = () => {
  const { token } = useAuth();
  const { data: articles, isLoading, error } = useMyArticles(token);

  console.log("author", articles);

  return (
    <main className="author-dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Author Dashboard</h1>
        <p className="dashboard-subtitle">
          Manage your submitted articles and track their verification status.
        </p>
      </header>

      <section className="dashboard-content">
        {isLoading && (
          <div className="loading-state">
            <p>Loading your articles...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>Unable to load articles. Please try again later.</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {articles && articles.length > 0 ? (
              <ArticlesSection articles={articles} />
            ) : (
              <div className="empty-state">
                <p>You haven’t submitted any articles yet.</p>
                <button className="create-article-btn">
                  Create New Article
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};
