import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import "../styles/HeroSlider.css";
import { Link } from "react-router-dom";

export const HeroSlider = ({ articles }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [articles.length]);

  // const SlidesArticles = useMemo(() => {
  //   return articles
  //   .filter(article => article.isFeatured )
  //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //   .slice(0, 8);
  // })

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  if (!articles || articles.length === 0) {
    return <div className="hero-slider-empty">No articles available</div>;
  }

  return (
    <div className="hero-slider">
      {/* Slides Container */}
      <div className="slides-container">
        {articles.map((article, index) => (
          <Link to={`/articles/${article.id}`} key={article.id}>
            <div
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${article.imageUrl})` }}
            >
              <div className="slide-overlay">
                <div className="slide-content">
                  <h2 className="slide-title">{article.title}</h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="navigation-dots">
        {articles.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="navigation-arrows">
        <button
          className="arrow-btn prev-btn"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          className="arrow-btn next-btn"
          onClick={handleNextSlide}
          aria-label="Next slide"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="slide-counter">
        <span className="current-slide">{currentSlide + 1}</span>
        <span className="divider">/</span>
        <span className="total-slides">{articles.length}</span>
      </div>
    </div>
  );
};
