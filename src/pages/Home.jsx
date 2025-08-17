import React from "react";
import "../styles/Home.css";
import { Loading } from "../components/Loading";
import { HeroSlider } from "../components/HeroSlider";
import { TrendingNews } from "../components/TrendingNews";
import { CategorySec } from "../components/CategorySec";
import { NewsList } from "../components/NewsList";

export const Home = ({ articles, loading, categories, globalNews }) => {
   if (loading) return <Loading />;
  if (articles.length === 0) {
    return (
      <section className="news-home__empty">
        <p>No articles found.</p>
      </section>
    );
  }

  // Pre-filter or slice data for each section
  const heroArticles = articles.slice(0, 10);
  const trendingArticles = articles.filter(a => a.isTrending);
  const categoryArticles = articles; // Adjust filtering as needed
  const listArticles = globalNews.politics;     // Could also be filtered

  return (
 <main className="news-home">
    <div className="item2">
      <h1 className="home-title">Welcome to The Phanthom</h1>
      <p className="home-description">
        Stay updated with the latest news from around the world.
      </p>
    </div>

  <div className="home-content">
      <div className="item1">
       <section className='slides-section'>
          <HeroSlider articles={heroArticles} />
      </section>

      <section className="trending-section">
        <TrendingNews articles={trendingArticles} />
      </section>
      
      <section className="categories-section">
          <CategorySec articles={categoryArticles} categories={categories} />
      </section>
     </div>

      <section className="list-section">
          <NewsList articles={listArticles} />
      </section>
  </div>
    </main>
  );
};
