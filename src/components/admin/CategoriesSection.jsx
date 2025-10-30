import "../../styles/CategoriesSection.css";
import {
  createArticleCategory,
  updateArticleCategory,
  deleteArticleCategory,
} from "../../api/categoriesAPI";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthConttext";
import { useState } from "react";

export const CategoriesSection = ({ categories = [] }) => {
  const [form, setFormData] = useState({ name: "" });
  const [editingCategory, setEditingCategory] = useState(null); // Track category being edited
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // ─── CREATE CATEGORY ───────────────────────────────
  const createCategory = useMutation({
    mutationFn: async (category) =>
      await createArticleCategory(category, token),
    onSuccess: (data) => {
      toast.success("Category created successfully!");
      setFormData({ name: "" });
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      toast.error(error?.message || "Error creating category.");
      console.error("❌ Error creating category:", error);
    },
  });

  // ─── UPDATE CATEGORY ───────────────────────────────
  const updateCategory = useMutation({
    mutationFn: async ({ id, data }) =>
      await updateArticleCategory(id, data, token),
    onSuccess: (data) => {
      toast.success("Category updated successfully!");
      setEditingCategory(null);
      setFormData({ name: "" });
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      toast.error(error?.message || "Error updating category.");
      console.error("❌ Error updating category:", error);
    },
  });

  // ─── DELETE CATEGORY ───────────────────────────────
  const deleteCategory = useMutation({
    mutationFn: async (id) => await deleteArticleCategory(id, token),
    onSuccess: (data) => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      toast.error(error?.message || "Error deleting category.");
      console.error("❌ Error deleting category:", error);
    },
  });

  // ─── HANDLERS ─────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }

    if (editingCategory) {
      updateCategory.mutate({
        id: editingCategory.id,
        data: { name: form.name },
      });
    } else {
      createCategory.mutate({ name: form.name });
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteCategory.mutate(id);
    }
  };

  // ─── RENDER ───────────────────────────────────────
  return (
    <div className="categories-section">
      {/* ─── Section Header ─────────────────────────────── */}
      <div className="section-header">
        <h2 className="section-title">Categories</h2>

        <input
          style={{ margin: 10, padding: 6, borderRadius: 10 }}
          name="name"
          className="input"
          placeholder={
            editingCategory ? "Edit category name..." : "Add new category"
          }
          type="text"
          value={form.name}
          onChange={handleChange}
        />

        <button
          className={`add-category-btn ${
            editingCategory ? "update-btn" : "create-btn"
          }`}
          onClick={handleSubmit}
        >
          {editingCategory ? "✅ Update Category" : "+ Add Category"}
        </button>

        {editingCategory && (
          <button
            className="cancel-edit-btn"
            onClick={() => {
              setEditingCategory(null);
              setFormData({ name: "" });
            }}
          >
            Cancel
          </button>
        )}
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
                  <td className="table-cell name-cell">
                    <span className="category-name">{category.name}</span>
                  </td>
                  <td className="table-cell slug-cell">
                    <code className="category-slug">{category.slug}</code>
                  </td>
                  <td className="table-cell count-cell">
                    {category.articlesCount ?? 0}
                  </td>
                  <td className="table-cell date-cell">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="table-cell actions-cell">
                    <div className="actions">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(category.id, category.name)}
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
