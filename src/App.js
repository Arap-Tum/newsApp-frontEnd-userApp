import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ArticlePage } from "./pages/ArticlePage";
import SearchResults from "./pages/SearchResults";

// import { useArticles } from "./hooks/useArticles";
import { useCategories } from "./hooks/useCategory";
import { useGlobalNews } from "./hooks/useGlobalNews";
import { useScrapped } from "./hooks/useScrapedArticles";
// import { useExternalNews } from "./hooks/useExternalNews";

import { Loading } from "./components/Loading";

import {
  normalizeLocalArticle,
  normalizeNewsApiArticle,
  normalizeScrapedArticle,
} from "./utils/normalizeArticles";

import { GlobalNews } from "./pages/GlobalNews";

import { Local } from "./pages/Local";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import Layout from "./Layout";

// import { SideBar } from "./components/SideBar";

//=============== CRUD ======================================
import { CreateArticle } from "./pages/crud/CreateArticle";
import { ManageArticles } from "./pages/crud/ManageArticles";
import { UpdateArticle } from "./pages/crud/UpdateArticle";

import { ArticleDetails } from "./pages/crud/ArticleDetails";

// ================== ADMIN ============================
import { UserDetails } from "./pages/admin/UserDetails";
import AdminLayout from "./pages/admin/AdminLyout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminNotFound } from "./pages/admin/AdminNotFound";

//=============== AUTHOR =====================
import AuthorLayout from "./pages/author/AuthorLayout";
import { AuthorDashboard } from "./pages/author/AuthorDashboard";

import { useVerifiedArticles } from "./hooks/useArticleService";
import { CategoryPage } from "./pages/CategoryPage";
import { CountyPage } from "./pages/CountyPage";

function App() {
  const { data: articles = [], isLoading: articlesLoading } =
    useVerifiedArticles();

  const { categories, loading: categoriesLoading } = useCategories();
  const { news: globalNews, loading: globalLoading } = useGlobalNews();
  const { articles: scrapedArticles, loading: scrapedLoading } = useScrapped();
  // const { news: externalNews, loading: externalLoading } = useExternalNews();

  const loading =
    articlesLoading || categoriesLoading || globalLoading || scrapedLoading;

  // Normalize
  /*Make it have a common element */

  const localArticles = articles.map(normalizeLocalArticle);

  const newsApiArticles =
    globalNews?.politics?.map(normalizeNewsApiArticle) || [];

  const scrapedNews = scrapedArticles.map(normalizeScrapedArticle);

  const allArticles = [...localArticles, ...newsApiArticles, ...scrapedNews];

  const globalArticles = [...newsApiArticles];

  const kenyanNews = [...localArticles, ...scrapedNews];

  if (loading) return <Loading />;
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Layout pages ( with Header + Footer + Search) */}
        <Route element={<Layout allArticles={allArticles} />}>
          <Route
            path="/"
            element={
              <Home
                articles={articles}
                globalNews={globalArticles}
                scrapedNews={scrapedNews}
                categories={categories}
                allArticles={allArticles} // ✅ pass normalized merged list
                loading={loading}
              />
            }
          />
          <Route
            path="/search"
            element={<SearchResults allArticles={allArticles} />}
          />

          <Route
            path="/articles/:slug"
            element={<ArticlePage articles={allArticles} />}
          />
          <Route path="/local" element={<Local articles={kenyanNews} />} />

          <Route
            path="/global"
            element={<GlobalNews articles={globalArticles} />}
          />

          <Route
            path="/county/:countySlug"
            element={<CountyPage articles={articles} />}
          />
          <Route
            path="/category/:categorySlug"
            element={<CategoryPage articles={articles} />}
          />
        </Route>

        {/* LOGIN & REGISTER */}
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* ADMIN  */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* default admin dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* manage users */}
          <Route path="users/:id" element={<UserDetails />} />

          {/* manage articles/posts */}
          <Route path="articles/:id" element={<ArticleDetails />} />
          <Route path="articles/new" element={<CreateArticle />} />
          <Route path="articles/:id/edit" element={<UpdateArticle />} />

          {/* logs, analytics, reports */}
          {/* <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} /> */}

          {/* fallback for anything not found inside /admin */}
          <Route path="*" element={<AdminNotFound />} />
        </Route>

        {/* AUTHOR */}
        <Route path="/author" element={<AuthorLayout />}>
          <Route index element={<AuthorDashboard />} />

          {/* manage articles/posts */}
          <Route path="articles" element={<ManageArticles />} />
          <Route path="articles/:id" element={<ArticleDetails />} />
          <Route path="articles/new" element={<CreateArticle />} />
          <Route path="articles/:id/edit" element={<UpdateArticle />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
