import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { ArticlePage } from "./pages/ArticlePage";
import { EditArticle } from "./pages/EditArticle";
import { CreateArticle } from "./pages/CreateArticle";

import { useArticles } from "./hooks/useArticles";
import { useCategories } from "./hooks/useCategory";
import { useGlobalNews } from "./hooks/useGlobalNews";

function App() {
  const { articles, loading: articlesLoading } = useArticles();
  const { categories, loading: categoriesLoading } = useCategories();
  const { news: globalNews, loading: globalLoading } = useGlobalNews();

  const loading = articlesLoading || categoriesLoading || globalLoading;

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              articles={articles}
              globalNews={globalNews}
              categories={categories}
              loading={loading}
            />
          }
        />
        <Route path="/article/:id" element={<ArticlePage articles={articles} />} />
        <Route path="/edit-article/:title" element={<EditArticle articles={articles} />} />
        <Route path="/create-article" element={<CreateArticle articles={articles} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
