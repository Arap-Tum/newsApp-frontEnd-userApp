import React from "react";
import { useState } from "react";
import { ArticlesSection } from "../../components/admin/ArticlesSection";
import { UsersSection } from "../../components/admin/UsersSection";
import { CategoriesSection } from "../../components/admin/CategoriesSection";
import { CountiesSection } from "../../components/admin/CountiesSection";
import "../../styles/adminDashboard.css";
import { useAllTheAricles } from "../../hooks/useArticleService";
import { useArticleCategories } from "../../hooks/useCattegoriesService";
import { useArticleCounties } from "../../hooks/useCounties";
import { useAuth } from "../../context/AuthConttext";
import { useAllUsers } from "../../hooks/useUsers";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("");
  const { token } = useAuth();

  // ✅ Fetch all data
  const { data: articles, isLoading: loadingArticles } =
    useAllTheAricles(token);
  const { data: categories, isLoading: loadingCategories } =
    useArticleCategories();
  const { data: counties, isLoading: loadingCounties } = useArticleCounties();

  const { data: users, isLoading: loadingUsers } = useAllUsers(token);
  console.log("THIS IS ARTICLES", articles);
  // 🔹 Compute counts safely (avoid undefined errors)
  const articleCount = articles?.length || 0;
  const categoryCount = categories?.length || 0;
  const countyCount = counties?.length || 0;
  const userCount = users?.length || 0; // Replace with actual user data when available

  const stats = [
    { key: "articles", label: "Articles", count: articleCount },
    { key: "categories", label: "Categories", count: categoryCount },
    { key: "users", label: "Users", count: userCount },
    { key: "counties", label: "Counties", count: countyCount },
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
      </header>

      {/* 🔹 Top stats / shortcuts */}
      <div className="dashboard-stats">
        {stats.map((item) => (
          <div
            key={item.key}
            className={`stat-card ${activeTab === item.key ? "active" : ""}`}
            onClick={() => setActiveTab(item.key)}
          >
            <h2 className="stat-label">{item.label}</h2>
            <p className="stat-count">
              {loadingArticles ||
              loadingCategories ||
              loadingCounties ||
              loadingUsers
                ? "..."
                : item.count}
            </p>
          </div>
        ))}
      </div>

      {/* 🔹 Selected Section */}
      <div className="dashboard-section">
        {activeTab === "articles" && <ArticlesSection articles={articles} />}
        {activeTab === "categories" && (
          <CategoriesSection categories={categories} />
        )}
        {activeTab === "users" && <UsersSection users={users} />}
        {activeTab === "counties" && <CountiesSection counties={counties} />}

        {!activeTab && (
          <div className="empty-state">
            <p>Select a section above to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
};
