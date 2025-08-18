import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { ArticlePage } from "./pages/ArticlePage";


import { useArticles } from "./hooks/useArticles";
import { useCategories } from "./hooks/useCategory";
import { useGlobalNews } from "./hooks/useGlobalNews";
import { Loading } from "./components/Loading";

import { normalizeApiArticle, normalizeDbArticle } from "./utils/normalizeArticles";

function App() {
  const { articles, loading: articlesLoading } = useArticles();
  const { categories, loading: categoriesLoading } = useCategories();
  const { news: globalNews, loading: globalLoading } = useGlobalNews();

  const loading = articlesLoading || categoriesLoading || globalLoading;

   // Normalize
  const localArticles = articles.map(normalizeDbArticle);
  const politicsArticles = globalNews?.politics?.map(normalizeApiArticle) || [];
  const allArticles = [...localArticles, ...politicsArticles];

  if (loading) return <Loading />;
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
              allArticles={allArticles} // ✅ pass normalized merged list
              loading={loading}
            />
          }
        />
        <Route
          path="/articles/:id"
          element={<ArticlePage articles={allArticles} />} // ✅ use merged list
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
