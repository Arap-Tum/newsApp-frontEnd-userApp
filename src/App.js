
import './App.css';

// Importing necessary libraries
import React from 'react';
import { Route, Routes }   from 'react-router-dom';
import { useState, useEffect } from 'react';

// Importing components and pages
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ArticlePage } from './pages/ArticlePage';
import { Footer } from './components/Footer'; 
import { EditArticle } from './pages/EditArticle'; // Ensure this import is correct
import { CreateArticle } from './pages/CreateArticle'; 

// Importing API functions
import { getArticles } from './api/articles'; // Adjust the import path as needed
import { getCategories } from './api/categories'; // Adjust the import path as needed

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchAndSet = async (apFn, setter, label) => {
    try {
      setLoading(true);
      const response = await apFn();
      console.log(`✅ ${label} fetched`);
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching ${label}:`, error);
      console.error(`❌ ${label} Error:`, error.message);
      console.log("🔍 URL:", error.config?.baseURL + error.config?.url);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSet(getArticles, setArticles, 'articles');
    fetchAndSet(getCategories, setCategories, 'categories');
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home articles={articles} loading={loading} categories={categories} />} />
        <Route path="/article/:id" element={<ArticlePage articles={articles} loading={loading} />} />
        <Route path="/edit-article/:title" element={<EditArticle articles={articles} loading={loading} />} />
        <Route path="/create-article" element={<CreateArticle articles={articles} loading={loading} />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;