import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/CategoriesSection.css";
import { createArticleCategory } from "../../api/categoriesAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthConttext";
export const CategoriesSection = ({ categories = [] }) => {
  const [form, setFormData] = useState({ name: "" });

  const { token } = useAuth();

  const createCategory = useMutation({
    mutationFn: async (category) => {
      return await createArticleCategory(category, token);
    },
    onSuccess: (data) => {
      console.log("Category created : ", data);
      toast.success(`Category created `);
    },
    onError: (error) => {
      const message =
        error?.message || "Something went wrong while creating the product";
      toast.error(message);
      console.error("❌ Error creating category:", error);
    },
  });
  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    createCategory.mutate({ name: form.name });
  };

  return (
    <div className="categories-section">
      {/* ─── Section Header ─────────────────────────────── */}
      <div className="section-header">
        <h2 className="section-title">Categories</h2>
        <input
          style={{ margin: 10, padding: 6, borderRadius: 10 }}
          name="name"
          className="input"
          placeholder="add new category"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
        {/* <Link to="/admin/categories/new" className="add-category-link"> */}
        <button className="add-category-btn" onClick={handleSubmit}>
          + Add Category
        </button>
        {/* </Link> */}
      </div>

      {/* ─── Table Container ─────────────────────────────── */}
      <div className="table-container">
        <table className="categories-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header">Name</th>
              <th className="table-header">Slug</th>
              <th className="table-header">Articles Count</th>
              <th className="table-header">Created</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr className="table-row" key={category.id}>
                  {/* ─── Name Cell ───────────────────────────── */}
                  <td className="table-cell name-cell">
                    <span className="category-name">{category.name}</span>
                  </td>

                  {/* ─── Slug Cell ───────────────────────────── */}
                  <td className="table-cell slug-cell">
                    <code className="category-slug">{category.slug}</code>
                  </td>

                  {/* ─── Articles Count Cell ─────────────────── */}
                  <td className="table-cell count-cell">
                    {category.articlesCount ?? 0}
                  </td>

                  {/* ─── Created Date Cell ───────────────────── */}
                  <td className="table-cell date-cell">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>

                  {/* ─── Actions Cell ────────────────────────── */}
                  <td className="table-cell actions-cell">
                    <div className="actions">
                      {/* <Link
                        to={`/admin/categories/${category.id}`}
                        className="action-btn view-btn"
                      >
                        View
                      </Link> */}
                      <Link
                        to={`/admin/categories/edit/${category.id}`}
                        className="action-btn edit-btn"
                      >
                        Edit
                      </Link>
                      <button
                        className="action-btn delete-btn"
                        onClick={() =>
                          window.confirm(
                            `Are you sure you want to delete "${category.name}"?`
                          ) && console.log("Delete", category.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="table-row empty-row">
                <td colSpan="5" className="empty-message">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
