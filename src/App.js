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
import { Ukraine } from "./pages/Ukraine";
import { Navbar } from "./components/Navbar";
import { Search } from "./components/Search";
import { Local } from "./pages/Local";

function App() {
  const { articles, loading: articlesLoading } = useArticles();
  const { categories, loading: categoriesLoading } = useCategories();
  const { news: globalNews, loading: globalLoading } = useGlobalNews();

  const loading = articlesLoading || categoriesLoading || globalLoading;

   // Normalize
   /*Make it have a common element */
  const localArticles = articles.map(normalizeDbArticle);
  const politicsArticles = globalNews?.politics?.map(normalizeApiArticle) || [];
  const businessArticles = globalNews?.business?.map(normalizeApiArticle) || [];
  const technologyArticles = globalNews?.technology?.map(normalizeApiArticle) || [];
  const sportsArticles = globalNews?.sports?.map(normalizeApiArticle) || [];
  const entertainmentArticles =  globalNews?.entertainment?.map(normalizeApiArticle) || [];
  const healthArticles = globalNews?.health?.map(normalizeApiArticle) || []; 
  const ukraineArticles = globalNews?.ukraine?.map(normalizeApiArticle) || [];

  const allArticles = [
    ...localArticles,
     ...politicsArticles, 
     ...businessArticles, 
     ...technologyArticles,
     ...sportsArticles,
     ...entertainmentArticles,
     ...healthArticles,
     ...ukraineArticles
    ];

 const globalArticles  = [
   ...politicsArticles, 
     ...businessArticles, 
     ...technologyArticles,
     ...sportsArticles,
     ...entertainmentArticles,
     ...healthArticles,
     ...ukraineArticles
 ];

  if (loading) return <Loading />;
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Search allArticles={allArticles} />
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
       <Route path="/local" element={<Local articles={localArticles}  />} />
       <Route path="/global" element={<GlobalNews articles={globalArticles}  />} />
        <Route path="/politics" element={<Politics articles={politicsArticles} />} />
        <Route path="/business" element={<Business articles={businessArticles}/>} />
        <Route path="/technology" element={<Technology articles={technologyArticles} />} />
        <Route path="/sports" element={<Sports articles={sportsArticles}/>} />
        <Route path="/entertainment" element={<Entertainment articles={entertainmentArticles}/>} />
        <Route path="/health" element={<Health articles={healthArticles} />} />

        <Route path="/ukraine" element={<Ukraine articles={ukraineArticles} />} />
       

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
