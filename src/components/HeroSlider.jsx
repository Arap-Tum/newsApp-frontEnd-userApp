import React from 'react'
import '../styles/HeroSlider.css' // Ensure you have the correct path to your CSS file
import { useState, useEffect } from 'react'


export const HeroSlider = ({ articles }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    console.log(articles);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % articles.length);
        }, 15000);
        return () => clearInterval(interval);
    }, [articles.length]);

  return (
     <div className="hero-slider">
      {articles.map((article, index) => (
        
        <div
          key={article.id}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${article.imageUrl})` }}
        >
            {/* <img src={`http://localhost:5000${article.imageUrl}`} alt={article.title} /> */}
          <div className="overlay">
            <h2 className="slide-title">{article.title}</h2>
          </div>
        </div>
      ))}

      <div className="dots">
        {articles.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>

      <div className="arrows">
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length)}>
          Prev
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % articles.length)}>
          Next
        </button>
      </div>

      <div className='slideCounter'>
        {currentSlide + 1} / {articles.length}
      </div>
    </div>
  )
}
