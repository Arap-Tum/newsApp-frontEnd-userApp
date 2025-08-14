import React from "react";
import "../styles/Home.css";
import { Loading } from "../components/Loading";
import { HeroSlider } from "../components/HeroSlider";
import { TrendingNews } from "../components/TrendingNews";
import { CategorySec } from "../components/CategorySec";
import { NewsList } from "../components/NewsList";

export const Home = ({ articles, loading, categories }) => {
   if (loading) return <Loading />;
  if (articles.length === 0) {
    return (
      <section className="news-home__empty">
        <p>No articles found.</p>
      </section>
    );
  }

  // Pre-filter or slice data for each section
  const heroArticles = articles.slice(0, 5);
  const trendingArticles = articles.filter(a => a.isTrending);
  const categoryArticles = articles; // Adjust filtering as needed
  const listArticles = articles;     // Could also be filtered
  return (
 <main className="news-home">
      <div className="news-home__grid">
        <div className="news-home__main">
          <section className="news-home__hero" aria-label="Top Stories">
            <HeroSlider articles={heroArticles} />
          </section>

          <section className="news-home__trending" aria-label="Trending News">
            <TrendingNews articles={trendingArticles} />
          </section>

          <section className="news-home__categories" aria-label="News by Category">
            <CategorySec articles={categoryArticles} categories={categories} />
          </section>
        </div>

        <aside className="news-home__side">
          <section className="news-home__newslist" aria-label="Latest Articles">
            <NewsList articles={listArticles} />
          </section>
        </aside>
      </div>
    </main>
  );
};
