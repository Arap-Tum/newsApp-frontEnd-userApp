import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { ArticlePage } from "./pages/ArticlePage";
import SearchResults from "./pages/SearchResults";

import { useArticles } from "./hooks/useArticles";
import { useCategories } from "./hooks/useCategory";
import { useGlobalNews } from "./hooks/useGlobalNews";
import { Loading } from "./components/Loading";

import { normalizeApiArticle, normalizeDbArticle } from "./utils/normalizeArticles";
import { GlobalNews } from "./pages/GlobalNews";
import { Politics } from "./pages/Politics";
import { Technology } from "./pages/Technology";
import { Sports } from "./pages/Sports";
import { Entertainment } from "./pages/Entertainment";
import { Health } from "./pages/Health";
import { Business } from "./pages/Business";

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
        <Route path="/search" element={<SearchResults allArticles={allArticles} />} />

        <Route
          path="/articles/:id"
          element={<ArticlePage articles={allArticles} />} // ✅ use merged list
        />
       < Route path="/global" element={<GlobalNews />} />
       <Route path="/global" element={<GlobalNews />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/business" element={<Business/>} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/sports" element={<Sports/>} />
        <Route path="/entertainment" element={<Entertainment/>} />
        <Route path="/health" element={<Health />} />
       

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
