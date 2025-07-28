import React from "react";
import "../styles/Home.css";
import { Loading } from "../components/Loading";
import { HeroSlider } from "../components/HeroSlider";
import { TrendingNews } from "../components/TrendingNews";
import { CategorySec } from "../components/CategorySec";
import { NewsList } from "../components/NewsList";

export const Home = ({ articles, loading, categories }) => {
  return (
    <main className="Home">
      {loading && <Loading />}
      {!loading && articles.length === 0 && <p>No articles found.</p>}
      {!loading && articles.length > 0 && (
      <div className="home-container">
  <div className="left-column">
    <div className="hero-section">
      <HeroSlider articles={articles} />
    </div>

    <div className="trending-section">
      <TrendingNews articles={articles} />
    </div>

    <div className="category-section">
      <CategorySec articles={articles} categories={categories} />
    </div>
  </div>

  <div className="right-column">
    <div className="newslist-section">
      <NewsList articles={articles} />
    </div>
  </div>
</div>

      )}
    </main>
  );
};
