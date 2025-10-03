import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ArticlePage } from "./pages/ArticlePage";
import SearchResults from "./pages/SearchResults";

import { useArticles } from "./hooks/useArticles";
import { useCategories } from "./hooks/useCategory";
import { useGlobalNews } from "./hooks/useGlobalNews";
import { useScrapped } from "./hooks/useScrapedArticles";
// import { useExternalNews } from "./hooks/useExternalNews";

import { Loading } from "./components/Loading";

import {
  normalizeApiArticle,
  normalizeDbArticle,
  normalizeScrapedNews,
} from "./utils/normalizeArticles";

import { GlobalNews } from "./pages/GlobalNews";
import { Politics } from "./pages/Politics";
import { Technology } from "./pages/Technology";
import { Sports } from "./pages/Sports";
import { Entertainment } from "./pages/Entertainment";
import { Health } from "./pages/Health";
import { Business } from "./pages/Business";

import { Local } from "./pages/Local";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import Layout from "./Layout";

// import { SideBar } from "./components/SideBar";

//=============== CRUD ======================================
import { CreateArticle } from "./pages/crud/CreateArticle";
import { ManageArticles } from "./pages/crud/ManageArticles";
import { UpdateArticle } from "./pages/crud/UpdateArticle";
import { CategoriesList } from "./pages/crud/CategoriesList";
import { CategoryCreate } from "./pages/crud/CategoryCreate";
import { CategoryEdit } from "./pages/crud/CategoryEdit";
import { ArticleDetails } from "./pages/crud/ArticleDetails";

// ================== ADMIN ============================
import { ManageUsers } from "./pages/admin/ManageUsers";
import { UserDetails } from "./pages/admin/UserDetails";
import AdminLayout from "./pages/admin/AdminLyout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminNotFound } from "./pages/admin/AdminNotFound";

//=============== AUTHOR =====================
import AuthorLayout from "./pages/author/AuthorLayout";
import { AuthorDashboard } from "./pages/author/AuthorDashboard";

function App() {
  const { articles, loading: articlesLoading } = useArticles();
  const { categories, loading: categoriesLoading } = useCategories();
  const { news: globalNews, loading: globalLoading } = useGlobalNews();
  const { articles: scrapedArticles, loading: scrapedLoading } = useScrapped();
  // const { news: externalNews, loading: externalLoading } = useExternalNews();

  const loading =
    articlesLoading || categoriesLoading || globalLoading || scrapedLoading;

  // Normalize
  /*Make it have a common element */
  const localArticles = articles.map(normalizeDbArticle);
  const politicsArticles = globalNews?.politics?.map(normalizeApiArticle) || [];

  //addition
  const kenyanNews = scrapedArticles.map(normalizeScrapedNews);

  const allArticles = [...localArticles, ...politicsArticles, ...kenyanNews];

  const globalArticles = [...politicsArticles];

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
                globalNews={globalNews}
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
            path="/articles/:id"
            element={<ArticlePage articles={allArticles} />}
          />
          <Route path="/local" element={<Local articles={kenyanNews} />} />

          <Route
            path="/global"
            element={<GlobalNews articles={globalArticles} />}
          />
          <Route
            path="/politics"
            element={<Politics articles={politicsArticles} />}
          />
          <Route
            path="/business"
            element={<Business articles={allArticles} />}
          />
          <Route
            path="/technology"
            element={<Technology articles={allArticles} />}
          />
          <Route path="/sports" element={<Sports articles={allArticles} />} />
          <Route
            path="/entertainment"
            element={<Entertainment articles={allArticles} />}
          />
          <Route path="/health" element={<Health articles={allArticles} />} />
        </Route>

        {/* LOGIN & REGISTER */}
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* ADMIN  */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* default admin dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* manage users */}
          <Route path="users" element={<ManageUsers />} />
          <Route path="users/:id" element={<UserDetails />} />

          {/* manage articles/posts */}
          <Route path="articles" element={<ManageArticles />} />
          <Route path="articles/:id" element={<ArticleDetails />} />
          <Route path="articles/new" element={<CreateArticle />} />
          <Route path="articles/:id/edit" element={<UpdateArticle />} />

          {/* Categories */}
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/new" element={<CategoryCreate />} />
          <Route path="categories/:id/edit" element={<CategoryEdit />} />

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
